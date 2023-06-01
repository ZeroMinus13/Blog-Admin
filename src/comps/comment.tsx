import React, { useState } from 'react';
import { useQueryClient, useQuery, useMutation } from '@tanstack/react-query';
type commentProps = {
  id: string;
  setComment: React.Dispatch<React.SetStateAction<boolean>>;
  comment: boolean;
};

function Comment({ id, setComment, comment }: commentProps) {
  const [formdata, setFormData] = useState({ username: '', content: '' });
  const queryClient = useQueryClient();

  const mutation = useMutation<void, Error, typeof formdata>(
    async (formData) => {
      await fetch(`https://blog-backend-production-8b95.up.railway.app/comments/${id}/create`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username: formData.username, content: formData.content, _id: id }),
      });
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ['blogID'] });
        setFormData({ username: '', content: '' });
        setComment(() => !comment);
      },
    }
  );

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    mutation.mutate(formdata);
  }
  return (
    <>
      <form method='POST' className='commentForm'>
        {/* <span className='error'>{error}</span> */}
        <label htmlFor='username'>Username*</label>
        <input
          type='text'
          id='username'
          onChange={(e) => setFormData({ ...formdata, username: e.target.value })}
          value={formdata.username}
          placeholder='Username'
        />

        <label htmlFor='content'>Comment*</label>
        <textarea
          id='content'
          onChange={(e) => setFormData({ ...formdata, content: e.target.value })}
          value={formdata.content}
          placeholder='Comment'
        />
        <br />
        <button type='submit' onClick={(e) => handleSubmit(e)}>
          Send
        </button>
      </form>
    </>
  );
}
export default Comment;
