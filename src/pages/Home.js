import CandidateList from "../components/CandidateList";
import "../styles/Home.css";
import { Outlet } from "react-router-dom";

const Home = () => {
  return (
    <div className="home-container">
      <div className="left-section">
        <CandidateList />
      </div>
      <div className="right-section">
        <Outlet />
      </div>
    </div>
  );
};

export default Home;
