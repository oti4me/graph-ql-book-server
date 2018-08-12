import express from 'express';
import expresGraphQL from 'express-graphql';

const app = express();

const PORT = process.env.PORT || 3002;

app.listen(PORT, () => {
  console.log('App started and running on port 3002');
});