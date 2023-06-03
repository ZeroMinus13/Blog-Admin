import { useParams } from 'react-router-dom';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Comment from './comment';
import { useQueryClient, useQuery, useMutation } from '@tanstack/react-query';
import { deleteBlog, updateBlog, deleteComment } from '../api/api';
import AllComments from './Allcomments';

function SingleBlog({ token }: { token: string | null }) {
  const [isEditing, setIsEditing] = useState(false);
  const [errorM, setErrorM] = useState('');
  const [formData, setFormData] = useState({ title: '', content: '' });
  const { id } = useParams();
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const { isLoading, isError, data, error } = useQuery({
    queryKey: ['blogID', id],
    queryFn: async () => (await fetch(`https://blog-backend-production-8b95.up.railway.app/${id}`)).json(),
  });

  const deleteblog = useMutation({
    mutationFn: () => deleteBlog(id || '', token || ''),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['blogID', id] });
      navigate('/');
    },
  });

  const updateblog = useMutation({
    mutationFn: () => updateBlog(id || '', token || '', formData),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['blogID', id] });
      navigate('/');
    },
    onError: (err) => {
      setErrorM(err instanceof Error ? 'Error: ' + err.message : 'An error occurred');
    },
  });

  const deletecomment = useMutation({
    mutationFn: (comId: string) => deleteComment(comId, token || ''),
    onMutate: (comId: string) => {
      queryClient.setQueryData(['blogID', id], (prevData: any) => {
        if (prevData && prevData.comments) {
          return {
            ...prevData,
            comments: prevData.comments.filter((comment: any) => comment._id !== comId),
          };
        }
        return prevData;
      });
      return queryClient.getQueryData(['blogID', id]);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['blogID', id] });
    },
    onError: (rollbackData) => {
      queryClient.setQueryData(['blogID', id], rollbackData);
    },
  });

  if (isLoading) return <span className='loading'>Loading...</span>;
  if (isError) {
    return <span className='loading'>Error: {error instanceof Error ? error.message : 'An error occurred'}</span>;
  }

  return data && !isEditing ? (
    <div className='center singleblog'>
      <h2 className='title'>{data.title}</h2>
      <p className='blog-Content'>{data.content}</p>
      <small className='time'>
        {new Date(data.createdAt).toLocaleDateString('en-gb', {
          year: 'numeric',
          month: 'short',
          day: 'numeric',
          hour: 'numeric',
          minute: '2-digit',
          hour12: true,
        })}
      </small>
      {token && (
        <div className='buttons'>
          <button onClick={() => deleteblog.mutate()} className='delete'>
            Delete
          </button>
          <button onClick={(e) => setIsEditing(!isEditing)}>Edit</button>
        </div>
      )}

      <Comment id={data._id} />
      <p>Comments</p>
      <AllComments data={data} token={token} deletecomment={deletecomment.mutate} />
    </div>
  ) : (
    <form
      className='createForm'
      onSubmit={(e) => {
        e.preventDefault(), updateblog.mutate();
      }}
    >
      <span className='error'>{errorM}</span>
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

export default SingleBlog;
