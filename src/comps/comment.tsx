import { useState } from 'react';
import { useQueryClient, useMutation } from '@tanstack/react-query';
import { createComment } from '../api/api';

function Comment({ id }: { id: string }) {
  const [formdata, setFormData] = useState({ username: '', content: '' });
  const queryClient = useQueryClient();

  const { mutate, isLoading, isError, error } = useMutation({
    mutationFn: () => createComment(formdata, id),
    onSuccess: (data, variables, context) => {
      console.log(data, variables, context);
      queryClient.invalidateQueries({ queryKey: ['blogID', id] });
      setFormData({ username: '', content: '' });
    },
  });

  if (isError) {
    console.log(error instanceof Error ? error.message : '');
  }
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
        {isError && (
          <span className='error'>Error: {error instanceof Error ? error.message : 'An error occurred'}</span>
        )}
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
        <textarea
          id='content'
          onChange={(e) => setFormData({ ...formdata, content: e.target.value })}
          value={formdata.content}
          placeholder='Comment'
          required
        />
        <br />
        <button type='submit' disabled={isLoading}>
          {isLoading ? 'Sending...' : 'Send'}
        </button>
      </form>
    </>
  );
}
export default Comment;
