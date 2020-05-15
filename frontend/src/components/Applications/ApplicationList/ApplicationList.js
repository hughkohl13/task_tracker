import React from 'react';

import './ApplicationList.css';

const applicationList = props => (
  <ul className="applications__list">
    {props.applications.map(application => {
      return (
        <li key={application._id} className="applications__item">
          <div className="applications__item-data">
            {application.job.role} -{' '}
            {new Date(application.createdAt).toLocaleDateString()}
          </div>
          <div className="applications__item-actions">
            <button className="btn" onClick={props.onDelete.bind(this, application._id)}>Cancel</button>
          </div>
        </li>
      );
    })}
  </ul>
);

export default applicationList;