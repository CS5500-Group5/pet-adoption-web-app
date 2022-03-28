import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { createReview, detailspet } from "../actions/petActions";
import LoadingBox from "../components/LoadingBox";
import MessageBox from "../components/MessageBox";
import Rating from "../components/Rating";
import { PET_REVIEW_CREATE_RESET } from "../constants/petConstants";

const PetScreen = (props) => {
  const dispatch = useDispatch();
  const petId = props.match.params.id;
  const [qty, setQty] = useState(1);
  const petDetails = useSelector((state) => state.petDetails);
  const { loading, error, pet } = petDetails;
  const userSignin = useSelector((state) => state.userSignin);
  const { userInfo } = userSignin;

  const petReviewCreate = useSelector((state) => state.petReviewCreate);
  const {
    loading: loadingReviewCreate,
    error: errorReviewCreate,
    success: successReviewCreate,
  } = petReviewCreate;

  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");

  useEffect(() => {
    if (successReviewCreate) {
      window.alert("Review Submitted Successfully");
      setRating("");
      setComment("");
      dispatch({ type: PET_REVIEW_CREATE_RESET });
    }
    dispatch(detailspet(petId));
  }, [dispatch, petId, successReviewCreate]);
  const addToCartHandler = () => {
    props.history.push(`/cart/${petId}?qty=${qty}`);
  };
  const submitHandler = (e) => {
    e.preventDefault();
    if (comment && rating) {
      dispatch(
        createReview(petId, { rating, comment, name: userInfo.name })
      );
    } else {
      alert("Please enter comment and rating");
    }
  };
  return (
    <div>
      {loading ? (
        <LoadingBox></LoadingBox>
      ) : error ? (
        <MessageBox variant="danger">{error}</MessageBox>
      ) : (
        <div className="pet-content pet-wrap clearfix pet-deatil">
          <div className="align-left row">
            <div className="col-xs-12 col-sm-12 col-md-7 col-lg-7 col-xl-6">
              <div>
                <img
                  src={pet.image}
                  alt={pet.name}
                  className="prod-image img-thumbnail"
                />
              </div>
            </div>
            <br />

            <div className="col-xs-12 col-sm-12 col-md-5 col-lg-5 col-xl-6 ps-3">
              <h1 className="">
                <strong>{pet.name}</strong>
                <br />
                <small>
                  Shelter: &nbsp;&nbsp;
                  <Link to={`/shelter/${pet.shelter._id}`}>
                    {pet.shelter.shelter.name}
                  </Link>
                </small>
              </h1>
              <h2>
                
                {/* <Rating
                  rating={pet.rating}
                  numReviews={pet.numReviews}
                /> */}
              </h2>
              <hr />
              <h2 className="breed-container text-primary ps-2">
                Breed:&nbsp;
                {pet.breed}
                {/* <small>&nbsp;*includes tax</small> */}
              </h2>
              <h2 className="breed-container text-primary ps-2">
              Activity_level:&nbsp;
                {pet.activity_level}
                {/* <small>&nbsp;*includes tax</small> */}
              </h2>
              <h2 className="breed-container text-primary ps-2">
              Grooming requirement:&nbsp;
                {pet.grooming_requirement}
                {/* <small>&nbsp;*includes tax</small> */}
              </h2>
              <div className="certified ps-2">
                <ul>
                  <li>
                    <a>
                      Age<span>{pet.age}</span>
                    </a>
                  </li>
                  <li>
                    <a>
                      Gender
                      <span>
                        <div>
                          {pet.gender}
                        </div>
                      </span>
                    </a>
                  </li>
                  <li>
                    <a>
                      Color
                      <span>
                        <div>
                          {pet.color}
                        </div>
                      </span>
                    </a>
                  </li>
                  <li>
                    <a>
                      Weight
                      <span>
                        <div>
                          {pet.weight}
                        </div>
                      </span>
                    </a>
                  </li>
                </ul>
              </div>
              <hr />
              <div className="description description-tabs">
                <h2 class="text-primary">
                  <strong>Pet Description</strong>
                </h2>
                <p className="middle-size">{pet.description}</p>
              </div>
              <hr />
              <h2 className="text-primary ps-2">I want to adopt this cutie:</h2>
              <span>
                &nbsp;&nbsp;
                <a
                  className="btn btn-primary btn-lg mt-0"
                  onClick={addToCartHandler}
                >
                  Add to my aoption application <i className="fa fa-heart"></i>
                </a>
              </span>
            </div>
          </div>
          <br />
          <hr />
          <div className="ps-1">
            <h1 id="reviews">
              <strong>Reviews</strong>
            </h1>
            {pet.reviews.length === 0 && (
              <MessageBox variant={"warning"}>There is no review</MessageBox>
            )}
            <ul>
              {pet.reviews.map((review) => (
                <li key={review._id}>
                  <strong>{review.name}</strong>
                  <Rating rating={review.rating} caption=" " />
                  <p>{review.createdAt.substring(0, 10)}</p>
                  <p>{review.comment}</p>
                </li>
              ))}
              <hr />
              <br />
              <li>
                {userInfo ? (
                  <form className="form" onSubmit={submitHandler}>
                    <div>
                      <h1 className="text-primary">Write a customer review</h1>
                    </div>
                    <div>
                      <label htmlFor="rating">Rating</label>
                      <select
                        id="rating"
                        value={rating}
                        onChange={(e) => setRating(e.target.value)}
                      >
                        <option value="">Select...</option>
                        <option value="1">1- Poor</option>
                        <option value="2">2- Fair</option>
                        <option value="3">3- Good</option>
                        <option value="4">4- Very good</option>
                        <option value="5">5- Excelent</option>
                      </select>
                    </div>
                    <div>
                      <label htmlFor="comment">Comment</label>
                      <textarea
                        id="comment"
                        value={comment}
                        onChange={(e) => setComment(e.target.value)}
                      />
                    </div>
                    <div>
                      <label />
                      <button className="btn btn-primary btn-lg" type="submit">
                        Submit
                      </button>
                    </div>
                    <div>
                      {loadingReviewCreate && <LoadingBox></LoadingBox>}
                      {errorReviewCreate && (
                        <MessageBox variant="warning">
                          {errorReviewCreate}
                        </MessageBox>
                      )}
                    </div>
                  </form>
                ) : (
                  <MessageBox>
                    Please <Link to="/signin">Sign In</Link> to write a review
                  </MessageBox>
                )}
              </li>
            </ul>
          </div>
        </div>
      )}
    </div>
  );
};
export default PetScreen;
