import React from "react";
import { Link } from "react-router-dom";
import "./top-nav.scss";

export const TopNav: React.FC = () => {
  return (
    <nav className="top-nav">
      <ul className="top-nav-menu-items">
        <li className="top-nav-menu-item">
          <Link to="/">
            <i className="top-nav-menu-item-icon material-icons">home</i>
            <span className="top-nav-menu-item-text">Home</span>
          </Link>
        </li>
        <li className="top-nav-menu-item">
          <a
            href="https://github.com/JosephG3001"
            target="_blank"
            rel="noopener noreferrer"
          >
            <i className="fab fa-github top-nav-menu-item-icon" />
            <span className="top-nav-menu-item-text">Github</span>
          </a>
        </li>
        <li className="top-nav-menu-item">
          <a
            href="https://uk.linkedin.com/pub/joseph-gaisford/74/b98/661"
            target="_blank"
            rel="noopener noreferrer"
          >
            <i className="fab fa-linkedin top-nav-menu-item-icon" />
            <span className="top-nav-menu-item-text">LinkedIn</span>
          </a>
        </li>
        <li className="top-nav-menu-item">
          <a href="http://vue.technolibrary.co.uk/">
            <i className="fab fa-vuejs top-nav-menu-item-icon" />
            <span className="top-nav-menu-item-text">Vue Site</span>
          </a>
        </li>
        <li className="top-nav-menu-item">
          <a href="http://angular.technolibrary.co.uk/">
            <i className="fab fa-angular top-nav-menu-item-icon" />
            <span className="top-nav-menu-item-text">Angular Site</span>
          </a>
        </li>
        <li className="top-nav-menu-item">
          <a href="http://www.technolibrary.co.uk/">
            <i className="top-nav-menu-item-icon material-icons">language</i>
            <span className="top-nav-menu-item-text">Classic Site</span>
          </a>
        </li>
      </ul>
    </nav>
  );
};

export default TopNav;
