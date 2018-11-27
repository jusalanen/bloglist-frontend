import React from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import loginService from './services/loginService'
import Notification from './components/Notification'

class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      blogs: [],
      username: '',
      password: '',
      user: null,
      error: null
    }
  }

  componentDidMount() {
    blogService.getAll().then(blogs =>
      this.setState({ blogs })
    )
  }

  login = async (event) => {
    event.preventDefault()
    try{
      const user = await loginService.login({
        username: this.state.username,
        password: this.state.password
      })

      window.localStorage.setItem('loggedBlogappUser', JSON.stringify(user))
  
      this.setState({ username: '', password: '', user})
    } catch(exception) {
      this.setState({
        error: 'käyttäjätunnus tai salasana virheellinen',
      })
      setTimeout(() => {
        this.setState({ error: null })
      }, 5000)
    }
  }

  handleLoginFieldChange = (event) => {
    this.setState({ [event.target.name]: event.target.value })
  }

  render() {
    
    if ( this.state.user === null) {
      return (
        <div>
        <h2>Blogs</h2>
        <Notification message={this.state.error} />

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
        <tr><td width='200'>{this.state.user.name} logged in</td>
        <td width='50'><button onClick = {function() {
          window.localStorage.removeItem('loggedBlogappUser')
        }}  >logout</button></td></tr><br></br>
        {this.state.blogs.map(blog => 
          <Blog key={blog._id} blog={blog}/>
        )}
      </div>
    );
  }
}

export default App;
