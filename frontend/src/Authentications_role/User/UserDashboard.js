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
import AdminUirender from "../Admin/AdminUiRender";
import UserUirender from "./UserUirender";
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

const UserDashboard = () => {
  return (
    <>
      <UserUirender>hio</UserUirender>
    </>
  );
};

export default UserDashboard;
