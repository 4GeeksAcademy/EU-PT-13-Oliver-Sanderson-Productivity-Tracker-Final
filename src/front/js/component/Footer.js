import React from "react";

const Footer = () => {
  const year = new Date().getFullYear();

  return (
    <div className="bg-light text-center py-3">
      <p>
        &copy; Your Website {year} |{" "}
        <a href="#" className="text-decoration-none">
          Terms & Conditions
        </a>{" "}
        | <a href="#" className="text-decoration-none">FAQ's</a>{" "}
        | <a href="#" className="text-decoration-none">Feedback</a>
      </p>
    </div>
  );
};

export default Footer;