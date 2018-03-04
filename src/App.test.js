import React from 'react'
import { mount } from 'enzyme'
import App from './App'
import Blog from './components/Blog'
jest.mock('./services/blogs')
import blogService from './services/blogs'

describe('<App />', () => {
  let app


  describe('does not render blogs right away', () => {
    beforeEach(() => {
      app = mount(<App />)
    })

    it('only login form is rendered', () => {
      app.update()
      const blogComponents = app.find(Blog)
      expect(blogComponents.length).toEqual(0)
    })

  })

  describe('renders blogs when the user is logged in', () => {
    const user = {
      username: 'tester',
      token: '1231231214',
      name: 'Teuvo Testaaja'
    }

    beforeEach(() => {
      app = mount(<App />)
      localStorage.setItem('loggedBlogUser', JSON.stringify(user))
    })

    it('renders the blogs after login', () => {
      app.update()
      const blogComponents = app.find(Blog)
      console.log(blogComponents)
      expect(blogComponents.length).toEqual(blogService.blogs.length)
    })
  })
})