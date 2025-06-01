import React, { useState, useEffect } from "react";
import AdminUirender from "../../Admin/AdminUiRender";
import { SidebarCon } from "../../Admin/AdminDashboard";

import { Bar } from "react-chartjs-2";
const BarChart = () => {
  let chart = JSON.parse(localStorage.getItem("chart"));
  //

  const labels = chart.map((item) => item.title);
  const dataValues = chart.map((item) => item.price);

  const chartData = {
    labels,
    datasets: [
      {
        label: "Mobile Prices",
        data: dataValues,
        backgroundColor: [
          "#f87171", // red
          "#60a5fa", // blue
          "#facc15", // yellow
          "#34d399", // green
        ],
        borderColor: ["#ef4444", "#3b82f6", "#eab308", "#10b981"],
        borderWidth: 1,
      },
    ],
  };

  const cardStyle = {
    width: "70%",
    background: "#ffffff",
    borderRadius: "15px",
    boxShadow: "0 10px 25px rgba(0,0,0,0.1)",
    padding: "15px",
    margin: "10px",
    transition: "transform 0.3s",
  };

  const titleStyle = {
    textAlign: "center",
    fontWeight: "bold",
    marginBottom: "10px",
    fontSize: "1.2rem",
    color: "#333",
  };
  return (
    <div>
      <AdminUirender>
        <SidebarCon>
          <div style={cardStyle}>
            <div style={titleStyle}>📈 Bar Chart</div>
            <Bar data={chartData} />
          </div>
        </SidebarCon>
      </AdminUirender>
    </div>
  );
};

export default BarChart;
