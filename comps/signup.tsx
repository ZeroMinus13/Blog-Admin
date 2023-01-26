import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function Signup() {
  const [admin, setAdmin] = useState({ username: '', password: '' });
  const navigate = useNavigate();
  async function admincreated() {
    try {
      const response = await fetch('http://localhost:3000/admin', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(admin),
      });
      if (response.ok) {
        console.log(await response.json());
        navigate('/');
      }
    } catch (err) {
      console.log(err);
    }
  }

  return (
    <form method="POST" onSubmit={admincreated} className="createForm loading">
      <label htmlFor="admin">Admin </label>
      <input
        type="text"
        name="admin"
        onChange={(e) => setAdmin({ ...admin, username: e.target.value })}
        value={admin.username}
        placeholder="Admin"
      />

      <label htmlFor="password">Password</label>
      <input
        type="password"
        name="password"
        onChange={(e) => setAdmin({ ...admin, password: e.target.value })}
        value={admin.password}
        placeholder="Password"
      />
      <br />
      <button>Submit</button>
    </form>
  );
}

export default Signup;
