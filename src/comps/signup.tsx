import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function Signup() {
  const [admin, setAdmin] = useState({ username: '', password: '' });
  const [error, setError] = useState<null | string>(null);
  const navigate = useNavigate();

  async function admincreated(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    try {
      const response = await fetch('https://blog-backend-production-8b95.up.railway.app/createAdmin', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(admin),
      });
      if (response.ok) {
        navigate('/');
      } else {
        const errorRes = await response.json();
        setError(errorRes.error);
      }
    } catch (err) {
      console.log(err);
    }
  }

  return (
    <form method='POST' onSubmit={admincreated} className='createForm loading' autoComplete='off'>
      <span className='error'>{error}</span>
      <label htmlFor='admin'>Username*</label>
      <input
        type='text'
        id='admin'
        onChange={(e) => setAdmin({ ...admin, username: e.target.value })}
        value={admin.username.toLowerCase()}
        placeholder='Admin'
      />

      <label htmlFor='password'>Password*</label>
      <input
        type='password'
        id='password'
        onChange={(e) => setAdmin({ ...admin, password: e.target.value })}
        value={admin.password.toLowerCase()}
        placeholder='Password'
      />
      <br />
      <button>Submit</button>
    </form>
  );
}

export default Signup;
