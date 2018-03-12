import { GraphQLFieldConfig, GraphQLNonNull, GraphQLString } from 'graphql';

import { IUser } from '../../../interfaces/user';
import { userMongoResource } from '../../../resources/user/user-mongo.resource';
import { UserType } from '../../types/user.type';

export const createUser: GraphQLFieldConfig<any, any> = {
  type: UserType,
  args: {
    firstName: { type: new GraphQLNonNull(GraphQLString) },
    lastName: { type: new GraphQLNonNull(GraphQLString) },
    email: { type: new GraphQLNonNull(GraphQLString) },
    password: { type: new GraphQLNonNull(GraphQLString) },
  },
  resolve(parentValue, user: IUser) {
    return userMongoResource.addUser(user);
  },
};
