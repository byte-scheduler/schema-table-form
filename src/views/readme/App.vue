<template>
  <div class="schema-table-form">
    <p>你好，欢迎使用 Schema Table Form</p>
    <p>通过 JavaScript 对象配置的形式快速实现表单与表格的创建。<br/>
      技术栈：Vue3、Vite、TypeScript、Element Plus。可以在表单填写时，实现表单字段之间的通信。<br/>
      能根据字段填写的情况，动态的修改某个字段的类型、是否隐藏、是否禁用、是否只读。可以通<br/>
      过插槽自定义表单组件。</p>
    <img src="/vite.svg" class="vite" alt="Vite"/>
    <div>
      本地调试：<code>npm run dev:example</code>
    </div>
    <p>
      <a href="https://gitee.com/byte-scheduler/schema-table-form" target="_blank">Git: schema-table-form</a>
    </p>
    <p>
      <a href="https://www.npmjs.com/package/schema-table-form" target="_blank">NPM: schema-table-form</a>
    </p>
  </div>
</template>
<style scoped>
.schema-table-form {
  text-align: center;
}

.schema-table-form .vite {
  height: 6em;
  padding: 1.5em;
  will-change: filter;
  transition: filter 300ms;
}

.schema-table-form .vite:hover {
  filter: drop-shadow(0 0 2em #646cffaa);
}
</style>