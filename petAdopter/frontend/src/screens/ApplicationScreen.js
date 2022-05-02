import Axios from "axios";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { approveApplication, detailsApplication, payApplication } from "../actions/applicationActions";
import LoadingBox from "../components/LoadingBox";
import MessageBox from "../components/MessageBox";
import {
  APPLICATION_APPROVE_RESET,
  APPLICATION_PAY_RESET,
} from "../constants/applicationConstants";

const ApplicationScreen = (props) => {
  const applicationId = props.match.params.id;
  const [sdkReady, setSdkReady] = useState(false);
  const applicationDetails = useSelector((state) => state.applicationDetails);
  const { application, loading, error } = applicationDetails;
  const userSignin = useSelector((state) => state.userSignin);
  const { userInfo } = userSignin;

  const applicationPay = useSelector((state) => state.applicationPay);
  const {
    loading: loadingPay,
    error: errorPay,
    success: successPay,
  } = applicationPay;
  const applicationDeliver = useSelector((state) => state.applicationDeliver);
  const {
    loading: loadingDeliver,
    error: errorDeliver,
    success: successDeliver,
  } = applicationDeliver;
  const dispatch = useDispatch();
  useEffect(() => {
    if (
      !application ||
      successPay ||
      successDeliver ||
      (application && application._id !== applicationId)
    ) {
      dispatch({ type: APPLICATION_PAY_RESET });
      dispatch({ type: APPLICATION_APPROVE_RESET });
      dispatch(detailsApplication(applicationId));
    } else {
      if (!application.isPaid) {
        setSdkReady(true);
      }
    }
  }, [dispatch, applicationId, sdkReady, successPay, successDeliver, application]);

  const successPaymentHandler = (paymentResult) => {
    dispatch(payApplication(application, paymentResult));
  };
  const approveHandler = () => {
    dispatch(approveApplication(application._id));
  };

  return loading ? (
    <LoadingBox></LoadingBox>
  ) : error ? (
    <MessageBox variant="danger">{error}</MessageBox>
  ) : (
    <div className={"row ms-5 me-5"}>
      <h1>Thank you for submitting an application. </h1>
      <h1>
        Please save this ID for your records: #
        {application._id.substring(application._id.length - 5, application._id.length)}
      </h1>
      <div className="row top">
        <div className="col-2">
          <ul>
            <div className="card-checkout card-body">
              <h2>Application Items</h2>
              <ul>
                {application.petItems.map((item) => (
                  <li key={item.pet}>
                    <div className="row">
                      <div className="col-1-original">
                        <img
                          src={item.image}
                          alt={item.name}
                          className="img-fluid img-round-corner"
                        />
                      </div>
                      <div className="col-7">
                        <Link to={`/pet/${item.pet}`}>{item.name}</Link>
                      </div>

                      <div className="col-3-original">
                        {application.isApproved?"Approved":"Waiting for Approval"}
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
            </div>

            <li className="ms-3 me-3">
              <MessageBox variant="warning">
                Your contact info. is: {" "}
                <b>
                  {application.applicantAddress.address}, {application.applicantAddress.city},
                  {application.applicantAddress.state}, {application.applicantAddress.country}, {" "}
                  {application.applicantAddress.postalCode}
                </b>
                , for <b>{application.applicantAddress.fullName}</b>.
                <br />
                <br />
                <spam>
                  Please wait until your application is reviewed. Please contact us with any questions.
                </spam>
              </MessageBox>
            </li>
          </ul>
        </div>
        <div className="col-1">
          <div className="card-checkout card-body">
            <ul>
              <li>
                <h2 className="bg-primary text-wrap text-light text-center">Application Reminder</h2>
              </li>
              <li>
                <p className = "text-danger">When adopting, you agree to take in your new pet and shower them with unconditional love, 
                  care, and attention.</p>
              </li>
              
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ApplicationScreen;
