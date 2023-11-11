import httpRequest from "@/plugins/myAxios";

// 获取教育信息
export function getSkillList() {
  return httpRequest({
    url: "/homepage/skills/list",
    method: "get",
  });
}
