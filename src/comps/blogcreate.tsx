import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function Blogcreate({ token }: { token: string | null }) {
  const [formData, setFormData] = useState({ title: '', content: '' });
  const [error, setError] = useState('');
  let navigate = useNavigate();

  async function submitData(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    try {
      const response = await fetch('https://blog-backend-production-8b95.up.railway.app/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(formData),
      });
      if (response.ok) {
        navigate('/');
      } else {
        const errorResponse = await response.json();
        setError(errorResponse.error);
      }
    } catch (err) {
      console.log(err);
      setError('Error Occurred');
    }
  }

  return (
    <>
      <form method='POST' onSubmit={submitData} className='createForm'>
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
        <button>Submit</button>
      </form>
    </>
  );
}

export default Blogcreate;
