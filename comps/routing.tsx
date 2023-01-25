import { Route, Routes, Link } from 'react-router-dom';
import BlogContent from './blogs';
import Blogcreate from './blogcreate';
import SingleBlog from './SingleBlog';

function Navbar() {
  return (
    <nav>
      <Link to="/">Random Blogs</Link>
      <Link to="/createBlog">Create a new Blog</Link>
    </nav>
  );
}
function RouteComponent() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<BlogContent />} />
        <Route path="/createBlog" element={<Blogcreate />} />
        <Route path="/:id" element={<SingleBlog />} />
      </Routes>
    </>
  );
}

export default RouteComponent;
