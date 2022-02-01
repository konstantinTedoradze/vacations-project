import { useEffect, useState } from "react";
import { Bar } from "react-chartjs-2";
import { useSelector, useDispatch } from "react-redux";
import * as vacationsAction from "../../redux/action";
import { setAuthToken } from "../../utils/constants";

export default function BarChart() {
  const allVacations = useSelector((state) => state.vacations);
  const dispatch = useDispatch();

  const [chartData, setChartData] = useState({
    labels: [],
    datasets: [
      {
        label: "vacations followers statistics",
        data: [],
        backgroundColor: [
          // "rgba(255, 99, 132, 0.2)",
          // "rgba(54, 162, 235, 0.2)",
          // "rgba(255, 206, 86, 0.2)",
          // "rgba(75, 192, 192, 0.2)",
          // "rgba(153, 102, 255, 0.2)",
          // "rgba(255, 159, 64, 0.2)",
        ],
        fontSize: "25px",
        borderColor: [
          // "rgba(255, 99, 132, 1)",
          // "rgba(54, 162, 235, 1)",
          // "rgba(255, 206, 86, 1)",
          // "rgba(75, 192, 192, 1)",
          // "rgba(153, 102, 255, 1)",
          // "rgba(255, 159, 64, 1)",
        ],
        borderWidth: 5,
      },
    ],
  });

  useEffect(() => {
    // if(allVacations === []){
    const token = JSON.parse(localStorage.getItem("token"));
    setAuthToken(token);
    dispatch(vacationsAction.getEditUserData());
    // }
  }, []);

  useEffect(() => {
    if (allVacations && allVacations.length) {
      const chartDataCopy = { ...chartData };
      let vacationDestinationsNames = [];
      let vacationData = [];
      allVacations.forEach((vacation) => {
        vacationDestinationsNames.push(vacation.destination);
        vacationData.push(vacation.followers);
      });
      const vacationColors = getColorsRandomized(allVacations.length);
      chartDataCopy.labels = vacationDestinationsNames;
      chartDataCopy.datasets[0].data = vacationData;
      chartDataCopy.datasets[0].backgroundColor = vacationColors;
      setChartData(chartDataCopy);
    }
  }, [allVacations]);

  const colors = [
    "rgba(255, 99, 132, 0.2)",
    "rgba(12, 162, 235, 0.2)",
    "rgba(255, 206, 86, 0.2)",
    "rgba(75, 192, 192, 0.2)",
    "rgba(153, 102, 255, 0.2)",
    "rgba(255, 159, 64, 0.2)",
  ];



  const getColorsRandomized = (length) => {
    let chartColors = [];
    for (let i = 0; i < length; i++) {
      chartColors.push(colors[Math.floor(Math.random() * colors.length)]);
    }
    return chartColors;
  };


  return (
    <div style={{ 
    position: "relative", 
    margin: "30px auto", 
    width: "80vw", 
    height: 'calc(100vh - 150px)' }}>
      <Bar
        data={chartData}
        height={400}
        options={{
          maintainAspectRatio: false,
          scales: {
            x: {
              ticks: {
                color: "Black",
                font: {
                  size: 22,
                },
              },
            },
            y: {
              ticks: {
                font: {
                  beginAtZero: true,
                  size: 20,
                },
              },
            },
          },
        }}
      />
    </div>
  );
}
