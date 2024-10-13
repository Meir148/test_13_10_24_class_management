import express from 'express';
import { getOwnGrades } from '../controllers/student';
import { authenticateUser, authorizeStudent } from '../middleware/auth';

const router = express.Router();

router.get('/grades', authenticateUser, authorizeStudent, getOwnGrades);

export default router;
