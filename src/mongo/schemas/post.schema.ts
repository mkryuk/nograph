import { Schema } from 'mongoose';
export const PostSchema = new Schema({
  title: { type: String },
  user: {
    type: Schema.Types.ObjectId,
    ref: 'user',
  },
  content: { type: String },
  comments: [{
    type: Schema.Types.ObjectId,
    ref: 'comment',
  }],
});
