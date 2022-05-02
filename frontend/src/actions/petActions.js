import Axios from 'axios';
import {
  PET_CREATE_FAIL,
  PET_CREATE_REQUEST,
  PET_CREATE_SUCCESS,
  PET_DETAILS_FAIL,
  PET_DETAILS_REQUEST,
  PET_DETAILS_SUCCESS,
  PET_LIST_FAIL,
  PET_LIST_REQUEST,
  PET_LIST_SUCCESS,
  PET_UPDATE_REQUEST,
  PET_UPDATE_SUCCESS,
  PET_UPDATE_FAIL,
  PET_DELETE_REQUEST,
  PET_DELETE_FAIL,
  PET_DELETE_SUCCESS,
  PET_SPECIES_LIST_SUCCESS,
  PET_SPECIES_LIST_REQUEST,
  PET_SPECIES_LIST_FAIL,
  PET_REVIEW_CREATE_REQUEST,
  PET_REVIEW_CREATE_SUCCESS,
  PET_REVIEW_CREATE_FAIL,
} from '../constants/petConstants';

export const ListPets = ({
  pageNumber = '',
  shelter = '',
  name = '',
  species = '',
  application = '',
  min = 0,
  max = 0,
  rating = 0,
}) => async (dispatch) => {
  dispatch({
    type: PET_LIST_REQUEST,
  });
  try {
    const { data } = await Axios.get(
      `/api/pets?pageNumber=${pageNumber}&shelter=${shelter}&name=${name}&species=${species}&min=${min}&max=${max}&rating=${rating}&application=${application}`
    );
    dispatch({ type: PET_LIST_SUCCESS, payload: data });
  } catch (error) {
    dispatch({ type: PET_LIST_FAIL, payload: error.message });
  }
};

export const ListPetSpecies = () => async (dispatch) => {
  dispatch({
    type: PET_SPECIES_LIST_REQUEST,
  });
  try {
    const { data } = await Axios.get(`/api/pets/species`);
    dispatch({ type: PET_SPECIES_LIST_SUCCESS, payload: data });
  } catch (error) {
    dispatch({ type: PET_SPECIES_LIST_FAIL, payload: error.message });
  }
};

export const detailspet = (petId) => async (dispatch) => {
  dispatch({ type: PET_DETAILS_REQUEST, payload: petId });
  try {
    const { data } = await Axios.get(`/api/pets/${petId}`);
    dispatch({ type: PET_DETAILS_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: PET_DETAILS_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};
export const createpet = () => async (dispatch, getState) => {
  dispatch({ type: PET_CREATE_REQUEST });
  const {
    userSignin: { userInfo },
  } = getState();
  try {
    const { data } = await Axios.post(
      '/api/pets',
      {},
      {
        headers: { Authorization: `Bearer ${userInfo.token}` },
      }
    );
    dispatch({
      type: PET_CREATE_SUCCESS,
      payload: data.pet,
    });
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;
    dispatch({ type: PET_CREATE_FAIL, payload: message });
  }
};
export const updatepet = (pet) => async (dispatch, getState) => {
  dispatch({ type: PET_UPDATE_REQUEST, payload: pet });
  const {
    userSignin: { userInfo },
  } = getState();
  try {
    const { data } = await Axios.put(`/api/pets/${pet._id}`, pet, {
      headers: { Authorization: `Bearer ${userInfo.token}` },
    });
    dispatch({ type: PET_UPDATE_SUCCESS, payload: data });
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;
    dispatch({ type: PET_UPDATE_FAIL, error: message });
  }
};
export const deletepet = (petId) => async (dispatch, getState) => {
  dispatch({ type: PET_DELETE_REQUEST, payload: petId });
  const {
    userSignin: { userInfo },
  } = getState();
  try {
    const { data } = Axios.delete(`/api/pets/${petId}`, {
      headers: { Authorization: `Bearer ${userInfo.token}` },
    });
    dispatch({ type: PET_DELETE_SUCCESS });
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;
    dispatch({ type: PET_DELETE_FAIL, payload: message });
  }
};
export const createReview = (petId, review) => async (
  dispatch,
  getState
) => {
  dispatch({ type: PET_REVIEW_CREATE_REQUEST });
  const {
    userSignin: { userInfo },
  } = getState();
  try {
    const { data } = await Axios.post(
      `/api/pets/${petId}/reviews`,
      review,
      {
        headers: { Authorization: `Bearer ${userInfo.token}` },
      }
    );
    dispatch({
      type: PET_REVIEW_CREATE_SUCCESS,
      payload: data.review,
    });
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;
    dispatch({ type: PET_REVIEW_CREATE_FAIL, payload: message });
  }
};
