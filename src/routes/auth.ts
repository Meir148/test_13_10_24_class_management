// import { Request, Response } from 'express';
import { registerTeacher, registerStudent, login } from '../controllers/auth';

const router = require('express').Router();

router.post('/register/teacher', registerTeacher);
router.post('/register/student', registerStudent);
router.post('/login', login);

export default router;