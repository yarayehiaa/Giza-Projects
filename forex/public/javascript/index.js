const app={
  apiKey: API_KEY,
  intervalDict: { "15M": "minute", "1H": "minute", "1D": "hourly" },
  periodDict: { "15M": "5", "1H": "10", "1D": "2" },
 currencyListCache: localStorage.getItem("currencyListCache")? JSON.parse(localStorage.getItem("currencyListCache")):{},
}

window.onload = async function (e) {
  e.preventDefault();
  const res = await getTMSList();
};

function addData(label, newData,avg,country2) {
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
  standardDeviation=avg*100/newData[newData.length - 1];
  symbol=soc.getSymbolByCode(country2);
  document.getElementById("currentPrice").innerHTML = symbol+" "+newData[newData.length - 1];
  document.getElementById("average").innerHTML = avg+" ("+standardDeviation+"%)";
  
}

