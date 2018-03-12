import { Schema } from 'mongoose';
export const CommentSchema = new Schema({
  content: { type: String },
  post: {
    type: Schema.Types.ObjectId,
    ref: 'post',
  },
  user: {
    type: Schema.Types.ObjectId,
    ref: 'user',
  },
});
