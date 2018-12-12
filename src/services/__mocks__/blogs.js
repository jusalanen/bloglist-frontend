let token = null

const blogs = [
  {
    _id: "5bf2c842fa156711d0249324",
    title: "test API",
    author: "jus",
    url: "https://www/sumeUrl/for/testing",
    likes: 46,
    user: "5bef289f9990a810f04ecdfa"
  },
  {
    id: "5bf2c8eefa156711d0249326",
    title: "test API again",
    author: "me",
    url: "https://www/niceUrl",
    likes: 59,
    user: "5bf2be340691c013f41fbad0"
  }
]

const getAll = () => {
  return Promise.resolve(blogs)
}

export default { getAll, blogs }