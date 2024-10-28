async function getTMSList() {
  try {
    if (!app.currencyListCache["available_currencies"]) {
      const res = await axios.get(
        `https://marketdata.tradermade.com/api/v1/live_currencies_list?api_key=${app.apiKey}`
      );
      app.currencyListCache["available_currencies"] = res.data.available_currencies;
      localStorage.setItem(
        "currencyListCache",
        JSON.stringify(currencyListCache)
      );
    }
    populateCurrencyDropdown(app.currencyListCache["available_currencies"]);
  } catch (error) {
    console.log(error);
    alert("Server seems to be down, please try again later");
    return error;
  }
}

async function getTMSData(e) {
  siblingSwitcher(e, "active");
  let currency1 = document.getElementById("currencyDropdown1").value;
  let currency2 = document.getElementById("currencyDropdown2").value;
  if (!currency1 || !currency2) {
    alert("Please select both currencies");
    e.classList.remove("active");
  }
  let currency = currency1 + currency2;
  let baseurl = parameterHandler(e,currency);


  
  try {
    const response = await axios.get(baseurl, {
      Headers: {
        "content-type": "text/javascript; charset=utf-8",
        "Cache-Control": "max-age=31536000, immutable",
        "X-Content-Type-Options": "nosniff",
      },
    });
    if (response.data.quotes.length == 0) {
      alert("Data not available for this currency pair");
      console.log(response);
      addData([0], [0], [0], currency2);
      return;
    } else {
      console.log(response);
      let xValues = [];
      let yValues = [];
      let openValues = [];
      response.data.quotes.forEach((element) => {
        xValues.push(element.date);
        yValues.push(element.close);
        openValues.push(element.open);
      });
      let avg = averageCalc(openValues, yValues[yValues.length - 1]);
      addData(xValues, yValues, avg, currency2);
    }
  } catch (error) {
    console.error(error);
    if (error.response.status == 401) {
      alert("Your plan doesn't allow access to this dataset");
    } else if (error.response.status == 403) {
      alert("Data outside max historical data we provide");
    } else {
      alert("An error occured, please try again later");
    }
  }
}


