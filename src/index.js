import { GraphQLServer, PubSub } from 'graphql-yoga';
// db
import db from './db';
// resolvers
import Query from './resolvers/qeury';
import Mutation from './resolvers/mutation';
import Subscription from './resolvers/subscription';
import Comment from './resolvers/comment';
import Post from './resolvers/post';
import User from './resolvers/user';

const pubsub = new PubSub();

const server = new GraphQLServer({
  typeDefs: './src/schema.graphql',
  resolvers: {
    Query,
    Mutation,
    Subscription,
    Comment,
    Post,
    User,
  },
  context: {
    db,
    pubsub,
  },
});

server.start(() => {
  console.log('The server is up!');
});
