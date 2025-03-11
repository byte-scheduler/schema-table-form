### 安装 SchemaFormTable

```vue
npm install schema-form-table
```

### 使用 SchemaFormTable

*SchemaFormTable 分为全局引入和按需引入*
> 全局引入

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

> 按需引入

在需要使用 SchemaFormTable 的组件中引入

```javascript

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