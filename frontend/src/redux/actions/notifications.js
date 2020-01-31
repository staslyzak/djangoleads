import TYPES from "./types";
import { randomString } from "@utils";

export const enqueueSnackbar = (message, options) => {
  console.log(message);
  return {
    type: TYPES.notifications.ENQUEUE_SNACKBAR,
    notification: {
      message,
      options,
      key: randomString()
    }
  };
};

export const closeSnackbar = key => ({
  type: TYPES.notifications.CLOSE_SNACKBAR,
  dismissAll: !key, // dismiss all if no key has been defined
  key
});

export const removeSnackbar = key => ({
  type: TYPES.notifications.REMOVE_SNACKBAR,
  key
});

export const errorHandler = errors => dispatch => {
  for (let key in errors) {
    if (Array.isArray(errors[key])) {
      errors[key].forEach(error => {
        dispatch(enqueueSnackbar(error, { variant: "error" }));
      });
    } else {
      dispatch(enqueueSnackbar(errors[key], { variant: "error" }));
    }
  }
};
