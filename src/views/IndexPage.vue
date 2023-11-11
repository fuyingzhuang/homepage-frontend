<template>
  <a-layout>
    <a-layout-header style="display: flex">
      <img class="header-logo" src="../assets/img/logo.png" />
      <a-menu
        v-model:selectedKeys="selectedKeys"
        theme="light"
        mode="horizontal"
        class="header-menu"
      >
        <!--        <a-menu-item key="/" @click="toHomePage">主页</a-menu-item>-->
        <a-menu-item key="/education" @click="toEducationPage"
          >教育背景
        </a-menu-item>
        <a-menu-item key="/skill" @click="toSkillPage">技能专长</a-menu-item>
        <a-menu-item key="/project" @click="toProjectPage">项目</a-menu-item>
        <a-menu-item key="/work" @click="toWorkPage">工作经历</a-menu-item>
      </a-menu>
      <div class="search-container">
        <a-input-search
          v-if="showSearch"
          v-model:value="value"
          placeholder="全局搜索"
          enter-button
          style="width: 320px"
          @search="onSearch"
        />
      </div>
      <div>
        <a-button type="primary">后台网站</a-button>
      </div>
    </a-layout-header>
    <a-layout-content :style="{ padding: '0 50px', marginTop: '32px' }">
      <div :style="{ background: '#fff', padding: '24px', minHeight: '380px' }">
        <router-view />
      </div>
    </a-layout-content>
    <a-layout-footer>
      <AppFooter />
    </a-layout-footer>
    <a-float-button
      tooltip="下载简历"
      @click="downloadNote"
      :style="{
        right: '24px',
        bottom: '80px',
      }"
    ></a-float-button>
    <a-float-button
      tooltip="添加微信"
      @click="addWeChat"
      :style="{
        right: '24px',
        bottom: '130px',
      }"
    >
      <template #icon>
        <CommentOutlined />
      </template>
    </a-float-button>
  </a-layout>

  <a-modal
    v-model:open="open"
    title="微信二维码"
    @ok="handleOk"
    ok-text="确定"
    cancel-text="取消"
    width="250px"
  >
    <img :width="200" src="../assets/img/Wechat.jpg" />
  </a-modal>
</template>
<script lang="ts" setup>
// 引入AppFooter组件
import AppFooter from "@/components/AppFooter.vue";
// 引入图标
import { CommentOutlined } from "@ant-design/icons-vue";
// 引入路由
import { useRouter } from "vue-router";

const router = useRouter();
const value = ref<string>("");
// 获取当前页面的路由
const currentRoute = router.currentRoute.value.path;
// 将当前的页面路由和菜单的key进行绑定 从而实现如果用户刷新页面的话，菜单依然会选中
const selectedKeys = ref<string[]>([currentRoute]);
// 定义一个变量来控制搜索框是否显示
const showSearch = ref<boolean>(true);

// 时刻关注当前页面的路由
router.afterEach((to) => {
  selectedKeys.value = [to.path];
  // console.log(selectedKeys.value);
  //  如果当前的路由为 /search 的话，就不显示搜索框
  if (to.path.includes("/search")) {
    showSearch.value = false;
  } else {
    showSearch.value = true;
  }
});

// 微信二维码弹窗
const open = ref<boolean>(false);

function handleOk() {
  open.value = false;
}

const onSearch = (searchValue: string) => {
  router.push({ path: "/search/skill", query: { searchValue } });
  value.value = "";
};
import { ref } from "vue";

// function toHomePage() {
//   router.push({ path: "home" });
// }

function toEducationPage() {
  router.push({ path: "/education" });
}

function toSkillPage() {
  router.push({ path: "/skill" });
}

function toProjectPage() {
  router.push({ path: "/project" });
}

function toWorkPage() {
  router.push({ path: "/work" });
}

function downloadNote() {
  alert("下载简历");
}

function addWeChat() {
  open.value = true;
}
</script>
<style scoped>
#components-layout-demo-fixed .logo {
  width: 120px;
  height: 31px;
  background: rgba(255, 255, 255, 0.2);
  margin: 16px 24px 16px 0;
  float: left;
}

.site-layout .site-layout-background {
  background: #fff;
}

[data-theme="dark"] .site-layout .site-layout-background {
  background: #141414;
}

:where(.css-dev-only-do-not-override-185kyl0).ant-layout .ant-layout-header {
  height: 64px;
  padding-inline: 50px;
  color: rgba(0, 0, 0, 0.88);
  line-height: 64px;
  background: #ffffff;
}

.search-container {
  display: flex;
  justify-content: center; /* 水平居中 */
  align-items: center; /* 垂直居中 */
  width: 30%;
}

.header-logo {
  width: 200px;
  height: 64px;
}

.header-menu {
  margin-left: 20px;
  line-height: 64px;
  width: 60%;
}
</style>
