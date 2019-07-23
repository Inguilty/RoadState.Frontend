import {
  CREATE_BUG_REPORT_SUCCESS,
  CREATE_BUG_REPORT_REQUEST,
  CREATE_BUG_REPORT_FAILURE,
} from './actions';

const initialState = {
  isLoading: false,
  isFailed: false,
};
export default (state = initialState, action) => {
  switch (action.type) {
    case CREATE_BUG_REPORT_REQUEST:
      return { ...state, isLoading: true, isFailed: false };
    case CREATE_BUG_REPORT_SUCCESS:
      return { ...state, isLoading: false };
    case CREATE_BUG_REPORT_FAILURE:
      return { ...state, isLoading: false, isFailed: true };
    default:
      return state;
  }
};
