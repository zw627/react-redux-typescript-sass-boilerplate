import React from "react";
import { Link } from "react-router-dom";

const Home: React.FC = () => {
  return (
    <div className="home">
      <Link to="/scoreboard">Start</Link>
    </div>
  );
};

export default Home;
