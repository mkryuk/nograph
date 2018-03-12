import { GraphQLID, GraphQLList, GraphQLObjectType, GraphQLString } from 'graphql';

import { userMongoResource } from '../../resources/user/user-mongo.resource';
import { CommentType } from './comment.type';
import { PostType } from './post.type';

export const UserType: GraphQLObjectType = new GraphQLObjectType({
  name: 'User',
  fields: () => ({
    id: { type: GraphQLID },
    firstName: { type: GraphQLString },
    lastName: { type: GraphQLString },
    email: { type: GraphQLString },
    password: { type: GraphQLString },
    posts: {
      type: new GraphQLList(PostType),
      resolve(parentValue) {
        return userMongoResource.getUserPosts(parentValue.id);
      },
    },
    comments: {
      type: new GraphQLList(CommentType),
      resolve(parentValue) {
        return userMongoResource.getUserComments(parentValue.id);
      },
    },
    friends: {
      type: new GraphQLList(UserType),
      resolve(parentValue) {
        return userMongoResource.getUserFriends(parentValue.id);
      },
    },
  }),
});
