import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function Login({ setUserName }: { setUserName: React.Dispatch<React.SetStateAction<string>> }) {
  const [formData, setFormData] = useState({ username: '', password: '' });
  let navigate = useNavigate();

  async function submitData(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    try {
      const response = await fetch('http://localhost:3000/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
        body: JSON.stringify(formData),
      });
      if (response.ok) {
        const res = await response.json();
        const jwt = response.headers.get('Set-Cookie')!;
        document.cookie = jwt;
        setUserName(res.user);
        navigate('/');
      }
    } catch (err) {
      console.log(err);
    }
  }
  return (
    <>
      <form method="POST" onSubmit={submitData} className="commentForm center">
        <label htmlFor="username">Username*</label>
        <input
          type="text"
          name="username"
          onChange={(e) => setFormData({ ...formData, username: e.target.value })}
          value={formData.username}
          placeholder="Username"
        />

        <label htmlFor="content">Comment*</label>
        <input
          type="password"
          name="content"
          onChange={(e) => setFormData({ ...formData, password: e.target.value })}
          value={formData.password}
          placeholder="Comment"
          autoComplete="password"
        />
        <br />
        <button>Send</button>
      </form>
    </>
  );
}

export default Login;
