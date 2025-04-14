import {Router} from 'express';
import { pool } from './database/db';

const studentsRouter = Router();

studentsRouter.post('/', async (req: any, res: any) => {
    const { name, email, reg_num, phone} = req.body;
    

    if (!name || !email || !phone || !reg_num) {
        return res.status(400).json({ message: "All fields are required" });
    }

    try {
        await pool.query(
            'INSERT INTO students (name,email,reg_num,phone) VALUES ($1, $2, $3, $4)',
            [name, email, reg_num, phone]  
        );

        return res.status(200).json({ message: "Students list created successfully" });
    } catch (error) {
        console.error("Error inserting student:", error);
        return res.status(500).json({ message: "Internal server error" });
    }
});
studentsRouter.get('/', async (req: any, res: any) => {
    try {
        const result = await pool.query("SELECT * FROM students");
        return res.status(200).json(result.rows);
    } catch (error) {
        console.error("Error fetching students:", error);
        return res.status(500).json({ message: "Internal server error" });
    }
});

// UPDATE student
studentsRouter.put('/:id', async (req: any, res: any) => {
    const { id } = req.params;
    const { name, email, reg_num, phone } = req.body;
  
    try {
      await pool.query(
        'UPDATE students SET name=$1, email=$2, reg_num=$3, phone=$4 WHERE id=$5',
        [name, email, reg_num, phone, id]
      );
      return res.status(200).json({ message: "Student updated successfully" });
    } catch (error) {
      console.error("Error updating student:", error);
      return res.status(500).json({ message: "Internal server error" });
    }
  });
  
  // DELETE student
  studentsRouter.delete('/:id', async (req: any, res: any) => {
    const { id } = req.params;
  
    try {
      await pool.query('DELETE FROM students WHERE id=$1', [id]);
      return res.status(200).json({ message: "Student deleted successfully" });
    } catch (error) {
      console.error("Error deleting student:", error);
      return res.status(500).json({ message: "Internal server error" });
    }
  });
  

export default studentsRouter;