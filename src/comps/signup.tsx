import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useMutation } from '@tanstack/react-query';
import { createAdmin } from '../api/api';
function Signup() {
  const [admin, setAdmin] = useState({ username: '', password: '' });
  const [error, setError] = useState<null | string>(null);
  const navigate = useNavigate();

  const { mutate } = useMutation({
    mutationFn: () => createAdmin(admin),
    onSuccess: () => {
      navigate('/');
    },
    onError: (error) => setError(error instanceof Error ? error.message : 'Something went wrong'),
  });

  return (
    <form
      method='POST'
      onSubmit={(e) => {
        e.preventDefault(), mutate();
      }}
      className='createForm loading'
      autoComplete='off'
    >
      <span className='error'>{error}</span>
      <label htmlFor='admin'>Username*</label>
      <input
        type='text'
        id='admin'
        onChange={(e) => setAdmin({ ...admin, username: e.target.value })}
        value={admin.username.toLowerCase()}
        placeholder='Admin Username'
        required
        minLength={3}
      />

      <label htmlFor='password'>Password*</label>
      <input
        type='password'
        id='password'
        onChange={(e) => setAdmin({ ...admin, password: e.target.value })}
        value={admin.password.toLowerCase()}
        placeholder='Password'
        required
        minLength={3}
      />
      <br />
      <button>Submit</button>
    </form>
  );
}

export default Signup;
