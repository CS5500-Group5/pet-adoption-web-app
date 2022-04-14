import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { BrowserRouter, Link, Route } from "react-router-dom";
import { signout } from "./actions/userActions";
import AdminRoute from "./components/AdminRoute";
import PrivateRoute from "./components/PrivateRoute";
import CartScreen from "./screens/CartScreen";
import HomeScreen from "./screens/HomeScreen";
import ApplicationHistoryScreen from "./screens/ApplicationHistoryScreen";
import ApplicationScreen from "./screens/ApplicationScreen";
import PaymentMethodScreen from "./screens/PaymentMethodScreen";
import PlaceApplicationScreen from "./screens/PlaceApplicationScreen";
import PetListScreen from "./screens/PetListScreen";
import petScreen from "./screens/PetScreen";
import ProfileScreen from "./screens/ProfileScreen";
import RegisterScreen from "./screens/RegisterScreen";
import ApplicantAddressScreen from "./screens/ApplicantAddressScreen";
import SigninScreen from "./screens/SigninScreen";
import petEditScreen from "./screens/PetEditScreen";
import ApplicationListScreen from "./screens/ApplicationListScreen";

import UserEditScreen from "./screens/UserEditScreen";
import ShelterRoute from "./components/ShelterRoute";
import shelterScreen from "./screens/ShelterScreen";
import SearchBox from "./components/SearchBox";
import SearchScreen from "./screens/SearchScreen";
import { ListPetSpecies } from "./actions/petActions";
import LoadingBox from "./components/LoadingBox";
import MessageBox from "./components/MessageBox";
import MapScreen from "./screens/MapScreen";
import { Container, Nav, Navbar, NavDropdown } from "react-bootstrap";

function App() {
  const [sidebarIsOpen, setSidebarIsOpen] = useState(false);

  const cart = useSelector((state) => state.cart);
  const { cartItems } = cart;
  const userSignin = useSelector((state) => state.userSignin);
  const { userInfo } = userSignin;
  const dispatch = useDispatch();
  const signoutHandler = () => {
    dispatch(signout());
  };

  const petSpeciesList = useSelector((state) => state.petSpeciesList);
  const {
    loading: loadingspecies,
    error: errorspecies,
    species,
  } = petSpeciesList;
  useEffect(() => {
    dispatch(ListPetSpecies());
  }, [dispatch]);
  return (
    <BrowserRouter>
      <div className="grid-container">
        <header className="row">
          <span className="col-1 left-navi-button">
            <button
              type="button"
              className="open-sidebar me-0 pe-0 ms-0"
              onClick={() => setSidebarIsOpen(true)}
            >
              <i className="fa fa-bars" />
            </button>
          </span>
          <div className="col-11 ps-0 nav-top">
            <Navbar
              expand="lg"
              className="bg-primary nav-bar ms-0"
              variant="dark"
            >
              <Container className="ms-0 ps-0">
                <Navbar.Brand href="/" className={"go-fresh"}>
                <i className="fas fa-paw"></i>
                   Pet Adoption
                </Navbar.Brand>
                <Navbar.Toggle
                  aria-controls="basic-navbar-nav"
                  className="toggle-color"
                >
                  <i className="far fa-user toggle-color" />
                </Navbar.Toggle>
                <Navbar.Collapse id="basic-navbar-nav" className="nav-collapse">
                  <Nav className="me-auto" />
                  <Nav className="me-auto navi-level-one">
                    <Route
                      render={({ history }) => (
                        <SearchBox history={history}></SearchBox>
                      )}
                    />
                  </Nav>
                  <Nav className="navbar-right navi-level-one">
                    {userInfo ? (
                      <NavDropdown
                        title={userInfo.name}
                        id="basic-nav-dropdown"
                        className={"navi-level-one"}
                      >
                        <NavDropdown.Item
                          href="/profile"
                          className={"navi-dropdown"}
                        >
                          Profile
                        </NavDropdown.Item>
                        <NavDropdown.Item
                          href="/applicationhistory"
                          className={"navi-dropdown"}
                        >
                          Applications
                        </NavDropdown.Item>
                        <NavDropdown.Item
                          href="#signout"
                          onClick={signoutHandler}
                          className={"navi-dropdown"}
                        >
                          Sign Out
                        </NavDropdown.Item>
                      </NavDropdown>
                    ) : (
                      <Link to="/signin">Sign In</Link>
                    )}
                    {userInfo && userInfo.isShelter && (
                      <NavDropdown
                        title="shelter"
                        id="shelter-dropdown"
                        className={"navi-level-one"}
                      >
                        <NavDropdown.Item
                          href="/petlist/shelter"
                          className={"navi-dropdown"}
                        >
                          pets
                        </NavDropdown.Item>
                        <NavDropdown.Item
                          href="/applicationlist/shelter"
                          className={"navi-dropdown"}
                        >
                          Applications
                        </NavDropdown.Item>
                      </NavDropdown>
                    )}
                    {userInfo && userInfo.isAdmin && (
                      <NavDropdown
                        title="Admin"
                        id="admin-dropdown"
                        className={"navi-level-one"}
                      >
                        <NavDropdown.Item
                          href="/dashboard"
                          className={"navi-dropdown"}
                        >
                          Dashboard
                        </NavDropdown.Item>
                        <NavDropdown.Item
                          href="/petlist"
                          className={"navi-dropdown"}
                        >
                          pets
                        </NavDropdown.Item>
                        <NavDropdown.Item
                          href="/userlist"
                          className={"navi-dropdown"}
                        >
                          Users
                        </NavDropdown.Item>
                      </NavDropdown>
                    )}
                  </Nav>
                </Navbar.Collapse>
              </Container>
            </Navbar>
          </div>

          <div className="cart bg-success ">
            <Link to="/cart">
              <i className="fa fa-heart" />
              {cartItems.length >= 0 && (
                <span className="badge badge-size bg-success">
                  {cartItems.length}
                </span>
              )}
            </Link>
          </div>
        </header>
        <aside className={sidebarIsOpen ? "open sider" : ""}>
          <ul>
            <li>
              <strong>Species</strong>
              <button
                onClick={() => setSidebarIsOpen(false)}
                className="close-sidebar"
                type="button"
              >
                <i className="fa fa-close" />
              </button>
            </li>
            {loadingspecies ? (
              <LoadingBox />
            ) : errorspecies ? (
              <MessageBox variant="danger">{errorspecies}</MessageBox>
            ) : (
              species.map((c) => (
                <li key={c}>
                  <Link
                    to={`/search/species/${c}`}
                    onClick={() => setSidebarIsOpen(false)}
                  >
                    {c}
                  </Link>
                </li>
              ))
            )}
          </ul>
        </aside>
        <main>
          <PrivateRoute path="/map" component={MapScreen} />
          <div className="container-fluid">
            <div className="row align-top">
              <Route path="/shelter/:id" component={shelterScreen} />
              <Route path="/cart/:id?" component={CartScreen} />
              <Route path="/pet/:id" component={petScreen} exact />
              <Route
                path="/pet/:id/edit"
                component={petEditScreen}
                exact
              />
              <Route path="/signin" component={SigninScreen} />
              <Route path="/register" component={RegisterScreen} />
              <Route path="/contact" component={ApplicantAddressScreen} />
              <Route path="/payment" component={PaymentMethodScreen} />
              <Route path="/placeapplication" component={PlaceApplicationScreen} />
              <Route path="/application/:id" component={ApplicationScreen} />
              <Route path="/applicationhistory" component={ApplicationHistoryScreen} />
              <Route
                path="/search/name/:name?"
                component={SearchScreen}
                exact
              />
              <Route
                path="/search/species/:species"
                component={SearchScreen}
                exact
              />
              <Route
                path="/search/species/:species/name/:name"
                component={SearchScreen}
                exact
              />
              <Route
                path="/search/species/:species/name/:name/min/:min/max/:max/rating/:rating/application/:application/pageNumber/:pageNumber"
                component={SearchScreen}
                exact
              />
              <PrivateRoute path="/profile" component={ProfileScreen} />
              <PrivateRoute path="/map" component={MapScreen} />
              <AdminRoute
                path="/petlist"
                component={PetListScreen}
                exact
              />
              <AdminRoute
                path="/petlist/pageNumber/:pageNumber"
                component={PetListScreen}
                exact
              />
              
              <AdminRoute path="/user/:id/edit" component={UserEditScreen} />

             

              <ShelterRoute
                path="/petlist/shelter"
                component={PetListScreen}
              />
              <ShelterRoute
                path="/applicationlist/shelter"
                component={ApplicationListScreen}
              />

              <Route path="/" component={HomeScreen} exact />
            </div>
          </div>
        </main>
       
      </div>
    </BrowserRouter>
  );
}

export default App;
