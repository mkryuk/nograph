import { IPost } from './post';
import { IUser } from './user';

export interface IComment {
  id?: any;
  content: string;
  post: IPost;
  user: IUser;
}
