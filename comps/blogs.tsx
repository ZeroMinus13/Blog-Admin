import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { v4 as uuidv4 } from 'uuid';

function BlogContent() {
  const [data, setData] = useState<Data[] | null>(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    let ignore = false;
    async function fetchData() {
      try {
        const url = await fetch('http://localhost:3000/');
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

  return data ? (
    <div className="blog-container">
      {data.map((blog) => (
        <Link to={blog._id} key={blog._id}>
          <div className="blog-card">
            <h2>{blog.title}</h2>
            <p>{blog.content.substring(0, 200)}...</p>
            <p>
              {new Date(blog.createdAt).toLocaleDateString('en-gb', {
                year: 'numeric',
                month: 'short',
                day: 'numeric',
                hour: 'numeric',
                minute: '2-digit',
                hour12: true,
              })}
            </p>
          </div>
        </Link>
      ))}
    </div>
  ) : (
    <h1 className="loading">Loading...</h1>
  );
}

interface Data {
  _id: string;
  title: string;
  content: string;
  createdAt: Date;
  comments: [];
}

export default BlogContent;
