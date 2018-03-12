import { GraphQLFieldConfig, GraphQLID, GraphQLNonNull, GraphQLString } from 'graphql';

import { postMongoResource } from '../../../resources/post/post-mongo.resource';
import { PostType } from '../../types/post.type';

export const createPost: GraphQLFieldConfig<any, any> = {
  type: PostType,
  args: {
    title: { type: new GraphQLNonNull(GraphQLString) },
    userId: { type: GraphQLID },
    content: { type: new GraphQLNonNull(GraphQLString) },
  },
  resolve(parentValue, { userId, title, content }) {
    return postMongoResource.createPost(userId, title, content);
  },
};
