import { useParams } from 'react-router-dom';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { v4 as uuidv4 } from 'uuid';
import Comment from './comment';
import { useQueryClient, useQuery, useMutation } from '@tanstack/react-query';

function SingleBlog({ token }: { token: string | null }) {
  const [comment, setComment] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({ title: '', content: '' });
  const { id } = useParams();
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const { isLoading, isError, data, error } = useQuery({
    queryKey: ['blogID', id],
    queryFn: async () => (await fetch(`https://blog-backend-production-8b95.up.railway.app/${id}`)).json(),
  });

  // const mutation = useMutation({
  //   mutationFn: addTodo,
  //   onSuccess: () => {
  //     queryClient.invalidateQueries({ queryKey: ['todos'] });
  //     queryClient.invalidateQueries({ queryKey: ['reminders'] });
  //   },
  // });

  async function deleteBlog() {
    try {
      const data = await fetch(`https://blog-backend-production-8b95.up.railway.app/${id}/deleteblog`, {
        method: 'Delete',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      });
      if (data.ok) {
        navigate('/');
      }
    } catch (err) {
      console.log(err);
    }
  }

  async function updateBlog(ids: string) {
    await fetch(`https://blog-backend-production-8b95.up.railway.app/${ids}/updateBlog`, {
      method: 'Put',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(formData),
    });
    setIsEditing(false);
  }

  async function deleteComment(ids: string) {
    try {
      const data = await fetch(`https://blog-backend-production-8b95.up.railway.app/comments/${ids}/delete`, {
        method: 'Delete',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      });
      if (data.ok) {
        setComment(() => !comment);
      }
    } catch (err) {
      console.log(err);
    }
  }

  const AllComments = (data: Data) => {
    const sortedComments = data.comments.sort((a, b) => {
      return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
    });
    return (
      <div className='comments-Container'>
        {sortedComments.map((com) => (
          <ul key={com._id} className='comments'>
            <li className='user'>{com.username}</li>
            {token && (
              <button onClick={(e) => deleteComment(com._id)} className='X'>
                {'\u274C'}
              </button>
            )}
            <li className='content'>{com.content}</li>
            <li className='time'>
              {new Date(com.createdAt).toLocaleDateString('en-gb', {
                year: 'numeric',
                month: 'short',
                day: 'numeric',
                hour: 'numeric',
                minute: '2-digit',
                hour12: true,
              })}
            </li>
          </ul>
        ))}
      </div>
    );
  };

  if (isLoading) return <span className='loading'>Loading...</span>;
  if (isError) {
    return <span className='loading'>Error: {error instanceof Error ? error.message : 'An error occurred'}</span>;
  }

  return data && !isEditing ? (
    <div className='center singleblog'>
      <h2>{data.title}</h2>
      <p>{data.content}</p>
      <p>
        {new Date(data.createdAt).toLocaleDateString('en-gb', {
          year: 'numeric',
          month: 'short',
          day: 'numeric',
          hour: 'numeric',
          minute: '2-digit',
          hour12: true,
        })}
      </p>
      {token && (
        <div className='buttons'>
          <button onClick={deleteBlog} className='delete'>
            Delete
          </button>
          <button onClick={(e) => setIsEditing(!isEditing)}>Edit</button>
        </div>
      )}

      <p>Comments</p>
      <Comment id={data._id} />
      <AllComments {...data} />
    </div>
  ) : (
    <form
      className='createForm'
      onSubmit={() => {
        if (typeof id === 'string') {
          updateBlog(id);
        }
      }}
    >
      <label htmlFor='title'>Title</label>
      <input
        type='text'
        id='title'
        value={formData.title}
        onChange={(e) => setFormData({ ...formData, title: e.target.value })}
      />
      <label htmlFor='content'>Content</label>
      <textarea value={formData.content} onChange={(e) => setFormData({ ...formData, content: e.target.value })} />
      <div className='buttons'>
        <button type='submit'>Save</button>
        <button type='button' onClick={() => setIsEditing(false)}>
          Cancel
        </button>
      </div>
    </form>
  );
}

interface Data {
  _id: string;
  title: string;
  content: string;
  createdAt: Date;
  comments: Array<{ _id: string; username: string; content: string; createdAt: Date }>;
}

export default SingleBlog;
