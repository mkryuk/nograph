import { GraphQLFieldConfig, GraphQLString } from 'graphql';

import { IUser } from '../../interfaces/user';
import { commentMongoResource } from '../../resources/comment/comment-mongo.resource';
import { CommentType } from '../types/comment.type';

export const comment: GraphQLFieldConfig<any, any> = {
  type: CommentType,
  args: { id: { type: GraphQLString } },
  resolve(parentValue: any, args: IUser) {
    return commentMongoResource.findById(args.id);
  },
};
