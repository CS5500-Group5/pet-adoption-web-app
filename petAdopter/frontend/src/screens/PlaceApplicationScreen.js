import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { createApplication } from '../actions/applicationActions';
import CheckoutSteps from '../components/CheckoutSteps';
import { APPLICATION_CREATE_RESET } from '../constants/applicationConstants';
import LoadingBox from '../components/LoadingBox';
import MessageBox from '../components/MessageBox';

const PlaceApplicationScreen = (props) => {
	const cart = useSelector((state) => state.cart);
	// if (!cart.paymentMethod) {
	//   props.history.push('/payment');
	// }
	const applicationCreate = useSelector((state) => state.applicationCreate);
	const { loading, success, error, application } = applicationCreate;
	
	cart.shelter = cart.cartItems[0].shelter;
	
	const dispatch = useDispatch();
	const placeApplicationHandler = () => {
		dispatch(createApplication({ ...cart, petItems: cart.cartItems }));
	};
	useEffect(() => {
		if (success) {
			props.history.push(`/application/${application._id}`);
			dispatch({ type: APPLICATION_CREATE_RESET });
		}
	}, [dispatch, application, props.history, success]);
	return (
		<div>
			<CheckoutSteps step1 step2 step3 step4></CheckoutSteps>
			<div className="row top">
				<div className="col-9">
					<ul>
						<li>
							<div className="card-checkout card-body card-bg-light">
								<h2>Applicant's Address</h2>
								<p>
									<strong>Name:</strong> {cart.applicantAddress.fullName} <br />
									<strong>Address: </strong> {cart.applicantAddress.address},
									{cart.applicantAddress.city}, {cart.applicantAddress.postalCode}
									,{cart.applicantAddress.country}
								</p>
							</div>
						</li>

						<li>
							<div className="card-checkout card-body">
								<h2>Application Pets</h2>
								<ul>
									{cart.cartItems.map((item) => (
										<li key={item.pet}>
											<div className="row">
												<div className="col-1-original ">
													<img
														src={item.image}
														alt={item.name}
														className="img-fluid img-round-corner"
													></img>
												</div>
												<div className="col-7">
													<Link to={`/pet/${item.pet}`}>
														{item.name}
													</Link>
												</div>

												<div className="col-3-original">
													{item.qty}
												</div>
											</div>
										</li>
									))}
								</ul>
							</div>
						</li>
					</ul>
				</div>
				<div className="col-3-original">
					<div className="card-checkout card-body card-bg-light">
						<h2>Adoption Fee Payment</h2>
						<p>
							<strong>Method:</strong> {cart.paymentMethod}
						</p>
					</div>


					<div className="card-checkout card-body">
						<ul>
							<li>
								<h2>Application Reminder</h2>
							</li>
							<li>
								<p>When you foster, you agree to take a homeless pet into your home and give him or her love,
									care and attention..</p>
							</li>

							<li>
								<button
									type="button"
									onClick={placeApplicationHandler}
									className="checkout block font-color-white"
									disabled={cart.cartItems.length === 0}
								>
									Place Application
								</button>
							</li>
							{loading && <LoadingBox></LoadingBox>}
							{error && <MessageBox variant="danger">{error}</MessageBox>}
						</ul>
					</div>
				</div>
			</div>
		</div>
	);
}

export default PlaceApplicationScreen;