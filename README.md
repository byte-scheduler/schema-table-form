# 安装 SchemaFormTable

```vue
npm install schema-form-table
```

# 使用 SchemaFormTable

>介绍：SchemaFormTable 分为全局引入和按需引入，是一款基于 Vue3 与 TypeScript 的声明式动态表单、表格组件，通过简洁的 JavaScript 对象配置，快速实现复杂业务场景的表单字段联动（显隐、禁用、类型切换）与数据表格渲染。无缝集成 Element Plus 设计规范，支持插槽深度自定义，助力开发者告别重复代码。

## 全局引入

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

## 按需引入（SchemaForm）

在需要使用 SchemaFormTable 的组件中引入 SchemaForm

```html
<script setup lang="ts">
  import {reactive, ref} from "vue"
  import {SchemaForm, FormElemType} from 'schema-table-form'
  import type {FormItemConfig} from "schema-table-form"

  const formState = reactive<Record<string, any>>({
    name: '格子惊蛰版',
    gender: 1
  })

  const formItems = ref<FormItemConfig[]>([
    {
      component: FormElemType.INPUT,
      label: '姓名',
      name: 'name',
    },
    {
      component: FormElemType.RADIO,
      label: '性别',
      name: 'gender',
      options: [{value: 1, label: '男'}, {value: 2, label: '女'}],
    }
  ])
</script>

<template>
  <SchemaForm
      :form-items="formItems"
      v-model:model="formState"
  />
</template>
```

## 按需引入（SchemaTable）

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