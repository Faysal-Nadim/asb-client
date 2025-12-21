import React from "react";
import { SystemNav } from "../shared/systemnav";

/**
 * @author
 * @function SystemLayout
 **/

export const SystemLayout = ({ type, children }) => {
  return (
    <>
      <SystemNav type={type} />
      {children}
    </>
  );
};
