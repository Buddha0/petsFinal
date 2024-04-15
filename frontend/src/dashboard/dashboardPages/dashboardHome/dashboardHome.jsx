import DashboardNav from "../../dashboardComponents/dashboardNav/dashboardNav";
import "./dashboardHome.scss";
import "chart.js/auto";
import { Chart } from "react-chartjs-2";

export default function DashboardHome() {
  const barChartData = {
    labels: ["All Pets", "Adopted Pets"],
    datasets: [
      {
        label: "Pets",
        data: [50, 10],
        borderWidth: 1,
      },
    ],
  };

  const pieChartData = {
    labels: ["Dogs", "Cats", "Others"],
    datasets: [
      {
        label: "Pet Cateogries",
        data: [50, 10, 20],
        borderWidth: 1,
        backgroundColor: [
          "rgba(255,99,132,1)",
          "rgba(50,40,132,1)",
          "rgba(5,99,132,1)",
        ],
      },
    ],
  };
  return (
    <>
      <DashboardNav />
      <div className="dashboard_home">
        <div className="container">
          <div className="cards">
            <div className="card">
              <div className="description">
                <h1>200</h1>
                <p>Total Pets</p>
              </div>
              <img src="../adopted.png"></img>
            </div>

            <div className="card">
              <div className="description">
                <h1>200</h1>
                <p>Total Pets</p>
              </div>
              <img src="../adopted.png"></img>
            </div>

            <div className="card">
              <div className="description">
                <h1>200</h1>
                <p>Total Pets</p>
              </div>
              <img src="../adopted.png"></img>
            </div>

            <div className="card">
              <div className="description">
                <h1>200</h1>
                <p>Total Pets</p>
              </div>
              <img src="../adopted.png"></img>
            </div>
          </div>
          <div className="chart_container">
            <div className="bar_chart">
              <Chart type="bar" data={barChartData} />
            </div>

            <div className="pie_chart">
              <Chart type="pie" data={pieChartData} />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
