<script setup lang="ts">
import {reactive, ref} from 'vue';
import {isFunction, isUndefined, omit} from "lodash"
import type {FormConfig, FormItemConfig, FormItemChangeParams} from "@/types/schema"
import type {FormInstance} from "element-plus"
import type {ValidateFieldsError} from "async-validator"
import {FORM_EMIT_NAME} from "@/constants"
import {DisplayMode} from "@/enums"
import SchemaFormMap from "@/components/base"

defineOptions({name: 'SchemaForm'})

interface Props {
  config?: FormConfig,
  formItems: FormItemConfig[]
  model: Record<string, any>
}

const props = withDefaults(defineProps<Props>(), {
  config: () => ({
    trigger: 'change',
  }),
  formItems: () => [],
  model: () => ({})
})

const emit = defineEmits([FORM_EMIT_NAME]);

const formData = reactive(props.model)

/**
 * 表单项校验规则
 */
const getRules = (item: FormItemConfig) => {
  if (Array.isArray(item?.rules)) {
    return item?.rules
  }
  if (item.required) {
    return [{
      required: true,
      message: `${item.label || item.name}必填`,
      trigger: props?.config?.trigger,
    }]
  }
  return item?.rules || []
}

/**
 * 表单组件属性
 */
const getComponentProps = (item: FormItemConfig, index: number) => {
  return {
    // 忽略 disabled、readonly
    ...omit(item, 'disabled', 'readonly'),
    // 字段组件配置
    ...item.props,
    // 重写 disabled、readonly
    disabled: isDisabled({index, item, value: formData[item.name]}),
    readonly: isReadonly({index, item, value: formData[item.name]}),
    formData
  };
};

/**
 * 当前渲染组件类型
 */
const getComponent = (params: { index: number; item: FormItemConfig, value: any }) => {
  const {item} = params;
  let component
  if (isFunction(item.component)) {
    component = item.component({...params, formData: formData});
  } else {
    component = item.component
  }
  return SchemaFormMap[component] || component
}

/**
 * 判断表单项是否可见
 */
const isVisible = (params: { index: number; item: FormItemConfig, value: any }) => {
  const {item} = params;
  if (isFunction(item.visible)) {
    return item.visible({...params, formData: formData});
  }
  // 默认设置为 TRUE
  return isUndefined(item.visible) ? true : item.visible;
}

/**
 * 判断表单项是否禁用
 */
const isDisabled = (params: { index: number; item: FormItemConfig, value: any }) => {
  const {item} = params;
  if (isFunction(item.mode)) {
    return item.mode({...params, formData: formData}) === DisplayMode.DISABLED;
  }
  return item.mode === DisplayMode.DISABLED;
}

/**
 * 判断表单项是否只读
 */
const isReadonly = (params: { index: number; item: FormItemConfig, value: any }) => {
  const {item} = params;
  if (isFunction(item.mode)) {
    return item.mode({...params, formData: formData}) === DisplayMode.READONLY;
  }
  return item.mode === DisplayMode.READONLY;
}

/**
 * 整个渲染的表单实例对象
 */
const formItemListRef = ref()

/**
 * 根据字段名获取当前字段绑定的组件实例
 * @param targetField 字段名
 */
const getInstanceByField: (targetField: string) => any = (targetField) => {
  for (const itemRef of formItemListRef.value) {
    if (itemRef.bindFieldName === targetField) {
      return itemRef
    }
  }
  return null
}

/**
 * 根据字段名获取当前字段配置
 * @param targetField 字段名
 */
const getPropsByField: (targetField: string) => FormItemConfig | undefined = (targetField) => {
  const findIndex = props.formItems.findIndex(item => item.name === targetField)
  if (findIndex >= 0) {
    return props.formItems[findIndex]
  }
}

/**
 * 加载字典数据，如下拉选择、多选、单选
 * @param targetField 目标字段
 * @param params 自定义请求参数
 */
const loadOptions = (targetField: string, params?: Record<string, any>) => {
  const itemRef: any = getInstanceByField(targetField)
  if (itemRef && isFunction(itemRef.loadOptions)) {
    return itemRef.loadOptions(params)
  }
}

/**
 * 表单数据发生改变时触发
 */
const handleChange = (params: { index: number, item: FormItemConfig, event: any }) => {
  const {item} = params || {};
  const payload: FormItemChangeParams = {
    ...params,
    loadOptions,
    getInstanceByField,
    getPropsByField,
    formData: formData,
    instance: formItemListRef.value,
  }
  if (isFunction(item.change)) {
    item.change(payload)
  }
  emit(FORM_EMIT_NAME, payload)
}

/**
 * 表单方法相关
 */
const formRef = ref<FormInstance>()
const validate = () => {
  return new Promise((resolve, reject) => {
    formRef.value?.validate((valid: boolean, invalidFields?: ValidateFieldsError) => {
      if (valid) {
        resolve(formData)
      } else {
        reject(invalidFields)
      }
    });
  })
}

/**
 * 重置表单
 */
const resetFields = () => {
  formRef.value?.resetFields()
}

/**
 * @validate 表单校验
 * @resetFields 表单重置
 * @formRef 表单实例对象
 */
defineExpose({
  validate,
  resetFields,
  formRef,
})
</script>

<template>
  <el-form ref="formRef" :model="formData" :rules="config?.rules" v-bind="config?.props">
    <el-row v-bind="config?.layout">
      <template v-for="(item, index) in formItems" :key="item.name">
        <template v-if="isVisible({index,item, value: formData[item.name]})">
          <slot v-if="item?.customSlot" :name="item.customSlot" :scope="getComponentProps(item, index)"/>
          <el-col v-else v-bind="item?.column">
            <el-form-item
                :label="item.label"
                :prop="item.name"
                :rules="getRules(item)"
                v-bind="item?.formItemProps"
            >
              <slot v-if="item.labelSlot" :name="item.labelSlot" :scope="getComponentProps(item, index)"/>
              <slot v-if="item.errorSlot" :name="item.errorSlot" :scope="getComponentProps(item, index)"/>
              <slot v-if="item.slot" :name="item.slot" :scope="getComponentProps(item, index)"/>
              <component
                  v-else
                  ref="formItemListRef"
                  :is="getComponent({index, item, value: formData[item.name]})"
                  v-model="formData[item.name]"
                  @change="(event: Record<string, any>) => handleChange({index, item, event})"
                  v-bind="getComponentProps(item, index)"
              />
            </el-form-item>
          </el-col>
        </template>
      </template>
    </el-row>
    <slot></slot>
  </el-form>
</template>