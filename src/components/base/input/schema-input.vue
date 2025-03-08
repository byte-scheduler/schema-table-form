<script setup lang="ts">

import {ref} from "vue";
import {useForm} from "@/hooks/use-form";
import type {FormItemProps} from "@/types/form"
import {FORM_ITEM_EMIT_NAME} from "@/constants";

defineOptions({name: 'SchemaInput'})

interface Props extends FormItemProps {
  value?: string
}

const props = withDefaults(defineProps<Props>(), {})
const internalModel = ref(props.value);

const {
  isView,
  viewSlot,
  viewValue,
} = useForm(props, internalModel)

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