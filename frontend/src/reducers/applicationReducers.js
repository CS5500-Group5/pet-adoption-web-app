import {
  APPLICATION_CREATE_FAIL,
  APPLICATION_CREATE_REQUEST,
  APPLICATION_CREATE_RESET,
  APPLICATION_CREATE_SUCCESS,
  APPLICATION_DETAILS_FAIL,
  APPLICATION_DETAILS_REQUEST,
  APPLICATION_DETAILS_SUCCESS,
  APPLICATION_MINE_LIST_FAIL,
  APPLICATION_MINE_LIST_REQUEST,
  APPLICATION_MINE_LIST_SUCCESS,
  APPLICATION_PAY_FAIL,
  APPLICATION_PAY_REQUEST,
  APPLICATION_PAY_RESET,
  APPLICATION_PAY_SUCCESS,
  APPLICATION_LIST_REQUEST,
  APPLICATION_LIST_SUCCESS,
  APPLICATION_LIST_FAIL,
  APPLICATION_DELETE_REQUEST,
  APPLICATION_DELETE_SUCCESS,
  APPLICATION_DELETE_FAIL,
  APPLICATION_DELETE_RESET,
  APPLICATION_APPROVE_REQUEST,
  APPLICATION_APPROVE_SUCCESS,
  APPLICATION_APPROVE_FAIL,
  APPLICATION_APPROVE_RESET,
  APPLICATION_SUMMARY_REQUEST,
  APPLICATION_SUMMARY_SUCCESS,
  APPLICATION_SUMMARY_FAIL,
} from '../constants/applicationConstants';

export const applicationCreateReducer = (state = {}, action) => {
  switch (action.type) {
    case APPLICATION_CREATE_REQUEST:
      return { loading: true };
    case APPLICATION_CREATE_SUCCESS:
      return { loading: false, success: true, application: action.payload };
    case APPLICATION_CREATE_FAIL:
      return { loading: false, error: action.payload };
    case APPLICATION_CREATE_RESET:
      return {};
    default:
      return state;
  }
};

export const applicationDetailsReducer = (state = { loading: true }, action) => {
  switch (action.type) {
    case APPLICATION_DETAILS_REQUEST:
      return { loading: true };
    case APPLICATION_DETAILS_SUCCESS:
      return { loading: false, application: action.payload };
    case APPLICATION_DETAILS_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const applicationPayReducer = (state = {}, action) => {
  switch (action.type) {
    case APPLICATION_PAY_REQUEST:
      return { loading: true };
    case APPLICATION_PAY_SUCCESS:
      return { loading: false, success: true };
    case APPLICATION_PAY_FAIL:
      return { loading: false, error: action.payload };
    case APPLICATION_PAY_RESET:
      return {};
    default:
      return state;
  }
};
export const applicationMineListReducer = (state = { applications: [] }, action) => {
  switch (action.type) {
    case APPLICATION_MINE_LIST_REQUEST:
      return { loading: true };
    case APPLICATION_MINE_LIST_SUCCESS:
      return { loading: false, applications: action.payload };
    case APPLICATION_MINE_LIST_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};
export const applicationListReducer = (state = { applications: [] }, action) => {
  switch (action.type) {
    case APPLICATION_LIST_REQUEST:
      return { loading: true };
    case APPLICATION_LIST_SUCCESS:
      return { loading: false, applications: action.payload };
    case APPLICATION_LIST_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};
export const applicationDeleteReducer = (state = {}, action) => {
  switch (action.type) {
    case APPLICATION_DELETE_REQUEST:
      return { loading: true };
    case APPLICATION_DELETE_SUCCESS:
      return { loading: false, success: true };
    case APPLICATION_DELETE_FAIL:
      return { loading: false, error: action.payload };
    case APPLICATION_DELETE_RESET:
      return {};
    default:
      return state;
  }
};

export const applicationDeliverReducer = (state = {}, action) => {
  switch (action.type) {
    case APPLICATION_APPROVE_REQUEST:
      return { loading: true };
    case APPLICATION_APPROVE_SUCCESS:
      return { loading: false, success: true};
    case APPLICATION_APPROVE_FAIL:
      return { loading: false, error: action.payload };
    case APPLICATION_APPROVE_RESET:
      return {};
    default:
      return state;
  }
};

export const applicationSummaryReducer = (
  state = { loading: true, summary: {} },
  action
) => {
  switch (action.type) {
    case APPLICATION_SUMMARY_REQUEST:
      return { loading: true };
    case APPLICATION_SUMMARY_SUCCESS:
      return { loading: false, summary: action.payload };
    case APPLICATION_SUMMARY_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};
