// AdminLayout.jsx
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  ProSidebar,
  Menu,
  MenuItem,
  SubMenu,
  SidebarHeader,
  SidebarFooter,
  SidebarContent,
} from "react-pro-sidebar";
import {
  FaTachometerAlt,
  FaGem,
  FaList,
  FaRegLaughWink,
  FaHeart,
  FaBars,
  FaSearchPlus,
  FaSearchMinus,
} from "react-icons/fa";
import {
  FiHome,
  FiLogOut,
  FiArrowLeftCircle,
  FiArrowRightCircle,
  FiSun,
  FiMoon,
} from "react-icons/fi";
import { RiPencilLine } from "react-icons/ri";
import { BiCog } from "react-icons/bi";
import "react-pro-sidebar/dist/scss/styles.scss";
import "../../assets/Css/AdminCss.scss"; // Create this file for custom styles
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  ArcElement,
  PointElement,
  LineElement,
  Tooltip,
  Legend,
} from "chart.js";

import { Pie, Line, Bar } from "react-chartjs-2";
import AdminUirender from "./AdminUiRender";
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  ArcElement,
  PointElement,
  LineElement,
  Tooltip,
  Legend
);

const AdminDashboard = () => {
  const [charts, setChart] = useState([
    { title: "Realme", img_path: "", count: 1, price: 200, sideImg: [] },
    { title: "Oppo", img_path: "", count: 1, price: 100, sideImg: [] },
    { title: "Samsung", img_path: "", count: 1, price: 100, sideImg: [] },
    { title: "Vivo", img_path: "", count: 1, price: 1180, sideImg: [] },
  ]);

  useEffect(() => {
    localStorage.setItem("chart", JSON.stringify(charts));
  }, [charts]);

  const labels = charts.map((item) => item.title);
  const dataValues = charts.map((item) => item.price);

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
    width: "30%",
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
    <>
      <AdminUirender>
        <SidebarCon>
          <LineChart
            charts={charts}
            labels={labels}
            dataValues={dataValues}
            chartData={chartData}
            cardStyle={cardStyle}
            titleStyle={titleStyle}
          />
          <PieChart
            charts={charts}
            labels={labels}
            dataValues={dataValues}
            chartData={chartData}
            cardStyle={cardStyle}
            titleStyle={titleStyle}
          />
          <BarChart
            charts={charts}
            labels={labels}
            dataValues={dataValues}
            chartData={chartData}
            cardStyle={cardStyle}
            titleStyle={titleStyle}
          />
        </SidebarCon>
      </AdminUirender>
    </>
  );
};

export function SidebarCon({ children }) {
  return (
    <>
      <div className="content-box" style={{ padding: "20px" }}>
        <p style={{ textAlign: "center", color: "#555" }}>
          All charts are based on latest mobile prices.
        </p>

        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "stretch",
            gap: "10px",
            marginTop: "30px",
          }}
        >
          {children}
        </div>
      </div>
    </>
  );
}

function LineChart({
  charts,
  labels,
  dataValues,
  chartData,
  cardStyle,
  titleStyle,
}) {
  console.log(dataValues);

  return (
    <div style={cardStyle}>
      <div style={titleStyle}>📈 Line Chart</div>
      <Line data={chartData} />
    </div>
  );
}
function PieChart({
  charts,
  labels,
  dataValues,
  chartData,
  cardStyle,
  titleStyle,
}) {
  return (
    <div style={cardStyle}>
      <div style={titleStyle}>📈 Pie Chart</div>
      <Pie data={chartData} />
    </div>
  );
}
function BarChart({
  charts,
  labels,
  dataValues,
  chartData,
  cardStyle,
  titleStyle,
}) {
  return (
    <div style={cardStyle}>
      <div style={titleStyle}>📈 bar Chart</div>
      <Bar data={chartData} />
    </div>
  );
}
export default AdminDashboard;
