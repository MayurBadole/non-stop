import axios from "axios";

const API_BASE_URL = "https://60d5a2c2943aa60017768b01.mockapi.io/candidate";

const getCandidates = () => {
  return axios.get(API_BASE_URL);
};

const getCandidateById = (id) => {
  return axios.get(`${API_BASE_URL}/${id}`);
};

const createCandidate = (candidate) => {
  return axios.post(API_BASE_URL, candidate);
};

const updateCandidate = (id, candidate) => {
  return axios.put(`${API_BASE_URL}/${id}`, candidate);
};

const deleteCandidate = (id) => {
  return axios.delete(`${API_BASE_URL}/${id}`);
};

export {
  getCandidates,
  getCandidateById,
  createCandidate,
  updateCandidate,
  deleteCandidate,
};
