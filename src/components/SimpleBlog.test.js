import React from 'react'
import { shallow } from 'enzyme'
import SimpleBlog from './SimpleBlog'

describe.only('<SimpleBlog />', () => {
  it('renders blog content', () => {
    const blog = {
      author: 'testiauthor',
      title: 'testititle',
      url: 'testiurl',
      likes: 10
    }

    const blogComponent = shallow(<SimpleBlog blog={blog}
      onClick={console.log('plaa')} />)
    const titleDiv = blogComponent.find('.content')
    const likeDiv = blogComponent.find('.like')
    expect(titleDiv.text()).toContain(blog.title)
    expect(titleDiv.text()).toContain(blog.author)
    expect(likeDiv.text()).toContain(blog.likes)
  })

  it('clicking the button calls event handler twixe', () => {
    const blog = {
      author: 'testiauthor',
      title: 'testititle',
      url: 'testiurl',
      likes: 10
    }

    const mockHandler = jest.fn()

    const blogComponent = shallow(<SimpleBlog blog={blog}
      onClick={mockHandler} />)


    const button = blogComponent.find('button')
    button.simulate('click')
    button.simulate('click')
    expect(mockHandler.mock.calls.length).toBe(2)
  })
})