import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { savePaymentMethod } from "../actions/cartActions";
import CheckoutSteps from "../components/CheckoutSteps";

const PaymentMethodScreen = (props) => {
  const cart = useSelector((state) => state.cart);
  console.log(cart);
  const { applicantAddress } = cart;
  if (!applicantAddress.address) {
    props.history.push("/contact");
  }
  const [paymentMethod, setPaymentMethod] = useState("Cash");
  const dispatch = useDispatch();
  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(savePaymentMethod(paymentMethod));
    props.history.push("/placeapplication");
  };
  return (
    <div>
      <CheckoutSteps step1 step2 step3></CheckoutSteps>
      <form className="form" onSubmit={submitHandler}>
        <div>
          <h1>Payment Method</h1>
        </div>
        <div>
          <div className="cart-item-bapplication p-2">
            <input
              type="radio"
              id="cash"
              value="Cash"
              name="paymentMethod"
              required
              checked
              onChange={(e) => setPaymentMethod(e.target.value)}
            ></input>
            <label className="ps-2" htmlFor="cash">
              Cash
            </label>
          </div>
        </div>

        <div>
          <img
            src={require("../images/adoption_fee.png")}
            className="img-fluid"
          />
        </div>
        <div>
          <label />
          <button className="checkout font-color-white" type="submit">
            Continue
          </button>
        </div>
      </form>
    </div>
  );
};

export default PaymentMethodScreen;
