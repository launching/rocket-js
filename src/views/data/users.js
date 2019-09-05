import { mapToArray } from "@/common/util";
import { roles } from "./roles";

export const users = {
  1: {
    name: "admin",
    role: roles.admin.name,
  },
  2: {
    name: "张三",
    role: roles.client.name,
  },
  3: {
    name: "李四",
    role: roles.admin.name,
  },
};

export default mapToArray(users);
