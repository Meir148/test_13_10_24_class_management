import { Request, Response } from 'express';
import Grade from '../models/grade';
import Student from '../models/student';
import Teacher from '../models/teacher'; 

interface CustomRequest extends Request {
  user?: { id: string }; 
}

export const addGrade = async (req: Request, res: Response): Promise<void> => {
  try {
    const { studentId, score } = req.body;
    const teacherId = (req as CustomRequest).user?.id;

    const teacher = await Teacher.findById(teacherId).populate('class');
    if (!teacher) {
      res.status(404).json({ message: 'Teacher not found' });
      return;
    }

    const student = await Student.findOne({ _id: studentId, class: teacher.class._id });
    if (!student) {
      res.status(404).json({ message: 'Student not found in this class' });
      return;
    }

    const grade = new Grade({
      student: studentId,
      class: teacher.class._id,
      score,
    });

    await grade.save();

    res.status(201).json({ message: 'Grade added successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error adding grade' });
  }
};

