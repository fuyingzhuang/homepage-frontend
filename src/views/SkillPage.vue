<template>
  <a-watermark content="付英壮">
    <div id="skill-page">
      <a-list item-layout="horizontal" :data-source="skillList">
        <template #renderItem="{ item }">
          <a-list-item>
            <a-list-item-meta>
              <template #description>
                <!--              遍历 item.name-->
                <span
                  v-for="(skillTag, index) in item.name.split('、')"
                  :key="index"
                >
                  <a-tag color="green">{{ skillTag }}</a-tag>
                </span>
              </template>
              <template #title>
                {{ item.description }}
              </template>
            </a-list-item-meta>
          </a-list-item>
        </template>
      </a-list>
    </div>
  </a-watermark>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { getSkillList } from "@/api/skill";

// 定义一个数据用来存放列表数据
const skillList = ref([]);
function getSkillListData() {
  getSkillList().then((res) => {
    skillList.value = res.data;
  });
}

// 页面加载时获取列表数据
getSkillListData();
</script>

<style scoped>
#skill-page {
  padding: 0 100px;
  width: 100%;
  min-height: 640px;
}
</style>
