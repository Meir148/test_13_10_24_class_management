import express from 'express';
import { getOwnGrades } from '../controllers/student';
import { authenticateUser, authorizeStudent } from '../middleware/auth';

const router = express.Router();

router.get('/grades', authenticateUser, authorizeStudent, getOwnGrades);



/**
 * @swagger
 * /api/student/grades:
 *   get:
 *     summary: get student's grades
 *     tags: [Student]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: List of student's grades
 *       500:
 *         description: Error fetching grades
 */
router.get('/grades', authenticateUser, authorizeStudent, getOwnGrades);

export default router;