import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { detailsUser, updateUserProfile } from '../actions/userActions';
import LoadingBox from '../components/LoadingBox';
import MessageBox from '../components/MessageBox';
import { USER_UPDATE_PROFILE_RESET } from '../constants/userConstants';

const ProfileScreen =() => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [shelterName, setshelterName] = useState('');
  const [shelterLogo, setshelterLogo] = useState('');
  const [shelterDescription, setshelterDescription] = useState('');

  const userSignin = useSelector((state) => state.userSignin);
  const { userInfo } = userSignin;
  const userDetails = useSelector((state) => state.userDetails);
  const { loading, error, user } = userDetails;
  const userUpdateProfile = useSelector((state) => state.userUpdateProfile);
  const {
    success: successUpdate,
    error: errorUpdate,
    loading: loadingUpdate,
  } = userUpdateProfile;
  const dispatch = useDispatch();
  useEffect(() => {
    if (!user) {
      dispatch({ type: USER_UPDATE_PROFILE_RESET });
      dispatch(detailsUser(userInfo._id));
    } else {
      setName(user.name);
      setEmail(user.email);
      if (user.shelter) {
        setshelterName(user.shelter.name);
        setshelterLogo(user.shelter.logo);
        setshelterDescription(user.shelter.description);
      }
    }
  }, [dispatch, userInfo._id, user]);
  const submitHandler = (e) => {
    e.preventDefault();
    // dispatch update profile
    if (password !== confirmPassword) {
      alert('Password and Confirm Password Are Not Matched');
    } else {
      dispatch(
        updateUserProfile({
          userId: user._id,
          name,
          email,
          password,
          shelterName,
          shelterLogo,
          shelterDescription,
        })
      );
    }
  };
  return (
    <div>
      <form className="form" onSubmit={submitHandler}>
        <div>
          <h1>User Profile</h1>
        </div>
        {loading ? (
          <LoadingBox></LoadingBox>
        ) : error ? (
          <MessageBox variant="danger">{error}</MessageBox>
        ) : (
          <>
            {loadingUpdate && <LoadingBox></LoadingBox>}
            {errorUpdate && (
              <MessageBox variant="danger">{errorUpdate}</MessageBox>
            )}
            {successUpdate && (
              <MessageBox variant="success">
                Profile Updated Successfully
              </MessageBox>
            )}
            <div>
              <label htmlFor="name">Name</label>
              <input
                id="name"
                type="text"
                placeholder="Enter name"
                value={name}
                onChange={(e) => setName(e.target.value)}
              ></input>
            </div>
            <div>
              <label htmlFor="email">Email</label>
              <input
                id="email"
                type="email"
                placeholder="Enter email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              ></input>
            </div>
            <div>
              <label htmlFor="password">Password</label>
              <input
                id="password"
                type="password"
                placeholder="Enter password"
                onChange={(e) => setPassword(e.target.value)}
              ></input>
            </div>
            <div>
              <label htmlFor="confirmPassword">Confirm Password</label>
              <input
                id="confirmPassword"
                type="password"
                placeholder="Please Confirm Password"
                onChange={(e) => setConfirmPassword(e.target.value)}
              ></input>
            </div>
            {user.isShelter && (
              <>
                <h2>Shelter Information</h2>
                <div>
                  <label htmlFor="shelterName">Shelter Name</label>
                  <input
                    id="shelterName"
                    type="text"
                    placeholder="Enter Shelter Name"
                    value={shelterName}
                    onChange={(e) => setshelterName(e.target.value)}
                  ></input>
                </div>
                <div>
                  <label htmlFor="shelterLogo">Shelter Logo</label>
                  <input
                    id="shelterLogo"
                    type="text"
                    placeholder="Enter Shelter Logo"
                    value={shelterLogo}
                    onChange={(e) => setshelterLogo(e.target.value)}
                  ></input>
                </div>
                <div>
                  <label htmlFor="shelterDescription">Shelter Description</label>
                  <input
                    id="shelterDescription"
                    type="text"
                    placeholder="Enter Shelter Description"
                    value={shelterDescription}
                    onChange={(e) => setshelterDescription(e.target.value)}
                  ></input>
                </div>
              </>
            )}
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
}
export default ProfileScreen;