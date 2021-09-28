import axios from "axios";
const baseUrl = "http://localhost:3001/persons";

const createPerson = async (newPerson) => {
  const response = await axios.post(baseUrl, newPerson);
  return response;
};

const deletePerson = async (id) => {
  const response = await axios.delete(`${baseUrl}/${id}`);
  return response;
};

export default { createPerson, deletePerson };
