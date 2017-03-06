import * as mongoose from 'mongoose';

export interface IMovie extends mongoose.Document {
  category: mongoose.Types.ObjectId;
  title: string;
  dateReleased: Date;
  rating: 'G' | 'PG' | 'R';
}


let movieSchema = new mongoose.Schema({
  title: {
    type:String,
    required: true
  },
  dateReleased: {
    type: Date,
    required: true,
    min: new Date('1/1/1989')
  },
  rating: {
    enum:['G', 'PG', 'R'],
    type: String,
    required: true
  }
});

export default mongoose.model<IMovie>('Movie', movieSchema);