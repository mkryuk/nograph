import { GraphQLID, GraphQLObjectType, GraphQLString } from 'graphql';

import { commentMongoResource } from '../../resources/comment/comment-mongo.resource';
import { PostType } from './post.type';
import { UserType } from './user.type';

export const CommentType: GraphQLObjectType = new GraphQLObjectType({
  name: 'Comment',
  fields: () => ({
    id: { type: GraphQLID },
    content: { type: GraphQLString },
    post: {
      type: PostType,
      resolve(parentValue) {
        return commentMongoResource.getPostByCommentId(parentValue.id);
      },
    },
    user: {
      type: UserType,
      resolve(parentValue) {
        return commentMongoResource.getUserByCommentId(parentValue.id);
      },
    },
  }),
});
