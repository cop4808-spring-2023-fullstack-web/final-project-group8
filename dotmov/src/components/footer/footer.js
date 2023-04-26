import React from "react";
import ReactDOM from "react-dom/client";

// Bootstrap CSS
import "bootstrap/dist/css/bootstrap.min.css";

const Footer = () => {
  return (
    <>
      <footer
        className="bg-dark py-3 footer"
        style={{
          backgroundColor: "#2F2C2C",
          borderTop: "none",
          position: "fixed",
          bottom: "0",
          width: "100%",
        }}
      >
        <div className="container">
          <div className="row">
            <div className="col-lg-6 text-center text-lg-start mb-3 mb-lg-0">
              <a href="/">dotMOV</a>
            </div>
            <div className="col-lg-6 text-center text-lg-end">
              <a href="/" className="text-white mb-0 py-2">
                All Movies
              </a>
              <span className="mb-0 py-2 px-3" style={{ borderRight: "none" }}>
                <a href="/" className="text-white mb-0 py-2">
                  Github
                </a>
              </span>
            </div>
          </div>
        </div>
      </footer>
    </>
  );
};
export default Footer;
