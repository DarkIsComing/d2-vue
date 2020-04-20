import request from "@/plugin/axios";

export function getCarList(params) {
  console.log("传入的参数", params);
  return request({
    url: "/admin/car/",
    method: "get",
    params: params
  });
}

export function deleteCar(params) {
  console.log("传入的参数", params);
  return request({
    url: "/admin/car/",
    method: "delete",
    data: params
  });
}

export function getCarDetail(params) {
  console.log("传入的参数", params);
  return request({
    url: "/admin/user/idcard/detail/",
    method: "get",
    params: params
  });
}
