import { GraphQLFieldConfig, GraphQLID } from 'graphql';

import { postMongoResource } from '../../../resources/post/post-mongo.resource';
import { PostType } from '../../types/post.type';

export const deletePost: GraphQLFieldConfig<any, any> = {
  type: PostType,
  args: {
    postId: { type: GraphQLID },
  },
  resolve(parentValue, { postId }) {
    return postMongoResource.deletePost(postId);
  },
};
