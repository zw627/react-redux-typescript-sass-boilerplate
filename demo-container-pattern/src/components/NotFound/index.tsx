import React from "react";
import { Link } from "react-router-dom";

const NotFound: React.FC<Record<string, unknown>> = () => {
  return (
    <div className="not-found">
      <h1>Error 404</h1>
      <p>Not Found</p>
      <Link to="/">Back to Home</Link>
    </div>
  );
};

export default NotFound;
