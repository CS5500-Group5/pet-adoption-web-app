import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { addToCart, removeFromCart } from "../actions/cartActions";
import MessageBox from "../components/MessageBox";

const CartScreen = (props) => {
  const petId = props.match.params.id;
  const qty = props.location.search
    ? Number(props.location.search.split("=")[1])
    : 1;
  const cart = useSelector((state) => state.cart);
  const { cartItems, error } = cart;
  const dispatch = useDispatch();
  useEffect(() => {
    if (petId) {
      dispatch(addToCart(petId, qty));
    }
  }, [dispatch, petId, qty]);

  const removeFromCartHandler = (id) => {
    // delete action
    dispatch(removeFromCart(id));
  };

  const checkoutHandler = () => {
    props.history.push("/signin?redirect=contact");
  };
  return (
    <div className="row top">
      <div className="col-2">
        <h1>Your Interests of pets for adoption:</h1>
        {error && <MessageBox variant="danger">{error}</MessageBox>}
        {cartItems.length === 0 ? (
          <MessageBox variant={"warning"}>
            Cart is empty. <Link to="/">Go Browsing</Link>
          </MessageBox>
        ) : (
          <ul>
            <li className="row mt-5">
              <div className="col-6">Pet Information</div>
              <div className="col-4">Shelter Name</div>
              {/* <div className="col-2-original float-center">Item Total</div> */}
            </li>

            {cartItems.map((item) => (
              <li key={item.pet}>
                <div className="row mt-5">
                  <div className="col-1-original">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="img-fluid img-round-corner"
                    />
                  </div>
                  <div className="col-5 float-left">
                    <Link to={`/pet/${item.pet}`}>{item.name}</Link>
                    
                  </div>

                  <div className="col-2-original">
                    {item.shelter.shelter.name}
                    
                  </div>

                  <div className="col-2-original">
                    <button
                      type="button"
                      className="delete float-left btn-lg"
                      onClick={() => removeFromCartHandler(item.pet)}
                    >
                      Delete
                    </button>
                  </div>

                  {/* <div className="col-2-original float-center">
                    ${item.price * item.qty}
                  </div> */}
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
      <div className="row">
        <div className="card-checkout card-body">
          <ul>
            <li>
              <h2 className="fw-bold">
                Confirm and Submit Your Application:
              </h2>
            </li>
            <li>
              <button
                type="button"
                onClick={checkoutHandler}
                className="checkout block font-color-white"
                disabled={cartItems.length === 0}
              >
                Submit
              </button>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default CartScreen;
