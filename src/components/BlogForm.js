import React from 'react'

const BlogForm = ({ handleSubmit, handleChange, title, author, url }) => {
  return (
    <div>
      Add blog
      <form onSubmit={handleSubmit}><br></br>
      title :
      <input
        type="text"
        name="title"
        value={title}
        onChange={handleChange}
      /><br></br>
      author :
      <input
        type="text"
        name="author"
        value={author}
        onChange={handleChange}
      /><br></br>       
      url :
      <input
        type="text"
        name="url"
        value={url}
        onChange={handleChange}
      /><br></br><br></br>
      <button type="submit">add</button>
      </form>
    </div>
  ) 
}

export default BlogForm