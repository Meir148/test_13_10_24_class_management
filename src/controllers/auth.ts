import { Request, Response } from 'express';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import Teacher from '../models/teacher';
import Student from '../models/student';
import Class from '../models/class';

export const registerTeacher = async (req: Request, res: Response) => {
  try {
    const { name, email, password, className } = req.body;
    // console.log(name, email, password, className)

    const existingTeacher = await Teacher.findOne({ email });
    if (existingTeacher) {
      return res.status(400).json({ message: 'Teacher already exists' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    // console.log(hashedPassword);
    

    const newClass = new Class({ 
        name: className, 
        students: [] 
      });
      await newClass.save().catch(err => {
        console.error('Error saving class:', err);
      }); 
      
      const teacher = new Teacher({
        name,
        email,
        password: hashedPassword,
        class: newClass._id 
      });

    //   console.log(teacher);
      
      await teacher.save();
      
   

    res.status(201).json({ message: 'Teacher registered successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error registering teacher' });
  }
};



