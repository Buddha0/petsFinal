import axios from "axios";
import DashboardNav from "../../dashboardComponents/dashboardNav/dashboardNav";
import "./dashboardHome.scss";
import "chart.js/auto";
import { Chart } from "react-chartjs-2";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

export default function DashboardHome() {
  const [totalPets, setTotalPets] = useState(0);
  const [totalusers, setTotalUsers] = useState(0);

  useEffect(() => {
    axios
      .get("http://localhost:3000/petfinder/get")
      .then((res) => {
        const pets = res.data.getallpets;
        const numOfPets = pets.length;
        setTotalPets(numOfPets);
        console.log(numOfPets);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, []);
  useEffect(() => {
    axios.get("http://localhost:3000/petfinder/user/allUsers").then((res) => {
      const users = res.data.users;
      const numOfUsers = users.length;
      setTotalUsers(numOfUsers);
    });
  }, []);

  const barChartData = {
    labels: ["All Pets", "Adopted Pets"],
    datasets: [
      {
        label: "Pets",
        data: [totalPets, 10],
        borderWidth: 1,
      },
    ],
  };

  const pieChartData = {
    labels: ["Dogs", "Cats", "Others"],
    datasets: [
      {
        label: "Pet Categories",
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
            <Link to="/managepets">
              <div className="card">
                <div className="description">
                  <h1>{totalPets}</h1>
                  <p>Total Pets</p>
                </div>
                <img src="/dog.png" alt="Pets" />
              </div>
            </Link>

            <Link to="/manageusers">
              <div className="card">
                <div className="description">
                  <h1>{totalusers}</h1>
                  <p>Total Users</p>
                </div>
                <img src="/user.png" alt="Pets" />
              </div>
            </Link>

            <div className="card">
              <div className="description">
                <h1>20</h1>
                <p>Total Adopted</p>
              </div>
              <img src="../adopted.png" alt="Pets" />
            </div>

            {/* <div className="card">
              <div className="description">
                <h1>200</h1>
                <p>Total Pets</p>
              </div>
              <img src="../adopted.png" alt="Pets" />
            </div> */}
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
