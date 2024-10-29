const app = {
  apiKey: API_KEY,
  intervalDict: { "15M": "minute", "1H": "minute", "1D": "hourly" },
  periodDict: { "15M": "5", "1H": "10", "1D": "2" },
 
};

window.onload = async function (e) {
  e.preventDefault();
  const res = await getTMSList();
};

function addData(label, newData, avg, country2) {
  chart = new Chart("forexChart", {
    type: "line",
    data: {
      labels: label,
      datasets: [
        {
          fill: true,
          lineTension: 0,
          backgroundColor: "rgba(242,250,234,1.0)",
          borderColor: "rgba(200,231,169,1.0)",
          data: newData,
          borderJoinStyle: "bevel",
          pointStyle: "dash",
        },
      ],
    },
    options: {
      legend: { display: false },
      scales: {
        yAxes: [
          {
            gridLines: {
              color: "rgba(0, 0, 0, 0)",
            },
            display: false,
          },
        ],
        xAxes: [
          {
            gridLines: {
              color: "rgba(0, 0, 0, 0)",
            },
            display: false,
          },
        ],
      },
    },
  });
  standardDeviation = (avg * 100) / newData[newData.length - 1];
  symbol = soc.getSymbolByCode(country2);
  document.getElementById("currentPrice").innerHTML =
    symbol + " " + newData[newData.length - 1];
  document.getElementById("average").innerHTML =
    avg + " (" + standardDeviation + "%)";
}
let debouncedGetTMSData=_.debounce(getTMSData, 1000,true);

const intervalBtns = document.getElementsByClassName("intervalBtn");
[...intervalBtns].forEach((element) => {
  element.addEventListener("click", function (e) {
    siblingSwitcher(element, intervalBtns, "active");
    let currency1 = document.getElementById("currencyDropdown1").value;
    let currency2 = document.getElementById("currencyDropdown2").value;
    if (!currency1 || !currency2) {
      alert("Please select both currencies");
      e.classList.remove("active");
    }
    let currency = currency1 + currency2;
    let baseurl = parameterHandler(element, currency);
    debouncedGetTMSData(baseurl, currency2); //to avoid multiple api calls
  });
});
