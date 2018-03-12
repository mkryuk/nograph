import * as mongoose from 'mongoose';

import { IPost } from '../../interfaces/post';
import { appModel } from '../../mongo/models/app.model';
import { ICommentModel } from '../../mongo/models/comment.model';
import { IPostModel } from '../../mongo/models/post.model';
import { IUserModel } from '../../mongo/models/user.model';

export class PostMongoResource {

  constructor(
    private Post: mongoose.Model<IPostModel>,
    private User: mongoose.Model<IUserModel>,
    private Comment: mongoose.Model<ICommentModel>) {
  }

  public findById(id: string): Promise<IPost> {
    return this.Post.findById(id)
      .then((post) => post);
  }

  public getUserByPostId(id: string) {
    return this.Post.findById(id)
      .populate('user')
      .then((post) => post.user);
  }

  public getPostComments(postId: string) {
    return this.Post.findById(postId)
      .populate('comments')
      .then((post) => post.comments);
  }
  public async createPost(userId: string, title: string, content: string): Promise<IPost> {
    const post = new this.Post({ title, content });
    const user = await this.User.findById(userId);
    post.user = user;
    user.posts.push(post);
    return Promise.all([user.save(), post.save()])
      .then(([u, p]) => p);
  }
  public async deletePost(id: string) {
    const post = await this.Post.findById(id).populate('user');
    const user = await this.User.findById(post.user.id).populate('posts');
    user.posts = user.posts.filter((p) => p.id !== id);
    return Promise.all([user.save(), this.Comment.remove({ post: id }), post.remove()]);
  }
}

export const postMongoResource = new PostMongoResource(appModel.Post, appModel.User, appModel.Comment);
