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
const isAuth = require('./middleware/is-auth')


const graphQLSchema = require('./graphql/schema/index');
const graphQLResolvers = require('./graphql/resolvers/index');

const app = express();

app.use(bodyParser.json());

app.use((req,res,next)=> {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'POST, GET, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    if(req.method ==='OPTIONS') {
        return res.sendStatus(200);
    }
    next();
});

app.use(isAuth);



app.use(
    '/graphql', 
    graphqlHttp({
    schema: graphQLSchema,
    rootValue: graphQLResolvers,
    graphiql: true
  })
);


mongoose.connect(`mongodb+srv://${process.env.MONGO_USER}:${process.env.MONGO_PASSWORD}@cluster0-bdg3q.azure.mongodb.net/${process.env.MONGO_DB}?retryWrites=true&w=majority`, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(()=> {
    app.listen(8000);
    console.log('Now listening on port 8000');
}).catch(err=> {
    console.log(err);
});
