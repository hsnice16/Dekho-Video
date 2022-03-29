import {
  ACTION_TYPE_CHECK_WATCH_LATER,
  ACTION_TYPE_TOGGLE_MODAL,
} from "reducer";

export const modalReducer = (state, action) => {
  switch (action.type) {
    case ACTION_TYPE_TOGGLE_MODAL:
      return {
        ...state,
        showModal: !state.showModal,
        video: action.payload,
      };

    case ACTION_TYPE_CHECK_WATCH_LATER:
      return { ...state, watchLater: action.payload };

    default:
      return state;
  }
};
