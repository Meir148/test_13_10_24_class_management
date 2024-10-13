import { Request, Response } from 'express';
import Grade from '../models/grade';


export const getOwnGrades = async (req: any, res: Response) => {
    try {
      const studentId = req.user.id;
  
      const grades = await Grade.find({ student: studentId });
  
      res.json(grades);
    } catch (error) {
      res.status(500).json({ message: 'Error fetching grades' });
    }
  };