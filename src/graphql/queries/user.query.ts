import { GraphQLFieldConfig, GraphQLString } from 'graphql';

import { IUser } from '../../interfaces/user';
import { userMongoResource } from '../../resources/user/user-mongo.resource';
import { UserType } from '../types/user.type';

export const user: GraphQLFieldConfig<any, any> = {
  type: UserType,
  args: { id: { type: GraphQLString } },
  resolve(parentValue: any, args: IUser) {
    return userMongoResource.findById(args.id);
  },
};
