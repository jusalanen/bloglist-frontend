import React from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import loginService from './services/loginService'
import Notification from './components/Notification'
import Err from './components/Err'

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

      loginService.setToken(user.token)
      window.localStorage.setItem('loggedBlogappUser', JSON.stringify(user))
      
      this.setState({ username: '', password: '', user})

    } catch (exception) {

      this.setState({
        error: 'käyttäjätunnus tai salasana virheellinen'
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

  render() {
    
    if ( this.state.user === null) {
      return (
        <div>
        <h2>Blogs</h2>
        <Err message={this.state.error} />

        <div>
          <h2>Kirjaudu sovellukseen</h2>
          
          <form onSubmit={this.login}>
          <div>
            käyttäjätunnus_
              <input
                type="text"
                name="username"
                value={this.state.username}
                onChange={this.handleLoginFieldChange}
              />
          </div>
          <div>
            salasana_ 
              <input
                type="password"
                name="password"
                value={this.state.password}
                onChange={this.handleLoginFieldChange}
              />
          </div>
          <button type="submit">kirjaudu</button>
          </form>
        
        </div>
      </div>
      )
    }
    return (
      <div>
        <h2>Blogs</h2>
        <Notification message={this.state.notification} />
        <p>{this.state.user.name} logged in  </p><button onClick = {function() {
          window.localStorage.removeItem('loggedBlogappUser')
        }}  >logout</button><br></br>
        
        <h4>add new</h4>

        <form onSubmit={this.addBlog}>
        title_
        <input
          type="text"
          name="title"
          value={this.state.title}
          onChange={this.handleBlogFieldChange}
        /><br></br>
        author_
        <input
          type="text"
          name="author"
          value={this.state.author}
          onChange={this.handleBlogFieldChange}
        /><br></br>       
        url_
       <input
          type="text"
          name="url"
          value={this.state.url}
          onChange={this.handleBlogFieldChange}
        /><br></br><br></br>
          <button type="submit">add</button>
        </form><br></br>
        {this.state.blogs.map(blog => 
          <Blog key={blog._id} blog={blog}/>
        )}
      </div>
    );
  }
}

export default App;
