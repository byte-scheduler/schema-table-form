<script setup lang="ts">
import {onMounted, reactive} from 'vue'
import BasicForm from '../../pages/basic-form/index.vue'
import BasicTable from '../../pages/basic-table/index.vue'

const menuList = reactive([
  {
    title: '表单 Schema Form',
    children: [
      {
        title: '基础使用',
        component: BasicForm
      },
      {
        title: '字段联动',
      }
    ]
  },
  {
    title: '表格 Schema Table',
    children: [
      {
        title: '基础使用',
        component: BasicTable
      },
      {
        title: '字段联动',
      }
    ]
  },
  {
    title: 'Table & Form',
    children: [
      {
        title: '基础使用',
      },
      {
        title: '字段联动',
      }
    ]
  },
])

const emit = defineEmits(['select'])

const handleSelect = (data: Record<string, any>) => {
  emit('select', data)
}

onMounted(() => {
  emit('select', {
    title: '基础使用',
    component: BasicForm
  },)
})
</script>

<template>
  <el-aside width="240px" class="sidebar-container">
    <el-menu
        active-text-color="#ffd04b"
        background-color="#545c64"
        default-active="0-0"
        :default-openeds="['0']"
        text-color="#fff"
    >
      <el-sub-menu v-for="(menu, m) in menuList" :index="`${m}`">
        <template #title>
          <span>{{ menu.title }}</span>
        </template>
        <el-menu-item @click="handleSelect(option)" v-for="(option, n) in menu.children" :index="`${m}-${n}`">
          {{ option.title }}
        </el-menu-item>
      </el-sub-menu>
    </el-menu>
  </el-aside>
</template>

<style scoped>
.sidebar-container {
  height: 100vh;
}

.sidebar-container .el-menu {
  height: 100%;
}
</style>