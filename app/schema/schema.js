import { 
  GraphQLObjectType,
  GraphQLString, GraphQLSchema,
  GraphQLID,
  GraphQLList,
  GraphQLInt 
} from 'graphql';
import _ from 'lodash';

const books = [
  { name: 'Eric and the grain', genre: 'Fiction', id: '1', authorId: '1' },
  { name: 'Beans and Bread', genre: 'Food', id: '2', authorId: '3' },
  { name: 'Heaven', genre: 'Religion', id: '3', authorId: '2' }
];

const authors = [
  { name: 'Eric James', id: '1', age: 54 },
  { name: 'James Gosling', id: '2', age: 43 },
  { name: 'Henry Otighe', id: '3', age: 30 }
];

const BookType = new GraphQLObjectType({
  name: 'Book',
  fields: () => ({
    id: { type: GraphQLID},
    name: { type: GraphQLString },
    genre: { type: GraphQLString},
    author: {
      type: AuthorType,
      resolve(parent, args){
        return _.find(authors, {id: parent.id});
      }
    }
  })
});

const AuthorType = new GraphQLObjectType({
  name: 'Author',
  fields: () => ({
    id: { type: GraphQLID },
    name: { type: GraphQLString },
    age: { type: GraphQLInt },
  })
});

const RootQuery = new GraphQLObjectType({
  name: 'RootQueryType',
  fields: {
    book: {
      type: BookType,
      args: { id: { type: GraphQLID }},
      resolve(parent, args) {
        return _.find(books, { id: args.id });
      }
    },
    author: {
      type: AuthorType,
      args: { id: { type: GraphQLID } },
      resolve(parent, args) {
        return _.find(authors, { id: args.id });
      }
    },
    authors: {
      type: GraphQLList(AuthorType),
      resolve(parent, args) {
        return authors;
      }
    },
    books: {
      type: GraphQLList(BookType),
      resolve(parent, args) {
        return books;
      }
    }
  }
});

export default new GraphQLSchema({
  query: RootQuery
});