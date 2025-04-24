<script setup lang="ts">
import {computed, reactive, ref} from "vue";
import {ElMessage} from "element-plus";
import {DisplayMode, FormElemType} from "@/enums";
import SchemaForm from '@/components/form/schema-form.vue';
import type {FormConfig, FormItemConfig} from "@/types/schema.js";

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
  name: '格子惊蛰版', // 姓名
  gender: 1, // 性别
  age: 23, // 年龄
  subjectType: '', // 学科倾向
  scoreInput: true, // 成绩录入
  chineseScore: 130, // 语文成绩
  mathScore: 140, // 数学成绩
  englishScore: 20, // 英语成绩
  rate: 4, // 自我评分
  color: '#89d961', // 喜欢的颜色
})

const formItems = computed<FormItemConfig[]>(() => {
  return [
    {
      component: FormElemType.INPUT,
      label: '姓名',
      name: 'name'
    },
    {
      component: FormElemType.RADIO,
      label: '性别',
      name: 'gender',
      required: true,
      options: [{value: 1, label: '男'}, {value: 2, label: '女'}],
      mode: DisplayMode.EDIT,
    },
    {
      component: FormElemType.DATE_PICKER,
      label: '出生年月',
      name: 'birthday',
      required: true,
      props: {
        valueFormat: 'YYYY-MM-DD'
      },
      mode: ({formData}: any) => {
        return formData.age != 23 ? DisplayMode.VIEW : DisplayMode.EDIT
      }
    },
    {
      component: FormElemType.INPUT,
      label: '年龄',
      name: 'age',
      format({value}) {
        return `${value}岁`
      },
      mode: DisplayMode.VIEW,
    },
    {
      component: FormElemType.RADIO,
      label: '学科倾向',
      name: 'subjectType',
      required: true,
      options: [{value: 0, label: '文科'}, {value: 1, label: '理科'}],
      change: async function (params) {
        const {loadOptions} = params
        // 重新加载一次爱好的选项数据
        loadOptions('hobby')
      },
    },
    {
      component: FormElemType.CHECKBOX,
      label: '爱好',
      name: 'hobby',
      required: true,
      visible: ({formData}: any) => {
        // 当前选择了学科倾向后才会显示爱好
        return formData.subjectType ?? false
      },
      options: ({formData}: any) => {
        // 选择文科：政治、历史、地理
        // 选择理科：物理、化学、生物
        const subjects = [
          {value: 0, label: '政治', type: 0},
          {value: 1, label: '历史', type: 0},
          {value: 2, label: '地理', type: 0},
          {value: 3, label: '物理', type: 1},
          {value: 4, label: '化学', type: 1},
          {value: 5, label: '生物', type: 1}
        ]
        return subjects.filter(item => item.type === formData.subjectType)
      },
    },
    {
      component: FormElemType.SELECT,
      label: '政治面貌',
      name: 'politicalOutlook',
      labelKey: 'name',
      required: true,
      valueKey: 'value',
      remoteOptions: () => {
        return getPoliticalOutlooks()
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
      label: '成绩录入',
      name: 'scoreInput',
    },
    {
      component: FormElemType.SLIDER,
      label: '语文成绩',
      name: 'chineseScore',
      visible: ({formData}: any) => formData.scoreInput,
      props: {
        max: 150
      }
    },
    {
      component: FormElemType.SLIDER,
      label: '数学成绩',
      name: 'mathScore',
      visible: ({formData}: any) => formData.scoreInput,
      props: {
        max: 150
      }
    },
    {
      component: FormElemType.SLIDER,
      label: '英语成绩',
      name: 'englishScore',
      visible: ({formData}: any) => formData.scoreInput,
      props: {
        max: 100
      }
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
      component: FormElemType.COLOR_PICKER,
      label: '喜欢的颜色',
      name: 'color',
      mode: ({formData}: any) => {
        return formData.age != 23 ? DisplayMode.VIEW : DisplayMode.EDIT
      }
    },
    {
      component: FormElemType.RATE,
      label: '自我评分',
      name: 'rate',
      mode: DisplayMode.EDIT,
    },
  ]
})

const spriteFormsRef = ref()

/**提交表单*/
const submitForm = () => {
  spriteFormsRef.value.validate().then(() => {
    ElMessage.success('操作成功')
  }).catch((error: any) => {
    console.log('error=>', error)
    ElMessage.warning('请填写必填信息')
  })
}

/**表单填写值改变时触发*/
const onFormChange = (data: any) => {
  console.log(data)
}

/**重置表单*/
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
      @change="onFormChange"
  >
    <template #StudentInput="{scope}">
      <StudentInput v-bind="scope" :name="scope.name" v-model="formState.studentInfo"/>
    </template>
    <div class="action">
      <el-button @click="restForm">重 置</el-button>
      <el-button type="primary" @click="submitForm">提 交</el-button>
    </div>
  </SchemaForm>
</template>

<style scoped>
.action {
  text-align: center;
}
</style>