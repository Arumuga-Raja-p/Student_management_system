import {Router} from 'express';
import { pool } from './database/db';


const authRouter = Router();


// Test database connection
pool.query("SELECT NOW()", (err: any, result: { rows: { now: any; }[]; }) => {
    if (err) {
        console.error("DB connection failed:", err);
    } else {
        console.log("DB connected at:", result.rows[0].now);
    }
});

// API for Login
authRouter.post('/login', async (req: any, res: any) => {
    const { email, password } = req.body;

    if (!email || !password) {
        return res.status(400).json({ message: "Please enter both email and password." });
    }

    try {
        const result = await pool.query("SELECT * FROM users WHERE email = $1", [email]);

        if (result.rows.length === 0) {
            return res.status(401).json({ message: "Invalid email" });
        }

        const user = result.rows[0];

        if (user.password !== password) {
            return res.status(401).json({ message: "Incorrect password" });
        }

        return res.status(200).json({ message: "Login successful", user });
    } catch (err) {
        console.error("Error during login:", err);
        return res.status(500).json({ message: "Internal server error" });
    }
});

// API for Signup
authRouter.post('/signup', async (req: any, res: any) => {
    const { name, email, password} = req.body;

    if (!name || !email || !password) {
        return res.status(400).json({ message: "All fields are required" });
    }

    try {
            await pool.query(
            'INSERT INTO users (name, email, password) VALUES ($1, $2, $3)',
            [name, email, password]
        );

        return res.status(200).json({ message: "User created successfully" });
    } catch (error) {
        console.error("Error inserting user:", error);
        return res.status(500).json({ message: "Internal server error" });
    }
});

export default authRouter;