import request from "@/plugin/axios";

export function getChatRoomList(params) {
  console.log("传入的参数", params);
  return request({
    url: "/admin/chatroom/",
    method: "get",
    params: params
  });
}

export function deleteChatRoom(params) {
  console.log("传入的参数", params);
  return request({
    url: "/admin/chatroom/",
    method: "delete",
    data: params
  });
}
