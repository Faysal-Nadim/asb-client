import React from "react";
import { Navbar } from "../shared/navbar";
import { Footer } from "../shared/footer";

/**
 * @author
 * @function GlobalLayout
 **/

export const GlobalLayout = (props) => {
  return (
    <>
      <Navbar />
      {props.children}
      <Footer />
    </>
  );
};
