import express from 'express';
import { addGrade, getStudents, updateGrade, getClassAverage, getStudentGrade } from '../controllers/teacher';
import { authenticateUser, authorizeTeacher } from '../middleware/auth';

const router = express.Router();

router.post('/grades', authenticateUser, authorizeTeacher, addGrade);
router.get('/students', authenticateUser, authorizeTeacher, getStudents);
router.put('/grades/:gradeId', authenticateUser, authorizeTeacher, updateGrade);
router.get('/class/average', authenticateUser, authorizeTeacher, getClassAverage);
router.get('/student/:studentId/grade', authenticateUser, authorizeTeacher, getStudentGrade);

export default router;