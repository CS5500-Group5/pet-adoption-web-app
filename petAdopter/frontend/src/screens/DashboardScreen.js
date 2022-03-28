import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Chart from 'react-google-charts';
import { summaryApplication } from '../actions/applicationActions';
import LoadingBox from '../components/LoadingBox';
import MessageBox from '../components/MessageBox';

const DashboardScreen = () => {
  const applicationSummary = useSelector((state) => state.applicationSummary);
  const { loading, summary, error } = applicationSummary;
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(summaryApplication());
  }, [dispatch]);
  return (
    <div>
      <div className="row">
        <h1>Dashboard</h1>
      </div>
      {loading ? (
        <LoadingBox />
      ) : error ? (
        <MessageBox variant="danger">{error}</MessageBox>
      ) : (
        <>
          <ul className="row summary">
            <li>
              <div className="summary-title bg-info">
                <span>
                  <i className="fa fa-users" /> Users
                </span>
              </div>
              <div className="summary-body">{summary.users[0].numUsers}</div>
            </li>
            <li>
              <div className="summary-title bg-info">
                <span>
                  <i className="fa fa-shopping-cart" /> Applications
                </span>
              </div>
              <div className="summary-body">
                {summary.applications[0] ? summary.applications[0].numApplications : 0}
              </div>
            </li>
            <li>
              <div className="summary-title bg-info">
                <span>
                  <i className="fa fa-money" /> Sales
                </span>
              </div>
              <div className="summary-body">
                $
                {summary.applications[0]
                  ? summary.applications[0].totalSales.toFixed(2)
                  : 0}
              </div>
            </li>
          </ul>
          <div>
            <div>
              <h2>Sales</h2>
              {summary.dailyApplications.length === 0 ? (
                <MessageBox>No Sale</MessageBox>
              ) : (
                <Chart
                  width="100%"
                  height="400px"
                  chartType="AreaChart"
                  loader={<div>Loading Chart</div>}
                  data={[
                    ['Date', 'Sales'],
                    ...summary.dailyApplications.map((x) => [x._id, x.sales]),
                  ]}
                ></Chart>
              )}
            </div>
          </div>
          <div>
            <h2>Species</h2>
            {summary.petspecies.length === 0 ? (
              <MessageBox>No species</MessageBox>
            ) : (
              <Chart
                width="100%"
                height="400px"
                chartType="PieChart"
                loader={<div>Loading Chart</div>}
                data={[
                  ['species', 'pets'],
                  ...summary.petspecies.map((x) => [x._id, x.count]),
                ]}
              />
            )}
          </div>
        </>
      )}
    </div>
  );
}

export default DashboardScreen;