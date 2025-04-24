<script setup lang="ts">

import {ref} from "vue";
import {useFormOptions} from "@/hooks/use-form-options.js";
import type {FormItemProps} from "@/types/schema.ts";

const FORM_ITEM_EMIT_NAME = 'change:update'

defineOptions({name: 'SchemaInput'})

interface Props extends FormItemProps {
  value?: string
}

const props = withDefaults(defineProps<Props>(), {})
const internalModel = ref(props.formData[props.name]);

const {
  isView,
  viewSlot,
  viewValue,
} = useFormOptions(props, internalModel)

const emit = defineEmits([FORM_ITEM_EMIT_NAME]);
const handleChange = () => {
  emit(FORM_ITEM_EMIT_NAME, {...props, internalModel})
}

defineExpose({
  bindFieldName: props.name,
  scope: props.scope
})
</script>

<template>
  <template v-if="isView">
    <slot v-if="viewSlot" :name="viewSlot"></slot>
    <template v-else>{{ viewValue }}</template>
  </template>
  <el-input v-else @change="handleChange" v-model="internalModel">
    <template #append v-if="props?.itemProps?.appendSlot">
      <slot :name="props.itemProps.appendSlot"></slot>
    </template>
    <template #prefix v-if="props?.itemProps?.prefixSlot">
      <slot :name="props.itemProps.prefixSlot"></slot>
    </template>
    <template #suffix v-if="props?.itemProps?.suffixSlot">
      <slot :name="props.itemProps.suffixSlot"></slot>
    </template>
    <template #prepend v-if="props?.itemProps?.prependSlot">
      <slot :name="props.itemProps.prependSlot"></slot>
    </template>
  </el-input>
</template>