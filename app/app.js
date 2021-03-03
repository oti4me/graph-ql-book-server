import express from 'express';
import graphQL from 'express-graphql';
import mongoose from 'mongoose';
import schema from './schema/schema';

const app = express();
mongoose.connect('mongodb://username:password@ds119572.mlab.com:19572/bookdb-graphql');
mongoose.connection.once('open', () => {
  console.log('Connected to the db!!');
});

app.use('/graphql', graphQL({ 
  schema,
  graphiql: true
}));

const PORT = process.env.PORT || 3002;

app.listen(PORT, () => {
  console.log('App started and running on port 3002');
});
