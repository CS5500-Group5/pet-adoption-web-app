import React from "react";
import { Link } from "react-router-dom";
import Rating from "./Rating";

const Pet = (props) => {
  const { pet } = props;
  return (
    <div className="card align-items-center">
      <div class="d-flex justify-content-between">
        <div class="mt-1 float-center text-success">
          <i class="fas fa-paw" />
          <small class="ml-1"> {pet.species}</small>
        </div>
      </div>
      <div class="text-center">
        <Link to={`/pet/${pet._id}`}>
          <img
            className="rounded medium pt-3"
            src={pet.image}
            alt={pet.name}
            width="200"
            height="200"
          />
        </Link>
      </div>
      <div className="text-center">
        <h5>
          <Link to={`/pet/${pet._id}`}>
            <h2>{pet.name}</h2>
          </Link>
        </h5>{" "}
      </div>
      <div className="text-center">
        <Link to={`/shelter/${pet.shelter._id}`} className="text-secondary">
          From {pet.shelter.shelter.name}
        </Link>
      </div>
    </div>
  );
}

export default Pet;