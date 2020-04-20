import request from "@/plugin/axios";

export function getChatList(params) {
  console.log("传入的参数", params);
  return request({
    url: "/admin/chat/",
    method: "get",
    params: params
  });
}

export function deleteChat(params) {
  console.log("传入的参数", params);
  return request({
    url: "/admin/chat/",
    method: "delete",
    data: params
  });
}
