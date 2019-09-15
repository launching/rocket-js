import request from "@/common/request";

export const getRoles = params =>
  request({
    url: "/roles",
    method: "get",
    params,
  });

export const getRole = (id, params) =>
  request({
    url: `/roles/${id}`,
    method: "get",
    params,
  });

export const createRole = data =>
  request({
    url: "/roles",
    method: "post",
    data,
  });

export const updateRole = (id, data) =>
  request({
    url: `/roles/${id}`,
    method: "put",
    data,
  });

export const deleteRole = id =>
  request({
    url: `/roles/${id}`,
    method: "delete",
  });
