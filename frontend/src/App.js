import Header from './components/Header';
import ItemList from "./components/ItemList";
import PriceCard from "./components/PriceCard";
import Duration from './components/Duration';
import CheckOut from './components/CheckOut';
import FinalGreeting from "./components/FinalGreeting";
import PurchaseHistory from "./components/PurchaseHistory";
import Login from "./components/Login";
import Signup from "./components/Signup";
import ChangePassword from "./components/ChangePassword";
import HomePage from './components/HomePage';
import Pricing from './components/Pricing';
import { useHistory } from "react-router-dom";
import React, { useState, useEffect } from "react";
import { Switch, Route } from "react-router-dom";
import './App.css';

function App() {
  let newhistory = useHistory();
  const [price, setPrice] = useState(0);
  const [productName, setProductName] = useState("");
  const [numberOfDays, setNumberOfDays] = useState(0);
  const [quantity, setQuantity] = useState();
  const [numberOfItems, setNumberOfItems] = useState(1);
  const [finalPrice, setFinalPrice] = useState(0);
  const [showTable, setShowTable] = useState(false);
  const [showCard, setShowCard] = useState(false);
  const [showConfirmButton, setShowConfirmButton] = useState(false);
  const [showCart, setShowCart] = useState(false);
  const [showPriceCard, setShowPriceCard] = useState(false);
  const [showProductOption, setShowProductOption] = useState(true);
  const [error, setError] = useState();
  const [selectedProduct, setSelectedProduct] = useState();
  const [productArray, setProductArray] = useState([]);
  const [purchaseItems, setPurchaseItems] = useState([]);
  const [loggedin, setLoggedin] = useState(false);
  const [userName, setUserName] = useState("");
  const [showMessage, setShowMessage] = useState(false);
  const [showFinalGreeting, setShowFinalGreeting] = useState(false);
  const [proceedToPay, setProceedToPay] = useState(false);
  const [buttonsDisable, setButtonsDisable] = useState(false);
  const [history, setHistory] = useState([]);
  const [showHistory, setShowHistory] = useState(false);

  //number of Items function
  const confirm = (count) => {
    console.log("final", count);
    setNumberOfItems(count);
    setPrice(price * count);
  }

  //payment process
  const paymentProcess = () => {
    setProceedToPay(true);
    if (!loggedin) {
      console.log("not logged in");
      setShowCart(false);
      setShowMessage(true);
      setButtonsDisable(true);
      newhistory.push("/login");
    } else if (loggedin) {
      createPurchaseHistory(userName);
      setShowCart(false);
      setShowFinalGreeting(true);
      setShowProductOption(true);
      setTimeout(() => {
        setShowFinalGreeting(false);
      }, 10 * 1000);
    }
  }
  //duration function
  const discountPrice = (evt) => {
    if (evt.target.id === "1") {
      setFinalPrice(price);
      setNumberOfDays(1);
    }
    else if (evt.target.id === "7") {
      setFinalPrice(Math.round((price - (price * 0.05)) * 7));
      setNumberOfDays(7);
    }
    else {
      setFinalPrice(Math.round((price - (price * 0.08)) * 30));
      setNumberOfDays(30);
    }
    setShowConfirmButton(true);
  }
  //cart function
  const addToCart = () => {
    setShowCard(true);
    setShowTable(false);
    setShowPriceCard(true);
    setShowProductOption(false);
  };
  //select product from table
  const getPrice = (evt) => {
    const itemPrice = parseInt(evt.target.parentNode.cells[3].innerText);
    const itemName = evt.target.parentNode.cells[1].innerText;
    const itemQuantity = evt.target.parentNode.cells[2].innerText;
    setProductName(itemName);
    setQuantity(itemQuantity);
    setPrice(itemPrice);

  }
  //purchase More
  function purchaseMore() {
    //add Items to cart
    const newItem = {
      product: productName,
      items: numberOfItems,
      itemPrice: finalPrice,
      quantity: quantity,
      days: numberOfDays
    };
    purchaseItems.push(newItem);
    setPurchaseItems([...purchaseItems]);
    setShowTable(true);
    setPrice(0);
    setNumberOfItems(1);
    setNumberOfDays(0);
    setFinalPrice(0);
    setShowCard(false);
    setShowConfirmButton(false);
    setShowPriceCard(false);
    setShowProductOption(true);
  }

  function checkOut() {
    setShowProductOption(false);
    //add lastItem to cart
    const lastItem = {
      product: productName,
      items: numberOfItems,
      itemPrice: finalPrice,
      quantity: quantity,
      days: numberOfDays
    };
    purchaseItems.push(lastItem);
    setPurchaseItems([...purchaseItems]);
    setShowCart(true);
    setShowPriceCard(false);
    setNumberOfDays(0);
    setNumberOfItems(1);
  }

  function capitaliseFirst(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }
  //try to get the login user on every reload
  useEffect(() => {
    getUserName();
  });

  const getUserName = () => {
    return fetch('http://localhost:8080/userinfo', { credentials: 'include' })
      .then((r) => {
        if (r.ok) {
          return r.json();
        } else {
          setLoggedin(false);
          setUserName(undefined);
          return { success: false };
        }
      }).then((r) => {
        if (r.success !== false) {
          setLoggedin(true);
          setUserName(r.userName);
          setError();
        }
      });
  }
  //login handler
  const loginHandler = (userName, password) => {
    if (userName.trim().length === 0 || password.trim().length === 0) {
      setError('Please fill the requierd fields to Login in !!!')
    } else {
      userName = capitaliseFirst(userName.trim());
      console.log(userName);
      fetch('http://localhost:8080/login',
        {
          method: "POST",
          body: JSON.stringify({ userName, password }),
          headers: {
            'content-type': 'application/json'
          },
          credentials: 'include'
        })
        .then((res) => {
          if (res.ok) {
            return { success: true }
          } else {
            return res.json();
          }
        }).then((res) => {
          if (res.success === true) {
            setError();
            console.log("Login sucessfull");
            setLoggedin(true);
            setUserName(userName);
            setShowMessage(false);
            getUserName();
            newhistory.push('/');
            if (proceedToPay) {
              paymentProcess();
              createPurchaseHistory(userName);
              setShowCart(false);
              setShowFinalGreeting(true);
              setTimeout(() => {
                setShowFinalGreeting(false);
              }, 10 * 1000);
            }
          } else {
            setError(res.error);
          }

        });
    }
  }
  //signup handler
  const signupHandler = (userName, email, password) => {
    if (userName.trim().length === 0 || email.trim().length === 0 || password.trim().length === 0) {
      setError('Please fill the required fields to signup');
    } else {
      userName = capitaliseFirst(userName.trim());
      console.log(userName);
      fetch("http://localhost:8080/signup",
        {
          method: "post",
          body: JSON.stringify({ userName, email, password }),
          headers: {
            'content-type': "application/json"
          },
          credentials: 'include'
        })
        .then((res) => {
          // console.log(res);
          if (res.ok) {
            return ({ success: true });
          } else {
            return res.json();
          }
        })
        .then((res) => {
          //console.log(res);
          if (res.success === true) {
            setError();
            console.log('sign up successful');
            getUserName();
            setUserName(userName);
            setLoggedin(true);
            newhistory.push('/');
            if (proceedToPay) {
              paymentProcess();
              createPurchaseHistory(userName);
              setShowCart(false);
              setShowFinalGreeting(true);
              setTimeout(() => {
                setShowFinalGreeting(false);
              }, 10 * 1000);
            }
          } else {
            setError(res.error);
          }
        });
    }

  };
  //logout Handler
  const logoutHandler = (userName) => {
    fetch('http://localhost:8080/logout',
      {
        credentials: 'include'
      })
      .then((res) => {
        if (res.ok) {
          setUserName();
          setLoggedin(false);
          newhistory.push('/');
        }
      });
  }
  //change Password
  const changePasswordHandler = (email, password) => {
    if (email.trim().length === 0 || password.trim().length === 0) {
      setError("Please fill the required fields first")
    }
    else {
      fetch('http://localhost:8080/updatepassword',
        {
          method: "post",
          body: JSON.stringify({ email, password }),
          headers: {
            'content-type': "application/json"
          },
          credentials: 'include'
        })
        .then((res) => {
          if (res.ok) {
            return ({ success: true });
          } else {
            return res.json();
          }
        })
        .then((res) => {
          if (res.success !== true) {
            setError(res.error);
          } else {
            alert("password changed sucessful");
            setError("");
            newhistory.push("/login");
          }
        });
    }

  }
  //create Purchase History for User
  const createPurchaseHistory = (userName) => {
    console.log("purchaseHistory:", userName);

    const totalAmount = purchaseItems.reduce((currentTotal, item) => {
      return (item.itemPrice + currentTotal);
    }, 0);
    console.log(totalAmount);

    fetch('http://localhost:8080/purchasehistory',
      {
        method: 'post',
        body: JSON.stringify({ purchaseItems, userName, totalAmount }),
        headers: {
          'content-type': "application/json"
        },
        credentials: 'include'
      }
    )
      .then((res) => console.log(res));
  }
  //get Purchase History for User
  const purchaseHistoryHandler = (userName) => {
    fetch(`http://localhost:8080/gethistory/${userName}`, { credentials: 'include' })
      .then((res) => res.json())
      .then((res) => {
        if (res.error !== undefined) {
          setError(res.error);
        } else {
          setError();
          console.log(res);
          const userHistory = res.map((purchase) => {
            return ({
              _id: purchase._id,
              id: purchase.id,
              date: purchase.date,
              time: purchase.time,
              totalAmount: purchase.totalAmount,
              purchaseItems: purchase.purchaseItems
            });
          });
          const sortedArray = userHistory.sort((a, b) => b.id - a.id);
          setHistory(sortedArray);
          console.log("normal map: ", sortedArray);
        }
      });
  }
  //search
  const search = (searchItem) => {
    if (searchItem === undefined) {
      console.log(searchItem);
      setError("Please fill the requied field to search properly");
    } else {
      newhistory.push('/search');
      console.log(searchItem);
      setSelectedProduct(searchItem);
      setShowTable(true);
      searchItem = searchItem.toLowerCase();
      if (searchItem === "milks" || searchItem === "dudh" || searchItem === "doodh") {
        searchItem = "milk";
      }
      if (searchItem === "curds" || searchItem === "dahi") {
        searchItem = "curd";
      }
      if (searchItem === "butters") {
        searchItem = "butter";
      }
      if (searchItem === "sweets") {
        searchItem = "sweet";
      }
      if (searchItem === "bars") {
        searchItem = "bar";
      }
      if (searchItem === "cones") {
        searchItem = "cone";
      }
      if (searchItem === "kulfies") {
        searchItem = "kulfi";
      }
      fetch(`http://localhost:8080/search/${searchItem}`,
        { credentials: 'include' })
        .then((res) => res.json())
        .then((res) => {
          console.log(res);
          if (res.error !== undefined) {
            setError(res.error);
          } else {
            setError();
            const responsedArray = res.map((item) => {
              return ({
                product: item.productName,
                quantity: item.quantity,
                price: item.price
              });
            });
            setProductArray(responsedArray);
          }
        });
    }
  }
  //render selected products
  const showProducts = (product) => {
    setSelectedProduct(product)
    setShowTable(true);
    product = product.toLowerCase();
    fetch(`http://localhost:8080/showproducts/${product}`, { credentials: 'include' })
      .then((res) => res.json())
      .then((arr) => {

        const selectedItem = arr.map((item) => {
          return ({
            product: item.productName,
            quantity: item.quantity,
            price: item.price
          });
        });
        console.log(selectedItem);
        return (selectedItem);
      }).then((res) => setProductArray(res));
  }

  return (
    <div className="App" >
      <div>
        <Header
          loggedin={loggedin}
          userName={userName}
          search={search}
          showProducts={showProducts}
          showProductOption={showProductOption}
          logoutHandler={logoutHandler}
          setError={setError}
          buttonsDisable={buttonsDisable}
          setShowHistory={setShowHistory}
          showHistory={showHistory}
          purchaseHistoryHandler={purchaseHistoryHandler}
        /></div>

      {(showTable) ? (
        <ItemList
          productArray={productArray}
          selectedProduct={selectedProduct}
          error={error}
          getPrice={getPrice}
          price={price}
        />) : null}

      {(showPriceCard) ? (
        <PriceCard
          finalPrice={finalPrice}
          price={price}
          numberOfDays={numberOfDays}
          purchaseMore={purchaseMore}
          checkOut={checkOut}
        />) : null}

      {(price !== 0 && !showCard) ? (
        <Duration
          confirm={confirm}
          price={price}
          addToCart={addToCart}
          discountPrice={discountPrice}
          showConfirmButton={showConfirmButton}
        />) : null}
      {showCart ? (<CheckOut purchaseItems={purchaseItems} paymentProcess={paymentProcess} />) : null}
      {loggedin ? (
        null
      ) : (
          <>
            { showMessage ? (<div style={{ marginLeft: "10px", color: "red", fontSize: "20px" }} > Please Login or Signup for further process</div>) : null}
          </>
        )}
      { showFinalGreeting ? (<FinalGreeting userName={userName} purchaseItems={purchaseItems} />) : null}
      <Switch>
        <Route path="/login">
          <Login
            error={error}
            setError={setError}
            loginHandler={loginHandler} />
        </Route>
        <Route path="/signup">
          <Signup
            error={error}
            signupHandler={signupHandler} />
        </Route>
        <Route path="/changepassword">
          <ChangePassword
            error={error}
            changePasswordHandler={changePasswordHandler} />
        </Route>
        <Route path="/home">
          <HomePage />
        </Route>
        <Route exact path="/">
          <HomePage />
        </Route>
        <Route path="/pricing">
          <Pricing showProducts={showProducts} />
        </Route>
        <Route path="/history">
          <PurchaseHistory history={history} />
        </Route>
      </Switch>
    </div >
  );
}

export default App;