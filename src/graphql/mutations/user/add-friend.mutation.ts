import { GraphQLFieldConfig, GraphQLID } from 'graphql';

import { userMongoResource } from '../../../resources/user/user-mongo.resource';
import { UserType } from '../../types/user.type';

export const addFriend: GraphQLFieldConfig<any, any> = {
  type: UserType,
  args: {
    userId: { type: GraphQLID },
    friendId: { type: GraphQLID },
  },
  resolve(parentValue, { userId, friendId }) {
    return userMongoResource.addFriend(userId, friendId);
  },
};
