import httpRequest from "@/plugins/myAxios";

// 获取教育信息
export function getSearchListApi(data: any) {
  return httpRequest({
    url: "/homepage/search/all",
    method: "post",
    data: data,
  });
}
