import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";
import {
  createpet,
  deletepet,
  ListPets,
} from "../actions/petActions";
import LoadingBox from "../components/LoadingBox";
import MessageBox from "../components/MessageBox";
import {
  PET_CREATE_RESET,
  PET_DELETE_RESET,
} from "../constants/petConstants";

const PetListScreen = (props) => {
  const { pageNumber = 1 } = useParams();

  const shelterMode = props.match.path.indexOf("/shelter") >= 0;
  const petList = useSelector((state) => state.petList);
  const { loading, error, pets, page, pages } = petList;

  const petCreate = useSelector((state) => state.petCreate);
  const {
    loading: loadingCreate,
    error: errorCreate,
    success: successCreate,
    pet: createdpet,
  } = petCreate;

  const petDelete = useSelector((state) => state.petDelete);
  const {
    loading: loadingDelete,
    error: errorDelete,
    success: successDelete,
  } = petDelete;
  const userSignin = useSelector((state) => state.userSignin);
  const { userInfo } = userSignin;
  const dispatch = useDispatch();
  useEffect(() => {
    if (successCreate) {
      dispatch({ type: PET_CREATE_RESET });
      props.history.push(`/pet/${createdpet._id}/edit`);
    }
    if (successDelete) {
      dispatch({ type: PET_DELETE_RESET });
    }
    dispatch(
      ListPets({ shelter: shelterMode ? userInfo._id : "", pageNumber })
    );
  }, [
    createdpet,
    dispatch,
    props.history,
    shelterMode,
    successCreate,
    successDelete,
    userInfo._id,
    pageNumber,
  ]);

  const deleteHandler = (pet) => {
    if (window.confirm("Are you sure to delete?")) {
      dispatch(deletepet(pet._id));
    }
  };
  const createHandler = () => {
    dispatch(createpet());
  };
  return (
    <div>
      <div className="row">
        <h1>Pets</h1>
        <button
          type="button"
          className="btn btn-primary btn-lg"
          onClick={createHandler}
        >
          Create Pet
        </button>
      </div>

      {loadingDelete && <LoadingBox></LoadingBox>}
      {errorDelete && <MessageBox variant="danger">{errorDelete}</MessageBox>}

      {loadingCreate && <LoadingBox></LoadingBox>}
      {errorCreate && <MessageBox variant="danger">{errorCreate}</MessageBox>}
      {loading ? (
        <LoadingBox></LoadingBox>
      ) : error ? (
        <MessageBox variant="danger">{error}</MessageBox>
      ) : (
        <table className="table table-hover application-table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>Species</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {pets.map((pet) => (
              <tr key={pet._id} className={"table-active"}>
                <td>
                  {pet._id.substring(
                    pet._id.length - 5,
                    pet._id.length
                  )}
                </td>
                <td>{pet.name.substring(0, pet._id.length - 15)}</td>
                <td>{pet.species}</td>
                
                <td>
                  <button
                    type="button"
                    className="btn btn-primary"
                    onClick={() =>
                      props.history.push(`/pet/${pet._id}/edit`)
                    }
                  >
                    Edit
                  </button>
                  &nbsp;&nbsp;
                  <button
                    type="button"
                    className="btn btn-primary"
                    onClick={() => deleteHandler(pet)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};
export default PetListScreen;
