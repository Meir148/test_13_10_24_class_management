// class model - taecher and list of students 
import mongoose, { Schema, Document } from 'mongoose';
import { ITeacher } from './teacher';
import { IStudent } from './student';

export interface IClass extends Document {
  name: string;
  teacher: ITeacher['_id'];
  students: IStudent['_id'][];
//   teacher: Schema.Types.ObjectId;
//     students: Schema.Types.ObjectId[];
}

const ClassSchema: Schema = new Schema({
  name: { type: String, required: true },
  teacher: { type: Schema.Types.ObjectId, ref: 'Teacher', required: true },
  students: [{ type: Schema.Types.ObjectId, ref: 'Student' }]
});




export default mongoose.model<IClass>('Class', ClassSchema);