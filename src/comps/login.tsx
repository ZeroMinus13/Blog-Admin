import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useMutation } from '@tanstack/react-query';
import { signIn } from '../api/api';
function Login({ setUserName }: { setUserName: React.Dispatch<React.SetStateAction<null>> }) {
  const [formData, setFormData] = useState({ username: '', password: '' });
  const [error, setError] = useState<null | string>(null);
  let navigate = useNavigate();

  const { mutate, isLoading } = useMutation({
    mutationFn: () => signIn(formData),
    onSuccess: () => {
      let userData = localStorage.getItem('user');
      if (userData) {
        let user = JSON.parse(userData);
        setUserName(user.user);
        navigate('/');
      }
    },
    onError: (error) => setError(error instanceof Error ? error.message : 'Something went wrong'),
  });

  return (
    <>
      <form
        method='POST'
        onSubmit={(e) => {
          e.preventDefault(), mutate();
        }}
        className='createForm loading'
      >
        <span className='error'>{error}</span>
        <label htmlFor='username'>Username</label>
        <input
          type='text'
          id='username'
          onChange={(e) => setFormData({ ...formData, username: e.target.value.trim().replace(/[^a-zA-Z0-9]/g, '') })}
          value={formData.username}
          placeholder='Username'
        />

        <label htmlFor='content'>Password</label>
        <input
          type='password'
          id='content'
          onChange={(e) => setFormData({ ...formData, password: e.target.value.trim().replace(/[^a-zA-Z0-9]/g, '') })}
          value={formData.password}
          placeholder='Comment'
          autoComplete='password'
        />
        <br />
        <button disabled={isLoading}>{isLoading ? 'Sending' : 'Send'}</button>
      </form>
    </>
  );
}

export default Login;
