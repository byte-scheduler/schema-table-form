<script setup lang="ts">

import {ref} from "vue";
import {useForm} from "@/hooks/use-form";
import type {FormItemProps} from "@/types/form"
import {FORM_ITEM_EMIT_NAME} from "@/constants";

defineOptions({name: 'SchemaSwitch'})

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
  <el-switch v-else @change="handleChange" v-model="internalModel">
    <template #active-action v-if="props?.itemProps?.activeActionSlot">
      <slot :name="props.itemProps.activeActionSlot"></slot>
    </template>
    <template #active-action v-if="props?.itemProps?.inactiveActionSlot">
      <slot :name="props.itemProps.inactiveActionSlot"></slot>
    </template>
  </el-switch>
</template>