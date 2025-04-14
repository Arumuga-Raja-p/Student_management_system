# Student Management System

This is a web-based Student Management System that allows users to manage student information, including personal details, attendance, and marks. The system is built using HTML5, CSS3, JavaScript for the frontend, and Node.js with Express for the backend, with PostgreSQL as the database.

## Features

- **Student Information Management**: Add, update, and view student details.
- **Attendance Management**: Mark and view attendance for students.
- **Marksheet Management**: Record and update marks for students in various subjects.
- **Backend**: The backend is powered by Express.js and PostgreSQL for database management.
  
## Technologies Used

### Frontend
- **HTML5**: For structuring the web pages.
- **CSS3**: For styling the web pages.
- **JavaScript**: For dynamic functionality and form handling.

### Backend
- **Node.js**: Server-side environment for running JavaScript code.
- **Express.js**: Framework for building the API endpoints.
- **PostgreSQL**: Database for storing student and marks information.

### Packages Used
- **Express**: Web framework for Node.js.
- **pg (node-postgres)**: PostgreSQL client for Node.js to interact with the database.
- **dotenv**: To manage environment variables.
- **cors**: Middleware for enabling cross-origin requests.
- **body-parser**: Middleware for parsing request bodies.

## Installation

### Prerequisites
- Node.js
- PostgreSQL

### Steps to Set Up

1. **Clone the repository**:
   ```bash
   git clone https://github.com/yourusername/student-management-system.git
   cd student-management-system
2. Install the required packages:

------npm install

------npm init -y

3.Set up the database:

Create a PostgreSQL database and set up the tables for students, marks, and attendance as described in the code.

Update the .env file with the correct database credentials.

3. Run the backend server: npm start

4. Open the frontend in the browser: Navigate to http://localhost:5000 in your web browser to interact with the Student Management System.

Usage

* Student Management: Add, edit, and view students' information.

* Attendance: Mark attendance for students.

* Marksheet: Enter and view students' marks in various subjects.
