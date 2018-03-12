import { IComment } from './comment';
import { IUser } from './user';

export interface IPost {
  id?: any;
  title: string;
  user: IUser;
  content: string;
  comments?: IComment[];
}
