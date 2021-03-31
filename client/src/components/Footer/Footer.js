import React from "react";
import { Link } from "react-router-dom";
import "./Footer.css";

export default function Footer() {
  return (
    <>
      <div className="footer-container">
        <div className="margin">
          <div className="copyright">
            Developed by
            <Link href="https://github.com/eevanwong"> eevanwong </Link>
          </div>
        </div>
      </div>
    </>
  );
}
