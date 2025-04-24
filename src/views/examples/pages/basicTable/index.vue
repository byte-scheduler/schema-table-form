<script setup lang="ts">
import {reactive, ref} from "vue";
import {type ColumnItem, type TableConfig} from  "@/types/schema.js";
import SchemaTable from '@/components/table/schema-table.vue';
import {FormElemType} from "@/enums";

import {ElMessage} from "element-plus";
import {getPoliticalOutlooks} from "../../mock";

const columns = reactive<ColumnItem[]>([
  {
    name: 'name',
    label: '姓名',
    component: FormElemType.INPUT
  },
  {
    name: 'age',
    label: '年龄',
    required: true,
    component: FormElemType.INPUT_NUMBER
  },
  {
    name: 'gender',
    label: '性别',
    component: ({row}: any) => {
      return row.age < 10 ? FormElemType.SELECT : FormElemType.RADIO
    },
    options: [{value: 1, label: '男'}, {value: 2, label: '女'}],
    change: async (params) => {
      const {getPropsByField, loadOptions} = params
      const props = getPropsByField('name')
      if (props) {
        props.label = '学生姓名'
      }
      const result = await loadOptions({
        targetField: 'politicalOutlook',
        params: {
          label: '%'
        },
      })
      console.log('result=>', result)
      console.log('props=>', props)
      console.log(params)
    }
  },
  {
    component: ({row}: any) => {
      return row.age > 10 ? FormElemType.SELECT : FormElemType.RADIO
    },
    label: '政治面貌',
    name: 'politicalOutlook',
    labelKey: 'name',
    valueKey: 'value',
    required: true,
    remoteOptions: () => {
      return getPoliticalOutlooks()
    }
  },
])

const data = reactive([
  {name: '格子', age: 18, gender: 1},
  {name: '格子大暑版', age: 20, gender: 2},
  {name: '格子惊蛰版', age: 20, gender: 1}
])

const config = reactive<TableConfig>({
  tableProps: {
    border: true,
  },
  appendSlot: 'append'
})

const spriteTableRef = ref()
const submitForm = () => {
  spriteTableRef.value.validate().then((params: any) => {
    console.log('params', params)
    ElMessage.success('操作成功')
  }).catch((error: any) => {
    console.log('error=>', error)
    ElMessage.warning('请填写必填信息')
  })
}

const restForm = () => {
  spriteTableRef.value.resetFields()
}

const change = (data: any) => {
  console.log('SpriteTableChange=>', data)
}
</script>

<template>
  <SchemaTable ref="spriteTableRef" @change="change" :config="config" :columns="columns" :data="data">
    <el-button type="primary" @click="submitForm">提 交</el-button>
    <el-button type="primary" @click="restForm">重置表单</el-button>
  </SchemaTable>
</template>