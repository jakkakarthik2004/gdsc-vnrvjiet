import React ,{useState} from 'react'
import AddBlog from './admin/AddBlog';
import ShowBlogs from './user/ShowBlogs';
function Blog() {

    const [user, setUser] = useState(
        JSON.parse(localStorage.getItem("userObjGDSC") || "null") as {
          role: string;
        } | null
      );

      if (user && user.role === "admin") {
        return <AddBlog />;
      } else {
        return <ShowBlogs />;
      }
}

export default Blog