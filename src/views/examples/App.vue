<template>
  <el-container>
    <el-container>
      <AsideMenu @select="handleSelect"/>
      <el-main class="main-container">
        <component :is="component"></component>
      </el-main>
    </el-container>
  </el-container>
</template>

<script setup lang="ts">
import {shallowRef} from 'vue'
import './style/base.css'
import AsideMenu from './components/AsideMenu/index.vue'

const component = shallowRef(null)
const handleSelect = (data: Record<string, any>) => {
  component.value = data.component
}
</script>
<style scoped>
.main-container {
  height: 100vh;
}
</style>