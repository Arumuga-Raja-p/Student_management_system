import { Router, Request, Response } from 'express';
import { pool } from './database/db';

const attendanceRouter = Router();

// GET today's attendance
attendanceRouter.get('/today', async (req: Request, res: Response) => {
  try {
    const result = await pool.query(`
      SELECT s.id, s.name, s.reg_num, COALESCE(a.status, 'not-marked') AS status
      FROM students s
      LEFT JOIN (
        SELECT * FROM attendance WHERE date = CURRENT_DATE
      ) a ON s.id = a.student_id
      ORDER BY s.id;
    `);
    res.status(200).json(result.rows);
  } catch (error) {
    console.error("Error fetching today's attendance:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});

// POST mark attendance
attendanceRouter.post('/', async (req: any, res: any) => {
  const { student_id, status } = req.body;

  if (!student_id || !status) {
    return res.status(400).json({ message: "Student ID and status are required" });
  }

  try {
    await pool.query(
      `
      INSERT INTO attendance (student_id, status, date)
      VALUES ($1, $2, CURRENT_DATE)
      ON CONFLICT (student_id, date)
      DO UPDATE SET status = EXCLUDED.status;
      `,
      [student_id, status]
    );

    res.status(200).json({ message: "Attendance marked successfully" });
  } catch (error) {
    console.error("Error marking attendance:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});

export default attendanceRouter;
