import { Schema } from 'mongoose';

export const UserSchema = new Schema({
  firstName: { type: String },
  lastName: { type: String },
  email: { type: String },
  password: { type: String },
  posts: [{
    type: Schema.Types.ObjectId,
    ref: 'post',
  }],
  comments: [{
    type: Schema.Types.ObjectId,
    ref: 'comment',
  }],
  friends: [{
    type: Schema.Types.ObjectId,
    ref: 'user',
  }],
});
