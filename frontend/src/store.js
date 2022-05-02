import { createStore, compose, applyMiddleware, combineReducers } from 'redux';
import thunk from 'redux-thunk';
import { cartReducer } from './reducers/cartReducers';
import {
  applicationCreateReducer,
  applicationDeleteReducer,
  applicationDeliverReducer,
  applicationDetailsReducer,
  applicationListReducer,
  applicationMineListReducer,
  applicationPayReducer,
  applicationSummaryReducer,
} from './reducers/applicationReducers';
import {
  petSpeciesListReducer,
  petCreateReducer,
  petDeleteReducer,
  petDetailsReducer,
  petListReducer,
  petReviewCreateReducer,
  petUpdateReducer,
} from './reducers/petReducers';
import {
  userAddressMapReducer,
  userDeleteReducer,
  userDetailsReducer,
  userListReducer,
  userRegisterReducer,
  userSigninReducer,
  userTopshelterListReducer,
  userUpdateProfileReducer,
  userUpdateReducer,
} from './reducers/userReducers';

const initialState = {
  userSignin: {
    userInfo: localStorage.getItem('userInfo')
      ? JSON.parse(localStorage.getItem('userInfo'))
      : null,
  },
  cart: {
    cartItems: localStorage.getItem('cartItems')
      ? JSON.parse(localStorage.getItem('cartItems'))
      : [],
    applicantAddress: localStorage.getItem('applicantAddress')
      ? JSON.parse(localStorage.getItem('applicantAddress'))
      : {},
    paymentMethod: 'Cash',
  },
};
const reducer = combineReducers({
  petList: petListReducer,
  petDetails: petDetailsReducer,
  cart: cartReducer,
  userSignin: userSigninReducer,
  userRegister: userRegisterReducer,
  applicationCreate: applicationCreateReducer,
  applicationDetails: applicationDetailsReducer,
  applicationPay: applicationPayReducer,
  applicationMineList: applicationMineListReducer,
  userDetails: userDetailsReducer,
  userUpdateProfile: userUpdateProfileReducer,
  userUpdate: userUpdateReducer,
  petCreate: petCreateReducer,
  petUpdate: petUpdateReducer,
  petDelete: petDeleteReducer,
  applicationList: applicationListReducer,
  applicationDelete: applicationDeleteReducer,
  applicationDeliver: applicationDeliverReducer,
  userList: userListReducer,
  userDelete: userDeleteReducer,
  userTopsheltersList: userTopshelterListReducer,
  petSpeciesList: petSpeciesListReducer,
  petReviewCreate: petReviewCreateReducer,
  userAddressMap: userAddressMapReducer,
  applicationSummary: applicationSummaryReducer,
});

const store = createStore(
  reducer,
  initialState,
  applyMiddleware(thunk)
);

export default store;
