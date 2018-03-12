import { Document } from 'mongoose';
import { IPost } from '../../interfaces/post';

export interface IPostModel extends IPost, Document {
}
