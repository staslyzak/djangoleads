import TYPES from "@actions/types";

const INITIAL_STATE = {
  leads: [],
  error: false,
  leadsToDelete: []
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case TYPES.leads.GET_LEADS:
      return {
        ...state,
        leads: action.payload,
        error: false
      };
    case TYPES.leads.DELETE_LEAD:
      return {
        ...state,
        leads: state.leads.filter(item => item.id !== action.payload),
        leadsToDelete: state.leadsToDelete.filter(id => id !== action.payload)
      };
    case TYPES.leads.UNDO_DELETE:
      let undoDeletes = [];
      if (state.leadsToDelete.includes(action.payload)) {
        undoDeletes = state.leadsToDelete.filter(id => id !== action.payload);
      } else {
        undoDeletes = [...state.leadsToDelete, action.payload];
      }
      return {
        ...state,
        leadsToDelete: undoDeletes
      };
    case TYPES.leads.LEADS_ERROR: {
      return {
        ...state,
        error: true
      };
    }
    case TYPES.leads.POST_LEAD:
      return {
        ...state,
        leads: [...state.leads, action.payload]
      };
    default:
      return { ...state };
  }
};
