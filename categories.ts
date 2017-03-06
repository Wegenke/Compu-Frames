import * as mongoose from 'mongoose';
import {IMovie} from './movie';

export interface ICategory extends mongoose.Document {
  name: string;
  movies: IMovie[]
}


let categorySchema = new mongoose.Schema({
  name: {
    type:String,
    required: true
  },
  movies : [{ type: mongoose.Schema.Types.ObjectId, ref: 'Movie' }]
});

export default mongoose.model<ICategory>('Category', categorySchema);