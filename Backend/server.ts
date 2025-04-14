import express from "express";
import cors from 'cors';
import authRouter from './auth';
import studentsRouter from "./students";
import attendanceRouter from "./attendence";
import marksheetRouter from "./marksheet";
const PORT = 5000;

const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));

app.use('/auth', authRouter);
app.use('/students',studentsRouter);
app.use('/attendance', attendanceRouter);
app.use('/marksheet', marksheetRouter);

app.listen(PORT, () => {
  console.log(`Server is running at http://localhost:${PORT}`);
});
