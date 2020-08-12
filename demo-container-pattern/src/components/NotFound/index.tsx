import React from "react";

const NotFound: React.FC<Record<string, unknown>> = () => {
  return (
    <div className="not-found">
      <h1>Error 404</h1>
      <p>Not Found</p>
    </div>
  );
};

export default NotFound;
