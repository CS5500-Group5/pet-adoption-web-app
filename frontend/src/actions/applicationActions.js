import Axios from 'axios';
import { CART_EMPTY } from '../constants/cartConstants';
import {
  APPLICATION_CREATE_FAIL,
  APPLICATION_CREATE_REQUEST,
  APPLICATION_CREATE_SUCCESS,
  APPLICATION_DETAILS_FAIL,
  APPLICATION_DETAILS_REQUEST,
  APPLICATION_DETAILS_SUCCESS,
  APPLICATION_PAY_REQUEST,
  APPLICATION_PAY_FAIL,
  APPLICATION_PAY_SUCCESS,
  APPLICATION_MINE_LIST_REQUEST,
  APPLICATION_MINE_LIST_FAIL,
  APPLICATION_MINE_LIST_SUCCESS,
  APPLICATION_LIST_REQUEST,
  APPLICATION_LIST_SUCCESS,
  APPLICATION_LIST_FAIL,
  APPLICATION_DELETE_REQUEST,
  APPLICATION_DELETE_SUCCESS,
  APPLICATION_DELETE_FAIL,
  APPLICATION_APPROVE_REQUEST,
  APPLICATION_APPROVE_SUCCESS,
  APPLICATION_APPROVE_FAIL,
  APPLICATION_SUMMARY_REQUEST,
  APPLICATION_SUMMARY_SUCCESS,
} from '../constants/applicationConstants';

export const createApplication = (application) => async (dispatch, getState) => {
  dispatch({ type: APPLICATION_CREATE_REQUEST, payload: application });
  try {
    const {
      userSignin: { userInfo },
    } = getState();
    const { data } = await Axios.post('/api/applications', application, {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    });
    dispatch({ type: APPLICATION_CREATE_SUCCESS, payload: data.application });
    dispatch({ type: CART_EMPTY });
    localStorage.removeItem('cartItems');
  } catch (error) {
    dispatch({
      type: APPLICATION_CREATE_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const detailsApplication = (applicationId) => async (dispatch, getState) => {
  dispatch({ type: APPLICATION_DETAILS_REQUEST, payload: applicationId });
  const {
    userSignin: { userInfo },
  } = getState();
  try {
    const { data } = await Axios.get(`/api/applications/${applicationId}`, {
      headers: { Authorization: `Bearer ${userInfo.token}` },
    });
    dispatch({ type: APPLICATION_DETAILS_SUCCESS, payload: data });
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;
    dispatch({ type: APPLICATION_DETAILS_FAIL, payload: message });
  }
};

export const payApplication = (application, paymentResult) => async (
  dispatch,
  getState
) => {
  dispatch({ type: APPLICATION_PAY_REQUEST, payload: { application, paymentResult } });
  const {
    userSignin: { userInfo },
  } = getState();
  try {
    const { data } = Axios.put(`/api/applications/${application._id}/pay`, paymentResult, {
      headers: { Authorization: `Bearer ${userInfo.token}` },
    });
    dispatch({ type: APPLICATION_PAY_SUCCESS, payload: data });
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;
    dispatch({ type: APPLICATION_PAY_FAIL, payload: message });
  }
};
export const listApplicationMine = () => async (dispatch, getState) => {
  dispatch({ type: APPLICATION_MINE_LIST_REQUEST });
  const {
    userSignin: { userInfo },
  } = getState();
  try {
    const { data } = await Axios.get('/api/applications/mine', {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    });
    dispatch({ type: APPLICATION_MINE_LIST_SUCCESS, payload: data });
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;
    dispatch({ type: APPLICATION_MINE_LIST_FAIL, payload: message });
  }
};
export const listApplications = ({ shelter = '' }) => async (dispatch, getState) => {
  dispatch({ type: APPLICATION_LIST_REQUEST });
  const {
    userSignin: { userInfo },
  } = getState();
  try {
    const { data } = await Axios.get(`/api/applications?shelter=${shelter}`, {
      headers: { Authorization: `Bearer ${userInfo.token}` },
    });
    console.log(data);
    dispatch({ type: APPLICATION_LIST_SUCCESS, payload: data });
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;
    dispatch({ type: APPLICATION_LIST_FAIL, payload: message });
  }
};
export const deleteApplication = (applicationId) => async (dispatch, getState) => {
  dispatch({ type: APPLICATION_DELETE_REQUEST, payload: applicationId });
  const {
    userSignin: { userInfo },
  } = getState();
  try {
    const { data } = Axios.delete(`/api/applications/${applicationId}`, {
      headers: { Authorization: `Bearer ${userInfo.token}` },
    });
    dispatch({ type: APPLICATION_DELETE_SUCCESS, payload: data });
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;
    dispatch({ type: APPLICATION_DELETE_FAIL, payload: message });
  }
};

export const approveApplication = (applicationId) => async (dispatch, getState) => {
  dispatch({ type: APPLICATION_APPROVE_REQUEST, payload: applicationId });
  const {
    userSignin: { userInfo },
  } = getState();
  try {
    const { data } = Axios.put(
      `/api/applications/${applicationId}/approve`,
      {},
      {
        headers: { Authorization: `Bearer ${userInfo.token}` },
      }
    );
    dispatch({ type: APPLICATION_APPROVE_SUCCESS, payload: data });
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;
    dispatch({ type: APPLICATION_APPROVE_FAIL, payload: message });
  }
};

export const summaryApplication = () => async (dispatch, getState) => {
  dispatch({ type: APPLICATION_SUMMARY_REQUEST });
  const {
    userSignin: { userInfo },
  } = getState();
  try {
    const { data } = await Axios.get('/api/applications/summary', {
      headers: { Authorization: `Bearer ${userInfo.token}` },
    });
    dispatch({ type: APPLICATION_SUMMARY_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: APPLICATION_CREATE_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};
