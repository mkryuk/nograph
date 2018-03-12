import { GraphQLFieldConfig, GraphQLID } from 'graphql';

import { commentMongoResource } from '../../../resources/comment/comment-mongo.resource';
import { CommentType } from '../../types/comment.type';

export const deleteComment: GraphQLFieldConfig<any, any> = {
  type: CommentType,
  args: {
    commentId: { type: GraphQLID },
  },
  resolve(parentValue, { commentId }) {
    return commentMongoResource.deleteComment(commentId);
  },
};
