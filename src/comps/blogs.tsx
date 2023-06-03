import { Link } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { motion as m, AnimatePresence } from 'framer-motion';
import CustomAni from '../ani/framer';

function Blogs() {
  const { isLoading, isError, data, error } = useQuery({
    queryKey: ['blogs'],
    queryFn: async () => {
      const response = await fetch('https://blog-backend-production-8b95.up.railway.app', { mode: 'cors' });
      console.log(response); // Log the response object to check for any additional information
      return response.json();
    },
  });

  if (isLoading) return <span className='loading'>Loading...</span>;
  if (isError) {
    return <span className='loading'>Error: {error instanceof Error ? error.message : 'An error occurred'}</span>;
  }

  return (
    <>
      <AnimatePresence>
        <m.ul className='blog-container' variants={CustomAni} initial='initial' animate='show' exit='exit'>
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
        </m.ul>{' '}
      </AnimatePresence>
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
