import axios from "axios";
const baseUrl = 'http://localhost:3001/notes';

const getAll = () => {
  const request = axios.get(baseUrl);
  return  requestData(request);
}

const createNote = newObject => {
  const request = axios.post(baseUrl, newObject);
  return  requestData(request);
}

const updateNote = (id, newObject) => {
  const request = axios.put(`${baseUrl}/${id}`, newObject);
  return  requestData(request); 
}

const requestData = (request) => request.then(response => response.data);

export default { getAll, createNote, updateNote }