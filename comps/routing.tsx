import { Route, Routes, Link } from 'react-router-dom';
import BlogContent from './blogs';
import Blogcreate from './blogcreate';
import SingleBlog from './SingleBlog';
import Login from './Login';
import Signup from './signup';
import { useState } from 'react';

function RouteComponent() {
  const [userName, setUserName] = useState('');
  function Navbar() {
    return (
      <nav>
        <Link to="/">Random Blogs</Link>
        <Link to="/createBlog">Create a new Blog</Link>
        <Link to="/login">Log In</Link>
        <Link to="/signup">Sign up</Link>
      </nav>
    );
  }

  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<BlogContent userName={userName} />} />
        <Route path="/createBlog" element={<Blogcreate jwtToken={jwtToken} />} />
        <Route path="/:id" element={<SingleBlog jwtToken={jwtToken} />} />
        <Route path="/:id/edit" element={<Blogcreate jwtToken={jwtToken} />} />
        <Route path="/login" element={<Login setUserName={setUserName} />} />
        <Route path="/signup" element={<Signup />} />
      </Routes>
    </>
  );
}
function getCookie(name: string) {
  const value = '; ' + document.cookie;
  const parts = value.split('; ' + name + '=');
  return parts[1];
}
const jwtToken = getCookie('jwt');

export default RouteComponent;
