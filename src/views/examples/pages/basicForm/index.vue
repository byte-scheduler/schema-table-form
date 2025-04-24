<script setup lang="ts">
import {reactive, ref} from "vue";

import type {FormConfig, FormItemConfig} from "@/types/schema.js";
import {ElMessage} from "element-plus";
import {DisplayMode, FormElemType} from "@/enums";
import SchemaForm from '@/components/form/schema-form.vue';
import {getAddressList, getPoliticalOutlooks} from "../../mock";
import StudentInput from "../../components/StudentInput.vue";

const formConfig = reactive<FormConfig>({
  layout: {
    gutter: 10
  },
  props: {
    labelWidth: 'auto'
  }
})

const formState = reactive<Record<string, any>>({
  name: '格子惊蛰版',
  willingness: 10,
  age: 23,
  gender: 1,
  rate: 2,
  studentInfo: '学生信息'
})

const formItems = ref<FormItemConfig[]>([
  {
    component: FormElemType.RADIO,
    label: '性别',
    name: 'gender',
    required: true,
    options: [{value: 1, label: '男'}, {value: 2, label: '女'}],
    mode: DisplayMode.VIEW,
  },
  {
    component: FormElemType.CHECKBOX,
    label: '爱好',
    name: 'hobby',
    required: true,
    options: [{value: 1, label: '语文'}, {value: 2, label: '数学'}, {value: 3, label: '物理'}],
    mode: ({formData}: any) => {
      return formData.age == 1 ? DisplayMode.VIEW : DisplayMode.EDIT
    },
  },
  {
    component: FormElemType.INPUT,
    label: '姓名',
    name: 'name',
    change() {

    },
    mode: DisplayMode.VIEW,
  },
  {
    component: ({formData}: any) => {
      return formData?.age == 1 ? FormElemType.INPUT_NUMBER : FormElemType.INPUT
    },
    label: '年龄',
    name: 'age',
    format({value}) {
      return `${value}岁`
    },
    mode: DisplayMode.EDIT,
    change: async function (params) {
      console.log('params=>', params)
      const {loadOptions, getPropsByField, getInstanceByField} = params
      const props = getPropsByField('politicalOutlook')
      console.log('props=>', props)
      const instance = getInstanceByField('politicalOutlook')
      console.log('instance=>', instance)
      const result = await loadOptions('politicalOutlook', {label: '@'})
      console.log('result=>', result)
    },
  },
  {
    component: FormElemType.SELECT,
    label: '政治面貌',
    name: 'politicalOutlook',
    labelKey: 'name',
    required: true,
    valueKey: 'value',
    remoteOptions: ({params}: any) => {
      return getPoliticalOutlooks({label: params?.label || '#'})
    }
  },
  {
    component: FormElemType.TREE_SELECT,
    label: '地址',
    name: 'address',
    remoteOptions: getAddressList
  },
  {
    component: FormElemType.SWITCH,
    label: '是否通过',
    name: 'whetherPass',
  },
  {
    component: FormElemType.SLIDER,
    label: '意愿度',
    name: 'willingness',
  },
  {
    component: FormElemType.TIME_PICKER,
    label: '起床时间',
    name: 'wakeUpTime',
    mode: ({formData}: any) => {
      return formData.age != 23 ? DisplayMode.VIEW : DisplayMode.EDIT
    }
  },
  {
    component: FormElemType.DATE_PICKER,
    label: '出生年月',
    name: 'birthday',
    mode: ({formData}: any) => {
      return formData.age != 23 ? DisplayMode.VIEW : DisplayMode.EDIT
    }
  },
  {
    component: FormElemType.COLOR_PICKER,
    label: '喜欢的颜色',
    name: 'color',
    mode: ({formData}: any) => {
      return formData.age != 23 ? DisplayMode.VIEW : DisplayMode.EDIT
    }
  },
  {
    component: FormElemType.RATE,
    label: '评价',
    name: 'rate',
    mode: DisplayMode.VIEW,
  },
  {
    slot: 'StudentInput',
    label: "学生录入",
    name: 'studentInfo',
    mode: ({formData}: any) => {
      return formData.age != 23 ? DisplayMode.VIEW : DisplayMode.EDIT
    }
  }
])

const spriteFormsRef = ref()
const submitForm = () => {
  spriteFormsRef.value.validate().then(() => {
    ElMessage.success('操作成功')
  }).catch((error: any) => {
    console.log('error=>', error)
    ElMessage.warning('请填写必填信息')
  })
}

const change = (data: any) => {
  console.log(data)
}

const restForm = () => {
  spriteFormsRef.value.resetFields()
}
</script>

<template>
  <SchemaForm
      ref="spriteFormsRef"
      :config="formConfig"
      :form-items="formItems"
      v-model:model="formState"
      @change="change"
  >
    <template #StudentInput="{scope}">
      <StudentInput v-bind="scope" :name="scope.name" v-model="formState.studentInfo"/>
    </template>
    <div class="action">
      <el-button type="primary" @click="restForm">重 置</el-button>
      <el-button type="primary" @click="submitForm">提 交</el-button>
    </div>
  </SchemaForm>
</template>