import { mapToArray } from "@/common/util";

export const filterToolbarMap = {
  SEARCH: {
    icon: "el-icon-search",
    type: "primary",
    text: "搜索",
    action: "SEARCH",
  },
  CANCEL: {
    text: "清空",
    action: "CANCEL",
  },
  CREATE: {
    text: "创建",
    action: "CREATE",
  },
  EDIT: {
    text: "编辑",
    action: "EDIT",
  },
  DELETE: {
    text: "删除",
    confirm: true,
    action: "DELETE",
  },
};

export const filterToolbarArray = mapToArray(filterToolbarMap);
