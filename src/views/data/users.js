import { mapToArray } from "@/common/util";
import { roles } from "./roles";

export const users = {
  1: {
    name: "admin",
    role: roles.admin,
  },
  2: {
    name: "张三",
    role: roles.client,
  },
  3: {
    name: "李四",
    role: roles.admin,
  },
};

export default mapToArray(users);
