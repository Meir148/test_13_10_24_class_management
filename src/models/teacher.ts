import mongoose, { Schema, Document } from 'mongoose';
import { IClass } from './class';

export interface ITeacher extends Document {
  name: string;
  email: string;
  password: string;
  class: IClass['_id'];
}

const TeacherSchema: Schema = new Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  class: { type: Schema.Types.ObjectId, ref: 'Class', required: true }
});

export default mongoose.model<ITeacher>('Teacher', TeacherSchema);