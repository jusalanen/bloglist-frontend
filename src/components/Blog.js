import React from 'react'
import blogService from '../services/blogs'

const likeBlog = (blog) => {
  blog.likes = blog.likes + 1
  blog = blogService.update(blog._id, blog)
}

const Blog = ({blog}) => (
  <div>
    {blog.title} - {blog.author}  <button onClick = { () => {
      likeBlog(blog) }} >like</button> likes: {blog.likes}

  </div>  
)

export default Blog