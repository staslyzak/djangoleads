import API from "@api";
import TYPES from "./types";
import { errorHandler, enqueueSnackbar } from "./notifications";

export const tokenConfig = getState => {
  const token = getState().auth.token;
  return {
    Authorization: `Token ${token}`
  };
};

export const loadUser = () => (dispatch, getState) => {
  const token = getState().auth.token;
  if (token) {
    dispatch({ type: TYPES.auth.USER_LOAD_START });

    try {
      const res = API.auth.loadUser(tokenConfig(getState));
      dispatch({ type: TYPES.auth.USER_LOAD_SUCCESS, payload: res.data });
      dispatch(enqueueSnackbar("Welcome Back!", { variant: "success" }));
    } catch (error) {
      dispatch({ type: TYPES.auth.USER_LOAD_FAIL });
      dispatch(errorHandler(error.response.data));
    }
  }
};

export const login = data => dispatch => {
  dispatch({ type: TYPES.auth.USER_LOAD_START });
  API.auth
    .login(data)
    .then(res => dispatch({ type: TYPES.auth.USER_LOGIN, payload: res.data }))
    .then(() =>
      dispatch(
        enqueueSnackbar("Successfully Loged In!", { variant: "success" })
      )
    )
    .catch(error => {
      dispatch({ type: TYPES.auth.USER_LOAD_FAIL });
      dispatch(errorHandler(error.response.data));
    });
};

export const register = data => dispatch => {
  dispatch({ type: TYPES.auth.USER_LOAD_START });
  API.auth
    .register(data)
    .then(res =>
      dispatch({ type: TYPES.auth.USER_REGISTER, payload: res.data })
    )
    .then(() =>
      dispatch(
        enqueueSnackbar("Successfully Registered!", { variant: "success" })
      )
    )
    .catch(error => {
      dispatch({ type: TYPES.auth.USER_LOAD_FAIL });
      dispatch(errorHandler(error.response.data));
    });
};

export const logout = () => (dispatch, getState) => {
  API.auth
    .logout(tokenConfig(getState))
    .then(() => dispatch({ type: TYPES.auth.USER_LOGOUT }));
};
