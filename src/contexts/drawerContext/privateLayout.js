import React from "react";
import NavDrawer from "../components/NavDrawer/navDrawer";

const PrivateLayout = ({ children }) => {
  return <NavDrawer>{children}</NavDrawer>;
};

export default PrivateLayout;
