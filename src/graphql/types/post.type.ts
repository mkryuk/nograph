import { GraphQLID, GraphQLList, GraphQLObjectType, GraphQLString } from 'graphql';

import { postMongoResource } from '../../resources/post/post-mongo.resource';
import { CommentType } from './comment.type';
import { UserType } from './user.type';

export const PostType: GraphQLObjectType = new GraphQLObjectType({
  name: 'Post',
  fields: () => ({
    id: { type: GraphQLID },
    title: { type: GraphQLString },
    user: {
      type: UserType,
      resolve(parentValue) {
        return postMongoResource.getUserByPostId(parentValue.id);
      },
    },
    content: { type: GraphQLString },
    comments: {
      type: new GraphQLList(CommentType),
      resolve(parentValue) {
        return postMongoResource.getPostComments(parentValue.id);
      },
    },

  }),
});
