import { isObject, isEmpty } from "lodash";

export const isNegative = data => {
  return isObject(data) ? !isEmpty(data) : !!data;
};

export const randomString = () => {
  let str = Math.random()
    .toString(36)
    .slice(2);
  for (let i = 0; i < 3; i++) {
    str += Math.random()
      .toString(36)
      .slice(2);
  }
  return str;
};
