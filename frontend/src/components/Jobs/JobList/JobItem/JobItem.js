import React from 'react';

import './JobItem.css';

const jobItem = props => {
    <li key ={props.jobId} className="jobs__list-item">
        <div>
            <h1>{props.role}</h1>
            <h2>{props.company}</h2>
        </div>
        <div>
            {props.userId === props.creatorId ? (
                <p> Your application </p>
            ) : (
                <button className="btn" onClick={props.onDetail.bind(this, props.jobId)}>
                    View Details
                </button>
            )}
        </div>
    </li>
};

export default jobItem;