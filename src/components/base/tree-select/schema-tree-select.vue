<script setup lang="ts">

import {onMounted, ref} from "vue";
import {useForm} from "@/hooks/use-form";
import type {FormItemProps} from "@/types/form"
import {FORM_ITEM_EMIT_NAME} from "@/constants";

defineOptions({name: 'SchemaTreeSelect'})

interface Props extends FormItemProps {
  value?: string
}

const props = withDefaults(defineProps<Props>(), {})
const internalModel = ref(props.value);

const {
  isView,
  viewSlot,
  viewValue,
  options,
  loadOptions
} = useForm(props, internalModel)

const emit = defineEmits([FORM_ITEM_EMIT_NAME]);
const handleChange = () => {
  emit(FORM_ITEM_EMIT_NAME, {...props, internalModel})
}

onMounted(() => {
  loadOptions()
})

defineExpose({
  loadOptions,
  bindFieldName: props.name,
  scope: props.scope
})
</script>

<template>
  <template v-if="isView">
    <slot v-if="viewSlot" :name="viewSlot"></slot>
    <template v-else>{{ viewValue }}</template>
  </template>
  <el-tree-select v-else @change="handleChange" v-model="internalModel" :data="options"/>
</template>