import { Link, useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { v4 as uuidv4 } from 'uuid';
import Comment from './comment';

function SingleBlog() {
  const [data, setData] = useState<Data | null>(null);
  const [comment, setComment] = useState(null);
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    let ignore = false;
    async function fetchData() {
      try {
        const url = await fetch(`http://localhost:3000/${id}`);
        const data = await url.json();
        if (!ignore) {
          setData(data);
        }
      } catch (err) {
        console.log(err);
      }
    }
    fetchData();
    return () => {
      ignore = true;
    };
  }, []);

  async function deleteBlog() {
    try {
      const data = await fetch(`http://localhost:3000/${id}/deleteblog`, {
        method: 'Delete',
      });
      if (data.ok) {
        navigate('/');
      }
    } catch (err) {
      console.log(err);
    }
  }

  async function updateBlog(ids: string) {
    try {
      console.log(ids);
      const data = await fetch(`http://localhost:3000/${id}/updateBlog`, {
        method: 'Put',
      });
    } catch (err) {
      console.log(err);
    }
  }

  async function deleteComment(ids: string) {
    try {
      const data = await fetch(`http://localhost:3000/comments/${ids}/delete`, {
        method: 'Delete',
      });
    } catch (err) {
      console.log(err);
    }
  }

  return data ? (
    <div className="center singleblog">
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
      <div className="buttons">
        <button onClick={deleteBlog} className="delete">
          Delete
        </button>
        <button>Edit</button>
      </div>

      <p>Comments</p>

      <div className="comments-Container">
        {data.comments.map((comm) => (
          <ul key={uuidv4()} className="comments">
            <li className="user">{comm.username}</li>
            <button onClick={(e) => deleteComment(comm._id)} className="X">
              {'\u274C'}
            </button>
            <li className="content">{comm.content}</li>
            <li className="time">
              {new Date(comm.createdAt).toLocaleDateString('en-gb', {
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
      <Comment id={data._id} />
    </div>
  ) : (
    <h1 className="center">Loading...</h1>
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
