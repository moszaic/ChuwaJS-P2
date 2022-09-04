import { tab } from "@testing-library/user-event/dist/tab";
import React, { useState, useEffect } from "react";
import "./index.css";

interface typetester {
  objprop: string;
}

const InputField = ({
  subject,
  cname,
  tabState,
  input,
  setInput,
  valiTime,
  validator,
  setValiTime,
  setInputValue,
  inputValue,
  valindex,
  inpval,
  predest,
  gridList,
  wholedest,
  phList,
  setPhList,
  objprop,
  preDest,
  loggedIn,
  setLoggedIn,
  setTabState,
  apiValid,
  setapiValid,
  emailErr,
  setEmailErr,
}) => {
  {
    /*const [isValid, setIsValid] = useState(true); 
old spot*/
  }

  const textest = (e) => {
    return e;
  };

  const idgi = () => {
    //console.log(valiTime);
    if (valiTime) {
      let x = validator(subject, input).validity;
      return x ? 2 : 1;
    } else {
      return 3;
    }
  };

  const tsobjmess = (e) => {
    let a = Object.assign({}, e);
    //console.log("a:");
    //console.log(gridList[preDest]);
    return a;
  };

  useEffect(() => {
    //setEmailErr("");
    if (tabState == 7) {
      try {
        //console.log(preDest);
        //console.log("sbag " + JSON.stringify(gridList[preDest]));
        /////setPhList(gridList[preDest]);
        handlePh();
      } catch (e) {
        //console.log("setting ph to gr issue");
        console.log(e);
      }
    }
  }, []);

  const valueexc = () => {
    try {
      //console.log("tester");
      //console.log(tsobjmess(phList)[objprop]);
      //console.log(phList);
      if (tabState <= 4) {
        return inpval;
      } else {
        return tsobjmess(phList)[objprop];
      }
    } catch (e) {
      //console.log("this is likely phList being empty at the end");
      {
        /*setPhList((prevState) => ({
        product: prevState,
      }));
    return phList["product"][objprop];*/
      }
      return predest;
    }
  };

  /*const handleinpval = (e) => {
    let x = Object.assign(inputValue);
    x[inpval] = e.target.value;
    setInputValue(x);
  };*/

  const handlePh = async () => {
    let x = await gridList;
    try {
      setPhList(x[preDest]);
    } catch (error) {
      console.log("setPhList error - " + error);
    }
    return phList;
  };

  return (
    <div
      className={
        tabState >= cname[0] && tabState <= cname[1] ? "field" : "nodisplay"
      }
    >
      {/*textest(subject)*/}
      <label>{subject}</label>
      <br />
      {/*console.log("phlist:")*/}

      <input
        type="text"
        value={valueexc() || inpval}
        onChange={
          tabState <= 4
            ? (e) => {
                setInput(e.target.value);
                let x = { ...inputValue }; //August 28 wipe change # 24 a
                x[valindex] = e.target.value;
                setInputValue(x);
                setValiTime(false);

                setEmailErr("");
              }
            : (e) => {
                let a = Object.assign({}, phList);
                a[objprop] = e.target.value;
                setPhList(a);
              }
        }
        className={idgi() != 1 ? "valid" : "invalid"}
      />
      <p className="errormsg">
        {idgi() != 1 ? "" : validator(subject, input).error}
      </p>
      <p className={emailErr == "emailerr" ? "errormsg" : "nodisplay"}>
        Invalid credentials!
      </p>
      <p className={emailErr == "alreadyexists" ? "errormsg" : "nodisplay"}>
        That account already exists.
      </p>
    </div>
  );
};

export default InputField;
{
  /*{console.log(phList["product"][objprop])}*/
}
