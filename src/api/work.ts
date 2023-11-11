import httpRequest from "@/plugins/myAxios";

// 获取工作经历信息
export function getWorkList() {
  return httpRequest({
    url: "/homepage/work/list",
    method: "get",
  });
}
