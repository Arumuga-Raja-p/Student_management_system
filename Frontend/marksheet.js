const API_URL = 'http://localhost:5000';
    const studentSelect = document.getElementById('studentSelect');
    const marksForm = document.getElementById('marksForm');
    const formTitle = document.getElementById('formTitle');
    let currentStudentId = null;

    // Load students into dropdown
    fetch(`${API_URL}/marksheet`)
      .then(res => res.json())
      .then(students => {
        students.forEach(student => {
          const option = document.createElement('option');
          option.value = student.id;
          option.textContent = student.name;
          studentSelect.appendChild(option);
        });
      });

    studentSelect.addEventListener('change', () => {
      const studentId = studentSelect.value;
      if (!studentId) {
        marksForm.style.display = 'none';
        return;
      }
      currentStudentId = studentId;
      const selectedText = studentSelect.options[studentSelect.selectedIndex].text;
      formTitle.textContent = `Marksheet for ${selectedText}`;
      marksForm.reset();
      marksForm.style.display = 'block';
    });

    marksForm.addEventListener('submit', (e) => {
      e.preventDefault();

      const marks = {
        tamil: parseInt(document.getElementById('tamil').value),
        english: parseInt(document.getElementById('english').value),
        maths: parseInt(document.getElementById('maths').value),
        science: parseInt(document.getElementById('science').value),
        social: parseInt(document.getElementById('social').value)
      };

      fetch(`${API_URL}/marksheet/${currentStudentId}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(marks)
      })
        .then(res => res.json())
        .then(data => {
          alert(data.message);
          loadAllMarks();
        })
        .catch(err => alert("Error saving marks"));
    });

    function loadAllMarks() {
      fetch(`${API_URL}/marksheet/all`)
        .then(res => res.json())
        .then(marksData => {
          const tbody = document.getElementById('marksTableBody');
          tbody.innerHTML = '';
          marksData.forEach(m => {
            const row = document.createElement('tr');
            row.innerHTML = `
              <td>${m.student_name}</td>
              <td>${m.tamil}</td>
              <td>${m.english}</td>
              <td>${m.maths}</td>
              <td>${m.science}</td>
              <td>${m.social}</td>
            `;
            tbody.appendChild(row);
          });
        });
    }

    loadAllMarks();