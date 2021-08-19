import { useState } from "react";
import "./styles.css";

function firstScriptRun() {
  const allBox = document.querySelectorAll(".container");

  allBox[0].style.display = "block";
}

setTimeout(function () {
  firstScriptRun();
}, 2000);

function hideAllBox() {
  const allBox = document.querySelectorAll(".container");

  allBox.forEach((element) => {
    element.style.display = "none";
  });
}

function removelistall() {
  const alllink = document.querySelectorAll(".list");

  alllink.forEach((element) => {
    element.classList.remove("active");
  });
}

function profitHandler() {
  const buyStock = document.querySelector("#buyStock");
  const quantStock = document.querySelector("#quantStock");
  const sellStock = document.querySelector("#sellStock");
  const resultProfit = document.querySelector("#resultProfit");

  if (
    buyStock.value !== "" &&
    quantStock.value !== "" &&
    sellStock.value !== ""
  ) {
    const sellv = sellStock.value * quantStock.value;
    const buyv = buyStock.value * quantStock.value;

    if (sellStock.value > buyStock.value) {
      const profit = sellv - buyv;
      const profitPercentage =
        (profit / (buyStock.value * quantStock.value)) * 100;

      resultProfit.innerText = `your total gain is  📈  ${profit} and your gain percentage is 📈  ${profitPercentage} %`;
    } else {
      const loss = buyv - sellv;
      const lossPercentage = (loss / (buyStock.value * quantStock.value)) * 100;
      resultProfit.innerText = `your total loss is 📉 ${loss} and your loss percentage is 📉 ${lossPercentage}%`;
    }
  } else {
    alert("Please enter all value");
  }
}

function getPriceHandler() {
  const resultPrice = document.querySelector("#resultPrice");
  const stockDate = document.querySelector("#stockDate");
  const stockSymbol = document.querySelector("#stockSymbol");

  if (stockDate.value !== "" && stockSymbol.value !== "") {
    const urlReq = `https://financialmodelingprep.com/api/v3/historical-price-full/${stockSymbol.value}?from=${stockDate.value}&to=${stockDate.value}&apikey=59d9ac83b6549a1aec4389d404347b80`;

    fetch(urlReq)
      .then((data) => data.json())
      .then(
        (res) =>
          (resultPrice.innerText = `stock  price is ${res.historical[0].open.toFixed(
            2
          )} `)
      )
      .catch((error) => {
        //throw error;
        resultPrice.innerText = `Something went wrong`;
      });
  } else {
    alert("Please Enter both value");
  }
}

export default function App() {
  //link click active tab
  const handleClick = (e) => {
    //hide all box
    hideAllBox();
    //remove list all active class
    removelistall();
    //show only select box
    const selectBox = e.target.getAttribute("data-value");
    // split string into two array element and get first one\
    const boxSelect = selectBox.split("-")[0];
    //console.log("#" + boxSelect + "-tab");
    document.querySelector("#" + boxSelect).style.display = "block";
  };

  return (
    <>
      <div className="App">
        <header>
          <h2>🗠 World of Stock 🗠</h2>
        </header>

        <nav>
          <li
            className="list active"
            data-value="whatStock-tab"
            onClick={handleClick}
          >
            Stock?
          </li>
          <li className="list" data-value="profitCal-tab" onClick={handleClick}>
            Stock Calculater
          </li>
          <li className="list" data-value="getPrice-tab" onClick={handleClick}>
            Get Stock Price
          </li>
        </nav>

        <div className="container" id="whatStock">
          <h2> What is Stock ?</h2>
          <p>
            A stock is a share in the ownership of a company. A bond is an
            agreement to lend money to a company for a certain amount of time.
            Companies sell securities to people to get the money they need to
            grow. People buy securities as investments, or ways of possibly
            earning money.
          </p>
        </div>

        <div className="container" id="profitCal">
          <ul>
            <li>
              <p>Enter Stock Buy Price </p>
              <p>
                <input type="number" id="buyStock" />
              </p>
            </li>
            <li>
              <p>Enter Stock Buy Quantity</p>
              <p>
                <input type="number" id="quantStock" />
              </p>
            </li>
            <li>
              <p>Enter stock Sell Price</p>
              <p>
                <input type="number" id="sellStock" />
              </p>
            </li>

            <li>
              <button onClick={profitHandler}>Check Profit</button>
            </li>
            <li>
              <span id="resultProfit"> </span>
            </li>
          </ul>
        </div>

        <div className="container" id="getPrice">
          <ul>
            <li>
              <p>Enter Stock Symbol Like as AAPL </p>
              <p>
                <input id="stockSymbol" />
              </p>
            </li>
            <li>
              <p>Select Date</p>
              <p>
                <input type="date" id="stockDate" />
              </p>
            </li>
            <li>
              <button onClick={getPriceHandler}>Get Price</button>
            </li>
            <li>
              <span id="resultPrice"> </span>
            </li>
          </ul>
        </div>
      </div>
    </>
  );
}
