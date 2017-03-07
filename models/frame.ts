import * as mongoose from 'mongoose';

export interface IFrame extends mongoose.Document {
  name: string;
  type: 'traditional' | 'rustic' | 'fancy';
  price: number;
  description: string;
  img: URL;

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
    type: URL,
    required: true
  }
  

});

export default mongoose.model<IFrame>('Frame', frameSchema);