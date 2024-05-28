import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import "./AddBlog.css";
import axios from "axios";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
function AddBlog() {
  const navigate = useNavigate();
  const [error,setError] = useState("");
  const [description,setDescription] = useState('');
  const [thumbnail,setThumbnail] = useState('');
  const [avatar,setAvatar] = useState("");
  const [title,setTitle] = useState("");
  const [authorname,setAuthorname] = useState("");
  const [category,setCategory] = useState("");
  
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const formats = [
    "header",
    "bold",
    "italic",
    "underline",
    "strike",
    "blockquote",
    "list",
    "bullet",
    "indent",
    "link",
    "image",
  ];
  const modules = {
    toolbar: [
      [{ header: [1, 2, 3, 4, 5, 6, false] }],
      ["bold", "italic", "underline", "strike", "blockquote"],
      [
        { list: "ordered" },
        { list: "bullet" },
        { indent: "-1" },
        { indent: "+1" },
      ],
      ["link", "image"],
      ["clean"],
    ],
  };

  const createBlog = async (formData) => {
    formData.title=title;
    formData.description=description;
    formData.thumbnail=thumbnail;
    formData.avatar=avatar;
    formData.category=category;
    formData.authorname=authorname;
    console.log(formData);
    try {
      const response = await axios.post(
        "http://localhost:4000/addblog/blog",
        formData
      );
      if (response.status === 201) {
        return navigate("/");
      }
    } catch (error) {
      setError(error.response?.data?.message || "An Error Occured");
    }
  };

  return (
    <div className="create-post">
      <div className="containers">
        <h2>Create Post</h2>
        {error && <p className="form__error-message">{error}</p>}
        <form encType="multipart/form-data" onSubmit={handleSubmit(createBlog)} className="forms create-post__form">
          <input
            className="helo"
            type="text"
            name="authorname"
            value={authorname}
            onChange={(e)=>setAuthorname(e.target.value)}
            id="authorname"
            placeholder="Author Name"
            autoFocus
          />
          <input
            name="title"
            onChange={(e)=>setTitle(e.target.value)}
            value={title}
            className="helo"
            type="text"
            id="title"
            placeholder="Title"
            autoFocus
          />
          <input
            value={category}
            onChange={(e)=>setCategory(e.target.value)}
            type="text"
            name="category"
            placeholder="Category"
            id="category"
            className="helo"
          />
          <ReactQuill
            className="q1-editor"
            modules={modules}
            formats={formats}
            value={description}
            onChange={setDescription}
          ></ReactQuill>
          <div className="" style={{ marginTop: "20px" }}>
            <label
              className="drop-container"
            >
              <span className="drop-title">Drop Thumbnail here</span>
              or
              <input
                className=""
                type="file"
                id="images"
                accept="png,jpg,jpeg"
                onChange={(e)=>setThumbnail(e.target.files[0])}
              />
            </label>
          </div>
          <div className="" style={{ marginTop: "20px" }}>
            <label
              className="drop-container"
            >
              <span className="drop-title">Drop Author DP here</span>
              or
              <input
                className=""
                type="file"
                id="authorimages"
                onChange={(e)=>setAvatar(e.target.files[0])}
                accept="png,jpg,jpeg"
              />
            </label>
          </div>
          <button
            style={{ marginBottom: "100px" }}
            type="submit"
            className="btns primarys"
          >
            Create
          </button>
        </form>
      </div>
    </div>
  );
}

export default AddBlog;
