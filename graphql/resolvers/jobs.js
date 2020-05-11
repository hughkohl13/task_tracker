const Job = require('../../models/job');
const { transformJob } = require('./merge');
const User = require('../../models/user');



module.exports = {
    jobs: async () => {
        try {
            const jobs = await Job.find()
                return jobs.map(job => {
                    return transformJob(job);
                });
        } catch(err) {
            throw err;
        };
    },

    // this is our graphql query post request info
    createJob: async (args, req) => {
        if(!req.isAuth) {
            throw new Error('Unauthenticated!');
        }
        const job = new Job({
            role: args.jobInput.role,
            description: args.jobInput.description,
            company: args.jobInput.company,
            url: args.jobInput.url,
            date: new Date(args.jobInput.date),
            creator: req.userId
        });

        let createdJob;
        try {
            const result = await job
            .save()
                createdJob = transformJob(result);
                const creator = await User.findById(req.userId);
                if (!creator) {
                    throw new Error('User not found.');
                }
                // push createdJob to db
                creator.createdJob.push(job);
                await creator.save();
                return createdJob;
        } catch(err) {
            throw err;
        }
    },
}