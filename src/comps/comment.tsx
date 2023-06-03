import { useState } from 'react';
import { useQueryClient, useMutation } from '@tanstack/react-query';
import { createComment } from '../api/api';
import { motion as m } from 'framer-motion';

function Comment({ id }: { id: string }) {
  const [formdata, setFormData] = useState({ username: '', content: '' });
  const [errorM, setErrorM] = useState('');
  const queryClient = useQueryClient();

  const { mutate, isLoading } = useMutation({
    mutationFn: () => createComment(formdata, id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['blogID', id] });
      setFormData({ username: '', content: '' });
    },
    onError: (error) => {
      setErrorM(error instanceof Error ? 'Error: ' + error.message : 'An error occurred');
    },
  });

  return (
    <>
      <form
        method='POST'
        className='commentForm'
        onSubmit={(e) => {
          e.preventDefault();
          mutate();
        }}
      >
        {<span className='error'>{errorM}</span>}
        <label htmlFor='username'>Name*</label>
        <input
          type='text'
          id='username'
          onChange={(e) => setFormData({ ...formdata, username: e.target.value })}
          value={formdata.username}
          placeholder='Name'
          required
        />
        <label htmlFor='content'>Comment*</label>
        <input
          id='content'
          type='text'
          onChange={(e) => setFormData({ ...formdata, content: e.target.value })}
          value={formdata.content}
          placeholder='Comment'
          required
        />
        <br />
        <m.button type='submit' disabled={isLoading} style={{ marginBottom: '5px' }} whileTap={{ scale: 0.9 }}>
          {isLoading ? 'Sending...' : 'Send'}
        </m.button>
      </form>
    </>
  );
}
export default Comment;
