import React from 'react'
import blogService from '../services/blogs'


class Blog extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      showDet: false,
      blog: this.props.blog, 
      
    }
  }

  likeBlog = async (blog) => {
    blog.likes = blog.likes + 1
    blog = await blogService.update(blog._id, blog)
    blog.user = this.state.blog.user
    this.setState({ blog })
  }
      
  toggle = () => {
    this.setState({ showDet: !this.state.showDet })
  }

  deleteBlog = (blog) => {
    blogService.deleteBlog(blog._id)
  }

  render() {
    const blog = this.state.blog

    const showOrNot = { display: this.state.showDet ? '' : 'none' }
  
    return (
      <div> 
        <div>{blog.title} - {blog.author} <button onClick={() => {
            this.toggle() }} >details</button>
        </div>
        <div style={showOrNot}>
        {blog.url}<br></br>
        likes {blog.likes} <button onClick ={ () => {
                    this.likeBlog(blog) }} >like</button><br></br>
        added by {blog.user.name}<br></br>
        <button onClick ={() => { this.deleteBlog(blog) }}>delete blog</button><br></br>
        </div>
        <br></br>     
      </div>
      )
  }
  
}
  

export default Blog