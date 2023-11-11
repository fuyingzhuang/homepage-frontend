<template>
  <div>
    <a-list size="small" bordered :data-source="skillList.records">
      <template #renderItem="{ item }">
        <a-list-item>{{ item.description }}</a-list-item>
      </template>
    </a-list>
  </div>
</template>

<script setup lang="ts">
import { ref, defineProps } from "vue";

const props = defineProps({
  skillList: {
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
