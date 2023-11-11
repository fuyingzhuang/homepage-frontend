<template>
  <div id="header">
    <a-menu
      v-model:selectedKeys="selectedKeys"
      theme="light"
      mode="horizontal"
      :style="{ lineHeight: '64px' }"
    >
      <a-menu-item key="1"> <HomeOutlined />&nbsp;&nbsp; 个人主页 </a-menu-item>
      <a-menu-item key="2">
        <ScheduleOutlined />&nbsp;&nbsp;教育背景
      </a-menu-item>
      <a-sub-menu key="3" title="技能专长">
        <a-menu-item key="3-1">
          <DesktopOutlined />&nbsp;&nbsp;前端
        </a-menu-item>
        <a-menu-item key="3-2">
          <CloudServerOutlined />&nbsp;&nbsp;后端
        </a-menu-item>
      </a-sub-menu>
      <a-menu-item key="4">
        <ProjectOutlined />&nbsp;&nbsp;个人项目
      </a-menu-item>
      <a-menu-item key="5"> <CodeOutlined />&nbsp;&nbsp;工作经历 </a-menu-item>
      <a-menu-item key="6">
        <FormOutlined />&nbsp;&nbsp;博客或文章
      </a-menu-item>
    </a-menu>
  </div>
</template>

<script setup lang="ts">
const selectedKeys = ref<string[]>(["2"]);
import { ref } from "vue";
const activeKey = ref("1");
import {
  HomeOutlined,
  ScheduleOutlined,
  ProjectOutlined,
  CodeOutlined,
  FormOutlined,
  DesktopOutlined,
  CloudServerOutlined,
} from "@ant-design/icons-vue";
</script>

<style scoped></style>
