import React from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import loginService from './services/loginService'
import Notification from './components/Notification'
import Err from './components/Err'
import BlogForm from './components/BlogForm'
import Togglable from './components/Togglable'

class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      blogs: [],
      username: '',
      password: '',
      user: null,
      error: null,
      notification: null,
      title: '',
      author: '',
      url: ''
    }
  }

  componentWillMount() {
    let loggedUserJSON = null
    if (typeof window.localStorage["loggedBlogappUser"] !== "undefined"
    && window.localStorage["loggedBlogappUser"] !== "undefined") {
      loggedUserJSON = window.localStorage.getItem('loggedBlogappUser') 
    }
    if (loggedUserJSON) {
      console.log(loggedUserJSON)
      const user = JSON.parse(loggedUserJSON)
      
      this.setState({ user })
      blogService.setToken(user.token)
    }
    blogService.getAll().then(blogs =>
      this.setState({ blogs })
    )
  }

  login = async (event) => {
    event.preventDefault()
    try {
      const user = await loginService.login({
        username: this.state.username,
        password: this.state.password
      })

      await blogService.setToken(user.token)
      window.localStorage.setItem('loggedBlogappUser', JSON.stringify(user))
      
      this.setState({ username: '', password: '', user})

    } catch (exception) {

      this.setState({
        error: 'wrong username or password'
      })
      setTimeout(() => {
        this.setState({ error: null })
      }, 5000)
    }
  }

  addBlog = (event) => {
    event.preventDefault()
    const blogObject = {
      title: this.state.title,
      author: this.state.author,
      url: this.state.url,
      user: this.state.user
    }

    blogService
      .create(blogObject)
      .then(newBlog => {
        this.setState({
          blogs: this.state.blogs.concat(newBlog),
          title: '',
          author: '',
          url: '',
          notification: 'added blog ' + newBlog.title
        })
        setTimeout(() => {
          this.setState({ notification: null })
        }, 5000)
      })
  }

  handleLoginFieldChange = (event) => {
    this.setState({ [event.target.name]: event.target.value })
  }

  handleBlogFieldChange = (event) => {
    this.setState({ [event.target.name]: event.target.value })
  }

  logout = () => {
    this.setState({ user: null })
    window.localStorage.removeItem('loggedBlogappUser')
  }

  render() {
    const blogForm = () => {
      const hideWhenVisible = { display: this.state.blogVisible ? 'none' : '' }
      const showWhenVisible = { display: this.state.blogVisible ? '' : 'none' }
    
      return (
        <div>
          <div style={hideWhenVisible}>
            <button onClick={e => this.setState({ blogVisible: true })}>add blog</button>
          </div>
          <div style={showWhenVisible}>
            <BlogForm
              title={this.state.username}
              author={this.state.password}
              url= {this.state.url}
              handleChange={this.handleBlogFieldChange}
              handleSubmit={this.addBlog}
            /><button onClick={e => this.setState({ blogVisible: false })}>cancel</button>
          </div>
        </div>
      )
    }
    
    if (this.state.user === null) {
      return (
        <div>
        <h1>Blogs</h1>
        <Err message={this.state.error} />

        <div>
          <h3>Login to application</h3>
          
          <form onSubmit={this.login}>
          <div>
            username :
              <input
                type="text"
                name="username"
                value={this.state.username}
                onChange={this.handleLoginFieldChange}
              />
          </div>
          <br></br>
          <div>
            password : 
              <input
                type="password"
                name="password"
                value={this.state.password}
                onChange={this.handleLoginFieldChange}
              />
          </div><br></br>
          <button type="submit">login</button>
          </form>
        
        </div>
      </div>
      )
    }
    return (
      <div>
        <h1>Blogs</h1>
        <Notification message={this.state.notification} />
        {this.state.user.name} logged in  <button onClick = { () => {
          this.logout()
          }} >logout</button><br></br><br></br>
        
        {blogForm()}

        <h3>blogs</h3>
        {this.state.blogs.map(blog => 
          <Blog key={blog._id} blog={blog}/>
        )}
      </div>
    );
  }
}

export default App;
