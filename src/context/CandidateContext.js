import React, { createContext, useState, useEffect } from "react";
import {
  getCandidates,
  getCandidateById,
  createCandidate,
  updateCandidate,
  deleteCandidate,
} from "../services/candidateService";

export const CandidateContext = createContext();

export const CandidateProvider = ({ children }) => {
  const [candidates, setCandidates] = useState([]);
  const [selectedCandidate, setSelectedCandidate] = useState(null);

  useEffect(() => {
    fetchCandidates();
  }, []);

  const fetchCandidates = async () => {
    const response = await getCandidates();
    setCandidates(response.data);
  };

  const selectCandidate = async (id) => {
    const response = await getCandidateById(id);
    setSelectedCandidate(response.data);
  };

  const addCandidate = async (candidate) => {
    await createCandidate(candidate);
    fetchCandidates();
  };

  const editCandidate = async (id, candidate) => {
    await updateCandidate(id, candidate);
    fetchCandidates();
  };

  const removeCandidate = async (id) => {
    await deleteCandidate(id);
    fetchCandidates();
  };

  return (
    <CandidateContext.Provider
      value={{
        candidates,
        selectedCandidate,
        setSelectedCandidate,
        selectCandidate,
        addCandidate,
        editCandidate,
        removeCandidate,
        fetchCandidates,
      }}
    >
      {children}
    </CandidateContext.Provider>
  );
};
