import React, { useState, useEffect } from "react";
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
// import "react-pro-sidebar/dist/scss/styles.scss";
// import "../../assets/Css/AdminCss.scss"; // Create this file for custom styles
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
import { useNavigate } from "react-router-dom";
import AdminUirender from "../../Admin/AdminUiRender";
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
const PieAdminDashboard = () => {
  const [menuCollapse, setMenuCollapse] = useState(false);
  const [activeSubMenu, setActiveSubMenu] = useState(null);
  const [darkMode, setDarkMode] = useState(false);
  const [zoomLevel, setZoomLevel] = useState(1);
  const [bgColor, setBgColor] = useState("#f5f7fa");
  const [sidebarImage, setSidebarImage] = useState("");

  const navigate = useNavigate();
  const menuIconClick = () => {
    setMenuCollapse(!menuCollapse);
    if (!menuCollapse) {
      setActiveSubMenu(null);
    }
  };

  const handleSubMenuToggle = (id) => {
    setActiveSubMenu(activeSubMenu === id ? null : id);
  };

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };

  const handleZoomIn = () => {
    setZoomLevel((prev) => Math.min(prev + 0.1, 1.5));
  };

  const handleZoomOut = () => {
    setZoomLevel((prev) => Math.max(prev - 0.1, 0.8));
  };

  const handleResetZoom = () => {
    setZoomLevel(1);
  };

  useEffect(() => {
    document.body.className = darkMode ? "dark-mode" : "light-mode";
  }, [darkMode]);

  return (
    <>
      <AdminUirender>
        <PieChart />
      </AdminUirender>
    </>
  );
};

const PieChart = () => {
  let chart = JSON.parse(localStorage.getItem("chart"));
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
    width: "50%",
    background: "#ffffff",
    borderRadius: "15px",
    boxShadow: "0 10px 25px rgba(0,0,0,0.1)",
    padding: "10px",
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
          <div style={cardStyle}>
            <div style={titleStyle}>📊 Pie Chart</div>
            <Pie data={chartData} />
          </div>
        </div>
      </div>
    </>
  );
};

export default PieAdminDashboard;
