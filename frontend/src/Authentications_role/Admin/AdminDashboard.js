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
import "react-pro-sidebar/dist/scss/styles.scss";
import "../../assets/Css/AdminCss.scss"; // Create this file for custom styles

const AdminDashboard = () => {
  const [menuCollapse, setMenuCollapse] = useState(false);
  const [activeSubMenu, setActiveSubMenu] = useState(null);
  const [darkMode, setDarkMode] = useState(false);
  const [zoomLevel, setZoomLevel] = useState(1);
  const [bgColor, setBgColor] = useState("#f5f7fa");
  const [sidebarImage, setSidebarImage] = useState("");

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

  const changeBgColor = (color) => {
    setBgColor(color);
  };

const handleImageUpload = (e) => {
  const file = e.target.files[0];
  if (!file) return;

  // Check if file is an image
  if (!file.type.match('image.*')) {
    alert('Please select an image file (jpg, png, gif)');
    return;
  }

  // Check file size (max 2MB)
  if (file.size > 2 * 1024 * 1024) {
    alert('Image size should be less than 2MB');
    return;
  }

  const reader = new FileReader();
  reader.onloadstart = () => {
    // You could add a loading state here
  };
  reader.onload = (event) => {
    setSidebarImage(event.target.result);
  };
  reader.onerror = () => {
    alert('Error reading file');
  };
  reader.readAsDataURL(file);
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
                  icon={<FaTachometerAlt />}
                  onClick={() => handleSubMenuToggle("dashboard")}
                >
                  Dashboard
                </MenuItem>

                <SubMenu
                  title="Charts"
                  icon={<FaRegLaughWink />}
                  open={activeSubMenu === "charts"}
                  onOpenChange={() => handleSubMenuToggle("charts")}
                >
                  <MenuItem>Pie charts</MenuItem>
                  <MenuItem>Line charts</MenuItem>
                  <MenuItem>Bar charts</MenuItem>
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
              <button onClick={() => changeBgColor("#f5f7fa")}>Light</button>
              <button onClick={() => changeBgColor("#2c3e50")}>Dark</button>
              <button onClick={() => changeBgColor("#4b6cb7")}>Blue</button>
            </div>

            <div className="image-upload">
              <input
                type="file"
                id="sidebar-image"
                accept="image/*"
                onChange={handleImageUpload}
                style={{ display: "none" }}
              />
              <label htmlFor="sidebar-image" className="upload-btn">
                {sidebarImage ? "Change Image" : "Upload BG Image"}
              </label>
              {sidebarImage && (
                <button
                  onClick={() => setSidebarImage("")}
                  className="remove-btn"
                >
                  Remove Image
                </button>
              )}
            </div>
          </div>

          <h1>Main Content Area</h1>
          <div className="content-box">
            {/* Your main content goes here */}
            <p>
              This content will zoom in/out when you click the controls above.
            </p>
          </div>
        </main>
      </div>
    </div>
  );
};

export default AdminDashboard;
