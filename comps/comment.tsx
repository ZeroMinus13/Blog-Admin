import React, { useState } from 'react';

function Comment({
  id,
  setComment,
  comment,
}: {
  id: string;
  setComment: React.Dispatch<React.SetStateAction<boolean>>;
  comment: boolean;
}) {
  const [formData, setFormData] = useState({ username: '', content: '' });
  const [error, setError] = useState('');

  async function submitData(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    try {
      const response = await fetch(`http://localhost:3000/comments/${id}/create`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username: formData.username, content: formData.content, _id: id }),
      });
      if (response.ok) {
        setFormData({ username: '', content: '' });
        setComment(() => !comment);
      }
    } catch (err) {
      setError('Error occurred in database please try again later!');
    }
  }

  return (
    <>
      <form method="POST" onSubmit={submitData} className="commentForm">
        <label htmlFor="username">Username*</label>
        <span className="error">{error}</span>
        <input
          type="text"
          name="username"
          onChange={(e) => setFormData({ ...formData, username: e.target.value })}
          value={formData.username}
          placeholder="Username"
        />

        <label htmlFor="content">Comment*</label>
        <textarea
          name="content"
          onChange={(e) => setFormData({ ...formData, content: e.target.value })}
          value={formData.content}
          placeholder="Comment"
        />
        <br />
        <button>Send</button>
      </form>
    </>
  );
}
export default Comment;
