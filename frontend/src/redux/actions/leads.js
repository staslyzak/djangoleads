import API from "@api";
import TYPES from "./types";
import { errorHandler, enqueueSnackbar, closeSnackbar } from "./notifications";
import { renderUndoAction } from "@components/Notifier";
import { tokenConfig } from "./auth";

export const undoDelete = id => ({
  type: TYPES.leads.UNDO_DELETE,
  payload: id
});

export const getLeads = () => (dispatch, getState) => {
  // setTimeout(() =>
  API.leads
    .getLeads(tokenConfig(getState))
    .then(res => {
      dispatch({ type: TYPES.leads.GET_LEADS, payload: res.data });
    })
    .catch(err => {
      dispatch({ type: TYPES.leads.LEADS_ERROR });
      dispatch(errorHandler(err.response.data));
    });
  // , 3000)
};

export const deleteLead = id => (dispatch, getState) => {
  dispatch(undoDelete(id));
  dispatch(
    enqueueSnackbar("Are You sure?", {
      variant: "error",
      autoHideDuration: 3000,
      action: key =>
        renderUndoAction(() => {
          clearTimeout(timer);
          dispatch(undoDelete(id));
          dispatch(closeSnackbar(key));
        })
    })
  );

  const timer = setTimeout(() => {
    API.leads
      .deleteLead(id, tokenConfig(getState))
      .then(() => {
        dispatch({ type: TYPES.leads.DELETE_LEAD, payload: id });
      })
      .then(() => {
        dispatch(
          enqueueSnackbar("Successfully Deleted", { variant: "success" })
        );
      })
      .catch(err => {
        dispatch(errorHandler(err.response.data));
      });
  }, 3000);
};

export const postLead = data => (dispatch, getState) => {
  API.leads
    .createLead(data, tokenConfig(getState))
    .then(res => {
      dispatch({ type: TYPES.leads.POST_LEAD, payload: res.data });
    })
    .then(() => {
      dispatch(enqueueSnackbar("Successfully Added", { variant: "success" }));
    })
    .catch(err => {
      dispatch(errorHandler(err.response.data));
    });
};
