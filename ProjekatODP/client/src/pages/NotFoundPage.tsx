import React from "react";
import errorImage from "../pictures/404.jpg";

const NotFoundPage: React.FC = () => {
  return (
    <div
      style={{
        display: "flex",
        height: "100vh",
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "column",
        backgroundColor: "#fffefeff",
      }}
    >
      <img
        src={errorImage}
        alt="404 Error"
        style={{ marginBottom: "0px" }}
      ></img>
      <h2 style={{ color: "#e4a830ff", fontSize: "40px", marginBottom: "0px" }}>
        Error
      </h2>
      <p style={{ color: "#e4a830ff", fontSize: "20px" }}>
        The page you are looking for does not exist.
      </p>
      <a href="/" style={{ color: "#4a3205ff", fontSize: "20px" }}>
        Go to Home
      </a>
    </div>
  );
};

export default NotFoundPage;
