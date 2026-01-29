import "./App.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { Home } from "./pages/Home";
import Blogs from "./pages/Blogs";
import About from "./pages/About";
import Login from "./pages/Login";
import SignUp from "./pages/SignUp";
import Navbar from "./components/Navbar";
import Dashbord from "./pages/Dashbord";
import { Children } from "react";
import Profile from "./pages/Profile";
import YourBlogs from "./pages/YourBlogs";
import Comments from "./pages/Comments";
import WriteBlogs from "./pages/WriteBlogs";
import UpdateBlog from "./pages/UpdateBlog";
import BlogView from "./pages/BlogView";
import Footer from "./components/Footer";
import SearchList from "./pages/SearchList";

const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <>
        <Navbar />
        <Home />
        <Footer />
      </>
    ),
  },
  {
    path: "/blogs",
    element: (
      <>
        <Navbar />
        <Blogs />
        <Footer />
      </>
    ),
  },
  {
    path: "/about",
    element: (
      <>
        <Navbar />
        <About />
        <Footer />
      </>
    ),
  },
  {
    path: "/search",
    element: (
      <>
        <Navbar />
        <SearchList />
        <Footer />
      </>
    ),
  },
  {
    path: "/login",
    element: (
      <>
        <Navbar />
        <Login />
      </>
    ),
  },
  {
    path: "/signup",
    element: (
      <>
        <Navbar />
        <SignUp />
      </>
    ),
  },

  {
    path: "/blogs/:blogId",
    element: (
      <>
        <Navbar />
        <BlogView />
      </>
    ),
  },
  {
    path: "/dashbord",
    element: (
      <>
        <Navbar />
        <Dashbord />
      </>
    ),
    children: [
      {
        path: "profile",
        element: <Profile />,
      },
      {
        path: "your-blogs",
        element: <YourBlogs />,
      },
      {
        path: "comments",
        element: <Comments />,
      },
      {
        path: "write-blogs",
        element: <WriteBlogs />,
      },

      {
        path: "write-blogs/:blogId",
        element: <UpdateBlog />,
      },
    ],
  },
]);

function App() {
  return (
    <>
      <RouterProvider router={router} />
    </>
  );
}

export default App;



