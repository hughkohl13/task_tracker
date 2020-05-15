import React from 'react';

import JobItem from './JobItem/JobItem';
import './JobList.css';

const JobList = props => {
    const jobs = props.jobs.map(job => {
        return (
            <JobItem
                key={job._id}
                jobId={job._id}
                role={job.role}
                company={job.company}
                description={job.description}
                date={job.date}
                url={job.url}
                userId={props.authUserId}
                creatorID={job.creator._id}
                onDetail={props.onViewDetail}
                />
        );
    });

    return <ul className="job__list">{jobs}</ul>
};

export default JobList;