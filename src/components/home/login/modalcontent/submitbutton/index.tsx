import React, { useState, useEffect } from "react";
import "./index.css";
import Login from "../..";
import Home from "../../..";

const SubmitButton = ({
  tabState,
  setTabState,
  setValiTime,
  listkey,
  setGridList,
  phList,
  gridList,
  itemnum,
  setPreDest,
  preDest,
  putuser,
  validator,
  cart,
  setCart,
  putposter,
  apiValid,
  checkLogin,
  inputValue,
  setInputValue,
  putStatus,
  carTotal,
  setCarTotal,
  userName,
  setUserName,
  sortList,
  setSortList,
  setPageNum,
  pageNum,
  chosenOne,
  setChosenOne,
  setEmailErr,
}) => {
  //const [apiValid, setApiValid] = useState(false);
  const [plusMin, setPlusMin] = useState(true);
  //const [localErr, setLocalErr] = useState(false);
  const [wtfupdate, setWtfupdate] = useState(0);
  //const [deleteDone, setDeleteDone] = useState(true);
  let localErr = false;

  const buttonDirector = (e) => {
    switch (e) {
      case 1:
        return "Sign In";
      case 2:
        return "Create Account";
      case 3:
        return "Update Password";
      case 5:
        return "Add";
      case 6:
        return "Add to Cart";
      case 7:
        return "Save Product";
      case 8:
        return "Grid";
    }
  };

  const btD2 = (e) => {
    if (e < 4) {
      return "purplebutton";
    } else if (e == 5) {
      return "griditem";
    } else if (e == 6) {
      return "purplebuttonleft";
    } else if (e == 7 || e == 8) {
      return "purplebutton";
    } else {
      return "nobutton";
    }
  };

  const movebehavior = (e) => {
    switch (e) {
      case 1:
        return 8;
      case 2:
        if (localErr == true) {
          return 2;
        } else {
          return 1;
        }
      case 3:
        return 4;
      case 5:
        return 8;
      case 6:
        return 8;
      case 7:
        return 8;
      case 8:
        return 7;
      default:
        return 1;
    }
  };

  const numfix = (e) => {
    return e;
  };

  const getProducts = async () => {
    const x = await fetch("http://localhost:3002/gridList", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((result) => {
        //console.log("result ==" + JSON.stringify(result[0][1].name));
        return result;
      });
    return x;
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

  const putpw = async (i, e) => {
    let x = await fetch("http://localhost:3002/cartusers/" + i, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then(async (response) => {
        let q = { ...response, pw: e };
        await fetch("http://localhost:3002/cartusers/" + i, {
          method: "PUT",
          headers: {
            Accept: "application.json",
            "Content-Type": "application/json",
          },
          body: JSON.stringify(q),
        });
        return response.json();
      });
    return x;
  };

  const setholder = async () => {
    try {
      let x = await getProducts();
      setGridList(await getProducts());
    } catch (error) {
      console.log("submitbutton cant find functions??? - " + error);
    }
  };

  const signupholder = async () => {
    try {
      let x = await getLogin();
      let y = 0;
      for (let i in Object.keys(x)) {
        if (x[i].email == inputValue.email) {
          setEmailErr("alreadyexists");
          localErr = true;
        }
        if (Object.keys(x[i]).length > 1) {
          y++;
        }
      }
      if (localErr == false) {
        let q = { ...inputValue, cartpredest: [], cartcnum: [] };
        console.log("tab 2 clicked");
        putuser(y, q);
      }
    } catch (error) {
      console.log("signup error - " + error);
    }
  };

  const plusminner = async () => {
    // August 26 wipe change #18
    let x = userName.cartpredest.map((e, i) => {
      if (e == itemnum) {
        if (userName.cartcnum[i] > 0) {
          //console.log("sorter plusmin true");
          setPlusMin(true);
        } else {
          let a = userName.cartpredest.indexOf(itemnum);
          if (a >= 0) {
            let y = { ...userName }; //August 28 wipe change # 24 b
            y.cartpredest.splice(a, 1);
            y.cartcnum.splice(a, 1);
            try {
              userupdateid(userName.email).then((userid) => {
                putuser(userid, y);
              });
            } catch (error) {
              console.log("putuser :" + error);
            }
          }
          //console.log("sorter plusmin false");
          setPlusMin(false);
        }
      }
    });
    return x;
  };

  const userupdateid = async (e) => {
    try {
      let x = await getLogin();
      let y = 0;
      //console.log("iop y - " + y);
      Object.keys(x).map((g, i) => {
        /*console.log("iop x keys - " + Object.keys(x));
        console.log("iop i - " + i);
        console.log("iop i[email] - " + x[i].email);
        console.log("iop e - " + e);
        console.log("iop x - " + JSON.stringify(x));*/
        if (x[i].email !== undefined && x[i].email == e) {
          y = i;
          console.log("signup nonerror - " + y);
        }
      });
      //setErrClassName("he");
      //console.log("iop y - " + y);
      return y;
    } catch (error) {
      // setErrClassName("");
      console.log("signup error - " + error);
      //return 7;
    }
  };

  const handleid = async (e) => {
    let x = await userupdateid(e);
    return x;
  };

  /*const handleUserNamep = (a) => {
    let x = Object.keys(gridList).map((e, i) => {
      let d = a.filter((y)=> i + 1 == y)
      return d[0];
      });
    console.log("poi c" + c);
    x.forEach((e) => {
      console.log("poi x" + x);
    });
    return [2, 2, 2];
  };*/

  /*const handleUserNamec = (e) => {
    let a = [];
    let x = Object.keys(gridList).map((e, i) => {
      if (gridList[i].cartnum > 0) {
        a.push(i);
        return gridList[i].cartnum;
      }
    });
    let y = x.filter((q) => {
      return q !== undefined;
    });
    //console.log("poi y" + y);
    //console.log("poi a" + a);
    if (e == "predest") {
      return a;
    } else if (e == "cartnum") {
      return y;
    } else return [1, 2, 4];
  };*/

  const unidel = async (inputindex) => {
    getLogin().then((roster) => {
      Object.keys(roster).map((e, i) => {
        try {
          if (roster[i].cartpredest.indexOf(inputindex) >= 0) {
            console.log("unidel" + JSON.stringify(roster[i]));
            let a = { ...roster[i] };
            a.cartpredest.splice(a.cartpredest.indexOf(inputindex), 1);
            a.cartcnum.splice(a.cartpredest.indexOf(inputindex), 1);
            try {
              putuser(i, a);
            } catch (error) {
              console.log("putuser :" + error);
            }
          }
        } catch (error) {
          console.log(
            "if this isn't just skipping cartusers[Guest] or empty ids youre in trouble" +
              error
          );
        }
      });
    });
  };

  useEffect(() => {
    plusminner();
    //console.log("loopcheck");
    /*if (gridList[itemnum].cartnum == 0) {
      let a = Object.assign(gridList);
      setWtfupdate(wtfupdate + 1);
      a[itemnum].cartnum++;
      putposter(itemnum, a[itemnum]);
    }*/
  }, [/*gridList[itemnum].cartnum, */ gridList]);

  /*useEffect(() => {
    // console.log("deleteDone");
    if (
      userName.email !== undefined &&
      userName.email !== "Guest" &&
      handleUserNamec("predest") !== []
    ) {
      let q = {
        email: userName.email,
        pw: userName.pw,
        cartpredest: handleUserNamec("predest"),
        cartcnum: handleUserNamec("cartnum"),
      };
      //console.log("deleteDone" + userName.email);
      console.log("signup deleteDone" + userName.email);
      userupdateid(userName.email).then((e) => {
        putuser(e, q);
        //console.log("deleteDone r");
      });
    }
  }, [deleteDone]);*/ //

  return (
    <>
      <button
        onClick={() => {
          if (tabState == 1) {
            console.log("tab 1sb inputvalue email- " + inputValue.email);
            checkLogin(inputValue.email, inputValue.pw);
          }
          if (tabState == 2) {
            signupholder();
          }
          if (tabState == 3) {
            putpw(userupdateid(inputValue.email), inputValue.pw);
          }
          if (tabState < 5) {
            setValiTime(true);
          } else {
            try {
              setValiTime(false);
            } catch {}
          }
          if (tabState == 5) {
            if (!plusMin) {
              setPreDest(itemnum);
              /*setCart(+cart + +gridList[itemnum].price);
              let a = Object.assign(gridList);
              setPlusMin(true);
              a[itemnum].cartnum++;
              setGridList(a);*/
              //August 26 wipe change #20 a 1/4
              let a = { ...userName }; //August 28 wipe change # 24 c
              a.cartpredest.push(itemnum);
              a.cartcnum.push(1);
              console.log("setusername a" + JSON.stringify(a));
              //setUserName(a);
              //putposter(itemnum, a[itemnum]); //.then(getProducts()); //August 26 wipe change #10 1/(3+4)
              //userupdateid("lumber@gmail.com");
              //
              //let z = handleid(userName.email);
              let z = handleid(userName.email).then((e) => {
                // console.log("iop" + e);
                return e;
              });
              /*let q = {
                email: userName.email,
                pw: userName.pw,
                //cartpredest: handleUserNamec("predest"), //August 26 wipe change #19a
                //cartcnum: handleUserNamec("cartnum"),
                cartpredest: a.cartpredest, //August 28 wipe change # 24 c1
                cartcnum: a.cartcnum, //August 28 wipe change # 24 c2
              };*/
              //console.log("putuser");
              console.log("tab 5 clicked");
              try {
                userupdateid(userName.email).then((e) => {
                  putuser(
                    e,
                    a //August 28 wipe change # 24 c4 i dont need q at all
                    //handleUserNamep(),
                    //handleUserNamec(handleUserNamep())
                  );
                  setPlusMin(true);
                });
              } catch (error) {
                console.log("putuser :" + error);
              }
            }
          }
          if (tabState == 6) {
            if (!plusMin) {
              setPreDest(itemnum);
              setCart(+cart + +gridList[itemnum].price);
              /*let a = Object.assign(gridList);
              setPlusMin(true);
              a[itemnum].cartnum++;
              setGridList(a);
              putposter(itemnum, a[itemnum]); //.then(getProducts());*/
              let a = { ...userName }; //August 28 wipe change # 24 d
              a.cartpredest.push(itemnum);
              a.cartcnum.push(1);
              //setUserName(a);
              //putposter(itemnum, a[itemnum]); //.then(getProducts()); //August 26 wipe change #10 2/(3+4)
              /*let q = {
                email: userName.email,
                pw: userName.pw,
                cartpredest: a.cartpredest, //August 28 wipe change # 24 d2
                cartcnum: a.cartcnum, //August 28 wipe change # 24 d3
              };*/
              try {
                userupdateid(userName.email).then((e) => {
                  putuser(e, a);
                });
              } catch (error) {
                console.log("putuser :" + error);
              }
            }
          }
          if (tabState == 7) {
            console.log("preDest as of here is");
            console.log({ preDest });
            console.log("adder");
            let y = 1;
            console.log("adder keys length" + Object.keys(gridList[y]).length);
            while (Object.keys(gridList[y]).length > 1) {
              console.log(
                "adder keys length" + Object.keys(gridList[y]).length
              );
              console.log("adder y" + y);
              y++;
            }
            //y--;
            //let z = gridList.slice(1, y);
            if (preDest == 0) {
              let x = Object.keys(gridList).length;
              console.log("the index here of y is " + y);
              /*setGridList({
                ...gridList,
                [y]: phList,
              });*/
              console.log("calculated y aka i is" + y);
              putposter(y, { ...phList, idnum: gridList[0].highest }); //.then(getProducts());
              let highestincr = { ...gridList[0] };
              highestincr.highest++;
              putposter(0, highestincr);
            } else {
              putposter(itemnum, phList); //.then(getProducts());
            }
            //setholder();
            y = 0;
          }
          if (tabState == 8) {
            let y = 0;
            for (let i in Object.keys(gridList).slice(1)) {
              y++;
              if (Object.keys(gridList[i]).length == 1) {
                break;
              }
            }
            setPreDest(y);
          }
          try {
            setTabState(
              tabState < 4 && !apiValid
                ? movebehavior(0)
                : movebehavior(tabState)
            );
          } catch {}
        }}
        className={btD2(tabState)}
      >
        {(tabState == 5 || tabState == 6) && plusMin ? (
          <>
            <span
              className="minus"
              onClick={() => {
                /*
                let a = Object.assign(gridList);
                setWtfupdate(wtfupdate - 1);
                if (a[itemnum].cartnum == 1) {
                  setPlusMin(false);
                  setWtfupdate(0);
                }
                a[itemnum].cartnum--;
                setGridList(a);*/
                //August 26 wipe change #20 b 2/4
                let a = { ...userName }; //August 28 wipe change # 24 e1
                a.cartpredest.map((e, i) => {
                  if (e == itemnum) {
                    a.cartcnum[i]--;
                    if (a.cartcnum[i] == 0) {
                      let b = a.cartpredest.indexOf(itemnum);
                      if (b >= 0) {
                        a.cartpredest.splice(b, 1); //August 28 wipe change # 24 e2 - copy from plusminner had y assign a new obj. replaced instances of 'y' with already spread copied 'a'
                        a.cartcnum.splice(b, 1);
                        try {
                          userupdateid(a.email).then((userid) => {
                            putuser(userid, a);
                          });
                        } catch (error) {
                          console.log("putuser :" + error);
                        }
                      }
                      setPlusMin(false);
                    }
                  }
                });
                //setUserName(a);
                //putposter(itemnum, a[itemnum]); //.then(getProducts()); //August 26 wipe change #10 6/(3+4)
                let q = {
                  email: userName.email,
                  pw: userName.pw,
                  cartpredest: a.cartpredest,
                  cartcnum: a.cartcnum,
                };
                console.log("tab 5- clicked");
                try {
                  userupdateid(userName.email).then((e) => {
                    putuser(e, q);
                  });
                } catch (error) {
                  console.log("putuser :" + error);
                }
              }}
            >
              -
            </span>
            <a>
              {/*console.log(
                "sorter 5sb cartnum" +
                  userName.cartcnum[userName.cartpredest.indexOf(itemnum)]
              )}
              {console.log("sorter 5sb itemnum" + itemnum)}
              {console.log("sorter 5sb usernamecartcnum" + userName.cartcnum)}
              {console.log(
                "sorter 5sb usernamecartpredest" + userName.cartpredest
              )*/}
              {userName.cartcnum[userName.cartpredest.indexOf(itemnum)] !==
              undefined
                ? userName.cartcnum[userName.cartpredest.indexOf(itemnum)]
                : setPlusMin(false)}

              {/* userName.cartpredest.map((e, i) => {
                if (e == itemnum) {
                  return userName.cartcnum[i];
                } else if (i == userName.cartpredest.length - 1) {
                  setPlusMin(false);
                }
              })}*/}
            </a>
            <span
              className="plus"
              onClick={() => {
                let a = { ...userName }; //August 28 wipe change # 24 g
                a.cartpredest.map((e, i) => {
                  if (e == itemnum) {
                    a.cartcnum[i]++;
                  }
                });
                //setUserName(a);
                //putposter(itemnum, a[itemnum]); //.then(getProducts()); //August 26 wipe change #10 7/(3+4)
                /*let q = {
                  email: userName.email,
                  pw: userName.pw,
                  cartpredest: a.cartpredest, //August 28 wipe change # 24 g2
                  cartcnum: a.cartcnum, //August 28 wipe change # 24 g3
                };*/
                console.log("tab 5+ clicked");
                try {
                  userupdateid(userName.email).then((e) => {
                    putuser(e, a);
                  });
                } catch (error) {
                  console.log("putuser :" + error);
                }
              }}
            >
              +
            </span>
          </>
        ) : (
          <>{buttonDirector(tabState)}</>
        )}
      </button>
      {"   "}
      <button
        className={
          (tabState == 5 || tabState == 6) && apiValid
            ? "griditem2"
            : "nobutton"
        }
        onClick={() => {
          try {
            setTabState(7);
          } catch {}
          if (tabState == 5) {
            setPreDest(itemnum);
          }
          {
            /*if (tabState == 7) {
            setGridList({ ...gridList, [itemnum]: phList });
          }*/
          }
        }}
      >
        Edit
      </button>
      <button
        className={
          tabState >= 5 && tabState <= 7 && apiValid
            ? "deletebutton"
            : "nobutton"
        }
        onClick={() => {
          console.log("sortrefresh sortList" + JSON.stringify(sortList));
          if (tabState == 5 || tabState == 6) {
            let a = { id: itemnum };
            putposter(itemnum, a);
            let sortrefresh = sortList.slice(0);
            console.log("sortrefresh" + sortrefresh);
            console.log("sortrefresh spliceindex" + sortList.indexOf(itemnum));
            sortrefresh.splice(sortList.indexOf(itemnum), 1);
            console.log("sortrefresh" + sortrefresh);
            setSortList(sortrefresh);
            if (sortrefresh.length == 0) {
              setPageNum(pageNum - 6);
              setChosenOne(chosenOne - 1);
            }
            /*let q = { ...userName }; //August 28 wipe change # 24 f
            q.cartpredest.splice(q.cartpredest.indexOf(itemnum), 1);
            q.cartcnum.splice(q.cartpredest.indexOf(itemnum), 1);
            userupdateid(userName.email).then((e) => {
              putuser(e, q);
            });*/
            unidel(itemnum); //August 28 wipe change #26 a
          }
          if (tabState == 7 || tabState == 6) {
            setTabState(8);
          }
          if (tabState == 7 && preDest !== 0) {
            //let a = { id: preDest };
            //let a = preDest;
            let a = { id: preDest };
            putposter(preDest, a);
            let sortrefresh = sortList
              .slice(0)
              .splice(sortList.indexOf(preDest), 1);
            console.log("sortrefresh" + sortrefresh);
            setSortList(sortrefresh);
            if (sortrefresh.length == 0) {
              setPageNum(pageNum - 6);
              setChosenOne(chosenOne - 1);
            }

            /* let q = { ...userName };
            q.cartpredest.splice(q.cartpredest.indexOf(preDest), 1);
            q.cartcnum.splice(q.cartpredest.indexOf(preDest), 1);
            userupdateid(userName.email).then((e) => {
              putuser(e, q);
            });*/
            unidel(preDest); //August 28 wipe change #26 b
            //}fesfsfasfasf
            /* Object.keys(gridList)
              .slice(preDest, Object.keys(gridList).length - 1)
              .map((e, i) => {
                if (Object.keys(gridList[i + preDest + 1]).length > 1) {
                  putposter(i + preDest + 1, { id: i + preDest + 1 });
                  putposter(
                    i + preDest,
                    gridList[i + preDest + 1]
                  ); /*.then((e) =>
                    setDeleteDone(!deleteDone)
                  );*/
            //   }
            //  });
          } else if (tabState == 7 && preDest == 0) {
            setTabState(8);
          }
        }}
      >
        DLT
      </button>
      {/*<p>itemnum:{itemnum}</p>*/}
    </>
  );
};

export default SubmitButton;
