import React, { useState, useEffect } from "react";
import "./index.css";
import SubmitButton from "../login/modalcontent/submitbutton";

const CartModal = ({
  carTotal,
  gridList,
  setGridList,
  putposter,
  userName,
  putuser,
  setPreDest,
  setTabState,
  apiValid,
  cart,
}) => {
  const [cartVis, setCartVis] = useState(false);
  const [codeVal, setCodeVal] = useState("");
  const [totalVal, setTotalVal] = useState(0);
  const [coupon, setCoupon] = useState(1);
  const [couponflat, setCouponFlat] = useState(0);
  const [deals, setDeals] = useState("");

  const discountcCodes = ["20off", "firstdeal"];
  //August 26 wipe #17

  const codeCounter = () => {
    console.log("cartotal totalval" + totalVal);
    console.log("cartotal codeVal" + codeVal);
    switch (codeVal) {
      case "20off":
        //setTotalVal((cart * 0.8).toFixed(2));
        if (coupon !== 0.8) {
          setDeals(deals + " 20off ");
        }
        setCoupon(0.8);
        console.log("cartotal totalval" + totalVal);
        break;
      case "firstdeal":
        if (couponflat !== 10) {
          setDeals(deals + " firstdeal ");
        }
        setCouponFlat(10);
        break;
      default:
        setCouponFlat(0);
        setCoupon(1);
        break;
    }
  };

  useEffect(() => {
    setTotalVal(cart);
  }, [cart]);

  useEffect(() => {
    setCoupon(1);
    setCouponFlat(0);
    setCodeVal("");
  }, [userName.email]);

  useEffect(() => {
    console.log("cartotal:" + codeVal);
  }, [codeVal]);

  return (
    <>
      <span className={"cartbutton"} onClick={() => setCartVis(!cartVis)}>
        <img
          className="carticon"
          src="https://www.citypng.com/public/uploads/preview/hd-shopping-cart-white-logo-icon-transparent-png-11640441682ecem2ohejv.png"
        />
        <a className="cartotal">{carTotal}</a>
      </span>
      <div className={cartVis ? "cartwindow" : "nowindow"}>
        <span className="cartcontent">
          {/*wheehoo*/}
          <table>
            <tbody>
              {userName.cartpredest.map((e, i) => {
                return (
                  <tr className="cartitem" key={"id" + e}>
                    <td>
                      <img
                        className="cartimg"
                        onClick={() => {
                          setPreDest(e);
                          setCartVis(!cartVis);
                          setTabState(6);
                        }}
                        src={gridList[e]["img"]}
                      />
                    </td>
                    <td className="trdetails">
                      <a className="cartext">{gridList[e]["name"]}</a>
                      {/*<a className="cartnum">{gridList[i]["cartnum"]}</a>*/}
                    </td>
                    <td className="sbutton">
                      <SubmitButton
                        tabState={5}
                        itemnum={e}
                        gridList={gridList}
                        setGridList={setGridList}
                        putposter={putposter}
                        userName={userName}
                        putuser={putuser}
                      />
                      <button
                        onClick={() => {
                          setPreDest(e);
                          setTabState(7);
                        }}
                        className={apiValid ? "button2" : "nowindow"}
                      >
                        Edit
                      </button>
                      {/*<button onClick={() => {}} className="deletebutton">
                          Delete
                        </button>*/}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </span>
        <div className="cartfooter">
          <p className="footertext">Total: ${cart}</p>
          <a className="footertext">Discount code:</a>

          <input
            value={codeVal}
            onChange={(e) => {
              setCodeVal(e.target.value);
              //codeCounter();
              if (codeVal == "") {
                //setCoupon(1);
                setTotalVal(cart);
              }
            }}
          ></input>
          <button onClick={() => codeCounter()}>Submit</button>
          <a>{deals}</a>

          <p className="footerfinaltext">
            Final Total: ${(totalVal * coupon - couponflat).toFixed(2)}
          </p>
        </div>
      </div>
    </>
  );
};

export default CartModal;
