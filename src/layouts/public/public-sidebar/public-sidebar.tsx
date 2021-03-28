import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import withSidebar from "../../../hocs/withSidebar/withSidebar";
import { loadSections } from "../../../redux/reducers/sections.reducer";
import PublicSidebarItems from "./public-sidebar-items";

export const PublicSidebar: React.FC = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(loadSections());
  }, [dispatch]);

  return <PublicSidebarItems />;
};

export default withSidebar(PublicSidebar);
