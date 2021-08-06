import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";

const StyledTopNav = styled.div`
  .top-nav {
    background-color: ${({ theme }) => theme.pallet.navbarBackgroundColour};
    color: ${({ theme }) => theme.pallet.foregroundColour1};
    height: ${({ theme }) => theme.metrics.topNavHeight};
    left: ${({ theme }) => theme.metrics.sidebarWidth};
    position: fixed;
    display: flex;
    width: 100%;
    align-items: center;
    z-index: 9999;

    .top-nav-menu-items {
      display: flex;
      margin: 0 auto;
      height: 100%;
      padding-right: ${({ theme }) => theme.metrics.sidebarWidth};
      list-style: none;

      .top-nav-menu-item {
        display: flex;
        align-items: stretch;
        transition: linear 0.2s all;
        cursor: pointer;

        &:hover {
          background-color: ${({ theme }) =>
            theme.pallet.navbarItemHoverBackgroundColour};
        }

        a {
          display: flex;
          align-items: center;
          padding: 10px;
          padding-right: 15px;
          text-decoration: none !important;

          .top-nav-menu-item-icon {
            margin: 5px;
            color: ${({ theme }) => theme.pallet.themeColour2};
          }

          &:hover {
            .top-nav-menu-item-icon {
              color: ${({ theme }) => theme.pallet.navbarForegroundColour};
            }
          }

          .top-nav-menu-item-text {
            color: ${({ theme }) => theme.pallet.navbarForegroundColour};
          }
        }
      }
    }
  }
`;

export const TopNav: React.FC = () => {
  return (
    <StyledTopNav>
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
            <a href="https://vue.technolibrary.co.uk/">
              <i className="fab fa-vuejs top-nav-menu-item-icon" />
              <span className="top-nav-menu-item-text">Vue Site</span>
            </a>
          </li>
          <li className="top-nav-menu-item">
            <a href="https://angular.technolibrary.co.uk/">
              <i className="fab fa-angular top-nav-menu-item-icon" />
              <span className="top-nav-menu-item-text">Angular Site</span>
            </a>
          </li>
          <li className="top-nav-menu-item">
            <a href="https://classic.technolibrary.co.uk/">
              <i className="top-nav-menu-item-icon material-icons">language</i>
              <span className="top-nav-menu-item-text">Classic Site</span>
            </a>
          </li>
        </ul>
      </nav>
    </StyledTopNav>
  );
};

export default TopNav;
