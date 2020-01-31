import TYPES from "@actions/types";

const INITIAL_STATE = {
  token: localStorage.getItem("TOKEN"),
  isAuthenticated: false,
  isLoading: false,
  user: null
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case TYPES.auth.USER_LOAD_START:
      return {
        ...state,
        isLoading: true
      };
    case TYPES.auth.USER_LOAD_SUCCESS:
      return {
        ...state,
        isAuthenticated: true,
        isLoading: false,
        user: action.payload
      };
    case TYPES.auth.USER_LOAD_FAIL:
      localStorage.removeItem("TOKEN");
      return {
        ...INITIAL_STATE
      };
    case TYPES.auth.USER_LOGIN:
      localStorage.setItem("TOKEN", action.payload.token);
      return {
        ...state,
        isAuthenticated: true,
        isLoading: false,
        ...action.payload
      };
    case TYPES.auth.USER_REGISTER:
      localStorage.setItem("TOKEN", action.payload.token);
      return {
        ...state,
        isAuthenticated: true,
        isLoading: false,
        ...action.payload
      };
    case TYPES.auth.USER_LOGOUT:
      localStorage.removeItem("TOKEN");
      return {
        ...INITIAL_STATE
      };
    default:
      return { ...state };
  }
};
