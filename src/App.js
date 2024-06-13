import React from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
import { CandidateProvider } from "./context/CandidateContext";
import Login from "./pages/Login";
import Home from "./pages/Home";
import CandidateForm from "./components/CandidateForm";
import CandidateDetails from "./components/CandidateDetails";

const App = () => {
  return (
    <Router>
      <CandidateProvider>
        <Routes>
          <Route path="/" element={<Navigate to="/login" />} />

          <Route path="/login" element={<Login />} />
          <Route path="/home" element={<Home />}>
            <Route path="candidate/new" element={<CandidateForm />} />
            <Route path="candidate/edit/:id" element={<CandidateForm />} />
            <Route path="candidate/:id" element={<CandidateDetails />} />
          </Route>

          <Route path="*" element={<>error</>} />
        </Routes>
      </CandidateProvider>
    </Router>
  );
};

export default App;
