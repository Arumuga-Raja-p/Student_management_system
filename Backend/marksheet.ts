import express from 'express';
import { pool } from './database/db'; // PostgreSQL pool

const marksheetRouter = express.Router();

// GET method to fetch students
marksheetRouter.get('/', async (req: any, res: any) => {
  try {
    const result = await pool.query('SELECT id, name FROM students');
    res.json(result.rows);
  } catch (err) {
    console.error((err as Error).message);
    res.status(500).send('Server Error');
  }
});

// POST method to save marks for a student
marksheetRouter.post('/:id', async (req: any, res: any) => {
    const studentId = req.params.id;
    const { tamil, english, maths, science, social } = req.body;
  
    try {
      // Get student name
      const result = await pool.query('SELECT name FROM students WHERE id = $1', [studentId]);
      if (result.rows.length === 0) {
        return res.status(404).json({ error: 'Student not found' });
      }
  
      const studentName = result.rows[0].name;
  
      // Insert or update marks with name
      await pool.query(`
        INSERT INTO marks (student_id, student_name, tamil, english, maths, science, social)
        VALUES ($1, $2, $3, $4, $5, $6, $7)
        ON CONFLICT (student_id)
        DO UPDATE 
        SET student_name = EXCLUDED.student_name,
            tamil = EXCLUDED.tamil,
            english = EXCLUDED.english,
            maths = EXCLUDED.maths,
            science = EXCLUDED.science,
            social = EXCLUDED.social;
      `, [studentId, studentName, tamil, english, maths, science, social]);
  
      res.json({ message: "Marks saved successfully" });
    } catch (err) {
      console.error((err as Error).message);
      res.status(500).json({ error: "Error saving marks" });
    }
  });
  
  marksheetRouter.get('/all', async (req, res) => {
    try {
      const result = await pool.query('SELECT * FROM marks ORDER BY student_id');
      res.json(result.rows);
    } catch (err) {
      console.error('Error fetching marks:', err);
      res.status(500).json({ error: 'Error fetching marks' });
    }
  });
  

export default marksheetRouter;
