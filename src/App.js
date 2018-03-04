import React from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import Notification from './components/Notification'
import loginService from './services/login'
import Togglable from './components/Togglable'
import BlogForm from './components/BlogForm';

class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      blogs: [],
      error: null,
      username: '',
      password: '',
      user: null,
      author: '',
      title: '',
      url: '',
      newBlog: '',
      extended: null
    }
  }

  componentDidMount() {
    console.log('mountti ', window.localStorage.getItem('loggedBlogUser'))
    blogService.getAll().then(blogs =>
      this.setState({ blogs })
    )

    const loggedUserJSON = window.localStorage.getItem('loggedBlogUser')
    console.log('logged user ', loggedUserJSON)
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      this.setState({ user })
      blogService.setToken(user.token)
    }
  }

  login = async (event) => {
    event.preventDefault()
    try {
      const user = await loginService.login({
        username: this.state.username,
        password: this.state.password
      })

      window.localStorage.setItem('loggedBlogUser', JSON.stringify(user))
      blogService.setToken(user.token)
      this.setState({ username: '', password: '', user })
      console.log('kirjautuu ', user)
    } catch (exception) {
      this.setState({
        error: 'käyttäjätunnus tai salasana virheellinen',
      })
      setTimeout(() => {
        this.setState({ error: null })
      }, 5000)
    }
  }


  handleLoginFieldChange = (event) => {
    if (event.target.name === 'password') {
      this.setState({ password: event.target.value })
    } else if (event.target.name === 'username') {
      this.setState({ username: event.target.value })
    } else if (event.target.name === 'logout') {
      this.logout()
    }
  }

  handleBlogChange = (event) => {
    this.setState({ [event.target.name]: event.target.value })
  }

  logout = async () => {
    try {
      await window.localStorage.removeItem('loggedBlogUser')
      this.setState({ user: null })
    } catch (err) {
      this.setState({
        error: 'Logging out failed',
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
      url: this.state.url
    }

    blogService.create(blogObject).then(newBlog => {
      this.setState({
        blogs: this.state.blogs.concat(newBlog),
        newBlog: '',
        error: `Uusi blogi on luotu, hurraa! '${newBlog.author}': '${newBlog.title}'`
      })
      setTimeout(() => {
        this.setState({ error: null })
      }, 5000)
    })
  }

  expandBlog = () => {
    console.log('plaa')
  }

  render() {

    const loginForm = () => (
      <div>
        <h2>Kirjaudu</h2>

        <form onSubmit={this.login}>
          <div>
            käyttäjätunnus
            <input
              type="text"
              name="username"
              value={this.state.username}
              onChange={this.handleLoginFieldChange}
            />
          </div>
          <div>
            salasana
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
    )

    // const submitForm = () => {
    //   <Togglable buttonLabel="Uusi blogi" ref={component => this.noteForm = component}>
    //     <BlogForm
    //       visible={this.state.visible}
    //       onSubmit={this.addBlog}
    //       title={this.state.title}
    //       author={this.state.author}
    //       url={this.state.url}
    //       handleChange={this.handleBlogChange}
    //     />
    //   </Togglable>
    // }

    const submitForm = () => {
      const hideWhenVisible = { display: this.state.creationVisible ? 'none' : '' }
      const showWhenVisible = { display: this.state.creationVisible ? '' : 'none' }

      return (
        <div>
          <div style={hideWhenVisible}>
            <button onClick={e => this.setState({ creationVisible: true })}>Post a blog!</button>
          </div>

          <div style={showWhenVisible}>
            <form onSubmit={this.addBlog}>
              <div>
                <b>Title</b>
                <input
                  type="title"
                  name="title"
                  value={this.state.title}
                  onChange={this.handleBlogChange}
                /></div>
              <div>
                <b>Author</b>
                <input
                  type="auhtor"
                  name="author"
                  value={this.state.author}
                  onChange={this.handleBlogChange}
                />
              </div>
              <div>
                <b>URL</b>
                <input
                  type="url"
                  name="url"
                  value={this.state.url}
                  onChange={this.handleBlogChange}
                />
              </div>
              <button type="submit">tallenna</button>
            </form>
          </div>
        </div>
      )
    }

    const blogForm = () => (
      <div>

        <h2>Blogit</h2>
        <div>
          {this.state.blogs.sort((a, b) => {
            return (a.likes > b.likes)
          }).reverse().map(blog => {
            return <Blog key={blog._id} blog={blog} />
          }
          )}
        </div>
      </div>
    )

    return (
      <div>
        <h1>Blogit</h1>

        <Notification message={this.state.error} />

        {this.state.user === null ?
          loginForm() :
          <div>
            <p>{this.state.user.name} logged in</p>
            <button type="logout" name="logout" onClick={this.handleLoginFieldChange}>Blog out</button>
            {blogForm()}
            <h2>Luo uusi blogi</h2>
            {submitForm()}
          </div>
        }
      </div>
    )
  }
}

export default App;
