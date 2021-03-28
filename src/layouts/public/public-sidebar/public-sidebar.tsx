import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import withSidebar from "../../../hocs/withSidebar/withSidebasr";
import { loadSections } from "../../../redux/reducers/sections.reducer";
import SidebarItems from "./public-sidebar-items";
import "./public-sidebar.scss";

export const PublicSidebar: React.FC = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(loadSections());
  }, [dispatch]);

  return <SidebarItems />;
};

export default withSidebar(PublicSidebar);
