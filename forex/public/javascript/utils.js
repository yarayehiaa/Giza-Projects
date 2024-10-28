const currencyDropdown1 = document.getElementById("currencyDropdown1");
const currencyDropdown2 = document.getElementById("currencyDropdown2");
let country1, country2;

currencyDropdown1.addEventListener("change", function () {
  flag = document.getElementById("flag1");
  oldflag = flag.classList.item(1);
  lowercase = currencyDropdown1.value.toLowerCase();
  newflag = `currency-flag-${lowercase}`;
  flag.classList.replace(oldflag, newflag);
  country1 = currencyDropdown1.value;
  let list = document.getElementById("json-datalist2").options;
  document.getElementById("firstCurrency").innerHTML = country1;

  for (let i = 0; i < list.length; i++) {
    if (list[i].value == country1) {
      list[i].remove();
      break;
    } else {
      list[i].style.display = "block";
    }
  }
  return currencyDropdown1.value;
});

currencyDropdown2.addEventListener("change", function () {
  flag = document.getElementById("flag2");
  oldflag = flag.classList.item(1);
  lowercase = currencyDropdown2.value.toLowerCase();
  newflag = `currency-flag-${lowercase}`;
  flag.classList.replace(oldflag, newflag);
  country2 = currencyDropdown2.value;
  let list = document.getElementById("json-datalist1").options;
  document.getElementById("secondCurrency").innerHTML = country2;
  for (let i = 0; i < list.length; i++) {
    //remove the selected currency from the other dropdown
    if (list[i].value == country2) {
      list[i].style.display = "none";
    } else {
      list[i].style.display = "block";
    }
  }
  return currencyDropdown2.value;
});

function averageCalc(data, currentClose) {
  sum = 0;
  data.forEach((element) => {
    sum += currentClose - element;
  });
  return sum / data.length;
}

function populateCurrencyDropdown(currencyList) {
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

function siblingSwitcher(e, btns, className) {
  siblings = btns;
  for (let i = 0; i < siblings.length; i++) {
    siblings[i].classList.remove(className);
  }
  e.classList.add(className);
}

function parameterHandler(e, currency) {
  let baseurl;
  if (e.innerText == "1W" || e.innerText == "1M") {
    let endDate = moment().subtract(3, "hours"); //gmt offset for egypt and one day as data is not available realtime
    let startDate = moment().subtract(3, "hours");
    console.log(endDate);
    startDate =
      e.innerText == "1W"
        ? startDate.subtract(7, "days").format("YYYY-MM-DD")
        : startDate.subtract(1, "months").format("YYYY-MM-DD");
    endDate = endDate.format("YYYY-MM-DD");
    baseurl = `https://marketdata.tradermade.com/api/v1/timeseries?currency=${currency}&api_key=${app.apiKey}&start_date=${startDate}&end_date=${endDate}&format=records`;
    console.log(startDate);
    console.log(endDate);
  } else {
    let endDate = moment()
      .subtract(3, "hours")
      .subtract(3, "day")
      .format("YYYY-MM-DD-HH:MM");
    let startDate = moment().subtract(3, "hours").subtract(3, "day");
    if (e.innerText == "15M") {
      startDate = startDate.subtract(15, "minutes").format("YYYY-MM-DD-HH:MM");
    } else if (e.innerText == "1H") {
      startDate = startDate.subtract(1, "hours").format("YYYY-MM-DD-HH:MM");
    } else if (e.innerText == "1D") {
      startDate = startDate.subtract(1, "days").format("YYYY-MM-DD-HH:MM");
    }
    let interval = app.intervalDict[e.innerText];
    let period = app.periodDict[e.innerText];
    console.log(interval);
    baseurl = `https://marketdata.tradermade.com/api/v1/timeseries?currency=${currency}&api_key=${app.apiKey}&start_date=${startDate}&end_date=${endDate}&format=records&interval=${interval}&period=${period}`;
    console.log(baseurl);
  }

  return baseurl;
}

function responseHandler(response, currency2) {
  if (response.data.quotes.length == 0) {
    alert("Data not available for this currency pair");
    console.log(response);
    addData([0], [0], [0], currency2);
    return;
  } else {
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
}

