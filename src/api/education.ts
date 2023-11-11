import httpRequest from "@/plugins/myAxios";

// 获取教育信息
export function getEducationInfo() {
  return httpRequest({
    url: "/homepage/education/info",
    method: "get",
  });
}
