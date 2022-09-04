import React, { useEffect, useState } from "react";
import "./index.css";
import Login from "./login";
import Modal from "../modalsandwicher/modal";
import MyModal from "../modalsandwicher";
import CartModal from "./cart";

function Home() {
  //npx json-server --port 3001 --watch db.json
  const [visible, setVisible] = useState(true);
  const [tabState, setTabState] = useState(8);
  const [cart, setCart] = useState(0);
  const [carTotal, setCarTotal] = useState(0);
  const [loggedIn, setLoggedIn] = useState(true);
  const [apiValid, setApiValid] = useState(true);
  const [valiTime, setValiTime] = useState(false);
  const [apidone, setApiDone] = useState(false);
  const [postApi, setPostApi] = useState(false);
  const [inputValue, setInputValue] = useState({ email: "", pw: "" });
  const [userName, setUserName] = useState({
    email: "Guest",
    pw: "",
    cartpredest: [],
    cartcnum: [],
  });
  const [preDest, setPreDest] = useState(0);
  const [emailErr, setEmailErr] = useState("");
  const [pageNum, setPageNum] = useState(1);
  const [isLoading, setIsLoading] = useState(true);
  const [gridList, setGridList] = useState({
    /*
    0: {
      name: "",
      desc: "",
      category: "",
      price: 0,
      quantity: 0,
      img: "",
    },
    1: {
      name: "obj number 1",
      desc: "obj 1",
      category: "obj 1",
      price: 987,
      quantity: 654,
      img: "https://cdn.onepiecechapters.com/file/CDN-M-A-N/onepiecetcb_1056_014.png",
    },
    2: {
      name: "obj number 2",
      desc: "wow",
      category: "jorts",
      price: 10,
      quantity: 20,
      img: "https://cdn.onepiecechapters.com/file/CDN-M-A-N/onepiecetcb_1056_003.png",
    },*/ // 0: "test",
    //1: "default gridlist values",
    0: { img: "", name: "", price: "" },
    1: { img: "", name: "", price: "" },
    2: { img: "", name: "", price: "" },
    3: { img: "", name: "", price: "" },
    4: { img: "", name: "", price: "" },
    5: { img: "", name: "", price: "" },
    6: { img: "", name: "", price: "" },
    7: { img: "", name: "", price: "" },
    8: { img: "", name: "", price: "" },
    9: { img: "", name: "", price: "" },
    10: { img: "", name: "", price: "" },
    11: { img: "", name: "", price: "" },
    12: { img: "", name: "", price: "" },
    13: { img: "", name: "", price: "" },
    14: { img: "", name: "", price: "" },
    15: { img: "", name: "", price: "" },
    16: { img: "", name: "", price: "" },
    17: { img: "", name: "", price: "" },
    18: { img: "", name: "", price: "" },
  });

  const getProducts = async () => {
    const x = await fetch("http://localhost:3002/gridList", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((result) => {
        /*userName["cartpredest"].map((e) => {
          let a = Object.keys(result).filter((i) => e == i);
          if (a[0] !== undefined) {
            console.log("a[0] - " + a[0]);
            console.log("a[0] usernamecpd - " + userName["cartpredest"]);
            let x = { ...result[e], cartnum: userName["cartpredest"][e] };
            putposter(e, x);
          }
        });*/
        setGridList(result);
        setIsLoading(false);
        handleCart(result);
        if (userName.email == "Guest") {
          setCart(0);
        }
        return result;
      });
    return x;
  };

  const putposter = async (i, e) => {
    let x = 0;
    let y = await fetch("http://localhost:3002/gridList/" + i, {
      method: "PUT",
      headers: {
        Accept: "application.json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(e),
    }).then((response) => {
      /*let a = Object.assign(gridList);
      a[i] = e;
      setGridList(a);*/
      getProducts();
      if (response.ok) {
        ////console.log("ecartnum" + e.cartnum);
        //getProducts();
        setPostApi(true);
        //////getProducts(); //August 26 change # 5
        //setCarTotal((carTotal += x));
        return response.json();
      }
    });
    return y;
  };

  const getUser = async () => {
    const x = await fetch("http://localhost:3002/activeuser", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((result) => {
        //August 26 wipe #12
        setUserName(result);
        console.log("fdsa getuser result" + JSON.stringify(result));
        getProducts().then((listresult) => handleCart(listresult));
        return result;
      });
    return x;
  };

  const checkLogin = async (a, b) => {
    let x = await getLogin();
    let y = false;
    let z = "";
    console.log("tab excalixer: " + JSON.stringify(x[0]["email"]));
    await Object.keys(x).map((e, i) => {
      //console.log("excali" + JSON.stringify(x[1]));
      if (x[i]["email"] == a && x[i]["pw"] == b) {
        y = true;
        setTabState(8); //should've done this a week n half ago
        //console.log("usernamer" + x[i]);
      } else {
        setEmailErr("emailerr");
      }
    });
    //August 26 wipe #12
    let loginfilter = x.filter((user) => user["email"] == a && user["pw"] == b);
    if (loginfilter[0] !== undefined) {
      if (a !== "Guest") {
        let zam = {
          email: a,
          pw: b,
          cartpredest: loginfilter[0].cartpredest,
          cartcnum: loginfilter[0].cartcnum,
        };
        console.log("tab ifglitch zam: " + JSON.stringify(zam));
        console.log(
          "tab checlogin db loginfilter[0] cartpredest: " +
            loginfilter[0].cartpredest
        );
        console.log(
          "tab checlogin db loginfilter[0] cartcnum: " + loginfilter[0].cartcnum
        );
        console.log(
          "tab checlogin db loginfilter[0] email: " + loginfilter[0].email
        );
        console.log("tab checlogin db loginfilter[0] pw: " + loginfilter[0].pw);
        console.log("tab checlogin a: " + a);
        try {
          putactiveuser(zam).then((e) => {
            getUser();
          });
        } catch (puterror) {
          console.log("likely overlapping puts, error: " + puterror); //August 28 wipe change #25 - exception catcher. also put loginfilter outside of the arguably now entirely unecessary map
        }
      }
    }
    /*if (y == false) {
      putactiveuser({
        email: "Guest",
        pw: "",
        cartpredest: [],
        cartcnum: [],
      }).then((e) => {
        getUser();
      });
    }*/
    setApiValid(y);
    putStatus({ status: y });
    return z;
  };

  //login check True/False api
  const putStatus = async (e) => {
    await fetch("http://localhost:3002/logged", {
      method: "PUT",
      headers: {
        Accept: "application.json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(e),
    }).then((response) => {
      if (response.ok) {
        return response.json();
      }
    });
  };
  const getStatus = async () => {
    const x = await fetch("http://localhost:3002/logged", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((result) => {
        return result;
      });
    return x;
  };

  const putuser = async (i, e) => {
    let x = i;
    /*let y = {
      email: e.email,
      pw: e.pw,
      cartpredest: a,
      cartcnum: b,
    };*/
    //console.log("tab putuser");
    //console.log("fdsa putuser e" + JSON.stringify(e));
    setUserName(e);
    await fetch("http://localhost:3002/activeuser/", {
      method: "PUT",
      headers: {
        Accept: "application.json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(e),
    });
    await fetch("http://localhost:3002/cartusers/" + i, {
      method: "PUT",
      headers: {
        Accept: "application.json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(e),
    }).then((response) => {
      if (response.ok) {
        setPostApi(true);
        return response.json();
      }
    });
  };

  const putactiveuser = async (e) => {
    console.log("tab activeuser input e" + JSON.stringify(e));
    let waga = { ...e, cartographer: [3, 2, 1] };
    await fetch("http://localhost:3002/activeuser", {
      method: "PUT",
      headers: {
        Accept: "application.json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(waga),
    }).then((response) => {
      if (response.ok) {
        console.log("tab putactiveuser response" + response.status);
        return response.json();
      }
    });
  };

  const statuscheck = async () => {
    getStatus().then((e) => {
      setApiValid(e.status == true);
      setLoggedIn(e.status == true);
      if (e.status == true) {
        setTabState(8);
        setVisible(true);
      }
      return e.status;
    });
  };

  const getLogin = async () => {
    const x = await fetch("http://localhost:3002/cartusers", {
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
  };

  useEffect(() => {
    //August 26 #6 a Wipe - removed gridList cartnum resetter (set all to 0)
    getUser().then((e) => {
      //console.log("iop" + e["email"] + e["pw"]);
      setInputValue({ email: e["email"], pw: e["pw"] });
      //handleCart(gridList);
    });
    statuscheck();
    //setInputValue({ email: userName["email"], pw: userName["pw"] });

    //handleCarTotal();
  }, []);

  /*August 26 #7 Wipe 
  useEffect(() => {
    getProducts();
  }, [userName]);
  */

  useEffect(() => {
    /*if (!apiValid) {
      setCart(0);
    } else {
      handleCart();
    }*/
    //August 26 wipe change #16
    handleCart(gridList);
    console.log("fdsa home useeffect[username]" + JSON.stringify(userName));
    if (userName.email == "Guest") {
      setCart(0);
    }
    let y = 0;
    let x = userName.cartcnum.reduce((a, b) => a + b, y);
    console.log(
      "cartglitch " + userName.email + JSON.stringify(userName.cartcnum)
    );
    setCarTotal(x);
    //handleCarTotal();
  }, [userName]);

  /* useEffect(() => {
    if (tabState < 5) {
      getUser().then((e) => {
        checkLogin(e.email, e.pw);
      });
    }
  }, [inputValue]);

  useEffect(() => {
    getUser().then((e) => {
      checkLogin(e.email, e.pw);
    });
  }, []);*/

  /*useEffect(() => {
    getProducts().then((z) => {
      Object.keys(z).map((e, i) => {
        if (i !== 0) {
          if (Object.keys(z[i]).length > 1) {
            let a = { ...z[i], cartnum: 0 };
            putposter(i, a);
          }
        }
      });
      return 0;
    });
  }, []);*/ //August 26 change # 6

  /*const resetGridList = async () => {
    getLogin().then((e) => {
      let a = Object.keys(e).map((q, i) => {
        if (i !== 0) {
          if (Object.keys(e[i]).length > 1) {
            a[i] = { ...e[i], cartnum: 0 };
          }
        }
      });
      let y = fetch("http://localhost:3002/cartusers", {
        method: "PUT",
        headers: {
          Accept: "application.json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify(a),
      }).then((response) => {
        if (response.ok) {
          return response.json();
        }
      });
    });
  };*/

  //useEffect(() => {}, [userName]);

  // const getter = async () => {};
  useEffect(() => {
    handleCart(gridList);
  }, [userName, gridList]);

  const handleCart = async (inputlist) => {
    console.log("cartcall");
    let asdf = "";
    if (apiValid == true) {
      asdf = "true";
    } else {
      asdf = "fasle";
    }
    console.log("fdsa apivalid " + asdf);
    let q = 0;
    let b = 0;
    //console.log("asdf" + JSON.stringify(a));
    //August 26 wipe change #15
    userName.cartpredest.map((e, i) => {
      q = userName.cartcnum[i] * inputlist[e].price;
      b += q;
      /*console.log("fdsa userName" + JSON.stringify(userName));
      console.log("fdsa cartpredest[e]" + userName.cartpredest[e]);
      console.log("fdsa e" + e);
      console.log("fdsa" + userName.cartcnum[i] + " and i - " + i);
      console.log("fdsa gridelist[e] " + inputlist[e].price);
      console.log("fdsa q " + userName.cartcnum[i] * inputlist[e].price);*/
    });
    console.log("fdsa b" + b);

    setCart(b);
    return b;
  };

  return isLoading ? (
    <div>loading</div>
  ) : (
    <div className={"home"}>
      <div className={"headers"}>
        <span className="homeb" onClick={() => setTabState(8)}>
          Management Chuwa
        </span>
        <span
          className={"logbutton"}
          onClick={() => {
            //August 26 wipe
            /*
            Object.keys(gridList).map((e, i) => {
              if (i !== 0) {
                if (Object.keys(gridList[i]).length > 1) {
                  let a = { ...gridList[i], cartnum: 0 };
                  putposter(i, a);
                  console.log("tab resetter putposter i" + i);
                  console.log("tab resetter putposter a" + JSON.stringify(a));
                }
              }*/
            //loggedIn && setLoggedIn(false);
            setLoggedIn(!loggedIn);
            //setVisible(!visible);
            //let x = apiValid ? "true" : "False";
            //console.log("apiValidity" + x);
            let x = {
              email: "Guest",
              pw: "",
              cartpredest: [],
              cartcnum: [],
            };
            console.log("tab login button clicked");
            putuser(0, x).then((e) => {
              console.log("fdsa login last press");
              getUser().then((cartest) => {
                handleCart(gridList);
              });
            });
            setUserName(x);
            if (apiValid == true) {
              setApiValid(false);
              setInputValue({ email: "", pw: "" });
              putStatus({ status: "false" });
              setValiTime(false);
            } else {
              handleCart(gridList);
              setCart(0);
            }
            console.log(
              "fdsa login button post count" + JSON.stringify(userName)
            );
            setTabState(1);
          }}
        >
          {apiValid ? "Logout" : "Login"}
        </span>
        <a className="emaildisplay">
          {userName["email"]}
          {"     "}
        </a>

        <span className={"cart"}>
          ${cart}
          {"  "}
        </span>
        {/*<span className={"cart"}>
          total:
          {"    "}
          {carTotal}
        </span>*/}
        <span className="carticon">
          <CartModal
            carTotal={carTotal}
            gridList={gridList}
            setGridList={setGridList}
            putposter={putposter}
            userName={userName}
            putuser={putuser}
            setPreDest={setPreDest}
            setTabState={setTabState}
            apiValid={apiValid}
            cart={cart}
          />
        </span>
      </div>
      {/*<button onClick={() => putactiveuser({ guh: "huh" })}>aser</button>*/}
      <Login
        visible={visible}
        setVisible={setVisible}
        tabState={tabState}
        setTabState={setTabState}
        cart={cart}
        setCart={setCart}
        loggedIn={loggedIn}
        setLoggedIn={setLoggedIn}
        apiValid={apiValid}
        setapiValid={setApiValid}
        valiTime={valiTime}
        setValiTime={setValiTime}
        putStatus={putStatus}
        carTotal={carTotal}
        setCarTotal={setCarTotal}
        setApiDone={setApiDone}
        gridList={gridList}
        setGridList={setGridList}
        getLogin={getLogin}
        checkLogin={checkLogin}
        userName={userName}
        setUserName={setUserName}
        putuser={putuser}
        postApi={postApi}
        setPostApi={setPostApi}
        inputValue={inputValue}
        setInputValue={setInputValue}
        putposter={putposter}
        getProducts={getProducts}
        setPreDest={setPreDest}
        preDest={preDest}
        pageNum={pageNum}
        setPageNum={setPageNum}
        emailErr={emailErr}
        setEmailErr={setEmailErr}
        isLoading={isLoading}
      />
      <p />
      <a>guh</a>
      <p />
      {/*<Login
        visible={visible}
        setVisible={setVisible}
        tabState={tabState}
        setTabState={setTabState}
        /> ?????????*/}
      <div className={"footer"}>footer</div>
    </div>
  );
}

export default Home;
