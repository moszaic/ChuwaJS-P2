import React, { useEffect, useRef, useState } from "react";
import { json } from "stream/consumers";
import "./index.css";

import InputField from "./inputfield";
import SubmitButton from "./submitbutton";

const ModalContent = ({
  setTabState,
  tabState,
  inputValue,
  setInputValue,
  valiTime,
  setValiTime,
  handleTab,
  gridList,
  setGridList,
  preDest,
  setPreDest,
  putposter,
  getProducts,
  cart,
  setCart,
  loggedIn,
  setLoggedIn,
  apiValid,
  setapiValid,
  checkLogin,
  getLogin,
  putuser,
  putStatus,
  carTotal,
  setCarTotal,
  setUserName,
  userName,
  emailErr,
  setEmailErr,
  sortList,
  setSortList,
  setPageNum,
  pageNum,
  chosenOne,
  setChosenOne,
}) => {
  const [preEmail, setPreEmail] = useState(""); //made redundant by inputValue
  const [prePass, setPrePass] = useState(""); //made redundant by inputValue
  const [errClassName, setErrClassName] = useState("");
  const [phList, setPhList] = useState({
    /*name: "phname",
    desc: "desc",
    category: "category",
    price: 10,
    quantity: 20,
    img: "imgsrc",*/
    name: "",
    desc: "",
    category: "",
    price: 0,
    quantity: 0,
    img: "",
  });
  //const [valiTime, setValiTime] = useState(false);
  //const [inputValue, setInputValue] = useState({ f1: "", f2: "" });
  /*const [phList, setPhList] = useState({*/
  /*name: "phname",
    desc: "desc",
    category: "category",
    price: 10,
    quantity: 20,
    img: "imgsrc",*/ /*
    name: "",
    desc: "",
    category: "",
    price: 0,
    quantity: 0,
    img: "",
  });*/

  /*moved up to login so Modal can access it for "X" modal closer button
    const handleTab = (e) => {
    setTabState(e);

    let j = {};
    for (let i = 0; i++; i < Object.keys(inputValue).length) {
      console.log([Object.keys(inputValue)]);
      j[Object.keys(inputValue)[i]] = "";
    }
    setValiTime(false);
    setInputValue({ f1: "", f2: "" });
  };*/

  const validator = (inputtype, e) => {
    //just bring out the values here to ModalContent when the button is clicked
    let validresult = { error: "", validity: true };
    //setInterval(() => setValiTime(false), 10000);
    console.log(inputtype);

    if (inputtype === "Email") {
      if (e.length > 10) {
        //console.log("a");
        //console.log(e.slice(e.length - 10));
        //console.log("wtf");
        if (e.slice(e.length - 10) != "@gmail.com") {
          validresult.error = "Invalid email. Only G-mail currently accepted.";
          //validresult.error = "Invalid email.";
          validresult.validity = false;
        }
      } else if (e.length <= 10) {
        validresult.error = "Invalid length.";
        validresult.validity = false;
      }
    }

    if (!e) {
      validresult.error = "Invalid empty field.";
      validresult.validity = false;
    }
    return validresult;
    /*set valid n stuff*/
  };

  useEffect(() => {
    getProducts().then((e) => {
      setPhList(e[preDest]);
    });
  }, []);

  useEffect(() => {
    setValiTime(false);
    setEmailErr("");
  }, [tabState]);

  return (
    <>
      {tabState == 5 && ( //this is temp copy to check whatever until i hook up GridItem
        <>
          <a href="https://cdn.onepiecechapters.com">
            <img src="https://cdn.onepiecechapters.com/file/CDN-M-A-N/Screen-Shot-2021-04-23-at-9.31.12-PM-1024x732v3.png" />{" "}
          </a>
          <p>$2</p>
        </>
      )}
      {/*<p>modalcontent</p>
      <p>email component - returns value</p>*/}
      {tabState == 6 && (
        <>
          <p />
          <div className="imgleft">
            <div className="siximgcontainer">
              <img className="siximg" src={gridList[preDest].img} />
            </div>
            <div className="sixtext">
              <p className="sevenfont">{gridList[preDest].category}</p>
              <h1 className="breakfont">{gridList[preDest].name}</h1>
              <h1>${gridList[preDest].price}</h1>{" "}
              <a>{gridList[preDest].quantity} in stock</a>
              <p className="sevenfont">{gridList[preDest].desc}</p>
            </div>
          </div>
        </>
      )}
      <InputField //Login Email
        valiTime={valiTime}
        cname={[1, 3]}
        tabState={tabState}
        subject={"Email"}
        input={preEmail}
        inpval={inputValue.email}
        setInputValue={setInputValue}
        inputValue={inputValue}
        valindex={"email"}
        setInput={setPreEmail}
        setValiTime={setValiTime}
        validator={validator}
        objprop="name"
        preDest={preDest}
        apiValid={apiValid}
        setapiValid={setapiValid}
        emailErr={emailErr}
        setEmailErr={setEmailErr}
        errClassName={errClassName}
        setErrClassName={setErrClassName}
      />
      {/*<a>{preEmail}</a>
      <p>pw component - returns value</p>*/}
      <InputField //Login Password
        valiTime={valiTime}
        cname={[1, 2]}
        tabState={tabState}
        subject={"Password"}
        input={prePass}
        setInput={setPrePass}
        validator={validator}
        setValiTime={setValiTime}
        inpval={inputValue.pw}
        setInputValue={setInputValue}
        inputValue={inputValue}
        valindex={"pw"}
        objprop="name"
        preDest={preDest}
        apiValid={apiValid}
        setapiValid={setapiValid}
        emailErr={emailErr}
        setEmailErr={setEmailErr}
      />
      {/*console.log(inputValue.pw)*/}
      {/*<p>{prePass}</p>
      <p>
        submit button - changes function to sign in 1, sign up 2, update pw 3
  </p>*/}
      <InputField
        cname={[7, 7]}
        subject={"Product name"}
        tabState={tabState}
        predest={gridList[Object.keys(gridList)[preDest]].name} //"product" is a {}
        wholedest={gridList[Object.keys(gridList)[preDest]]}
        gridList={gridList}
        objprop="name"
        phList={phList}
        setPhList={setPhList}
        preDest={preDest}
      />
      <InputField
        cname={[7, 7]}
        subject={"product desc"}
        tabState={tabState}
        predest={gridList[Object.keys(gridList)[preDest]].desc} //"product" is a {}
        wholedest={gridList[Object.keys(gridList)[preDest]]}
        gridList={gridList}
        objprop="desc"
        phList={phList}
        setPhList={setPhList}
        preDest={preDest}
      />
      <InputField
        cname={[7, 7]}
        subject={"category"}
        tabState={tabState}
        predest={gridList[Object.keys(gridList)[preDest]].category} //"product" is a {}
        wholedest={gridList[Object.keys(gridList)[preDest]]}
        gridList={gridList}
        objprop="category"
        phList={phList}
        setPhList={setPhList}
        preDest={preDest}
      />
      <InputField
        cname={[7, 7]}
        subject={"price"}
        tabState={tabState}
        predest={gridList[Object.keys(gridList)[preDest]].price} //"product" is a {}
        wholedest={gridList[Object.keys(gridList)[preDest]]}
        gridList={gridList}
        objprop="price"
        phList={phList}
        setPhList={setPhList}
        preDest={preDest}
      />
      <InputField
        cname={[7, 7]}
        subject={"Quantity"}
        tabState={tabState}
        predest={gridList[Object.keys(gridList)[preDest]].quantity} //"product" is a {}
        wholedest={gridList[Object.keys(gridList)[preDest]]}
        gridList={gridList}
        objprop="quantity"
        phList={phList}
        setPhList={setPhList}
        preDest={preDest}
      />
      <InputField
        cname={[7, 7]}
        subject={"Add Image Link"}
        tabState={tabState}
        gridList={gridList}
        objprop="img"
        phList={phList}
        setPhList={setPhList}
        preDest={preDest}
      />
      {tabState == 7 && (
        <div className="sevenimgcontainer">
          <img className="sevenimg" src={gridList[preDest].img} />
          {gridList[preDest].img == "" && (
            <div className="previewimg">Image preview here!</div>
          )}
        </div>
      )}
      <div className="center">
        <SubmitButton
          tabState={tabState}
          setTabState={setTabState}
          setGridList={setGridList}
          setValiTime={setValiTime} //??does this need to be passed if tabState already contains it??
          setInputValue={setInputValue}
          setPreDest={setPreDest}
          inputValue={inputValue}
          preDest={preDest}
          phList={phList}
          gridList={gridList}
          predest={"product"} //gridList property
          itemnum={preDest}
          putposter={putposter}
          getProducts={getProducts}
          validator={validator}
          cart={cart}
          setCart={setCart}
          loggedIn={loggedIn}
          setLoggedIn={setLoggedIn}
          apiValid={apiValid}
          setapiValid={setapiValid}
          checkLogin={checkLogin}
          getLogin={getLogin}
          putuser={putuser}
          putStatus={putStatus}
          carTotal={carTotal}
          setCarTotal={setCarTotal}
          setUserName={setUserName}
          userName={userName}
          errClassName={errClassName}
          setErrClassName={setErrClassName}
          sortList={sortList}
          setSortList={setSortList}
          setPageNum={setPageNum}
          pageNum={pageNum}
          chosenOne={chosenOne}
          setChosenOne={setChosenOne}
          setEmailErr={setEmailErr}
        />
      </div>
      {/*<p>sign up/sign in link dpeending on tabState 1 or 2, or none if 3+</p>*/}
      {(() => {
        //rexamine function scope
        if (tabState == 1)
          return (
            <div className="clearboth">
              <p className={"left"}>
                Don't have an account?
                <span className={"highlight"} onClick={() => handleTab(2)}>
                  {" "}
                  Sign up
                </span>
                <span onClick={() => handleTab(3)} className="right">
                  Forgot Password?
                </span>
              </p>
            </div>
          );
        else if (tabState == 2)
          return (
            <p className={"left"}>
              Already have an account?{" "}
              <span className={"highlight"} onClick={() => handleTab(1)}>
                Sign in
              </span>
            </p>
          );
      })()}
    </>
  );
};

export default ModalContent;
