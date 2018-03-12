import * as mongoose from 'mongoose';

import { IComment } from '../../interfaces/comment';
import { appModel } from '../../mongo/models/app.model';
import { ICommentModel } from '../../mongo/models/comment.model';
import { IPostModel } from '../../mongo/models/post.model';
import { IUserModel } from '../../mongo/models/user.model';

export class CommentMongoResource {

  constructor(
    private Comment: mongoose.Model<ICommentModel>,
    private User: mongoose.Model<IUserModel>,
    private Post: mongoose.Model<IPostModel>) {
  }

  public findById(id: string): Promise<IComment> {
    return this.Comment.findById(id)
      .then((comment) => comment);
  }

  public getUserByCommentId(id: string) {
    return this.Comment.findById(id)
      .populate('user')
      .then((comment) => comment.user);
  }

  public getPostByCommentId(id: string) {
    return this.Comment.findById(id)
      .populate('post')
      .then((comment) => comment.post);
  }
  public async createComment(postId: string, userId: string, content: string): Promise<IComment> {
    const comment = new this.Comment({ content });
    const user = await this.User.findById(userId);
    const post = await this.Post.findById(postId);
    comment.post = post;
    comment.user = user;
    user.comments.push(comment);
    post.comments.push(comment);
    return Promise.all([post.save(), comment.save(), user.save()])
      .then(([p, c, u]) => c);
  }
  public async deleteComment(id: string) {
    const comment = await this.Comment.findById(id)
      .populate('post')
      .populate('user');
    if (!comment) {
      return;
    }
    const post = await this.Post.findById(comment.post.id).populate('comments');
    const user = await this.User.findById(comment.user.id).populate('comments');
    post.comments = post.comments.filter((c) => c.id !== comment.id);
    user.comments = user.comments.filter((c) => c.id !== comment.id);
    await post.save();
    return Promise.all([post.save(), user.save(), this.Comment.remove({ _id: id })]);
  }
}

export const commentMongoResource = new CommentMongoResource(appModel.Comment, appModel.User, appModel.Post);
