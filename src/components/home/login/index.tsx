import React, { useState, useEffect } from "react";
import "./index.css";

import MyModal from "../../modalsandwicher";
import ModalContent from "./modalcontent";
import Modal from "../../modalsandwicher/modal";
import HomeContent from "./homecontent";
import GridItem from "./gridItem";
import PageButton from "./pagebutton";

const Login = ({
  visible,
  setVisible,
  tabState,
  setTabState,
  cart,
  setCart,
  loggedIn,
  setLoggedIn,
  apiValid,
  setapiValid,
  valiTime,
  setValiTime,
  putStatus,
  carTotal,
  setCarTotal,
  setApiDone,
  gridList,
  setGridList,
  getLogin,
  checkLogin,
  userName,
  setUserName,
  putuser,
  postApi,
  setPostApi,
  inputValue,
  setInputValue,
  putposter,
  getProducts,
  setPreDest,
  preDest,
  pageNum,
  setPageNum,
  emailErr,
  setEmailErr,
  isLoading,
}) => {
  //const [visible, setVisible] = useState(false);
  //const [tabState, setTabState] = useState(1);
  //const [inputEmail, setInputEmail] = useState(""); //unused
  //const [inputPassword, setInputPassword] = useState(""); //unused
  //const [inputValue, setInputValue] = useState({ email: "", pw: "" });
  //const [valiTime, setValiTime] = useState(false); //just bring out the input values to ModalContent
  //const [preDest, setPreDest] = useState(0);
  //const [jsonstate, setJsonState] = useState({ 0: "wow" });
  const [loginRoster, setLoginRoster] = useState({ 0: "wow" });
  //const [postApi, setPostApi] = useState(false);
  //const [userName, setUserName] = useState({ he: "wgui" });
  //const [pageNum, setPageNum] = useState(1);
  const [pageCount, setPageCount] = useState([]);
  const [chosenOne, setChosenOne] = useState(1);
  const [sortList, setSortList] = useState([0]);

  /*const listFill = (e) => {
    let x = Object.keys(e).length;
    let i = 0;
    e.map();
  };*/

  const handleVisible = () => {
    setVisible(!visible);
  };

  const handleTab = (e) => {
    setTabState(e);

    /*let j = {};
    for (let i = 0; i++; i < Object.keys(inputValue).length) {
      console.log([Object.keys(inputValue)]);
      j[Object.keys(inputValue)[i]] = "";
    }*/
    setValiTime(false);
    setInputValue({ email: "", pw: "" });
  };

  const titler = (tabState) => {
    switch (tabState) {
      case 1:
        return "Sign In";
      case 2:
        return "Sign Up";
      case 3:
        return "Update Password";
      case 4:
        return "PASS UPDATE SBEMT";
      case 5:
        return "grid element product";
      case 6:
        //return "grid detail product";
        return "Product Details";
      case 7:
        //return "add product";
        return "Add Product";
      case 8:
        return "Products";
      default:
        setTabState(1);
        return "";
    }
  };

  /* const getCustomerApi = async () => {
    const response = await fetch(`../../../../db.json`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
    return response;
  };*/

  const postposter = async () => {
    if (!postApi) {
      await fetch("http://localhost:3002/gridList", {
        method: "POST",
        headers: {
          Accept: "application.json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify(gridList),
      }).then((response) => {
        if (response.ok) {
          setPostApi(true);
          return response.json();
        }
      });
      //return changeProducts;
    }
  };

  /*const putposter = async (i, e) => {
    let x = 0;
    await fetch("http://localhost:3001/gridList/" + i, {
      method: "PUT",
      headers: {
        Accept: "application.json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(e),
    }).then((response) => {
      if (response.ok) {
        console.log("ecartnum" + e.cartnum);
        getProducts();
        setPostApi(true);
        //setCarTotal((carTotal += x));
        return response.json();
      }
    });
  };*/

  /* const putuser = async (i, e, a, b) => {
    let x = i;
    let y = { ...e, cartpredest: a, cartcnum: b };
    await fetch("http://localhost:3001/users/" + i, {
      method: "PUT",
      headers: {
        Accept: "application.json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(y),
    }).then((response) => {
      if (response.ok) {
        setPostApi(true);
        return response.json();
      }
    });
  };*/

  const pageButton = (e) => {
    let y = [];
    let z = 0;
    //console.log("pagenum" + Object.keys(e[1]).length);
    Object.keys(e)
      .slice(1)
      .map((j, i) => {
        if (Object.keys(e[i]).length > 1) {
          z++;
          /*console.log("pagenum z" + (z % 6));
          if (z % 6 == 0) {
            y.push(1);
          }*/
          /*return (
          <>
            <button
              className="pagebutton"
              onClick={() => {
                setPageNum(i * 6 + 1);
              }}
            >
              {i}
            </button>
            <p>{gridList.length / 6 + 1}</p>
          </>
        );*/
        }
      });
    z--;
    //y.push(1);
    let a = Math.ceil(z / 6);
    for (let i = 0; i < a; i++) {
      y.push(1);
    }
    //console.log("pagenum z" + z);
    setPageCount(y);
    /*for (let i = 0; i < x.length / 6 + 1; i++) {
      return (
        
      );
    }*/
  };

  const pageend = () => {
    /*
    let counter = 0;
    let index = 0;
    while (counter < 6 && pageNum + index < Object.keys(gridList).length) {
      console.log("counterindex");
      if (
        gridList[index] !== undefined &&
        Object.keys(gridList[pageNum + index]).length > 1
      ) {
        counter++;
      }
      index++;
    }*/
    //let a = 6 - Object.keys(gridList).slice(pageNum).length;
    //let a = counter - Object.keys(gridList).slice(pageNum).length;
    /*if (a < 0) {
      return 6;
    } else {
      return Object.keys(gridList).slice(pageNum).length;
    }*/
    if (Object.keys(gridList).slice(pageNum).length > 6) {
      //return [index];
      return 6;
    } else {
      return [Object.keys(gridList).slice(pageNum).length];
    }
  };

  const jsonformatter = async () => {
    //if (!apidone) {
    //let x = await getProducts();
    //let y = Object.assign(gridList);
    //console.log("nannyexpress style - " + JSON.stringify(jsonstate[0]["0"]));
    //console.log("jsonstate");
    //setApiDone(true);
    //setJsonState(await getProducts());
    getProducts().then((e) => {
      pageButton(e);
    });
    setLoginRoster(await getLogin());
    //console.log("gridList check " + gridList[1]);
    //return x;
    /*} else {
      let x = {};
      return x;
    }*/
  };

  /*const letsago = async () => {
    let q = 0;
    let x = await jsonformatter();
    //setCarTotal(q);
    return x;
  };*/

  /*const checkLogin = async (a, b) => {
    let x = await getLogin();
    let y = false;
    let z = "";
    console.log("excalixer: " + JSON.stringify(x[0]["email"]));
    await Object.keys(x).map((e, i) => {
      console.log("excali" + JSON.stringify(x[1]));
      if (x[i]["email"] == a && x[i]["pw"] == b) {
        y = true;
        setUserName(x[i]);
        z = x[i]["email"];
      }
    });
    setapiValid(y);
    putStatus({ status: y });
    return z;
  };*/
  useEffect(() => {
    pageButton(gridList);
    listsorter(gridList);
  }, [gridList]);

  useEffect(() => {
    jsonformatter();
  }, []);

  const listsorter = (e) => {
    let wtf = Object.keys(e)
      .filter((haveidnum) => e[haveidnum].idnum !== undefined)
      .sort((j, k) => {
        //console.log("sorter gL[j]" + e[j].idnum);
        //console.log("sorter gL[k]" + e[k].idnum);
        return e[j].idnum - e[k].idnum; //August 28 wipe change # 27 hooey this is an attempt //didn't work cause it's only sorting the given 6cut //putit before slice
      })
      .slice(pageNum - 1, pageNum + pageend() - 1);
    console.log("sorterpageend" + pageend());
    let intarray = wtf.map((e) => {
      return parseInt(e); //the biggest return of my life
    });
    setSortList(intarray);
    console.log("sorter wtf" + JSON.stringify(wtf));
  };

  useEffect(() => {
    //August 28 wipe change # 23 now changes only when email changes, not any userName cart change
    getProducts().then((e) => {
      pageButton(e);
      listsorter(e);
    });
  }, [userName.email, pageNum]);

  /*useEffect(() => {
    //console.log("http://localhost:3001/gridList/" + "4");

    //jsonformatter();
    let q = 0;
    
    pageButton(gridList);
    console.log("i have been called on first wert" + gridList[1].cartnum);
    setCarTotal(q);
  }, [gridList]);*/

  return isLoading ? (
    <div>loading</div>
  ) : (
    <>
      {/*console.log("fetch result")}
      {console.log("before getProducts")*/}
      {/*{async () => {
        console.log("usuable gedsfat" + (await getProducts()));
      }}*/}{" "}
      {/* for some reason this never showed up on console, also disappeared "use2" */}
      {/*console.log("after getProducts")}
      {console.log("gridList stringify - " + JSON.stringify({ gridList }))*/}
      {/*<a>jsonguh{apidone ? jsonstate![0][1]["name"] : "nothin"}</a>*/}
      {/*{changeposter().then((e) => console.log("change attempt " + e))}*/}
      {/*<div className={"headers"}>
        <span className={"logbutton"} onClick={() => setVisible(!visible)}>
          Login
        </span>
  </div>*/}
      <Modal
        visible={visible}
        tabState={tabState}
        setTabState={setTabState}
        handleVisible={handleVisible}
        titleText={titler(tabState)}
        inputValue={inputValue}
        setInputValue={setInputValue}
        valiTime={valiTime} //name is unclear
        setValiTime={setValiTime}
        handleTab={handleTab}
        gridList={gridList}
        setPreDest={setPreDest}
        apiValid={apiValid}
      >
        <>
          {/*<button onClick={() => setTabState(tabState + 1)}>
            tabstate changer
</button>*/}
          {/*<p>userName: {JSON.stringify(userName)}</p>*/}
          {tabState != 8 ? (
            <ModalContent
              tabState={tabState}
              setTabState={setTabState}
              inputValue={inputValue}
              setInputValue={setInputValue}
              valiTime={valiTime}
              setValiTime={setValiTime}
              handleTab={handleTab}
              gridList={gridList}
              setGridList={setGridList}
              preDest={preDest}
              setPreDest={setPreDest}
              putposter={putposter}
              getProducts={getProducts}
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
              emailErr={emailErr}
              setEmailErr={setEmailErr}
              sortList={sortList}
              setSortList={setSortList}
              setPageNum={setPageNum}
              pageNum={pageNum}
              chosenOne={chosenOne}
              setChosenOne={setChosenOne}
            />
          ) : (
            <div>
              {/*<p>{Object.keys(gridList).slice(pageNum, pageNum + 5)}</p>*/}
              {
                /*Object.keys(gridList)
                .filter((haveidnum) => gridList[haveidnum].idnum !== undefined)
                .sort((j, k) => {
                  //console.log("sorter gL[j]" + gridList[j].idnum);
                  return gridList[j].idnum - gridList[k].idnum;
                }) //August 28 wipe change # 27 hooey this is an attempt //didn't work cause it's only sorting the given 6cut //putit before slice
                .slice(pageNum, pageNum + pageend())*/
                sortList !== [0] ? (
                  sortList.map((e, i) => {
                    //if (Object.keys(gridList[e]).length > 1) {
                    return (
                      <span key={"id" + e}>
                        {/*console.log("id" + i)*/}
                        <GridItem
                          key={"griditemkey" + i}
                          tabState={tabState}
                          setTabState={setTabState}
                          itemnum={e}
                          setPreDest={setPreDest}
                          preDest={preDest}
                          setValiTime={setValiTime}
                          gridList={gridList}
                          setGridList={setGridList}
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
                          setPageNum={setPageNum}
                          pageNum={pageNum}
                          chosenOne={chosenOne}
                          setChosenOne={setChosenOne}
                        />
                      </span>
                    );
                    //}
                  })
                ) : (
                  <></>
                )
              }

              {/*<GridItem
                tabState={tabState}
                setTabState={setTabState}
                itemnum={1}
                setPreDest={setPreDest}
                preDest={preDest}
                setValiTime={setValiTime}
                gridList={gridList}
              />
              <GridItem
                tabState={tabState}
                setTabState={setTabState}
                itemnum={2}
                setPreDest={setPreDest}
                preDest={preDest}
                setValiTime={setValiTime}
                gridList={gridList}
            />*/}
            </div>
          )}
          <div className="pagebuttonwrapper">
            {/*{pageCount.length}*/}
            {pageCount.map((e, i) => {
              if (tabState == 8) {
                return (
                  <>
                    <PageButton
                      setPageNum={setPageNum}
                      i={i}
                      chosenOne={chosenOne}
                      setChosenOne={setChosenOne}
                    />
                    {/*<a className="hehe">{pageCount}</a>*/}
                  </>
                );
              }
            })}
          </div>
          {/* end of an era
          <p>apivalid: {apiValid ? "true" : "false"}</p>
          <p>pagenum: {pageNum}</p>
          <p>user: {JSON.stringify(userName)}</p>
          <p>cartotal: {carTotal}</p>
          <p>tabstate: {tabState}</p>
          <p>{JSON.stringify(gridList)}</p>
          <p>preDest: {preDest}</p>
          <p>
            inputValue: {inputValue.email}, {inputValue.pw}
          </p>
          */}
        </>
      </Modal>
    </>
  );
};

export default Login;
{
  /*name: "guy 1",
      desc: "wow",
      category: "sports",
      price: 10,
      quantity: 20,
    img: "",*/
}
{
  /* <p>tabstate: {tabState}</p>
            <p>{JSON.stringify(gridList)}</p>
            <p>preDest: {preDest}</p>
            <p>
              inputValue: {inputValue.email}, {inputValue.pw}
            </p>
            <p>apivalid: {apiValid ? "true" : "false"}</p>*/
} /*

/*const getProducts = async () => {
    const x = await fetch("http://localhost:3001/gridList", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then(async (result) => {
        let a = Object.assign(result);
        try {
          //username
          let y = [];
          let x = Object.keys(a).map((e, i) => {
            userName["cartpredest"].map((r, j) => {
              console.log("cartcnumr j" + j);
              console.log("cartcnumr r" + r);
              console.log(
                "cartcnumr result[price]" + JSON.stringify(result[i])
              );
              console.log("cartcnumr result[id]" + result["id"]);
              /* console.log(
                "cartcnum userName[cartcnum][j]" + userName["cartcnum"][j]
              );
              console.log(
                "cartcnum userName[cartpredest][j]" + userName["cartpredest"][j]
              );*/
/*if (a[i]["idnum"] == r) {
                a[r]["cartnum"] = userName["cartcnum"][j];
              } else {
                a[r]["cartnum"] = 0;
              }*/
/*   });
          });
          console.log("cartcnumr a" + JSON.stringify(a));
          setGridList(a);
          console.log("zoo wee mama" + x);
        } catch (e) {
          console.log("wagamama" + e);
          setGridList(result);
        }
        //console.log("result ==" + JSON.stringify(result[0][1].name));
        return result;
      });
    return x;
    /*.then((res) => res.json())
      .then((result) => {
        console.log("incoming result");
        //console.log(result[0][1]);
        console.log(result);
      })
      .catch(console.log);*/

//return x.json();
/*const y = await x.json();
    console.log("use2 = " + JSON.stringify(y));
    return y;*/
// };
/*const getLogin = async () => {
    const x = await fetch("http://localhost:3001/users", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((result) => {
        //setGridList(result);
        return result;
      });
    return x;
  };*/
