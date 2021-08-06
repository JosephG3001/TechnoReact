/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/interactive-supports-focus */
import React, { useMemo, useState } from "react";
import AnimateHeight from "react-animate-height";
import { ContextMenu, ContextMenuTrigger, MenuItem } from "react-contextmenu";
import { useDispatch } from "react-redux";
import styled from "styled-components";
import Section from "../../../classes/section";
import { createNewArticle } from "../../../redux/reducers/article.reducer";
import ArticleLink from "./article-link";
import AddEditSectionModal, {
  EMenuEntityType,
  IAddEditModalProps,
} from "./modals/add-edit-section-modal";
import DeleteSectionModal from "./modals/delete-section-modal";

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

    span {
      transition: all 0.2s linear;
    }

    &:hover {
      span,
      .material-icons {
        color: ${({ theme }) => theme.pallet.themeColour1};
      }
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
  const dispatch = useDispatch();

  const [collapsed, setCollapsed] = useState(true);
  const [showAddEditSectionModal, setShowAddEditSectionModal] = useState(false);
  const [
    addEditModalProps,
    setAddEditModalProps,
  ] = useState<IAddEditModalProps>({
    entityType: EMenuEntityType.Tech,
    recordId: "",
    recordName: "",
    parentSectionId: undefined,
    closeModal: () => setShowAddEditSectionModal(false),
  });

  const [showDeleteSectionModal, setShowDeleteSectionModal] = useState(false);
  const [sectionIdForDelete, setSectionIdForDelete] = useState("");

  const nodeType = useMemo(() => {
    if (section.sectionName === "Root") {
      return NodeType.RootNode;
    }

    if (!section.parentSectionId && section.sectionName !== "Root") {
      return NodeType.TechNode;
    }

    return NodeType.SectionNode;
  }, [section]);

  const toggleSubMenu = () => {
    setCollapsed(!collapsed);
  };

  const setAddEditPropsAndOpenModal = (
    entityType: EMenuEntityType,
    recordId: string,
    recordName: string,
    parentSectionId?: string | undefined
  ) => {
    setAddEditModalProps({
      entityType,
      recordId,
      recordName,
      parentSectionId,
      closeModal: () => setShowAddEditSectionModal(false),
    });
    setShowAddEditSectionModal(true);
  };

  const setDeleteSectionPropsAndOpenModal = (sectionId: string) => {
    setSectionIdForDelete(sectionId);
    setShowDeleteSectionModal(true);
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
              visible={article.visible}
            />
          ))}
        </AnimateHeight>
      </div>

      {nodeType === NodeType.RootNode && (
        <ContextMenu id={`ContextMenu_${section.sectionId}`}>
          <MenuItem
            onClick={() =>
              setAddEditPropsAndOpenModal(
                EMenuEntityType.Tech,
                "",
                "",
                section.sectionId
              )
            }
          >
            New Tech
          </MenuItem>
        </ContextMenu>
      )}
      {nodeType === NodeType.TechNode && (
        <ContextMenu id={`ContextMenu_${section.sectionId}`}>
          <MenuItem
            onClick={() =>
              setAddEditPropsAndOpenModal(
                EMenuEntityType.Tech,
                section.sectionId,
                section.sectionName
              )
            }
          >
            Rename Tech
          </MenuItem>
          <hr />
          <MenuItem
            onClick={() =>
              setAddEditPropsAndOpenModal(
                EMenuEntityType.Subsection,
                "",
                "",
                section.sectionId
              )
            }
          >
            New Section
          </MenuItem>
          <MenuItem
            onClick={() => {
              setDeleteSectionPropsAndOpenModal(section.sectionId);
            }}
          >
            Delete Tech
          </MenuItem>
        </ContextMenu>
      )}
      {nodeType === NodeType.SectionNode && (
        <ContextMenu id={`ContextMenu_${section.sectionId}`}>
          <MenuItem
            onClick={() =>
              setAddEditPropsAndOpenModal(
                EMenuEntityType.Subsection,
                section.sectionId,
                section.sectionName
              )
            }
          >
            Rename Section
          </MenuItem>
          <hr />
          <MenuItem
            onClick={() => {
              dispatch(createNewArticle(section.sectionId));
            }}
          >
            New Article
          </MenuItem>
          <MenuItem
            onClick={() => {
              setDeleteSectionPropsAndOpenModal(section.sectionId);
            }}
          >
            Delete Section
          </MenuItem>
        </ContextMenu>
      )}

      <AddEditSectionModal
        showModal={showAddEditSectionModal}
        onClose={() => setShowAddEditSectionModal(false)}
        {...addEditModalProps}
      />

      <DeleteSectionModal
        closeModal={() => setShowDeleteSectionModal(false)}
        sectionId={sectionIdForDelete}
        showModal={showDeleteSectionModal}
        onClose={() => setShowDeleteSectionModal(false)}
      />
    </StyledMenuItem>
  );
};

export default SectionMenuItem;
