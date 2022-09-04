import React, { useState } from "react";
import "./index.css";

import SubmitButton from "../../home/login/modalcontent/submitbutton";

interface IProps {
  titleText?: string;
  visible?: boolean;
  children?: JSX.Element;
  tabState: number;
  handleVisible: () => void;
  setTabState: (arg0: number) => void;
  handleTab: (arg0: number) => void;
  width: number;
}

const Modal = (props: IProps) => {
  const {
    children,
    titleText,
    setTabState = () => {},
    visible,
    handleVisible = () => {},
    tabState,
    width,
    handleTab,
    setPreDest,
    gridList,
    apiValid,
  } = props;
  return (
    <>
      <div
        className={
          visible ? (tabState < 5 ? "modalopen" : "modalopenII") : "modalclosed"
        }
      >
        {tabState < 5 ? (
          <div className={"modalcontent"}>
            <h2>{titleText}</h2>
            <span
              className={"closer"}
              onClick={() => {
                handleVisible();
                handleTab(1);
              }}
            >
              X
            </span>
            {/*<hr />*/}
            {children}
          </div>
        ) : tabState > 7 ? (
          <div className={"modalgrid"}>
            <span>
              <h2 className={"left"}>
                {titleText}
                <button
                  className={apiValid ? "purplebutton" : "nobutton"}
                  onClick={() => {
                    setPreDest(0);
                    setTabState(7);
                  }}
                >
                  Add Product
                </button>
              </h2>
            </span>
            {children}
          </div>
        ) : tabState == 5 ? (
          <div className={"modalcontent"}>
            <p>{titleText}</p>
            {children}
          </div>
        ) : tabState == 6 ? (
          <div className={"modaldetail"}>
            <h2 className="left">{titleText}</h2>
            {children}
          </div>
        ) : (
          <div className={"modalcontent"}>
            <h2>{titleText}</h2>
            {/*} any of the 3 phase 2 modals */}
            {children}
          </div>
        )}
      </div>
    </>
  );
};

export default Modal;
