<template>
  <a-watermark content="付英壮">
    <div id="search-page" style="width: 100%; min-height: 640px">
      <a-input-search
        v-model:value="value"
        placeholder="请输入关键词"
        enter-button
        @search="onSearch"
        style="width: 30%; margin-left: 35%"
      />

      <div class="search-content">
        <a-tabs v-model:activeKey="activeKey" @change="handleTabChange">
          <a-tab-pane key="skill">
            <template #tab>
              <span>
                <DesktopOutlined />
                专业技能
              </span>
            </template>
            <SearchSkillPage :skillList="skillList" />
          </a-tab-pane>
          <a-tab-pane key="company">
            <template #tab>
              <span>
                <BankOutlined />
                公司项目
              </span>
            </template>
            <CompanyProjectPage :companyProjectList="companyProjectList" />
          </a-tab-pane>
          <a-tab-pane key="personal">
            <template #tab>
              <span>
                <UserOutlined />
                个人项目
              </span>
            </template>
            <PersonalProjectPage :personalProjectList="personalProjectList" />
          </a-tab-pane>
        </a-tabs>
      </div>
    </div>
  </a-watermark>
</template>

<script setup lang="ts">
import { ref, watchEffect } from "vue";
import {
  DesktopOutlined,
  UserOutlined,
  BankOutlined,
} from "@ant-design/icons-vue";
// 引入路由
import { useRoute, useRouter } from "vue-router";
import SearchSkillPage from "@/views/search/SearchSkillPage.vue";
import PersonalProjectPage from "@/views/search/PersonalProjectPage.vue";
import CompanyProjectPage from "@/views/search/CompanyProjectPage.vue";
import { getSearchListApi } from "@/api/search";
const router = useRouter();
const route = useRoute();
// 定义一个参数 用来存放当前tab页的key值

// 获取当前页面路由参数
const searchValue = router.currentRoute.value.query.searchValue;

const value = ref(searchValue as string);

function onSearch(searchValue: string) {
  router.push({ path: `/search/${activeKey.value}`, query: { searchValue } });
  handleTabChange(activeKey.value as string);
}

// 监听路由变化
// watchEffect(() => {
//   console.log(route);
// });

console.log(route.params.category);

// 定义一个请求参数对象
const queryParams = ref({
  searchText: "",
  searchType: "1",
  current: 1,
  pageSize: 10,
});
// 时刻关注当前页面的路由
router.afterEach((to) => {
  queryParams.value.searchText = to.query.searchValue as string;
  value.value = to.query.searchValue as string;
});

const activeKey = ref(route.params.category || "skill");
// 定义一个type类型 用来表示查询不同的数据 1：技能专长 2：公司项目 3：个人项目
const type = ref("1");
// 定义一个数据用来存放技能专长列表数据
const skillList = ref([]);
// 定义一个数据 用来存放个人项目列表数据
const personalProjectList = ref([]);
// 定义一个数据 用来存放公司项目列表数据
const companyProjectList = ref([]);
// 定义一个变量 用来存放总条数
const totalSize = ref(0);

function handleTabChange(key: string) {
  queryParams.value.searchText = value.value;
  router.push({ path: `/search/${key}`, query: { searchValue: value.value } });
  if (key === "skill") {
    queryParams.value.searchType = "1";
    getSkillListData();
  } else if (key === "company") {
    queryParams.value.searchType = "2";
    getCompanyProjectListData();
  } else if (key === "personal") {
    queryParams.value.searchType = "3";
    getPersonalProjectListData();
  }
}

function getSkillListData() {
  getSearchListApi(queryParams.value)
    .then((res) => {
      skillList.value = res.data;
    })
    .catch((err) => {
      // console.log(err);
    });
}

function getPersonalProjectListData() {
  getSearchListApi(queryParams.value)
    .then((res) => {
      personalProjectList.value = res.data;
    })
    .catch((err) => {
      // console.log(err);
    });
}

function getCompanyProjectListData() {
  getSearchListApi(queryParams.value)
    .then((res) => {
      companyProjectList.value = res.data;

      totalSize.value = res.data.total;
    })
    .catch((err) => {
      // console.log(err);
    });
}
function getInit() {
  queryParams.value.searchText = value.value;
  //  判断当前路由的key值
  if (activeKey.value === "skill") {
    queryParams.value.searchType = "1";
    getSkillListData();
  } else if (activeKey.value === "company") {
    queryParams.value.searchType = "2";
    getCompanyProjectListData();
  } else if (activeKey.value === "personal") {
    queryParams.value.searchType = "3";
    getPersonalProjectListData();
  }
}
// 页面初始化的时候 执行一次
getInit();
</script>

<style scoped>
.search-content {
  margin-top: 20px;
  width: 60%;
  margin-left: 20%;
}
</style>
