import { combineReducers } from "redux";
import auth from "./auth";
import leads from "./leads";
import notifications from "./notifications";

export default combineReducers({
  auth,
  leads,
  notifications
});
