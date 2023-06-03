function AllComments({ data, token, deletecomment }: props) {
  const reversedComments = data.comments.slice().reverse();
  return (
    <div className='comments-Container'>
      {reversedComments.map((com) => (
        <ul key={com._id} className='comments'>
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
        </ul>
      ))}
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
