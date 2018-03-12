import { Document } from 'mongoose';
import { IComment } from '../../interfaces/comment';

export interface ICommentModel extends IComment, Document {
}
