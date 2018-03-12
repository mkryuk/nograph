import * as mongoose from 'mongoose';

import {
  mongoConnectionService,
  MongoConnectionService,
} from '../../services/mongo-connection/mongo-connection.service';
import { CommentSchema } from '../schemas/comment.schema';
import { PostSchema } from '../schemas/post.schema';
import { UserSchema } from '../schemas/user.schema';
import { ICommentModel } from './comment.model';
import { IPostModel } from './post.model';
import { IUserModel } from './user.model';

export interface IAppModel {
  Comment: mongoose.Model<ICommentModel>;
  Post: mongoose.Model<IPostModel>;
  User: mongoose.Model<IUserModel>;
}

export class AppModel implements IAppModel {
  public Comment: mongoose.Model<ICommentModel>;
  public Post: mongoose.Model<IPostModel>;
  public User: mongoose.Model<IUserModel>;
  constructor(mongo: MongoConnectionService) {
    this.Comment = mongo.connection.model<ICommentModel>('comment', CommentSchema);
    this.Post = mongo.connection.model<IPostModel>('post', PostSchema);
    this.User = mongo.connection.model<IUserModel>('user', UserSchema);
  }

}

export const appModel = new AppModel(mongoConnectionService);
