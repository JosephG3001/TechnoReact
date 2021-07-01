/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/interactive-supports-focus */
import React, { useMemo, useState } from "react";
import AnimateHeight from "react-animate-height";
import { ContextMenu, ContextMenuTrigger, MenuItem } from "react-contextmenu";
import styled from "styled-components";
import ArticleListItem from "../../classes/article-list-item";
import Section from "../../classes/section";
import RenameModal from "./rename-modal";

const StyledMenuItem = styled.div`
  .link {
    display: flex;
    align-items: center;
    cursor: pointer;

    .material-icons {
      margin-left: 10px;
      color: ${({ theme }) => theme.pallet.themeColour1};
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

  .react-contextmenu-wrapper {
    width: 100%;
    padding: 4px;
  }

  .react-contextmenu {
    background-color: ${({ theme }) => theme.pallet.bodyBackground2};
    padding: 10px 0px;
    border-radius: 10px;
    border: none !important;

    hr {
      border-color: ${({ theme }) => theme.pallet.themeColour1};
    }

    .react-contextmenu-item {
      text-align: center;
      padding: 15px 25px;
      cursor: pointer;
      border: none !important;

      &:hover {
        background-color: ${({ theme }) => theme.pallet.themeColour1};
        border: none !important;
      }

      &:focus {
        border: none !important;
      }
    }
  }
`;

const ArticleLink: React.FC<ArticleListItem> = ({ articleName, articleId }) => {
  return (
    <>
      <div className="link">
        <i className="material-icons article-link">insert_drive_file</i>
        <ContextMenuTrigger id={`ContextMenu_Article_${articleId}`}>
          <span>{articleName}</span>
        </ContextMenuTrigger>
      </div>
      <ContextMenu id={`ContextMenu_Article_${articleId}`}>
        <MenuItem>Rename Article</MenuItem>
        <hr />
        <MenuItem>Delete Article</MenuItem>
      </ContextMenu>
    </>
  );
};

interface IMenuProps {
  section: Section;
}

enum NodeType {
  RootNode,
  TechNode,
  SectionNode,
  ArticleNode,
}

const SectionMenuItem: React.FC<IMenuProps> = ({ section }) => {
  const [collapsed, setCollapsed] = useState(true);
  const [showRenameModal, setShowRenameModal] = useState(false);

  const nodeType = useMemo(() => {
    if (section.sectionName === "Root") {
      return NodeType.RootNode;
    }

    if (section.parentSectionId === null && section.sectionName !== "Root") {
      return NodeType.TechNode;
    }

    return NodeType.SectionNode;
  }, [section]);

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
          <ContextMenuTrigger id={`ContextMenu_${section.sectionId}`}>
            <span> {section.sectionName}</span>
          </ContextMenuTrigger>
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

      {nodeType === NodeType.RootNode && (
        <ContextMenu id={`ContextMenu_${section.sectionId}`}>
          <MenuItem onClick={() => setShowRenameModal(true)}>New Tech</MenuItem>
        </ContextMenu>
      )}
      {nodeType === NodeType.TechNode && (
        <ContextMenu id={`ContextMenu_${section.sectionId}`}>
          <MenuItem>Rename Tech</MenuItem>
          <hr />
          <MenuItem>New Section</MenuItem>
          <MenuItem>Delete Tech</MenuItem>
        </ContextMenu>
      )}
      {nodeType === NodeType.SectionNode && (
        <ContextMenu id={`ContextMenu_${section.sectionId}`}>
          <MenuItem>Rename Section</MenuItem>
          <hr />
          <MenuItem>New Article</MenuItem>
          <MenuItem>Delete Section</MenuItem>
        </ContextMenu>
      )}

      <RenameModal
        showModal={showRenameModal}
        onClose={() => setShowRenameModal(false)}
      />
    </StyledMenuItem>
  );
};

export default SectionMenuItem;
