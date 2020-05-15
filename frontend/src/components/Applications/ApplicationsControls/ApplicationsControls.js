import React from 'react';

import './ApplicationsControls.css';

const applicationsControls = props => {
    return (
        <div className="applications-control">
            <button
                className={props.activeOutputType === 'list' ? 'active': ''}
                onClick={props.onChange.bind(this, 'list')}
            >
                List
            </button>
            <button
                className={props.activeOutputType === 'chart' ? 'active': ''}
                onClick={props.onChange.bind(this, 'chart')}
            >
                Chart
            </button>
        </div>
    );
};

export default applicationsControls;