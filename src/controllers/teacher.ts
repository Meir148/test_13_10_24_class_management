import { Request, Response } from 'express';
import Grade from '../models/grade';
import Student from '../models/student';
import Teacher from '../models/teacher'; 

interface CustomRequest extends Request {
  user?: { id: string }; 
}
// Add a new grade

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

export const getStudents = async (req: Request, res: Response): Promise<void> => {
  try {
    const teacherId = (req as CustomRequest).user?.id;

    const teacher = await Teacher.findById(teacherId).populate('class');
    if (!teacher) {
      res.status(404).json({ message: 'Teacher not found' });
      return;
    }

    const students = await Student.find({ class: teacher.class._id });
    res.json(students);
  } catch (error) {
    res.status(500).json({ message: 'Error getting students' });
  }
};

export const updateGrade = async (req: Request, res: Response): Promise<void> => {
  try {
    const { gradeId } = req.params;
    const { score } = req.body;
    const teacherId = (req as CustomRequest).user?.id;

    const teacher = await Teacher.findById(teacherId);
    if (!teacher) {
      res.status(404).json({ message: 'Teacher not found' });
      return;
    }

    const grade = await Grade.findOne({ _id: gradeId, class: teacher.class._id });
    if (!grade) {
      res.status(404).json({ message: 'Grade not found' });
      return;
    }

    grade.score = score;
    await grade.save();

    res.json({ message: 'Grade updated successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error updating grade' });
  }
};

export const getClassAverage = async (req: Request, res: Response): Promise<void> => {
  try {
    const teacherId = (req as CustomRequest).user?.id;

    const teacher = await Teacher.findById(teacherId);
    if (!teacher) {
      res.status(404).json({ message: 'Teacher not found' });
      return;
    }

    const grades = await Grade.find({ class: teacher.class._id });
    const average = grades.reduce((sum, grade) => sum + grade.score, 0) / grades.length;

    res.json({ average });
  } catch (error) {
    res.status(500).json({ message: 'Error calculating class average' });
  }
};

export const getStudentGrade = async (req: Request, res: Response): Promise<void> => {
  try {
    const { studentId } = req.params;
    const teacherId = (req as CustomRequest).user?.id;

    const teacher = await Teacher.findById(teacherId);
    if (!teacher) {
      res.status(404).json({ message: 'Teacher not found' });
      return;
    }

    const grade = await Grade.findOne({ student: studentId, class: teacher.class._id });
    if (!grade) {
      res.status(404).json({ message: 'Grade not found' });
      return;
    }

    res.json(grade);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching student grade' });
  }
};
