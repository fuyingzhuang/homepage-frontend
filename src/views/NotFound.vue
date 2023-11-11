<template>
  <a-watermark content="付英壮">
    <div id="404">
      <a-result
        status="404"
        title="404"
        sub-title="Sorry, the page you visited does not exist."
      >
        <template #extra>
          <a-button type="primary" @click="toHomePage">Back Home</a-button>
        </template>
      </a-result>
    </div>
  </a-watermark>
</template>
<script setup lang="ts">
import { useRouter } from "vue-router";
const router = useRouter();
function toHomePage() {
  router.push("/");
}
</script>
