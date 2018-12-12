import React from 'react'
import { mount } from 'enzyme'
import App from './App'
import Blog from './components/Blog'
jest.mock('./services/blogs')

describe.only('<App />', () => {
  let app
  beforeAll(() => {
    app = mount(<App />)
  })

  it('renders login form not blogs', () => {
    const h3Components = app.find('h3')
    expect(h3Components.text()).toContain('Login to application')
    const blogComponents = app.find(Blog)
    expect(blogComponents.length).toEqual(0)
  })
})