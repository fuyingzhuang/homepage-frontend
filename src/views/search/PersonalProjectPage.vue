<template>
  <a-list item-layout="horizontal" :data-source="personalProjectList.records">
    <template #renderItem="{ item }">
      <a-list-item>
        <a-card :title="item.projectName" style="width: 1280px">
          <template #extra
            ><span
              >{{ getYearMonth(item.startDate) }} --
              {{ getYearMonth(item.endDate) }}</span
            ></template
          >
          <p>
            <strong>所用技术：</strong>
            <a-tag
              v-for="(tag, index) in item.technologies.split('、')"
              :key="index"
              color="green"
              style="margin-right: 10px"
              >{{ tag }}</a-tag
            >
          </p>
          <p><strong>项目描述：</strong>{{ item.projectDescription }}</p>
          <p><strong>项目详情：</strong>{{ item.projectDetails }}</p>
          <p><strong>项目亮点：</strong>{{ item.projectHighlights }}</p>
          <p>
            <strong>在线链接：</strong
            ><a :href="item.onlineUrl">{{ item.onlineUrl }}</a>
          </p>
          <p v-if="item.githubUrl">
            <strong>Github链接：</strong
            ><a :href="item.githubUrl">{{ item.githubUrl }}</a>
          </p>
        </a-card>
      </a-list-item>
    </template>
  </a-list>
  <a-pagination
    class="search-page"
    :current="personalProjectList.current"
    :total="personalProjectList.total"
  />
</template>

<script setup lang="ts">
import { defineProps } from "vue";

const props = defineProps({
  personalProjectList: {
    type: Array,
    required: true,
  },
});

function getYearMonth(date: string) {
  const formattedDate = new Date(date);
  const year = formattedDate.getFullYear();
  const month = formattedDate.getMonth() + 1;
  return `${year}年${month}月`;
}
</script>

<style scoped>
.search-page {
  margin-top: 20px;
  width: 40%;
  margin-left: 30%;
}
</style>
