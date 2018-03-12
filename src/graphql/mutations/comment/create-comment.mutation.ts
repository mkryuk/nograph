import { GraphQLFieldConfig, GraphQLID, GraphQLNonNull, GraphQLString } from 'graphql';

import { commentMongoResource } from '../../../resources/comment/comment-mongo.resource';
import { CommentType } from '../../types/comment.type';

export const createComment: GraphQLFieldConfig<any, any> = {
  type: CommentType,
  args: {
    postId: { type: GraphQLID },
    userId: { type: GraphQLID },
    content: { type: new GraphQLNonNull(GraphQLString) },
  },
  resolve(parentValue, { postId, userId, content }) {
    return commentMongoResource.createComment(postId, userId, content);
  },
};
