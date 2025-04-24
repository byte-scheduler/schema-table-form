# 安装 SchemaFormTable 🍀

```vue
npm install schema-form-table 
```

# 使用 SchemaFormTable 🍉

>介绍：SchemaFormTable 分为全局引入和按需引入，是一款基于 Vue3 与 TypeScript 的声明式动态表单、表格组件，通过简洁的 JavaScript 对象配置，快速实现复杂业务场景的表单字段联动（显隐、禁用、类型切换）与数据表格渲染。无缝集成 Element Plus 设计规范，支持插槽深度自定义，助力开发者告别重复代码。

## 全局引入 🍏

在 main.ts 中写入一下代码，因为 SchemaFormTable 的组件是基于 [element-plus](https://element-plus.org/zh-CN/) 开发的，所以在引入之前
element-plus 也必须引入。

```javascript
import {createApp} from 'vue'
import ElementPlus from 'element-plus'
import zhCn from 'element-plus/es/locale/lang/zh-cn'
import 'element-plus/dist/index.css'

import App from './App.vue'

import SchemaFormTable from 'schema-table-form'

const app = createApp(App)
app.use(ElementPlus, {
    locale: zhCn,
})

app.use(SchemaFormTable)
app.mount('#app')

```

## 按需引入（SchemaForm） 🍅

在需要使用 SchemaFormTable 的组件中引入 SchemaForm

```html
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

    /**体检表单*/
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
```

## 按需引入（SchemaTable）🍔

在需要使用 SchemaFormTable 的组件中引入 SchemaTable

```html
<script setup lang="ts">
  import {reactive} from "vue";
  import {ColumnItem} from "schema-table-form";
  import {FormElemType, SchemaTable} from "schema-table-form";

  const columns = reactive<ColumnItem[]>([
    {
      name: 'name',
      label: '姓名',
      component: FormElemType.INPUT
    },
    {
      name: 'age',
      label: '年龄',
      component: FormElemType.INPUT_NUMBER
    }
  ])

  const data = reactive([
    {name: '格子', age: 18},
    {name: '格子大暑版', age: 19},
    {name: '格子惊蛰版', age: 20}
  ])
</script>

<template>
  <SchemaTable
      ref="spriteTableRef"
      :columns="columns"
      :data="data"
  />
</template>
```

# 配置 SchemaForm ⛄
## FormConfig 🎋
| 属性名 | 类型 | 说明 | 默认值 | 必填 
| ---- | ---- |----|----|----|
| trigger | string | 表单触发时机 | change | 否  |
| rules | FormRules[] | 表单校验规则 | -  | 否  |
| layout | Record<string, any> | 表单布局配置（基于 ElRow & ElCol 组件实现） | -  | 否  |
| props | Record<string, any> | 表单属性用于 ElForm 组件 | - | 否 |
| emptyText | string | VIEW 模式下空值展示的文本（优先级小于字段属性定义）|-|否|
## FormItemConfig 🧸
| 属性名 | 类型                                           | 说明 | 默认值 | 必填 
| ---- |-------------|----|-----|----|
| name | string                                       |字段名| -   | 是  |
| label | string                                       |字段描述| -   | 否  |
| component | PropFunction<FormElemType \| string>         |字段组件|-|否|
| mode | PropFunction<string>                         |组件展示模式|-|否|
| visible | PropFunction<boolean>                        |组件隐藏|-|否|
| rules | PropFunction<FormRules>                      |字段校验（优先级最高）|-|否|
| required | PropFunction<boolean>                        |字段必填（简要必填配置方式）|-|否|
| options | PropFunction<Record<string, any>[]>          |所有选项类型组件的选项数据|-|否|
| remoteOptions | PropFunction<Promise<Record<string, any>[]>> |所有选项类型组件的远程选项数据|-|否|
| valueKey | string                                       |选项值字段|-|否|
| labelKey | string                                       |选项描述字段|-|否|
| slot | string                                       |字段插槽（插槽在 el-form-item 组件里面）|-|否|
| column | Record<string, any>                          |字段布局（el-col）|-|否|
| customSlot | string                                       |字段自定义插槽（插槽脱离 el-form-item 组件）|-|否|
| viewSlot | string                                       |VIEW 模式的插槽|-|否|
| labelSlot | string                                       |字段描述插槽|-|否|
| errorSlot | string                                       |段错误提示插槽|-|否|
| formItemProps | Record<string, any>                          |字段组件父组件配置（ el-form-item）|-|否|
| props | Record<string, any>                          |字段组件配置|-|否|
| itemProps | ItemProps                                    |字段组件配置子组件配置（比如下拉选择的 el-option、el-radio、el-checkbox 属性、插槽以及其他组件（el-input）的插槽）|-|否|
| change | (data: FormItemChangeParams) => void         |字段值改变时触发|-|否|
| format | (data: any) => any                           |仅在 VIEW 模式下格式化展示的文本|-|否|
| emptyText | string                                       |VIEW 模式下为 undefined、null 时展示的默认文本|-|否|
# 配置 SchemaTable 🎉
## TableConfig 🐠
| 属性名 | 类型 | 说明 | 默认值 | 必填 
| ---- | ---- |----|-|-|
| emptyText |string|空值展示的文本（优先级小于列配置定义）|-|否|
| formProps |Record<string, any>||-|否|
|  tableProps|Record<string, any>||-|否|
| defaultSlot |string||-|否|
| appendSlot |string||-|否|
| emptySlot |string||-|否|

## ColumnItem 🐸
| 属性名 | 类型           | 说明 | 默认值 | 必填   
| ---- |--------|----|----|------|
| name | string                                           |列字段名|-| 是    |
| label | string                                           |列字段描述|-| 否    |
| width | string                                         \| number|列宽|-| 否    |
| rules | PropFunction<FormRules>                          |字段校验（优先级最高）|-| 否    |
| customSlot | string                                           |字段自定义插槽（插槽脱离 el-form-item 组件）|-| 否    |
| slot | string                                           |字段插槽（插槽在 el-form-item 组件里面）|-| 否    |
| props | Record<string, any>                              |el-table-column 配置|-| 否    |
| formItemProps | Record<string, any>                              |字段组件父组件配置（ el-form-item）|-| 否    |
| component | PropFunction<FormElemType \| string          \| false> |单元格表单组件（如果返回 false 则不使用表单组件）|-| 否    |
| format | PropFunction<any>                                |格式化单元格的值|-| 否    |
| change | (data: CellChangeParams) => void                 |字段值改变时触发|-| 否    |
| options | PropFunction<Record<string, any>[]>              |所有选项类型组件的选项数据|-| 否    |
| remoteOptions | PropFunction<Promise<Record<string, any>[]>>     |所有选项类型组件的远程选项数据|-| 否    |
| valueKey | string                                           |选项值字段|-| 否    |
| labelKey | string                                           |选项描述字段|-| 否    |
| required | PropFunction<boolean>                            |字段必填（简要必填配置方式）|-| 否    |
| emptyText | string                                           |为 undefined、null 时展示的默认文本|-| 否    |