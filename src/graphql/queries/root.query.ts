import { GraphQLObjectType } from 'graphql';

import { users } from './all-users.query';
import { comment } from './comment.query';
import { post } from './post.query';
import { user } from './user.query';

export const RootQuery = new GraphQLObjectType({
  name: 'RootQuery',
  fields: {
    comment,
    post,
    user,
    users,
  },
});
