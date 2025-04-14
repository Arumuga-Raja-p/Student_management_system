document.addEventListener("DOMContentLoaded", () => {
    const tableBody = document.querySelector("#attendanceTable tbody");
    const presentCount = document.getElementById("presentCount");
    const absentCount = document.getElementById("absentCount");
    const notMarkedCount = document.getElementById("notMarkedCount");
  
    async function loadAttendance() {
      try {
        const res = await fetch("http://localhost:5000/attendance/today");
        const students = await res.json();
  
        let present = 0, absent = 0, notMarked = 0;
        tableBody.innerHTML = "";
  
        students.forEach((student, index) => {
          if (student.status === "present") present++;
          else if (student.status === "absent") absent++;
          else notMarked++;
  
          const row = document.createElement("tr");
          row.innerHTML = `
            <td>${index + 1}</td>
            <td>${student.name}</td>
            <td>${student.reg_num}</td>
            <td>${student.status}</td>
            <td>
              <button class="btn" onclick="markAttendance(${student.id}, 'present')">Present</button>
              <button class="btn" onclick="markAttendance(${student.id}, 'absent')">Absent</button>
            </td>
          `;
          tableBody.appendChild(row);
        });
  
        presentCount.textContent = present;
        absentCount.textContent = absent;
        notMarkedCount.textContent = notMarked;
      } catch (err) {
        console.error("Error loading attendance:", err);
      }
    }
  
    window.markAttendance = async (id, status) => {
      try {
        const res = await fetch("http://localhost:5000/attendance", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ student_id: id, status }),
        });
  
        const result = await res.json();
  
        if (res.ok) {
          loadAttendance();
        } else {
          alert(result.message);
        }
      } catch (err) {
        console.error("Error marking attendance:", err);
      }
    };
  
    loadAttendance();
  });
  