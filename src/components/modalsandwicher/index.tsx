import React, { useState } from "react";
import "./index.css";

import Modal from "./modal";

const MyModal = ({
  visible,
  tabState,
  children,
  setTabState,
  titleText,
  handleVisible,
  width,
  inputValue,
  setInputValue,
  handleTab,
}) => {
  return (
    <div>
      {/*<div
      className={
        visible ? (tabState < 5 ? "modalopen" : "modalopenII") : "modalclosed"
      }
    >*/}
      <Modal
        width={width}
        titleText={titleText}
        setTabState={setTabState}
        tabState={tabState}
        visible={visible}
        handleVisible={handleVisible}
        inputValue={inputValue}
        setInputValue={setInputValue}
        handleTab={handleTab}
      >
        {children}
        {/*tabState:{tabState}*/}
      </Modal>
      {/*</div>*/}
    </div>
  );
};

export default MyModal;
