<script setup lang="ts">
import {computed, reactive, ref} from "vue";
import {type ColumnItem, type TableConfig} from "@/types/schema.js";
import SchemaTable from '@/components/table/schema-table.vue';
import {FormElemType} from "@/enums";
import {Plus} from '@element-plus/icons-vue'
import {ElMessage} from "element-plus";
import {getPoliticalOutlooks} from "../../mock";

const columns = computed<ColumnItem[]>(() => {
  return [
    {
      name: 'name',
      label: '姓名',
      component: FormElemType.INPUT
    },
    {
      name: 'age',
      label: '年龄',
      required: true,
      component: FormElemType.INPUT_NUMBER,
      props: {
        controlsPosition: 'right',
      }
    },
    {
      name: 'gender',
      label: '性别',
      component: FormElemType.SELECT,
      options: [{value: 1, label: '男'}, {value: 2, label: '女'}],
    },
    {
      name: 'subjectType',
      label: '学科倾向',
      component: FormElemType.RADIO,
      required: true,
      options: [{value: 0, label: '文科'}, {value: 1, label: '理科'}],
      change: async function (params) {
        const {loadOptions} = params
        // 重新加载一次爱好的选项数据
        loadOptions({
          targetField: 'hobby'
        })
      },
    },
    {
      name: 'hobby',
      label: '爱好',
      component: FormElemType.CHECKBOX,
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
      props: {
        width: 240,
      }
    },
    {
      component: FormElemType.SELECT,
      label: '政治面貌',
      name: 'politicalOutlook',
      labelKey: 'name',
      valueKey: 'value',
      required: true,
      remoteOptions: () => {
        return getPoliticalOutlooks()
      }
    },
    {
      label: "操作",
      name: "",
      customSlot: "action",
      props: {
        width: 100
      }
    }
  ]
})

const tableData = reactive([
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

/**提交表单*/
const submitForm = () => {
  spriteTableRef.value.validate().then((params: any) => {
    console.log('params', params)
    ElMessage.success('操作成功')
  }).catch((error: any) => {
    console.log('error=>', error)
    ElMessage.warning('请填写必填信息')
  })
}

/**重置表单*/
const restForm = () => {
  spriteTableRef.value.resetFields()
}

/**表单填写值改变时触发*/
const change = (data: any) => {
  console.log('SpriteTableChange=>', data)
}

/**新增数据*/
const add = () => {
  tableData.push({} as any)
}

/**删除数据*/
const handleDel = (data: any) => {
  console.log(data)
  tableData.splice(data.scope.$index, 1)
}
</script>

<template>
  <div class="header-action">
    <el-button @click="add" :icon="Plus" type="primary">
      新增
    </el-button>
  </div>
  <SchemaTable ref="spriteTableRef" @change="change" :config="config" :columns="columns" :data="tableData">
    <template #action="scope">
      <el-button type="danger" text @click="handleDel(scope)">删除</el-button>
    </template>
  </SchemaTable>
  <div class="footer-action">
    <el-button @click="restForm">重置表单</el-button>
    <el-button type="primary" @click="submitForm">提 交</el-button>
  </div>
</template>

<style>
.header-action {
  margin-bottom: 10px;
}

.footer-action {
  margin-top: 15px;
  text-align: right;
}
</style>