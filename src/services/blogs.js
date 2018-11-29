import axios from 'axios'
const url = '/api/blogs'

let token = null

const getAll = () => {
  const request = axios.get(url)
  return request.then(response => response.data)
}

const setToken = (newToken) => {
  token = `bearer ${newToken}`
}

const create = async (newObject) => {
  const config = {
    headers: { 'Authorization': token }
  }

  const response = await axios.post(url, newObject, config)
  return response.data
}

export default { getAll, setToken, create }