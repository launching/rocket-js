import request from "@/common/request";

export const getGroups = params =>
  request({
    url: "/groups",
    method: "get",
    params,
  });

export const getGroup = (id, params) =>
  request({
    url: `/groups/${id}`,
    method: "get",
    params,
  });

export const createGroup = data =>
  request({
    url: "/groups",
    method: "post",
    data,
  });

export const updateGroup = (id, data) =>
  request({
    url: `/groups/${id}`,
    method: "put",
    data,
  }); 

export const deleteGroup = id =>
  request({
    url: `/groups/${id}`,
    method: "delete",
  });
