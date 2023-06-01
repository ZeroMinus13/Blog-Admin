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
      <div className='blog-container'>
        {data.map((blog: Blog) => (
          <Link to={blog._id} key={blog._id}>
            <div className='blog-card'>
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
