const API_URL = 'http://localhost:5000';

document.addEventListener("DOMContentLoaded", () => {
    const studentForm = document.getElementById("studentForm");
    const studentsTableBody = document.querySelector("#studentsTable tbody");
    const studentIdInput = document.getElementById("studentId");
  
    let editingStudentId = null;
  
    fetchStudents();
  
    studentForm.addEventListener("submit", async (e) => {
      e.preventDefault();
  
      const student = {
        name: document.getElementById("name").value,
        email: document.getElementById("email").value,
        reg_num: document.getElementById("req-num").value,
        phone: document.getElementById("phone").value,
      };
  
      try {
        let url = `${API_URL}/students`;
        let method = "POST";
  
       
        if (editingStudentId) {
          url += `/${editingStudentId}`;
          method = "PUT";
        }
  
        const response = await fetch(url, {
          method,
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(student),
        });
  
        const result = await response.json();
  
        if (response.ok) {
          alert(editingStudentId ? "Student updated!" : "Student added!");
          resetForm();
          fetchStudents();
        } else {
          alert(result.message || "Operation failed.");
        }
      } catch (error) {
        console.error("Error:", error);
        alert("Server error.");
      }
    });
  
    async function fetchStudents() {
      try {
        const response = await fetch(`${API_URL}/students`);
        const students = await response.json();
  
        studentsTableBody.innerHTML = "";
  
        students.forEach((student, index) => {
          const row = document.createElement("tr");
  
          row.innerHTML = `
            <td>${index + 1}</td>
            <td>${student.name}</td>
            <td>${student.email}</td>
            <td>${student.reg_num}</td>
            <td>${student.phone}</td>
            <td>
              <button class="btn" onclick="editStudent(${student.id}, '${student.name}', '${student.email}', '${student.reg_num}', '${student.phone}')">Edit</button>
              <button class="btn btn-cancel" onclick="deleteStudent(${student.id})">Delete</button>
            </td>
          `;
  
          studentsTableBody.appendChild(row);
        });
      } catch (error) {
        console.error("Error fetching students:", error);
      }
    }
  

    window.resetForm = () => {
      studentForm.reset();
      editingStudentId = null;
      studentIdInput.value = "";
    };


  
    // Edit student
    window.editStudent = (id, name, email, reg_num, phone) => {
      document.getElementById("name").value = name;
      document.getElementById("email").value = email;
      document.getElementById("req-num").value = reg_num;
      document.getElementById("phone").value = phone;
  
      editingStudentId = id;
    };



  
    //Delete student
    window.deleteStudent = async (id) => {
      if (confirm("Are you sure you want to delete this student?")) {
        try {
          const response = await fetch(`http://localhost:5000/students/${id}`, {
            method: "DELETE",
          });
  
          const result = await response.json();
  
          if (response.ok) {
            alert("Student deleted.");
            fetchStudents();
          } else {
            alert(result.message || "Delete failed.");
          }
        } catch (error) {
          console.error("Error deleting student:", error);
        }
      }
    };
  });
  