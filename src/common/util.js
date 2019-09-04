import _ from "lodash";
export function mapToArray(data, name = "id") {
  return Object.keys(data).map(key => {
    return {
      ...data[key],
      [name]: key,
    };
  });
}
