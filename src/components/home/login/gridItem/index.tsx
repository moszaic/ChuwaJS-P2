import React, { useState } from "react";
import SubmitButton from "../modalcontent/submitbutton";
import "./index.css";

const GridItem = ({
  tabState,
  setTabState,
  itemnum,
  setPreDest,
  setValiTime,
  preDest,
  gridList,
  cart,
  setCart,
  putposter,
  setGridList,
  carTotal,
  setCarTotal,
  putuser,
  userName,
  getLogin,
  apiValid,
  sortList,
  setSortList,
  pageNum,
  setPageNum,
  chosenOne,
  setChosenOne,
}) => {
  const waiter = async () => {
    try {
      let x = gridList[itemnum];
      return x;
    } catch {
      console.log("loading");
      return { img: "", name: "", price: 0 };
    }
  };

  return (
    <div className={"gridBorder"}>
      <div className="gridItem">
        <a>
          <img
            onClick={() => {
              setTabState(6);
              setPreDest(itemnum);
            }}
            className="gridImage"
            src={
              //gridList[itemnum].img !== ""
              gridList[itemnum].img !== ""
                ? gridList[itemnum].img
                : "https://t3.ftcdn.net/jpg/02/68/55/60/360_F_268556012_c1WBaKFN5rjRxR2eyV33znK4qnYeKZjm.jpg"
            }
          />{" "}
        </a>
        <p className="itemData">{gridList[itemnum].name}</p>
        {/* <a>itemnum{itemnum}</a>*/}
        <p className="itemData">${gridList[itemnum].price}</p>
        <SubmitButton
          tabState={5}
          setTabState={setTabState}
          itemnum={itemnum}
          gridList={gridList}
          setGridList={setGridList}
          setPreDest={setPreDest}
          setValiTime={setValiTime}
          preDest={preDest}
          cart={cart}
          setCart={setCart}
          putposter={putposter}
          carTotal={carTotal}
          setCarTotal={setCarTotal}
          putuser={putuser}
          userName={userName}
          getLogin={getLogin}
          apiValid={apiValid}
          sortList={sortList}
          setSortList={setSortList}
          pageNum={pageNum}
          setPageNum={setPageNum}
          chosenOne={chosenOne}
          setChosenOne={setChosenOne}
        />
      </div>
    </div>
  );
};

export default GridItem;
