import React from 'react'
import { shallow } from 'enzyme'
import SimpleBlog from './SimpleBlog'

describe.only('<SimpleBlog />', () => {
  it('renders title, author and likes', () => {
    const blog = {
      title: 'Komponenttitestaus tapahtuu jestillä ja enzymellä',
      author: 'Tester One',
      likes: 1
    }

    const blogComponent = shallow(<SimpleBlog blog={blog} />)
    const titlauthDiv = blogComponent.find('.titlauth')
    const likeDiv = blogComponent.find('.like')

    expect(titlauthDiv.text()).toContain(blog.author)
    expect(titlauthDiv.text()).toContain(blog.title)
    expect(likeDiv.text()).toContain(blog.likes)
  })
})