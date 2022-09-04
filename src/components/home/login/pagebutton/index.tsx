import React, { useState } from "react";
import "./index.css";

const PageButton = ({ setPageNum, i, chosenOne, setChosenOne }) => {
  //const [selected, setSelected] = useState(false);

  return (
    <button
      onClick={() => {
        setPageNum(i * 6 + 1);
        //setSelected(!selected);
        setChosenOne(i + 1);
      }}
      key={"pagebutton" + i}
      className={i + 1 == chosenOne ? "buttonselect" : "pagebutton"}
    >
      {i + 1}
    </button>
  );
};

export default PageButton;
