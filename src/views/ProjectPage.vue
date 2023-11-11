<template>
  <a-watermark content="付英壮">
    <div id="project-page" style="width: 100%; min-height: 640px">
      <a-input-search
        v-model:value="queryParams.searchText"
        placeholder="请输入搜索内容"
        class="search-input"
        enter-button
        @search="onSearch"
      />
      <a-table
        :columns="columns"
        :data-source="projectList"
        :pagination="false"
      >
        <!--        <template #headerCell="{ column }"> </template>-->
        <template #bodyCell="{ column, record }">
          <template v-if="column.key === 'startDate'">
            {{ getYearMonth(record.startDate) }}
          </template>
          <template v-if="column.key === 'endDate'">
            {{ getYearMonth(record.endDate) }}
          </template>
          <template v-else-if="column.key === 'tags'">
            <span>
              <a-tag
                v-for="tag in record.technologies.split('、')"
                :key="tag"
                color="green"
              >
                {{ tag }}
              </a-tag>
            </span>
          </template>
          <template v-else-if="column.key === 'action'">
            <span style="margin-right: 10px">
              <a-tooltip title="查看详情">
                <a-button
                  shape="circle"
                  @click="getProjectInfo(record.projectId)"
                  :icon="h(SearchOutlined)"
                />
              </a-tooltip>
            </span>
            <span style="margin-right: 10px">
              <a-tooltip title="演示地址">
                <a-button
                  shape="circle"
                  @click="toOnline(record.onlineUrl)"
                  :icon="h(PaperClipOutlined)"
                />
              </a-tooltip>
            </span>
            <span style="margin-right: 10px">
              <a-tooltip title="仓库地址">
                <a-button
                  shape="circle"
                  @click="toGitHub(record.githubUrl)"
                  :icon="h(GithubOutlined)"
                />
              </a-tooltip>
            </span>
          </template>
          <template v-else-if="column.key === 'projectType'">
            <!--            如果 record.projectType的值为1 就显示一个个人标签 如果为1就显示一个公司标签-->
            <a-tag
              v-if="record.projectType === 0"
              color="success"
              style="margin-right: 10px"
            >
              个人
            </a-tag>
            <a-tag
              v-else-if="record.projectType === 1"
              color="green"
              style="margin-right: 10px"
            >
              公司
            </a-tag>
          </template>
        </template>
      </a-table>

      <a-pagination
        class="pagination"
        v-model:current="queryParams.current"
        :total="total"
      />
    </div>
    <!--    详情对话框-->
    <div>
      <a-modal
        v-model:open="open"
        width="80%"
        title="项目详情"
        @ok="handleOk"
        cancel-text="取消"
        ok-text="确定"
      >
        <a-collapse
          v-model:activeKey="activeKey"
          :bordered="false"
          style="background: rgb(255, 255, 255)"
        >
          <template #expandIcon="{ isActive }">
            <caret-right-outlined :rotate="isActive ? 90 : 0" />
          </template>
          <a-collapse-panel key="1" header="项目详情介绍" :style="customStyle">
            <p>{{ projectDetail.projectDetails }}</p>
          </a-collapse-panel>
          <a-collapse-panel key="2" header="项目亮点" :style="customStyle">
            <p>{{ projectDetail.projectHighlights }}</p>
          </a-collapse-panel>
        </a-collapse>
      </a-modal>
    </div>
  </a-watermark>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { getProjectListApi, getProjectDetailApi } from "@/api/project";
import {
  PaperClipOutlined,
  GithubOutlined,
  SearchOutlined,
  CaretRightOutlined,
} from "@ant-design/icons-vue";
import { h } from "vue";

const onSearch = (value: string) => getProjectList();
const current = ref(6);
// 定义一个请求参数
const queryParams = ref({
  current: 1,
  pageSize: 10,
  searchText: "",
});
// 定义一个列表用来存放项目列表
const projectList = ref([]);
const total = ref(0);
// 定义一个项目详情对象
const projectDetail = ref({
  projectId: "",
  projectName: "",
  startDate: "",
  endDate: "",
  technologies: "",
  projectDescription: "",
  projectDetails: "",
  projectHighlights: "",
  onlineUrl: "",
  githubUrl: "",
  projectType: "",
  sortOrder: "",
  isDeleted: "",
  createdAt: "",
  updatedAt: "",
});
// 定义一个变量用来控制详情对话框的显示和隐藏
const open = ref(false);

// 定义一个方法 用来处理详情对话框的显示和隐藏
function handleOk() {
  open.value = false;
}

const activeKey = ref(["1"]);
const customStyle =
  "background: #f7f7f7;border-radius: 4px;margin-bottom: 24px;border: 0;overflow: hidden";

// 定义一个方法 用来获取项目列表
function getProjectList() {
  getProjectListApi(queryParams.value).then((res) => {
    projectList.value = res.data.records;
    total.value = res.data.total;
  });
}

// 将日期转换为年月
function getYearMonth(date: string) {
  const formattedDate = new Date(date);
  const year = formattedDate.getFullYear();
  const month = formattedDate.getMonth() + 1;
  return `${year}年${month}月`;
}

const columns = [
  {
    title: "项目名称",
    dataIndex: "projectName",
    key: "projectName",
  },
  {
    title: "项目描述",
    dataIndex: "projectDescription",
    key: "projectDescription",
  },
  {
    title: "开始日期",
    dataIndex: "startDate",
    key: "startDate",
  },
  {
    title: "结束日期",
    dataIndex: "endDate",
    key: "endDate",
  },

  {
    title: "所用技术",
    key: "tags",
    dataIndex: "tags",
  },
  {
    title: "项目类型",
    key: "projectType",
    dataIndex: "projectType",
  },
  {
    title: "操作",
    key: "action",
  },
];

// 定义一个方法 用来获取项目详情
function getProjectInfo(projectId: any) {
  getProjectDetailApi({ id: projectId }).then((res) => {
    projectDetail.value.projectId = res.data.projectId;
    projectDetail.value.projectName = res.data.projectName;
    projectDetail.value.startDate = res.data.startDate;
    projectDetail.value.endDate = res.data.endDate;
    projectDetail.value.technologies = res.data.technologies;
    projectDetail.value.projectDescription = res.data.projectDescription;
    projectDetail.value.projectDetails = res.data.projectDetails;
    projectDetail.value.projectHighlights = res.data.projectHighlights;
    projectDetail.value.onlineUrl = res.data.onlineUrl;
    projectDetail.value.githubUrl = res.data.githubUrl;
  });
  if (projectDetail.value.projectId) {
    open.value = true;
  }
}

// 定义一个方法 用来跳转到演示地址
function toOnline(onlineUrl: string) {
  console.log(onlineUrl);
  window.open("https://www.baidu.com");
}

// 定义一个方法 用来跳转到仓库地址
function toGitHub(githubUrl: string) {
  console.log(githubUrl);
  window.open("https://www.baidu.com");
}

// 页面初始化的时候调用一次 获取项目列表
getProjectList();
</script>

<style scoped>
.search-input {
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 0 auto 20px;
  width: 30%;
}

.pagination {
  margin-top: 20px;
  margin-left: 60%;
}
</style>
