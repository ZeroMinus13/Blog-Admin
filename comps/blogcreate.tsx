import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function Blogcreate() {
  const [formData, setFormData] = useState({ title: '', content: '' });
  const [error, setError] = useState('');
  let navigate = useNavigate();
  async function submitData(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    try {
      const response = await fetch('http://localhost:3000/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
      if (response.ok) {
        navigate('/');
      }
    } catch (err) {
      setError('Error occurred in database please try again later!');
    }
  }

  return (
    <form method="POST" onSubmit={submitData} className="createForm">
      <label htmlFor="title">Title</label>
      <span className="error">{error}</span>
      <input
        type="text"
        name="title"
        onChange={(e) => setFormData({ ...formData, title: e.target.value })}
        value={formData.title}
        placeholder="Title"
      />

      <label htmlFor="content">Content</label>
      <textarea
        name="content"
        onChange={(e) => setFormData({ ...formData, content: e.target.value })}
        value={formData.content}
        placeholder="Content"
      />
      <br />
      <button>Submit</button>
    </form>
  );
}

export default Blogcreate;
