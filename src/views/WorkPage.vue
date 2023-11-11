<template>
  <a-watermark content="付英壮">
    <div id="word-page" style="width: 100%; min-height: 640px">
      <div style="background-color: #ececec; padding: 20px">
        <a-row :gutter="16">
          <a-col :span="12">
            <a-card :title="companyA.companyName">
              <template #extra>
                <span
                  >{{ getYearMonth(companyA.startDate) }}-----{{
                    getYearMonth(companyA.endDate)
                  }}</span
                >
              </template>
              <h3>职位:&nbsp;{{ companyA.positionName }}</h3>
              <p>工作描述:&nbsp;{{ companyA.jobDescription }}</p>
            </a-card>
          </a-col>
          <a-col :span="12">
            <a-card :title="companyB.companyName">
              <template #extra>
                <span
                  >{{ getYearMonth(companyB.startDate) }}-----{{
                    getYearMonth(companyB.endDate)
                  }}</span
                >
              </template>
              <h3>职位:&nbsp;{{ companyB.positionName }}</h3>
              <p>工作描述:&nbsp;{{ companyB.jobDescription }}</p>
            </a-card>
          </a-col>
        </a-row>
      </div>
    </div>
  </a-watermark>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { getWorkList } from "@/api/work";

// 定义一个数组 用来存放数据
const workList = ref([]);

const companyA = ref({
  experienceId: "",
  companyName: "",
  positionName: "",
  startDate: "",
  endDate: "",
  jobDescription: "",
});

const companyB = ref({
  experienceId: "",
  companyName: "",
  positionName: "",
  startDate: "",
  endDate: "",
  jobDescription: "",
});

// 定义一个方法 用来获取数据
async function getWork() {
  const res = await getWorkList();
  workList.value = res.data;
  companyA.value.experienceId = res.data[0].experienceId;
  companyA.value.companyName = res.data[0].companyName;
  companyA.value.positionName = res.data[0].positionName;
  companyA.value.startDate = res.data[0].startDate;
  companyA.value.endDate = res.data[0].endDate;
  companyA.value.jobDescription = res.data[0].jobDescription;
  companyB.value.experienceId = res.data[1].experienceId;
  companyB.value.companyName = res.data[1].companyName;
  companyB.value.positionName = res.data[1].positionName;
  companyB.value.startDate = res.data[1].startDate;
  companyB.value.endDate = res.data[1].endDate;
  companyB.value.jobDescription = res.data[1].jobDescription;
}

function getYearMonth(date: string) {
  const formattedDate = new Date(date);
  const year = formattedDate.getFullYear();
  const month = formattedDate.getMonth() + 1;
  return `${year}年${month}月`;
}

// 页面加载时调用获取数据的方法
getWork();
</script>

<style scoped></style>
