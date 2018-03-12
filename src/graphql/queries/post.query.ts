import { GraphQLFieldConfig, GraphQLString } from 'graphql';

import { IUser } from '../../interfaces/user';
import { postMongoResource } from '../../resources/post/post-mongo.resource';
import { PostType } from '../types/post.type';

export const post: GraphQLFieldConfig<any, any> = {
  type: PostType,
  args: { id: { type: GraphQLString } },
  resolve(parentValue: any, args: IUser) {
    return postMongoResource.findById(args.id);
  },
};
