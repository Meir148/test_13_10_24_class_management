// class model - taecher and list of students 
import mongoose, { Schema, Document, Types } from 'mongoose';
import { ITeacher } from './teacher';
import { IStudent } from './student';

export interface IClass extends Document {
  _id: Types.ObjectId;
  name: string;
  teacher: ITeacher['_id'];
  students: IStudent['_id'][];
}

const ClassSchema: Schema<IClass> = new Schema({
  name: { type: String, required: true },
  teacher: { type: Schema.Types.ObjectId, ref: 'Teacher', required: true },
  students: [{ type: Schema.Types.ObjectId, ref: 'Student' }],
});

export default mongoose.model<IClass>('Class', ClassSchema);
