import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { listApplicationMine } from "../actions/applicationActions";
import LoadingBox from "../components/LoadingBox";
import MessageBox from "../components/MessageBox";

const ApplicationHistoryScreen = (props) => {
  const applicationMineList = useSelector((state) => state.applicationMineList);
  const { loading, error, applications } = applicationMineList;
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(listApplicationMine());
  }, [dispatch]);
  return (
    <div className={"row"}>
      <h1>Pending Applications</h1>
      {loading ? (
        <LoadingBox></LoadingBox>
      ) : error ? (
        <MessageBox variant="danger">{error}</MessageBox>
      ) : (
        <table className="table table-hover application-table ">
          <thead>
            <tr>
              <th>Application ID</th>
              <th>Date Submitted</th>
              <th>Pet</th>
              <th>Shelter</th>
              <th>Details</th>
              <th>Approved</th>
            </tr>
          </thead>
          <tbody>
            {applications.map((application) => (
              <tr className={"table-active"} key={application._id}>
                <td>
                  {application._id.substring(application._id.length - 5, application._id.length)}
                </td>
                <td>{application.createdAt.substring(0, 10)}</td>
                <td>{application.petItems[0].name}</td>
                <td>
                <td>{application.petItems[0].age}</td>
                </td>
                <td>
                  <button
                    type="button"
                    className="btn btn-primary btn-md"
                    onClick={() => {
                      props.history.push(`/application/${application._id}`);
                    }}
                  >
                    Details
                  </button>
                </td>
                <td>{application.isApproved ? "Yes": "No"}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}

export default ApplicationHistoryScreen; 