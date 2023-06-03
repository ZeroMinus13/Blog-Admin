import { Link } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';

function Blogs() {
  const { isLoading, isError, data, error } = useQuery({
    queryKey: ['blogs'],
    queryFn: async () => (await fetch('https://blog-backend-production-8b95.up.railway.app')).json(),
  });

  if (isLoading) return <span className='loading'>Loading...</span>;
  if (isError) {
    return <span className='loading'>Error: {error instanceof Error ? error.message : 'An error occurred'}</span>;
  }

  return (
    <>
      <ul className='blog-container'>
        {data.map((blog: Blog) => (
          <Link to={blog._id} key={blog._id}>
            <li className='blog-card'>
              <h2 className='title'>{blog.title}</h2>
              <p className='blog-Content'>{blog.content.substring(0, 170)}...</p>
              <p className='time'>
                {new Date(blog.createdAt).toLocaleDateString('en-gb', {
                  year: 'numeric',
                  month: 'short',
                  day: 'numeric',
                  hour: 'numeric',
                  minute: '2-digit',
                  hour12: true,
                })}
              </p>
            </li>
          </Link>
        ))}
      </ul>
    </>
  );
}

interface Blog {
  _id: string;
  title: string;
  content: string;
  createdAt: Date;
  comments: [];
}

export default Blogs;
