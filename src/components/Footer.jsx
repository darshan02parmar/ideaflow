import React from "react";
import { Link } from "react-router-dom";
import { Icon } from "@iconify/react";

export default function Footer() {
  return (
    <footer className="ideaflow-footer">
      <div className="footer-container">

        {/* Brand */}
        <div className="footer-brand">
          <div className="footer-logo">✨ IdeaFlow</div>
          <p className="footer-tagline">
            Turn raw ideas into execution-ready product blueprints-fast.
          </p>
          {/* <h4>Resources</h4> */}
          <div className="footer-socials">
            <a
              href="https://github.com/darshan02parmar/"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="GitHub"
            >
              <Icon icon="mdi:github" width="35" />
            </a>
            <a
              href="https://www.linkedin.com/in/parmar-darshan/"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="LinkedIn"
            >
              <Icon icon="mdi:linkedin" width="35" />
            </a>
          </div>
        </div>
    
        {/* Links */}
        <div className="footer-links">
          <div className="footer-col">
            <h4>Product</h4>
            <Link to="/">Home</Link>
            <Link to="/how-it-works">How it works</Link>
            <Link to="/examples">Examples</Link>
            <Link to="/why-ideaflow">Why IdeaFlow</Link>
          </div>

          <div className="footer-col">
            <h4>Resources</h4>
            <a
              href="https://github.com/darshan02parmar/ideaflow"
              target="_blank"
              rel="noreferrer"
            >
              GitHub
            </a>
            <Link to="/">Start Free</Link>
          </div>

          <div className="footer-col">
            <h4>Built With</h4>
            <span>Tambo Generative UI</span>
            <span>React + Vite</span>
            <span>Hybrid AI Engine</span>
          </div>
        </div>
      </div>

      <div className="footer-bottom">
        © {new Date().getFullYear()} IdeaFlow - Built for the future of product design.
      </div>
    </footer>
  );
}
