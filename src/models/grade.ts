import mongoose, { Schema, Document } from 'mongoose';
import { IStudent } from './student';
import { IClass } from './class';

export interface IGrade extends Document {
  student: IStudent['_id'];
  class: IClass['_id'];
  score: number;
}

const GradeSchema: Schema = new Schema({
  student: { type: Schema.Types.ObjectId, ref: 'Student', required: true },
  class: { type: Schema.Types.ObjectId, ref: 'Class', required: true },
  score: { type: Number, required: true }
});

export default mongoose.model<IGrade>('Grade', GradeSchema);