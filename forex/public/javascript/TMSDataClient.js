const apiKey = "A2SPiW3bUL4GSomrOofD";
const intervalDict = { "15M": "minute", "1H": "minute", "1D": "hourly" };
const periodDict = { "15M": "5", "1H": "10", "1D": "2" };

const currencyListCache = localStorage.getItem("currencyListCache")
  ? JSON.parse(localStorage.getItem("currencyListCache"))
  : {};
async function getTMSList() {
  console.log("getTMSList");
  try {
    if (!currencyListCache["available_currencies"]) {
      const res = await axios.get(
        "https://marketdata.tradermade.com/api/v1/live_currencies_list?api_key=A2SPiW3bUL4GSomrOofD"
      );
      currencyListCache["available_currencies"] = res.data.available_currencies;
      localStorage.setItem(
        "currencyListCache",
        JSON.stringify(currencyListCache)
      );
    }
    populateCurrencyDropdown(currencyListCache["available_currencies"]);
  } catch (error) {
    console.log(error);
    return error;
  }
}

async function getTMSData(e) {
  siblings=e.parentElement.children;
  for (let i = 0; i < siblings.length; i++) {
    siblings[i].classList.remove("active");
  }
  e.classList.add("active");

  let currency1 = document.getElementById("currencyDropdown1").value;
  let currency2 = document.getElementById("currencyDropdown2").value;
  if (!currency1 || !currency2) {
    alert("Please select both currencies");
    return;
  }
  let currency = currency1 + currency2;
  console.log(currency);
  let baseurl;

  if (e.innerText == "1W" || e.innerText == "1M") {
    let endDate = moment().subtract(3, "hours").subtract(2, "day"); //gmt offset for egypt and one day as data is not available realtime
    let startDate = moment().subtract(3, "hours").subtract(2, "day");
    console.log(endDate);
    startDate =
      e.innerText == "1W"
        ? startDate.subtract(7, "days").format("YYYY-MM-DD")
        : startDate.subtract(1, "months").format("YYYY-MM-DD");
    endDate = endDate.format("YYYY-MM-DD");
    baseurl = `https://marketdata.tradermade.com/api/v1/timeseries?currency=${currency}&api_key=${apiKey}&start_date=${startDate}&end_date=${endDate}&format=records`;
    console.log(startDate);
    console.log(endDate);
  } else {
    let endDate = moment()
      .subtract(3, "hours")
      .subtract(2, "day")
      .format("YYYY-MM-DD-HH:MM");
    let startDate = moment().subtract(3, "hours").subtract(2, "day");
    if (e.innerText == "15M") {
      startDate = startDate.subtract(15, "minutes").format("YYYY-MM-DD-HH:MM");
    } else if (e.innerText == "1H") {
      startDate = startDate.subtract(1, "hours").format("YYYY-MM-DD-HH:MM");
    } else if (e.innerText == "1D") {
      startDate = startDate.subtract(1, "days").format("YYYY-MM-DD-HH:MM");
    }
    let interval = intervalDict[e.innerText];
    let period = periodDict[e.innerText];
    console.log(interval);
    baseurl = `https://marketdata.tradermade.com/api/v1/timeseries?currency=${currency}&api_key=${apiKey}&start_date=${startDate}&end_date=${endDate}&format=records&interval=${interval}&period=${period}`;
    console.log(baseurl);
  }
  try {
    const response = await axios.get(baseurl, {
      Headers: {
        "content-type": "text/javascript; charset=utf-8",
        "Cache-Control": "max-age=31536000, immutable",
        "X-Content-Type-Options": "nosniff",
      },
    });
    if(response.data.quotes.length==0){
      alert("Data not available for this currency pair");
      console.log(response);
      addData([0], [0], [0], currency2);
      return;
    }
    else{
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

function populateCurrencyDropdown(currencyList) {
  console.log("populateCurrencyDropdown");
  const currencyDropdowns = document.getElementsByClassName("currencyUl");
  for (let i = 0; i < currencyDropdowns.length; i++) {
    Object.entries(currencyList).forEach(([key, value]) => {
      const opt = document.createElement("option");
      opt.textContent = value;
      opt.value = key;
      currencyDropdowns[i].appendChild(opt);
    });
  }
  return 1;
}
