/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/interactive-supports-focus */
import React, { useState } from "react";
import AnimateHeight from "react-animate-height";
import styled from "styled-components";
import ArticleListItem from "../../classes/article-list-item";
import Section from "../../classes/section";

const StyledMenuItem = styled.div`
  .link {
    display: flex;
    align-items: center;

    padding: 5px;
    cursor: pointer;

    .material-icons {
      margin-right: 4px;
      color: ${({ theme }) => theme.pallet.themeColour2};
      transition: all 0.2s linear;

      &.deg90 {
        transform: rotate(90deg);
      }
    }

    &:hover {
      color: ${({ theme }) => theme.pallet.themeColour1};
    }
  }

  .child-menu {
    padding-left: 15px;
  }
`;

const ArticleLink: React.FC<ArticleListItem> = ({ articleName }) => {
  return (
    <div className="link">
      <i className="material-icons article-link">insert_drive_file</i>
      <span>{articleName}</span>
    </div>
  );
};

interface IMenuProps {
  section: Section;
}

const SectionMenuItem: React.FC<IMenuProps> = ({ section }) => {
  const [collapsed, setCollapsed] = useState(true);

  const toggleSubMenu = () => {
    setCollapsed(!collapsed);
  };

  return (
    <StyledMenuItem>
      <div>
        <div className="link" role="button" onClick={toggleSubMenu}>
          <i
            className={`noselect material-icons rotate ${
              !collapsed ? "deg90" : ""
            }`}
          >
            keyboard_arrow_right
          </i>
          <span> {section.sectionName}</span>
        </div>
        <AnimateHeight height={collapsed ? 0 : "auto"} className="child-menu">
          {section.inverseParentSection.map((childSection) => (
            <SectionMenuItem
              section={childSection}
              key={childSection.sectionId}
            />
          ))}
          {section.articleList.map((article) => (
            <ArticleLink
              key={article.articleId}
              articleId={article.articleId}
              articleName={article.articleName}
            />
          ))}
        </AnimateHeight>
      </div>
    </StyledMenuItem>
  );
};

export default SectionMenuItem;
