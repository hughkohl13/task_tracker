// express server application framework for nodejs
const express = require('express');
// bodyparser to interpret json object format
const bodyParser = require('body-parser');
// query language for express middleware requests
const graphqlHttp = require('express-graphql');
// graphql schema definitions for query and mutations
const { buildSchema } = require('graphql');
// object data modeling library for mongodb
const mongoose  = require('mongoose');
// hashing function for password
const bcrypt = require('bcryptjs');

const app = express();

// import Job and User schemas from models
const Job = require('./models/job');
const User = require('./models/user');

app.use(bodyParser.json());

app.use(
    // set route for graphql api - localhost:3000/graphql
    '/graphql', 
    graphqlHttp({
    schema: buildSchema(`
        type Job {
            _id: ID
            role: String
            company: String
            description: String
            url: String
            date: String
        }

        type User {
            _id: ID!
            email: String!
            password: String
        }

        input UserInput {
            email: String!
            password: String!
        }

        input JobInput {
            role: String
            company: String
            description: String
            url: String
            date: String
        }

        type RootQuery {
            jobs: [Job!]!     
        }

        type RootMutation {
            createJob(jobInput: JobInput): Job
            createUser(userInput: UserInput): User
        }

        schema {
            query: RootQuery
            mutation: RootMutation
        }
    `),

    rootValue: { 
        jobs: () => {
            Job.find()
                .then(jobs => {
                    return jobs.map(job => {
                        return { ...job._doc, _id: job.id };
                    })
                })
                .catch(err=> {
                    throw err;
            })
        },

        // this is our graphql query post request info
        createJob: args => {
            // create new job from the graphql jobInput query
            const job = new Job({
                role: args.jobInput.role,
                description: args.jobInput.description,
                company: args.jobInput.company,
                url: args.jobInput.url,
                date: new Date(args.jobInput.date),
                creator: '5eb82ad3e578853703d5fd9b'
            });
            // set createdJob variable outside .then process flows for reference to other .then functions
            let createdJob;
            return job
             .save()
             .then(result=> {
                createdJob = { ...result._doc, _id: job.id };
                return User.findById('5eb82ad3e578853703d5fd9b');
             })
             .then(user=> {
                if (!user) {
                    throw new Error('User not found.');
                }
                // push createdJob to db
                user.createdJob.push(job);
                return user.save();
             })
             .then(result=> {
                return createdJob;
             })
             .catch(err =>{
                console.log(err);
                throw err;
            });
        },

        createUser: args => {
            return User.findOne({email: args.userInput.email}).then(user=> {
                if (user) {
                    throw new Error('User exists already.')
                }
                // hash the password with 12 rounds of salt
                // this is returned to the next .then function
                return bcrypt.hash(args.userInput.password, 12);
            })
            // with return of bcrypt hash set that to new hashedpassword save to the user db
            .then(hashedPassword => {
                    const user = new User({
                    email: args.userInput.email,
                    password: hashedPassword
                });
                // we save this result instead of update because we have called the new user to the client side code and we are now writing back the whole thing 
                // update would update the server directly without needing to bring the data to the client first - much faster
                return user.save();
            })
            // return result like what we see in graphiql
            .then(result => {
                return {...result._doc, password: null, _id: result.id};
            })
            .catch(err=> {
                throw err;
            });
        }
     },
     graphiql: true
  })
);


mongoose.connect(`mongodb+srv://${process.env.MONGO_USER}:${process.env.MONGO_PASSWORD}@cluster0-bdg3q.azure.mongodb.net/${process.env.MONGO_DB}?retryWrites=true&w=majority`, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(()=> {
    app.listen(3000);
    console.log('Now listening on port 3000');
}).catch(err=> {
    console.log(err);
});
