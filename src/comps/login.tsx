import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function Login({ setUserName }: { setUserName: React.Dispatch<React.SetStateAction<null>> }) {
  const [formData, setFormData] = useState({ username: '', password: '' });
  const [error, setError] = useState<null | string>(null);
  let navigate = useNavigate();

  async function submitData(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    try {
      const response = await fetch('https://blog-backend-production-8b95.up.railway.app/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        const res = await response.json();
        localStorage.setItem('user', JSON.stringify(res));
        setUserName(res.user);
        navigate('/');
      } else {
        const errorResponse = await response.json();
        setError(errorResponse.error);
      }
    } catch (error) {
      console.log(error);
    }
  }
  return (
    <>
      <form method='POST' onSubmit={submitData} className='createForm loading'>
        <span className='error'>{error}</span>
        <label htmlFor='username'>Username</label>
        <input
          type='text'
          id='username'
          onChange={(e) => setFormData({ ...formData, username: e.target.value })}
          value={formData.username}
          placeholder='Username'
        />

        <label htmlFor='content'>Password</label>
        <input
          type='password'
          id='content'
          onChange={(e) => setFormData({ ...formData, password: e.target.value })}
          value={formData.password}
          placeholder='Comment'
          autoComplete='password'
        />
        <br />
        <button>Send</button>
      </form>
    </>
  );
}

export default Login;
