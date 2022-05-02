import React, { useEffect } from "react";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import Pet from "../components/Pet";
import LoadingBox from "../components/LoadingBox";
import MessageBox from "../components/MessageBox";
import { useDispatch, useSelector } from "react-redux";
import { ListPets } from "../actions/petActions";
import { listTopshelters } from "../actions/userActions";
import { Link } from "react-router-dom";
import { Carousel } from "react-responsive-carousel";
import { Container, Nav, Navbar, NavDropdown } from "react-bootstrap";

const HomeScreen = () => {
  const dispatch = useDispatch();
  const petList = useSelector((state) => state.petList);
  const { loading, error, pets } = petList;
  const petSpeciesList = useSelector((state) => state.petSpeciesList);

  const {
    loading: loadingspecies,
    error: errorspecies,
    species,
  } = petSpeciesList;
  const userTopsheltersList = useSelector((state) => state.userTopsheltersList);
  const {
    loading: loadingshelters,
    error: errorshelters,
    users: shelters,
  } = userTopsheltersList;

  useEffect(() => {
    dispatch(ListPets({}));
    dispatch(listTopshelters());
  }, [dispatch]);
  return (
    <div>
      {loading ? (
        <LoadingBox />
      ) : error ? (
        <MessageBox variant="danger">{error}</MessageBox>
      ) : (
        <div className="row align-left">
          <div className="d-none d-sm-none d-md-block col-md-2">
            <div className="list-group-item active home-navi">
              <strong>Species</strong>
            </div>
            {loadingspecies ? (
              <LoadingBox />
            ) : errorspecies ? (
              <MessageBox variant="danger">{errorspecies}</MessageBox>
            ) : (
              species.map((c) => (
                <div key={c} className="list-group-item home-navi">
                  <Link to={`/search/species/${c}`}>{c}</Link>
                </div>
              ))
            )}
          </div>
          <div className="col-xs-10 col-sm-10 col-md-10 col-lg-10">
            <h1>
              <strong>Shelters Nearby</strong>
            </h1>
            {loadingshelters ? (
              <LoadingBox />
            ) : errorshelters ? (
              <MessageBox variant="danger">{errorshelters}</MessageBox>
            ) : (
              <>
                {shelters.length === 0 && (
                  <MessageBox>No Shelter Found</MessageBox>
                )}
                <Carousel showArrows autoPlay showThumbs={false}>
                  {shelters.map((shelter) => (
                    <div key={shelter._id}>
                      <Link to={`/shelter/${shelter._id}`}>
                        <div>
                        <img
                          src={shelter.shelter.logo}
                          alt={shelter.shelter.name}
                        />
                        </div>
                      </Link>
                    </div>
                  ))}
                </Carousel>
              </>
            )}
            <br />
            <h1>
              <strong>Recently Added Pets Available</strong>
            </h1>
            {pets.length === 0 && <MessageBox>No pet Found</MessageBox>}
            <div className="row center">
              {pets.map((pet) => (
                <Pet key={pet._id} pet={pet} />
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default HomeScreen;
