import React from "react";
import Sidebar from "../components/sidebar/sidebar";
import TopNav from "../components/top-nav/top-nav";

const WithPublicLayout = <P extends object>(
  WrappedComponent: React.ComponentType<P>
) => (props: P) => {
  return (
    <>
      <TopNav />
      <Sidebar />
      <header className="App-header" />
      <div className="router-outlet">
        <WrappedComponent {...props} />
      </div>
    </>
  );
};

export default WithPublicLayout;
