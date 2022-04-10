import React, { useState } from "react";


const SearchBox = (props) => {
  const [species, setSpecies] = useState("");
  const submitHandler = (e) => {
    console.log(`/search/species/${species}`);
    e.preventDefault();
    props.history.push(`/search/species/${species}`);
  };
  return (
    <form className="search d-flex " onSubmit={submitHandler}>
      <input
        className="form-control me-0"
        type="text"
        name="q"
        id="q"
        placeholder="Search Kitten. Doggy. etc."
        onChange={(e) => setSpecies(e.target.value)}
      />
      <button className="btn btn-secondary fas fa-search" type="submit" />
    </form>
  );
};

export default SearchBox;
