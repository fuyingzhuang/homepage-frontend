import httpRequest from "@/plugins/myAxios";

// 获取项目列表
export function getProjectListApi(data: any) {
  return httpRequest({
    url: "/homepage/projects/list",
    method: "post",
    data: data,
  });
}
// 查看项目详情
export function getProjectDetailApi(id: any) {
  return httpRequest({
    url: "/homepage/projects/get",
    method: "get",
    params: id,
  });
}
