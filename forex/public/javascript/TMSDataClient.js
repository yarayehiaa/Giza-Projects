async function getTMSList() {
  try {
    if (!app.currencyListCache["available_currencies"]) {
      //get or create pattern for idempotency
      const res = await axios.get(
        `https://marketdata.tradermade.com/api/v1/live_currencies_list?api_key=${app.apiKey}`
      );
      app.currencyListCache["available_currencies"] =
        res.data.available_currencies;
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

async function getTMSData(baseurl, currency2) {
  try {
    const response = await axios.get(baseurl, {
      Headers: {
        "content-type": "text/javascript; charset=utf-8",
        "Cache-Control": "max-age=31536000, immutable",
        "X-Content-Type-Options": "nosniff",
      },
    });
    responseHandler(response, currency2);
    console.log('api called');
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
