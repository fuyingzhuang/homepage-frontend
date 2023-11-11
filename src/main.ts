import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import Antd from "ant-design-vue";
// 引入 icons-vue 组件库
import { createFromIconfontCN } from "@ant-design/icons-vue";
// 注册 iconfont
const MyIcon = createFromIconfontCN({
  scriptUrl: "//at.alicdn.com/t/font_1234567_abcd1234.js",
});

// 将 icon 注册为全局组件
createApp(App).component("MyIcon", MyIcon).use(Antd).use(router).mount("#app");
