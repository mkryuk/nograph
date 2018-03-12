import * as mongoose from 'mongoose';

import { IUser } from '../../interfaces/user';
import { appModel } from '../../mongo/models/app.model';
import { IUserModel } from '../../mongo/models/user.model';

export class UserMongoResource {

  constructor(private User: mongoose.Model<IUserModel>) {
  }

  public getUsers(skip: number, limit: number): Promise<IUser[]> {
    return this.User.find({})
      .skip(skip)
      .limit(limit)
      .then((users) => {
        return users;
      });
  }
  public findById(id: string): Promise<IUser> {
    return this.User.findById(id)
      .then((user) => user);
  }
  public addUser(user: IUser): Promise<IUser> {
    return (new this.User(user)).save();
  }
  public deleteUser(id: string) {
    return this.User.remove({ _id: id });
  }
  public async addFriend(userId: string, friendId: string): Promise<IUser> {
    const user = await this.User.findById(userId).populate('friends');
    const friend = await this.User.findById(friendId);
    user.friends.push(friend);
    return user.save();
  }
  public async removeFriend(userId: string, friendId: string) {
    const user = await this.User.findById(userId).populate('friends');
    user.friends = user.friends.filter((f) => f.id !== friendId);
    return user.save();
  }
  public getUserPosts(id: string) {
    return this.User.findById(id)
      .populate('posts')
      .then((user) => user.posts);
  }
  public getUserComments(id: string) {
    return this.User.findById(id)
      .populate('comments')
      .then((user) => user.comments);
  }
  public getUserFriends(id: string) {
    return this.User.findById(id)
      .populate('friends')
      .then((user) => user.friends);
  }
}

export const userMongoResource = new UserMongoResource(appModel.User);
