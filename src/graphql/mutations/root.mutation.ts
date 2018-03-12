import { GraphQLObjectType } from 'graphql';

import { createComment } from './comment/create-comment.mutation';
import { deleteComment } from './comment/delete-comment.mutation';

import { createPost } from './post/create-post.mutation';
import { deletePost } from './post/delete-post.mutation';

import { addFriend } from './user/add-friend.mutation';
import { createUser } from './user/create-user.mutation';
import { deleteUser } from './user/delete-user.mutation';
import { removeFriend } from './user/remove-friend.mutation';
export const RootMutation = new GraphQLObjectType({
  name: 'RootMutation',
  fields: {
    // Users
    addFriend,
    createUser,
    deleteUser,
    removeFriend,
    // Post
    createPost,
    deletePost,
    // Comment
    createComment,
    deleteComment,
  },
});
