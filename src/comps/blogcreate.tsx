import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { createBlog } from '../api/api';
import { motion as m } from 'framer-motion';
import CustomAni from '../ani/framer';

function Blogcreate({ token }: { token: string | null }) {
  const [formData, setFormData] = useState({ title: '', content: '' });
  const [error, setError] = useState('');
  let navigate = useNavigate();
  const queryClient = useQueryClient();

  const { mutate, isLoading } = useMutation({
    mutationFn: () => createBlog({ title: formData.title.trim(), content: formData.content.trim() }, token || ''),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['blogID'] });
      setFormData({ title: '', content: '' });
      navigate('/');
    },
    onError: (error) => {
      setError(error instanceof Error ? 'Error: ' + error.message : 'An error occurred');
    },
  });

  return (
    <>
      <m.form
        method='POST'
        onSubmit={(e) => {
          e.preventDefault();
          mutate();
        }}
        className='createForm'
        variants={CustomAni}
        initial='initial'
        animate='show'
        exit='exit'
      >
        <span className='error'>{error}</span>
        <label htmlFor='title'>Title</label>
        <input
          type='text'
          id='title'
          onChange={(e) => setFormData({ ...formData, title: e.target.value })}
          value={formData.title}
          placeholder='Title'
        />

        <label htmlFor='content'>Content</label>
        <textarea
          id='content'
          onChange={(e) => setFormData({ ...formData, content: e.target.value })}
          value={formData.content}
          placeholder='Content'
        />
        <br />
        <button disabled={isLoading}>{isLoading ? 'Sending' : 'Send'}</button>
      </m.form>
    </>
  );
}

export default Blogcreate;
