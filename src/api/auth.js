import request from "@/common/request";
export const login = data =>
  request({
    url: "/login",
    method: "post",
    data,
  });
