import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Axios from "axios";
import { detailspet, updatepet } from "../actions/petActions";
import LoadingBox from "../components/LoadingBox";
import MessageBox from "../components/MessageBox";
import { PET_UPDATE_RESET } from "../constants/petConstants";

const PetEditScreen = (props) => {
  const petId = props.match.params.id;
  const [name, setName] = useState("");
  const [breed, setBreed] = useState("");
  const [activity_level, setActivity_level] = useState("");
  const [grooming_requirement, setGrooming_requirement] = useState("");
  const [image, setImage] = useState("");
  const [species, setspecies] = useState("");
  const [age, setAge] = useState("");
  const [gender, setGender] = useState("");
  const [color, setColor] = useState("");
  const [weight, setWeight] = useState("");
  const [description, setDescription] = useState("");

  const petDetails = useSelector((state) => state.petDetails);
  const { loading, error, pet } = petDetails;

  const petUpdate = useSelector((state) => state.petUpdate);
  const {
    loading: loadingUpdate,
    error: errorUpdate,
    success: successUpdate,
  } = petUpdate;

  const dispatch = useDispatch();
  useEffect(() => {
    if (successUpdate) {
      props.history.push("/petlist");
    }
    if (!pet || pet._id !== petId || successUpdate) {
      dispatch({ type: PET_UPDATE_RESET });
      dispatch(detailspet(petId));
    } else {
      setName(pet.name);
      setBreed(pet.breed);
      setActivity_level(pet.activity_level);
      setGrooming_requirement(pet.grooming_requirement);
      setImage(pet.image);
      setspecies(pet.species);
      setAge(pet.age);
      setGender(pet.gender);
      setColor(pet.color);
      setWeight(pet.weight);
      setDescription(pet.description);
    }
  }, [pet, dispatch, petId, successUpdate, props.history]);
  const submitHandler = (e) => {
    e.preventDefault();
    // TODO: dispatch update pet
    dispatch(
      updatepet({
        _id: petId,
        name,
        breed,
        activity_level,
        grooming_requirement,
        image,
        species,
        gender,
        age,
        color,
        weight,
        description,
      })
    );
  };
  const [loadingUpload, setLoadingUpload] = useState(false);
  const [errorUpload, setErrorUpload] = useState("");

  const userSignin = useSelector((state) => state.userSignin);
  const { userInfo } = userSignin;
  const uploadFileHandler = async (e) => {
    const file = e.target.files[0];
    const bodyFormData = new FormData();
    bodyFormData.append("image", file);
    setLoadingUpload(true);
    try {
      const { data } = await Axios.post("/api/uploads", bodyFormData, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${userInfo.token}`,
        },
      });
      setImage(data);
      setLoadingUpload(false);
    } catch (error) {
      setErrorUpload(error.message);
      setLoadingUpload(false);
    }
  };

  return (
    <div>
      <form className="form" onSubmit={submitHandler}>
        <div>
          <h1>Edit pet {petId}</h1>
        </div>
        {loadingUpdate && <LoadingBox />}
        {errorUpdate && <MessageBox variant="danger">{errorUpdate}</MessageBox>}
        {loading ? (
          <LoadingBox />
        ) : error ? (
          <MessageBox variant="danger">{error}</MessageBox>
        ) : (
          <>
            <div>
              <label htmlFor="name">Name</label>
              <input
                id="name"
                type="text"
                placeholder="Enter name"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>
            <div>
              <label htmlFor="breed">Breed</label>
              <input
                id="breed"
                type="text"
                placeholder="Enter"
                value={breed}
                onChange={(e) => setBreed(e.target.value)}
              />
            </div>

            <div>
              <label htmlFor="activity_level">Activity Level</label>
              <input
                id="activity_level"
                type="text"
                placeholder="Enter"
                value={activity_level}
                onChange={(e) => setActivity_level(e.target.value)}
              />
            </div> 

            <div>
              <label htmlFor="grooming_requirement">Grooming requirement</label>
              <input
                id="grooming_requirement"
                type="text"
                placeholder="Enter "
                value={grooming_requirement}
                onChange={(e) => setGrooming_requirement(e.target.value)}
              />
            </div>


            <div>
              <label htmlFor="image">Image</label>
              <input
                id="image"
                type="text"
                placeholder="Enter image"
                value={image}
                onChange={(e) => setImage(e.target.value)}
              />
            </div>
            <div>
              <label htmlFor="imageFile">Image File</label>
              <input
                type="file"
                id="imageFile"
                label="Choose Image"
                onChange={uploadFileHandler}
              />
              {loadingUpload && <LoadingBox />}
              {errorUpload && (
                <MessageBox variant="danger">{errorUpload}</MessageBox>
              )}
            </div>
            <div>
              <label htmlFor="species">Species</label>
              <input
                id="species"
                type="text"
                placeholder="Enter species"
                value={species}
                onChange={(e) => setspecies(e.target.value)}
              />
            </div>
            <div>
              <label htmlFor="gender">Gender</label>
              <input
                id="gender"
                type="text"
                placeholder="Enter gender"
                value={gender}
                onChange={(e) => setGender(e.target.value)}
              />
            </div>
            <div>
              <label htmlFor="age">Age</label>
              <input
                id="age"
                type="text"
                placeholder="Enter age"
                value={age}
                onChange={(e) => setAge(e.target.value)}
              />
            </div>

            <div>
              <label htmlFor="color">Color</label>
              <input
                id="color"
                type="text"
                placeholder="Enter color"
                value={color}
                onChange={(e) => setColor(e.target.value)}
              />
            </div>
              
            <div>
              <label htmlFor="weight">Weight(in kg)</label>
              <input
                id="weight"
                type="text"
                placeholder="Enter weight"
                value={weight}
                onChange={(e) => setWeight(e.target.value)}
              />
            </div>


            <div>
              <label htmlFor="description">Description</label>
              <textarea
                id="description"
                rows="3"
                type="text"
                placeholder="Enter description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              />
            </div>
            <div>
              <label />
              <button className="btn btn-primary btn-lg" type="submit">
                Update
              </button>
            </div>
          </>
        )}
      </form>
    </div>
  );
};

export default PetEditScreen;
