import { Route, Routes, Link } from 'react-router-dom';
import Blogs from './blogs';
import Blogcreate from './blogcreate';
import SingleBlog from './SingleBlog';
import Login from './login';
import Signup from './signup';
import { useState, useEffect } from 'react';

const User = ({ userName }: { userName: string | null }) => {
  function signOut() {
    localStorage.removeItem('user');
    location.reload();
  }

  return !userName ? (
    <>
      <Link to='/login'>Log In</Link>
      <Link to='/signup'>Sign up</Link>
    </>
  ) : (
    <>
      <p className='userName'> {userName.charAt(0).toUpperCase().concat(userName.slice(1))} </p>
      <Link to='/' onClick={() => signOut()}>
        Sign Out
      </Link>
    </>
  );
};

function RouteComponent() {
  const [userName, setUserName] = useState(null);
  const [token, setToken] = useState<string | null>(null);

  useEffect(() => {
    let loggedUser = localStorage.getItem('user');
    if (loggedUser) {
      let user = JSON.parse(loggedUser);
      setToken(user.token);
      setUserName(user.user);
    }
  });

  return (
    <div>
      <nav>
        <Link to='/'>Blogs</Link>
        <Link to='/createBlog'>New Blog</Link>
        <User userName={userName} />
      </nav>
      <Routes>
        <Route path='/' element={<Blogs />} />
        <Route path='/createBlog' element={<Blogcreate token={token} />} />
        <Route path='/:id' element={<SingleBlog token={token} />} />
        <Route path='/:id/edit' element={<Blogcreate token={token} />} />
        <Route path='/login' element={<Login setUserName={setUserName} />} />
        <Route path='/signup' element={<Signup />} />
      </Routes>
    </div>
  );
}

export default RouteComponent;
