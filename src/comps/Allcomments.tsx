import { motion as m, AnimatePresence } from 'framer-motion';

function AllComments({ data, token, deletecomment }: props) {
  const reversedComments = data.comments.slice().reverse();
  return (
    <div className='comments-Container'>
      <AnimatePresence mode='popLayout'>
        {reversedComments.map((com) => (
          <m.ul
            className='comments'
            layout
            initial={{ y: -300, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 200, opacity: 0 }}
            transition={{ type: 'spring' }}
            key={com._id}
          >
            <li className='user'>{com.username}</li>
            {token && (
              <button onClick={() => deletecomment(com._id)} className='X'>
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
          </m.ul>
        ))}
      </AnimatePresence>
    </div>
  );
}
type props = {
  data: Data;
  token: string | null;
  deletecomment: (comId: string) => void;
};

type Data = {
  _id: string;
  title: string;
  content: string;
  createdAt: Date;
  comments: { _id: string; username: string; content: string; createdAt: Date }[];
};

export default AllComments;
