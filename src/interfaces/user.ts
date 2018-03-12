import { IComment } from './comment';
import { IPost } from './post';

export interface IUser {
  id?: any;
  firstName: string;
  lastName: string;
  email: string;
  posts?: IPost[];
  comments?: IComment[];
  friends?: IUser[];
}
