import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { ListPets } from '../actions/petActions';
import { detailsUser } from '../actions/userActions';
import LoadingBox from '../components/LoadingBox';
import MessageBox from '../components/MessageBox';
import pet from '../components/Pet';
import Rating from '../components/Rating';

const ShelterScreen =(props) => {
  const shelterId = props.match.params.id;
  const userDetails = useSelector((state) => state.userDetails);
  const { loading, error, user } = userDetails;

  const petList = useSelector((state) => state.petList);
  const {
    loading: loadingpets,
    error: errorpets,
    pets,
  } = petList;

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(detailsUser(shelterId));
    dispatch(ListPets({ shelter: shelterId }));
  }, [dispatch, shelterId]);
  return (
    <div className="row top">
      <div className="col-1">
        {loading ? (
          <LoadingBox></LoadingBox>
        ) : error ? (
          <MessageBox variant="danger">{error}</MessageBox>
        ) : (
          <ul className="card card-body text-white bg-primary">
            <li>
              <div className="row start">
                <div>
                  <img
                    className="small"
                    src={user.shelter.logo}
                    alt={user.shelter.name}
                  ></img>
                </div>
                <div>
                  <h1>{user.shelter.name}</h1>
                </div>
              </div>
            </li>
            <li>
              <Rating
                rating={user.shelter.rating}
                numReviews={user.shelter.numReviews}
              ></Rating>
            </li>
            <li>{user.shelter.description}</li>
          </ul>
        )}
      </div>
      <div className="col-3">
        {loadingpets ? (
          <LoadingBox></LoadingBox>
        ) : errorpets ? (
          <MessageBox variant="danger">{errorpets}</MessageBox>
        ) : (
          <>
            {pets.length === 0 && <MessageBox>No pet Found</MessageBox>}
            <div className="row center">
              {pets.map((pet) => (
                <pet key={pet._id} pet={pet}></pet>
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  );
}
export default ShelterScreen;