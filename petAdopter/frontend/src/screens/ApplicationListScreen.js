import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { deleteApplication, listApplications, approveApplication } from "../actions/applicationActions";
import LoadingBox from "../components/LoadingBox";
import MessageBox from "../components/MessageBox";
import { APPLICATION_DELETE_RESET } from "../constants/applicationConstants";

const ApplicationListScreen = (props) => {
  const shelterMode = props.match.path.indexOf("/shelter") >= 0;
  const applicationList = useSelector((state) => state.applicationList);
  const { loading, error, applications } = applicationList;
  const applicationDelete = useSelector((state) => state.applicationDelete);
  const {
    loading: loadingDelete,
    error: errorDelete,
    success: successDelete,
  } = applicationDelete;

  const userSignin = useSelector((state) => state.userSignin);
  const { userInfo } = userSignin;
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch({ type: APPLICATION_DELETE_RESET });
    dispatch(listApplications({ shelter: shelterMode ? userInfo._id : "" }));
  }, [dispatch, shelterMode, successDelete, userInfo._id]);
  const deleteHandler = (application) => {
    if (window.confirm("Are you sure to delete?")) {
      dispatch(deleteApplication(application._id));
    }
  };
  const approveHandler = (application) => {
    if (window.confirm("Are you sure to approve?")) {
      dispatch(approveApplication(application._id));
    }
  };
  return (
    <div className={"row"}>
      <h1>Applications</h1>

      {loadingDelete && <LoadingBox></LoadingBox>}
      {errorDelete && <MessageBox variant="danger">{errorDelete}</MessageBox>}
      {loading ? (
        <LoadingBox></LoadingBox>
      ) : error ? (
        <MessageBox variant="danger">{error}</MessageBox>
      ) : (
        <table className="table table-hover application-table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Date Submitted</th>
              <th>Applicant</th>
              <th>Paid</th>
              <th>Approved</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {applications.map((application) => {
              return (
                <tr key={application._id} className={"table-active"}>
                  <td>
                    {application._id.substring(
                      application._id.length - 5,
                      application._id.length
                    )}
                  </td>
                  <td>{application.createdAt.substring(0, 10)}</td>
                  <td>{application.user.name}</td>
                  <td>{application.isPaid ? application.paidAt.substring(0, 10) : "No"}</td>
                  <td>
                    {application.isApproved
                      ? "Yes"
                      : "No"}
                  </td>
                  <td>
                    <button
                      type="button"
                      className="btn btn-primary"
                      onClick={() => {
                        props.history.push(`/application/${application._id}`);
                      }}
                    >
                      Details
                    </button>
                    &nbsp;&nbsp;
                    <button
                      type="button"
                      className="btn btn-primary"
                      onClick={() => deleteHandler(application)}
                    >
                      Delete
                    </button>
                    &nbsp;&nbsp;
                    <button
                      type="button"
                      className="btn btn-primary"
                      onClick={() => approveHandler(application)}
                    >
                      Approve
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default ApplicationListScreen;
