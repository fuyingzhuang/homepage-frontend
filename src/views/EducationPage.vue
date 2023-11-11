<template>
  <a-watermark content="付英壮">
    <div id="edu-page">
      <a-descriptions title="教育背景简介" bordered>
        <a-descriptions-item label="姓名">付英壮</a-descriptions-item>
        <a-descriptions-item label="性别">男</a-descriptions-item>
        <a-descriptions-item label="年龄">22</a-descriptions-item>
        <a-descriptions-item label="入学时间">{{
          getYearMonth(educationInfo.startDate)
        }}</a-descriptions-item>
        <a-descriptions-item label="毕业时间" :span="2">{{
          getYearMonth(educationInfo.endDate)
        }}</a-descriptions-item>
        <a-descriptions-item label="主要课程" :span="3">
          <div style="display: flex">
            <span
              v-for="(course, index) in educationInfo.courses.split('、')"
              :key="index"
            >
              <a-tag color="green" style="margin-right: 10px">{{
                course
              }}</a-tag>
            </span>
          </div>
        </a-descriptions-item>
        <a-descriptions-item label="自我评价">
          {{ educationInfo.description }}
        </a-descriptions-item>
      </a-descriptions>
    </div>
  </a-watermark>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { getEducationInfo } from "../api/education";
const educationInfo = ref<any>({
  id: 1,
  degree: "",
  major: "",
  school: "",
  courses: "",
  startDate: "",
  endDate: "",
  description: "",
  imgUrl: "",
  sortOrder: 0,
  isDeleted: false,
  createdAt: "",
  updatedAt: "",
});
getEducationInfo().then((res) => {
  educationInfo.value.ids = res.data.id;
  educationInfo.value.degree = res.data.degree;
  educationInfo.value.major = res.data.major;
  educationInfo.value.school = res.data.school;
  educationInfo.value.courses = res.data.courses;
  educationInfo.value.startDate = res.data.startDate;
  educationInfo.value.endDate = res.data.endDate;
  educationInfo.value.description = res.data.description;
  educationInfo.value.imgUrl = res.data.imgUrl;
});

function getYearMonth(date: string) {
  const formattedDate = new Date(date);
  const year = formattedDate.getFullYear();
  const month = formattedDate.getMonth() + 1;
  return `${year}年${month}月`;
}

// 页面初始化的时候 执行一次
getEducationInfo();
</script>

<style scoped>
#edu-page {
  min-height: 640px;
}
</style>
