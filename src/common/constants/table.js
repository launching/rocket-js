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
};

export const filterToolbarArray = mapToArray(filterToolbarMap);
