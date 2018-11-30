import React from 'react'

const LoginForm = ({ handleSubmit, handleChange, username, password }) => {
  return (
    <div>
      <h2>Kirjaudu sovellukseen</h2>
          
    <form onSubmit={handleSubmit}>
      <div>
        käyttäjätunnus_
        <input
          type="text"
          name="username"
            value={username}
          onChange={this.handleChange}
        />
      </div>
      <div>
        salasana_
        <input 
          input
          type="password"
          name="password"
          value={password}
          onChange={handleChange}
        />
      </div>
      <button type="submit">kirjaudu</button>
    </form>
    </div>       
  )
}

export default LoginForm