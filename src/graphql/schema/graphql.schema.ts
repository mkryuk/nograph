import { GraphQLSchema } from 'graphql';

import { RootMutation } from '../mutations/root.mutation';
import { RootQuery } from '../queries/root.query';

export const RootGraphQLSchema = new GraphQLSchema({
  query: RootQuery,
  mutation: RootMutation,
});
