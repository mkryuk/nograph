import { GraphQLFieldConfig, GraphQLInt, GraphQLList, GraphQLString } from 'graphql';

import { IUser } from '../../interfaces/user';
import { userMongoResource } from '../../resources/user/user-mongo.resource';
import { UserType } from '../types/user.type';

export const users: GraphQLFieldConfig<any, any> = {
  type: new GraphQLList(UserType),
  args: { skip: { type: GraphQLInt }, limit: {type: GraphQLInt} },
  resolve(parentValue: any, {skip, limit}) {
    return userMongoResource.getUsers(skip, limit);
  },
};
