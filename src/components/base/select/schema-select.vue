<script setup lang="ts">
import {onMounted, ref, useAttrs} from "vue"

import {useFormOptions} from "@/hooks/use-form-options"
import type {FormItemProps} from "@/types/schema"
import {FORM_ITEM_EMIT_NAME, OPTION_LABEL_KEY, OPTION_VALUE_KEY} from "@/constants"

defineOptions({name: 'SchemaSelect'})

interface Props extends FormItemProps {
  value?: string | number | boolean
}

const props = withDefaults(defineProps<Props>(), {
  labelKey: OPTION_LABEL_KEY,
  valueKey: OPTION_VALUE_KEY,
})

const internalModel = ref(props.formData[props.name]);

const {
  isView,
  viewSlot,
  viewValue,
  options,
  isLoading,
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
  <template v-if="isView">
    <slot v-if="viewSlot" :name="viewSlot"></slot>
    <template v-else>{{ viewValue }}</template>
  </template>
  <el-select
      v-bind="attrs"
      v-else
      :loading="isLoading"
      @change="handleChange"
      v-model="internalModel"
  >
    <template #header v-if="props?.itemProps?.headerSlot">
      <slot :name="props.itemProps.headerSlot"></slot>
    </template>
    <template #footer v-if="props?.itemProps?.footerSlot">
      <slot :name="props.itemProps.footerSlot"></slot>
    </template>
    <template #prefix v-if="props?.itemProps?.prefixSlot">
      <slot :name="props.itemProps.prefixSlot"></slot>
    </template>
    <template #empty v-if="props?.itemProps?.emptySlot">
      <slot :name="props.itemProps.emptySlot"></slot>
    </template>
    <template #loading v-if="props?.itemProps?.loadingSlot">
      <slot :name="props.itemProps.loadingSlot"></slot>
    </template>
    <template #label v-if="props?.itemProps?.labelSlot">
      <slot :name="props.itemProps.labelSlot"></slot>
    </template>
    <el-option
        v-for="item in options"
        :key="item[valueKey]"
        :label="item[labelKey]"
        :value="item[valueKey]"
        v-bind="props?.itemProps?.optionProps"
    >
    </el-option>
  </el-select>
</template>