import axios from 'axios'
const baseUrl = '/api/persons'

const getAll = () => {
  const request = axios.get(baseUrl)
  return request.then(response => response.data)
}

const create = newObject => {
  const request = axios.post(baseUrl, newObject)
  return request.then(response => response.data)
}

const update = (id, newObject) => {
  console.log("ID: " + id + newObject) //tämän login jätän, koska tämän avulla ongelma ratkesi. Olin lähettänyt parametrissä vahingossa itse newNumberin, enkä changedPersonia. Tällöin koodi yritti etsiä url-id:tä aiemmalla id:llä + uudella numerolla.
  const request = axios.put(`${baseUrl}/${id}`, newObject)
  return request.then(response => response.data)
}

const deleteMe = (id) => {
  const request = axios.delete(`${baseUrl}/${id}`)
  return request.then(response => response.data)
}

export default { getAll, create, update, deleteMe }
