const Application = require('../../models/application');
const { transformApplication, transformJob } =require('./merge');

module.exports = {

    applications: async (args, req) => {
        if(!req.isAuth) {
            throw new Error('Unauthenticated!');
        }
        try {
            const applications = await Application.find();
            return applications.map(application => {
                return transformApplication(application);
            })
        } catch(err) {
            throw err;
        }
    },

    applyJob: async (args, req) => {
        if(!req.isAuth) {
            throw new Error('Unauthenticated!');
        }
        try {
            const fetchedJob = await Event.findOne({_id: args.jobId})
            const application = new Application ({
                user: req.userId,
                job: fetchedJob
            });
            const result = await application.save();
            return transformApplication(result);
        } catch(err) {    
            throw err;
        }
    },

    cancelApplication: async (args, req )=> {
        if(!req.isAuth) {
            throw new Error('Unauthenticated!');
        }
        try {
            const application = await Application.findById(args.applicationId).populate('job');
            const job = transformJob(application.job);
            await Application.deleteOne({_id: args.applicationId});
            return job;
        } catch(err){
            throw err;
        }
    }
}