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
  FaRegLaughWink,
  FaGem,
  FaHeart,
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

const AdminUirender = ({ children }) => {
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
    <div className={`admin-dashboard ${darkMode ? "dark" : "light"}`}>
      <div style={{ display: "flex", height: "100vh" }}>
        <div id="sidebar" className={menuCollapse ? "collapsed" : ""}>
          <ProSidebar
            collapsed={menuCollapse}
            breakPoint="md"
            transitionDuration={300}
            style={{
              height: "100vh",
              backgroundImage: sidebarImage ? `url(${sidebarImage})` : "none",
              backgroundColor: bgColor,
            }}
          >
            <SidebarHeader>
              <div className="sidebar-header">
                {!menuCollapse && <h3>Admin Dashboard</h3>}

                <div className="sidebar-toggle" onClick={menuIconClick}>
                  {menuCollapse ? (
                    <FiArrowRightCircle />
                  ) : (
                    <FiArrowLeftCircle />
                  )}
                </div>
              </div>
            </SidebarHeader>

            <SidebarContent>
              <Menu iconShape="circle">
                <MenuItem
                  active={activeSubMenu === "dashboard"}
                  // icon={<FaTachometerAlt />}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                  onClick={() => handleSubMenuToggle("dashboard")}
                >
                  <div>
                    <img
                      src={`${require("../../assets/images/AdminImg/suseeimg.PNG")}`}
                      alt=""
                      style={{
                        width: "50px",
                        height: "60px",
                        borderRadius: "100%",
                      }}
                    />
                  </div>
                  <div>admin</div>
                </MenuItem>

                <SubMenu
                  title="Charts"
                  icon={<FaRegLaughWink />}
                  open={activeSubMenu === "charts"}
                  onOpenChange={() => handleSubMenuToggle("charts")}
                >
                  <MenuItem
                    onClick={() => {
                      navigate("/pieChart");
                    }}
                  >
                    Pie charts
                  </MenuItem>
                  <MenuItem
                    onClick={() => {
                      navigate("/LineChart");
                    }}
                  >
                    Line charts
                  </MenuItem>
                  <MenuItem
                    onClick={() => {
                      navigate("/BarChart");
                    }}
                  >
                    Bar charts
                  </MenuItem>
                </SubMenu>

                <SubMenu
                  title="Components"
                  icon={<FaGem />}
                  open={activeSubMenu === "components"}
                  onOpenChange={() => handleSubMenuToggle("components")}
                >
                  <MenuItem>Component 1</MenuItem>
                  <SubMenu title="Component 2">
                    <MenuItem>Sub Component 2.1</MenuItem>
                    <MenuItem>Sub Component 2.2</MenuItem>
                  </SubMenu>
                  <MenuItem>Component 3</MenuItem>
                </SubMenu>

                <SubMenu
                  title="Features"
                  icon={<FaHeart />}
                  open={activeSubMenu === "features"}
                  onOpenChange={() => handleSubMenuToggle("features")}
                >
                  <MenuItem>Calendar</MenuItem>
                  <MenuItem disabled>E-commerce</MenuItem>
                  <MenuItem>Examples</MenuItem>
                </SubMenu>
              </Menu>
            </SidebarContent>

            <SidebarFooter>
              <Menu iconShape="square">
                <MenuItem
                  icon={darkMode ? <FiSun /> : <FiMoon />}
                  onClick={toggleDarkMode}
                >
                  {darkMode ? "Light Mode" : "Dark Mode"}
                </MenuItem>
                <MenuItem
                  icon={<FiLogOut />}
                  onClick={() => {
                    window.sessionStorage.clear("userType");
                    window.sessionStorage.clear("loggedIn");
                    window.location.href = "/login";
                  }}
                >
                  Logout
                </MenuItem>
              </Menu>
            </SidebarFooter>
          </ProSidebar>
        </div>

        <main
          className="main-content"
          style={{
            flex: 1,
            padding: "20px",
            marginLeft: menuCollapse ? "80px" : "270px",
            transition: "margin-left 0.3s",
            transform: `scale(${zoomLevel})`,
            transformOrigin: "top left",
          }}
        >
          <div className="content-controls">
            <button onClick={handleZoomIn} title="Zoom In">
              <FaSearchPlus />
            </button>
            <button onClick={handleZoomOut} title="Zoom Out">
              <FaSearchMinus />
            </button>
            <button onClick={handleResetZoom} title="Reset Zoom">
              100%
            </button>

            <div className="color-picker">
              <span>Sidebar Color: </span>
            </div>
          </div>
          {children}
        </main>
      </div>
    </div>
  );
};

export default AdminUirender;
