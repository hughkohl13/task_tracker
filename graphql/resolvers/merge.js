const Job = require('../../models/job');
const User = require('../../models/user');
const { dateToString } = require('../../helpers/date');


const jobs = async jobIds => {
    try {
    const jobs = await Job.find({_id: {$in: jobIds}})
    return jobs.map(job => {
            return(transformJob);
        });
    } catch (err) {
        throw err;
    };
}

const singleJob = async jobId => {
    try {
        const job = await Job.findById(jobId);
        return transformJob(job);
    } catch(err){
        throw err;
    }
}

const user = async userId => {
    try {
        const user = await User.findById(userId)
            return {
                ...user._doc,
                _id: user.id,
                createdJob: jobs.bind(this, user._doc.createdJob),
            };
    } catch (err) {
        throw err;
    };
}

const transformJob = job => {
    return {
        ...job._doc,
        _id:job.id,
        date: dateToString(job._doc.date),
        creator: user.bind(this, job.creator)
    };
}

const transformApplication = application=> {
    return {
        ...result._doc,
        _id: result.id, 
        user: user.bind(this, application._doc.user),
        job: singleJob.bind(this, application._doc.event),
        createdAt: dateToString(result._doc.createdAt),
        updatedAt: dateToString(result._doc.updatedAt)
    }
}

exports.transformApplication = transformApplication;
exports.transformJob = transformJob;
