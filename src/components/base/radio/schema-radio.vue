<script setup lang="ts">

import {onMounted, ref, useAttrs} from "vue"
import {useFormOptions} from "@/hooks/use-form-options"
import type {FormItemProps} from "@/types/schema"
import {FORM_ITEM_EMIT_NAME} from "@/constants"

defineOptions({name: 'SchemaRadio'})

interface Props extends FormItemProps {
  value?: string | number | boolean
}

const props = withDefaults(defineProps<Props>(), {
  labelKey: 'label',
  valueKey: 'value',
  value: () => ''
})
const internalModel = ref(props.formData[props.name]);

const {
  isView,
  viewSlot,
  viewValue,
  options,
  loadOptions
} = useFormOptions(props, internalModel)

const emit = defineEmits([FORM_ITEM_EMIT_NAME]);
const handleChange = () => {
  emit(FORM_ITEM_EMIT_NAME, {...props, internalModel})
}

onMounted(() => {
  loadOptions()
})

const attrs = useAttrs()

defineExpose({
  loadOptions,
  bindFieldName: props.name,
  scope: props.scope,
})
</script>

<template>
  <div>
    <template v-if="isView">
      <slot v-if="viewSlot" :name="viewSlot"></slot>
      <template v-else>{{ viewValue }}</template>
    </template>
    <el-radio-group
        v-bind="attrs"
        v-else
        @change="handleChange"
        v-model="internalModel"
    >
      <el-radio
          v-for="item in options"
          :key="item[valueKey]"
          :label="item[labelKey]"
          :value="item[valueKey]"
          v-bind="props?.itemProps?.optionProps"
      >
      </el-radio>
    </el-radio-group>
  </div>
</template>