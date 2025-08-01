const container = document.querySelector('.container')
const registerBtn = document.querySelector('.register-btn')
const loginBtn = document.querySelector('.login-btn')

registerBtn.addEventListener('click',() => {
    container.classList.add('active');
    
});

loginBtn.addEventListener('click',() => {
    container.classList.remove('active');
    
});

//*************************************************************************************************************************** */

const API_URL = 'https://sm-frontend-6gly.vercel.app/';

document.addEventListener('DOMContentLoaded', () => {

    

  document.getElementById('reg-form')?.addEventListener('submit', async (e) => {
    e.preventDefault();

    const name = document.getElementById('reg-name')?.value;
    const email = document.getElementById('reg-email')?.value;
    const password = document.getElementById('reg-password')?.value;

    try {
      const res = await fetch(`${API_URL}/auth/signup`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email, password })
      });
      
      const data = await res.json();
      alert(data.message);
    } catch (error) {
      console.error('Error:', error);
      alert('An error occurred!');
    }
  });

  document.getElementById('login-form')?.addEventListener('submit', async (e) => {
    e.preventDefault();

    const email = document.getElementById('login-email')?.value;
    const password = document.getElementById('login-password')?.value;

    try {
        
      const res = await fetch(`${API_URL}/auth/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();
      if (res.ok) {

        window.location.href = '../students.html';
      } else {
        alert(data.message);
      }
    } catch (error) {
      console.error('Error:', error);
      alert('An error occurred!');
    }
  });

});
