const authResolver = require('./auth')
const jobsResolver = require('./jobs')
const applicationResolver = require('./application')

const rootResolver = {
    ...authResolver,
    ...jobsResolver,
    ...applicationResolver
};

module.exports = rootResolver;



