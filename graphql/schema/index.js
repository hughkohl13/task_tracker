const { buildSchema } = require('graphql');

module.exports = buildSchema(`

        type Application {
            _id: ID!
            job: Job!
            user: User!
            createdAt: String!
            updatedAt: String!
        }

        type Job {
            _id: ID
            role: String
            company: String
            description: String
            url: String
            date: String
            creator: User!
        }

        type User {
            _id: ID!
            email: String!
            password: String
            createdJobs: [Job!]
        }

        type AuthData {
            userId: ID!
            token: String!
            tokenExpiration: Int!
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
            applications: [Application!]!
            login(email: String!, password: String!): AuthData!
        }

        type RootMutation {
            createJob(jobInput: JobInput): Job
            createUser(userInput: UserInput): User
            applyJob(jobId: ID!): Application!
            cancelApplication(applicationId: ID!): Job!
        }

        schema {
            query: RootQuery
            mutation: RootMutation
        }
    `)