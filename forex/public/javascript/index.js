//populate dropdown with currency options

window.onload = async function (e) {
  const xValues = [50, 60, 70, 80, 90, 100, 110, 120, 130, 140, 150];
  const yValues = [7, 8, 8, 9, 9, 9, 10, 11, 14, 14, 15];
  e.preventDefault();
  let startDate= moment().format('YYYY, MM, DD');
  
  const res= await getTMSList();
  new Chart("forexChart", {
    type: "line",
    data: {
      labels: xValues,
      datasets: [
        {
          fill: true,
          lineTension: 0,
          backgroundColor: "rgba(242,250,234,1.0)",
          borderColor: "rgba(200,231,169,1.0)",
          data: yValues,
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
            ticks: { min: 6, max: 16 },
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
};
