
import express from 'express';
import { addGrade, getStudents, updateGrade, getClassAverage, getStudentGrade } from '../controllers/teacher';
import { authenticateUser, authorizeTeacher } from '../middleware/auth';

const router = express.Router();

/**
 * @swagger
 * /api/teacher/grades:
 *   post:
 *     summary: add grade to student
 *     tags: [Teacher]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - studentId
 *               - score
 *             properties:
 *               studentId:
 *                 type: string
 *               score:
 *                 type: number
 *     responses:
 *       201:
 *         description: Grade added successfully
 *       404:
 *         description: Teacher or Student not found
 */
router.post('/grades', authenticateUser, authorizeTeacher, addGrade);

/**
 * @swagger
 * /api/teacher/students:
 *   get:
 *     summary: get all students in class
 *     tags: [Teacher]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: List of students
 *       404:
 *         description: Teacher not found
 */
router.get('/students', authenticateUser, authorizeTeacher, getStudents);

/**
 * @swagger
 * /api/teacher/grades/{gradeId}:
 *   put:
 *     summary: update student grade
 *     tags: [Teacher]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: gradeId
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - score
 *             properties:
 *               score:
 *                 type: number
 *     responses:
 *       200:
 *         description:  updated 
 *       404:
 *         description: Teacher or Grade not found
 */
router.put('/grades/:gradeId', authenticateUser, authorizeTeacher, updateGrade);

/**
 * @swagger
 * /api/teacher/class/average:
 *   get:
 *     summary: average grade of  class
 *     tags: [Teacher]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Class average
 *       404:
 *         description: Teacher not found
 */
router.get('/class/average', authenticateUser, authorizeTeacher, getClassAverage);

/**
 * @swagger
 * /api/teacher/student/{studentId}/grade:
 *   get:
 *     summary: get specific student grade
 *     tags: [Teacher]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: studentId
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Student's grade
 *       404:
 *         description: Teacher or Grade not found
 */
router.get('/student/:studentId/grade', authenticateUser, authorizeTeacher, getStudentGrade);

export default router;