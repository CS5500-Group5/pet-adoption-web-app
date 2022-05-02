import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { saveApplicantAddress } from "../actions/cartActions";
import CheckoutSteps from "../components/CheckoutSteps";

export default function ApplicantAddressScreen(props) {
  const userSignin = useSelector((state) => state.userSignin);

  const { userInfo } = userSignin;
  const cart = useSelector((state) => state.cart);
  console.log(cart);
  const { applicantAddress } = cart;
  const [lat, setLat] = useState(applicantAddress.lat);
  const [lng, setLng] = useState(applicantAddress.lng);
  const userAddressMap = useSelector((state) => state.userAddressMap);
  const { address: addressMap } = userAddressMap;

  if (!userInfo) {
    props.history.push("/signin");
  }
  const [fullName, setFullName] = useState(applicantAddress.fullName);
  const [address, setAddress] = useState(applicantAddress.address);
  const [city, setCity] = useState(applicantAddress.city);
  const [state, setState] = useState(applicantAddress.state);
  const [postalCode, setPostalCode] = useState(applicantAddress.postalCode);
  const [country, setCountry] = useState(applicantAddress.country);
  const dispatch = useDispatch();
  console.log(address, city, postalCode);
  const submitHandler = (e) => {
    e.preventDefault();
    const newLat = addressMap ? addressMap.lat : lat;
    const newLng = addressMap ? addressMap.lng : lng;
    if (addressMap) {
      setLat(addressMap.lat);
      setLng(addressMap.lng);
    }
    let moveOn = true;

    if (moveOn) {
      dispatch(
        saveApplicantAddress({
          fullName,
          address,
          city,
          state,
          postalCode,
          country,
          lat: newLat,
          lng: newLng,
        })
      );
      props.history.push("/payment");
    }
  };
  const chooseOnMap = () => {
    dispatch(
      saveApplicantAddress({
        fullName,
        address,
        city,
        state,
        postalCode,
        country,
        lat,
        lng,
      })
    );
    props.history.push("/map");
  };

  return (
    <div>
      <CheckoutSteps step1 step2 />
      <form className="form" onSubmit={submitHandler}>
        <div>
          <h1>Contact Address</h1>
        </div>
        <div>
          <label htmlFor="fullName">Full Name</label>
          <input
            type="text"
            id="fullName"
            placeholder="Enter Full Name"
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
            required
          />
        </div>
        <div>
          <label htmlFor="address">Address</label>
          <input
            type="text"
            id="address"
            placeholder="Enter Address"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            required
          />
        </div>
        <div>
          <label htmlFor="city">City</label>
          <input
            type="text"
            id="city"
            placeholder="Enter City"
            value={city}
            onChange={(e) => setCity(e.target.value)}
            required
          />
        </div>
        <div>
          <label htmlFor="state">State</label>
          <input
            type="text"
            id="state"
            placeholder="Enter State"
            value={state}
            onChange={(e) => setState(e.target.value)}
            required
          />
        </div>
        <div>
          <label htmlFor="postalCode">Postal Code</label>
          <input
            type="text"
            id="postalCode"
            placeholder="Enter Postal Code"
            value={postalCode}
            onChange={(e) => setPostalCode(e.target.value)}
            required
          />
        </div>
        <div>
          <label htmlFor="country">Country</label>
          <input
            type="text"
            id="country"
            placeholder="Enter Country"
            value={country}
            onChange={(e) => setCountry(e.target.value)}
            required
          />
        </div>
        <div>
          <button
            type="button"
            onClick={chooseOnMap}
            className="btn btn-warning btn-lg"
          >
            or Choose On Map
          </button>
        </div>
        <div>
          <label />
          <button className="btn btn-primary btn-lg" type="submit">
            Continue
          </button>
        </div>
      </form>
    </div>
  );
}
