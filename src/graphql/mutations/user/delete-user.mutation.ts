import { UserType } from '../../types/user.type';

import { GraphQLFieldConfig, GraphQLNonNull, GraphQLString } from 'graphql';
import { userMongoResource } from '../../../resources/user/user-mongo.resource';

export const deleteUser: GraphQLFieldConfig<any, any> = {
  type: UserType,
  args: {
    id: { type: new GraphQLNonNull(GraphQLString) },
  },
  resolve(parentValue, { id }) {
    return userMongoResource.deleteUser(id);
  },
};
