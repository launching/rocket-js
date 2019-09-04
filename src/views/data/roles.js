import { mapToArray } from "@/common/util";
export const roles = {
  admin: {
    name: "admin",
  },
  client: {
    name: "client",
  },
};

export default mapToArray(roles);
