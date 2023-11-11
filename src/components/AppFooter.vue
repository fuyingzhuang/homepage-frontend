<template>
  <div id="footer">
    <div class="contact-info">
      <span class="phone"
        >&nbsp;&nbsp;<PhoneOutlined />&nbsp;&nbsp;手机号：15630147903&nbsp;&nbsp;</span
      >
      <span class="email"
        >&nbsp;&nbsp;
        <MailOutlined />&nbsp;&nbsp;邮箱：fyz15731966959@163.com&nbsp;&nbsp;</span
      >

      <span class="github"
        >&nbsp;&nbsp; <GithubOutlined />&nbsp;&nbsp; GitHub地址：<a
          href="https://github.com/fuyingzhuang"
          >https://github.com/fuyingzhuang&nbsp;&nbsp;</a
        ></span
      >
    </div>
    <div class="copyright">
      ©2023 版权所有，联系方式&nbsp;&nbsp;<a href="https://fuyz.tops">
        https://fuyz.top </a
      >&nbsp;&nbsp;提供
    </div>
  </div>
</template>

<script setup lang="ts">
import {
  GithubOutlined,
  MailOutlined,
  PhoneOutlined,
} from "@ant-design/icons-vue";
</script>

<style scoped>
/*固定在底部*/
#footer {
  position: fixed;
  bottom: 0px;
  width: 100%;
  height: 60px; /* footer的高度一定要和这个一样 */
  background-color: #f5f5f5;
  text-align: center;
  line-height: 60px; /* footer的高度一定要和这个一样 */
}
</style>
