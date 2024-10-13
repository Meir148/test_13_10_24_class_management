import { Request, Response } from 'express';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import Teacher from '../models/teacher';
import Student from '../models/student';
import Class from '../models/class';


export const registerTeacher = async (req: Request, res: Response) => {
    // console.log('Request Body:', req.body)
  try {
    const { name, email, password, className } = req.body;

    const existingTeacher = await Teacher.findOne({ email });
    if (existingTeacher) {
      return res.status(400).json({ message: 'Teacher already exists' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    
    const teacher = new Teacher({
      name,
      email,
      password: hashedPassword,
    });
    await teacher.save();

    const newClass = new Class({ 
      name: className, 
      teacher: teacher._id, 
      students: [] 
    });
    await newClass.save();

    res.status(201).json({ message: 'Teacher registered successfully' });
  } catch (error) {
    console.error('Error:', error); 
    res.status(500).json({ message: 'Error registering teacher' });
  }
};



export const registerStudent = async (req: Request, res: Response) => {
    // console.log('Request Body:', req.body);
  try {
    const { name, email, password, classId } = req.body;

    const existingStudent = await Student.findOne({ email });
    if (existingStudent) {
      return res.status(400).json({ message: 'Student already exists' });
    }

    const classExists = await Class.findById(classId);
    if (!classExists) {
      return res.status(400).json({ message: 'Class does not exist' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const student = new Student({
      name,
      email,
      password: hashedPassword,
      class: classId
    });

    await student.save();

    await Class.findByIdAndUpdate(classId, { $push: { students: student._id } });

    res.status(201).json({ message: 'Student registered successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error registering student' });
  }
};




export const login = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;

    const teacher = await Teacher.findOne({ email });
    const student = await Student.findOne({ email });

    if (!teacher && !student) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    const user = teacher || student;
if (!user) {
  return res.status(400).json({ message: 'Invalid credentials' });
}
const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    const token = jwt.sign(
      { userId: user._id, role: teacher ? 'teacher' : 'student' },
      process.env.JWT_SECRET as string,
      { expiresIn: '8h' }
    );

    res.json({ token });
  } catch (error) {
    res.status(500).json({ message: 'Error logging in' });
  }
};
