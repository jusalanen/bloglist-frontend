import React from 'react'
//import blogService from '../services/blogs'


const Blog = ({blog}) => (
  <div>
    {blog.title} - {blog.author}
  </div>
)

export default Blog