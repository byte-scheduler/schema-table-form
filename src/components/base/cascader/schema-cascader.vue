<script setup lang="ts">
import type {FormItemProps} from "@/types/form";
import {onMounted, ref} from "vue";
import {useForm} from "@/hooks/use-form";
import {FORM_ITEM_EMIT_NAME} from "@/constants";

defineOptions({name: 'SchemaCascader'})

interface Props extends FormItemProps {
  value?: Array<string | number | boolean>
}

const props = withDefaults(defineProps<Props>(), {
  labelKey: 'label',
  valueKey: 'value',
  value: () => ([])
})

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
  <el-cascader
      v-else
      v-model="internalModel"
      :options="options"
      :props="props"
      @change="handleChange"
  >
    <template #empty v-if="props?.itemProps?.emptySlot">
      <slot :name="props.itemProps.emptySlot"></slot>
    </template>
  </el-cascader>
</template>