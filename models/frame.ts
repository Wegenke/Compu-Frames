import * as mongoose from 'mongoose';

export interface IFrame extends mongoose.Document {
  name: string;
  type: 'traditional' | 'rustic' | 'fancy';
  price: number;
  description: string;
  img: string;

} 

let frameSchema = new mongoose.Schema({
  name: {
    type:String,
    required: true
  },
  type: {
    enum:['traditional', 'rustic', 'fancy'],
    type: String,
    required: true
  },
  price:{
    type: String,
    required: true
  },
  description:{
    type: String,
    required: true
  },
  img:{
    type: String,
    required: true
  }
  

});

export default mongoose.model<IFrame>('Frame', frameSchema);