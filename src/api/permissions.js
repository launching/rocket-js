import request from "@/common/request";

export const getPermissions = params =>
  request({
    url: "/permissions",
    method: "get",
    params,
  });

export const getPermission = (id, params) =>
  request({
    url: `/permissions/${id}`,
    method: "get",
    params,
  });

export const createPermission = data =>
  request({
    url: "/permissions",
    method: "post",
    data,
  });

export const updatePermission = (id, data) =>
  request({
    url: `/permissions/${id}`,
    method: "put",
    data,
  });

export const deletePermission = id =>
  request({
    url: `/permissions/${id}`,
    method: "delete",
  });
