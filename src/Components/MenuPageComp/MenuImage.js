import React, { useState, useEffect } from "react";
import HeaderProfile from "../HeaderComp/HeaderProfile";
import Footer from "../FooterComp/Footer";
import "../MenuPageComp/MenuImage.css";
import "../HomePageStyles/HomePageStyles.css";
import Box from "@mui/material/Box";
import LinearProgress from "@mui/material/LinearProgress";
import axios from "axios";
import BannerSection2 from "../HomePageComp/BannerSection2";
import logo from "../ImageCom/logo.png";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import TablePagination from "@mui/material/TablePagination";
import TextField from "@mui/material/TextField";

function MenuImage() {
  const [activeLink, setActiveLink] = useState(null);
  const [loading, setLoading] = useState(true);
  const [menuData, setMenuData] = useState([]);
  const [menuItems, setMenuItems] = useState([]);
  const [submenuPrices, setSubmenuPrices] = useState([]);
  const [searchQuery, setSearchQuery] = useState(""); // Search query state
  const [page, setPage] = useState(0); // For pagination
  const [rowsPerPage, setRowsPerPage] = useState(5); // Rows per page for pagination

  // Fetch menu data from the API
  useEffect(() => {
    axios
      .get("https://guesthouse-api-dje8gvcwayfdfmbr.eastus-01.azurewebsites.net/api/Menu")
      .then((response) => {
        setMenuData(response.data);
        setLoading(false);

        if (response.data.length > 0) {
          setActiveLink(response.data[0].menuId);
        }
      })
      .catch((error) => {
        console.error("Error fetching menu data:", error);
        setLoading(false);
      });
  }, []);

  // Fetch menu items and submenu prices when activeLink changes
  useEffect(() => {
    if (activeLink) {
      // Fetch menu items
      axios
        .get("https://guesthouse-api-dje8gvcwayfdfmbr.eastus-01.azurewebsites.net/api/MenuItem")
        .then((response) => {
          const filteredItems = response.data.filter(
            (item) => item.menuId === activeLink
          );
          setMenuItems(filteredItems);
        })
        .catch((error) => {
          console.error("Error fetching menu items:", error);
        });

      // Fetch submenu prices
      axios
        .get("https://guesthouse-api-dje8gvcwayfdfmbr.eastus-01.azurewebsites.net/api/SubmenuPrice")
        .then((response) => {
          const filteredPrices = response.data.filter(
            (price) => price.menuId === activeLink
          );
          setSubmenuPrices(filteredPrices);
        })
        .catch((error) => {
          console.error("Error fetching submenu prices:", error);
        });
    }
  }, [activeLink]);

  // Handle search input change
  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
  };

  // Pagination handlers
  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  // Filtered menu items based on search query
  const filteredItems = menuItems.filter((item) =>
    item.menuItemName.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="menu-bg">
      {loading ? (
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            height: "100vh",
          }}
        >
          <img
            src={logo}
            alt="Logo"
            style={{ marginBottom: "10px", width: "110px", height: "120px" }}
          />
          <Box sx={{ width: "110px" }}>
            <LinearProgress color="success" style={{ height: "1px" }} />
          </Box>
        </div>
      ) : (
        <>
          <HeaderProfile />
          <section className="section-kf-menu kf-menu-tabs">
            <div className="kf-menu-container">
              <div className="align-center kf-titles">
                <div className="kf-subtitle">Guru Palace</div>
                <h3 className="kf-title">TakeOut & Delivery Menu</h3>
                <div className="kf-filter kf-filter-menu">
                  <div
                    className="kf-filter"
                    style={{ visibility: "visible" }}
                  >
                    {menuData.map((menu) => (
                      <a
                        key={menu.menuId}
                        href="#"
                        className={activeLink === menu.menuId ? "active" : ""}
                        onClick={(e) => {
                          e.preventDefault();
                          setActiveLink(menu.menuId);
                        }}
                      >
                        {menu.menuName}
                      </a>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            <div className="kf-menu-items">
              <div className="row">
                {activeLink && menuItems.length > 0 ? (
                  <>
                    {/* Search Bar */}
                    <div className="search-container">
                      <TextField
                        id="search-bar"
                        label="Search"
                        variant="outlined"
                        value={searchQuery}
                        onChange={handleSearchChange}
                        fullWidth
                        margin="normal"
                        placeholder="Search Menu Items..."
                        className="custom-search-input"
                      />
                    </div>

                    {/* Table */}
                    <TableContainer component={Paper}>
                      <Table sx={{ minWidth: 650 }} aria-label="simple table">
                        <TableHead>
                          <TableRow>
                            <TableCell className="TableHead-color">S No</TableCell>
                            <TableCell className="TableHead-color">Menu Item</TableCell>
                            <TableCell align="right" className="TableHead-color">Description</TableCell>
                            <TableCell align="right" className="TableHead-color">Quantity</TableCell>
                            <TableCell align="right" className="TableHead-color">Price</TableCell>
                          </TableRow>
                        </TableHead>
                        <TableBody>
                          {filteredItems
                            .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                            .map((item, index) => {
                              const priceData = submenuPrices.find(
                                (price) => price.menuItemId === item.menuItemId
                              );
                              return (
                                <TableRow key={item.menuItemId}>
                                  <TableCell component="th" scope="row">{index + 1}</TableCell>
                                  <TableCell component="th" scope="row">{item.menuItemName}</TableCell>
                                  <TableCell align="right">{item.menuDesc}</TableCell>
                                  <TableCell align="right">{priceData ? priceData.quantity : "N/A"}</TableCell>
                                  <TableCell align="right">{priceData ? priceData.price : "N/A"}</TableCell>
                                </TableRow>
                              );
                            })}
                        </TableBody>
                      </Table>
                      <TablePagination
                        rowsPerPageOptions={[5, 10, 25]}
                        component="div"
                        count={filteredItems.length}
                        rowsPerPage={rowsPerPage}
                        page={page}
                        onPageChange={handleChangePage}
                        onRowsPerPageChange={handleChangeRowsPerPage}
                      />
                    </TableContainer>
                  </>
                ) : (
                  <p>No menu items available.</p>
                )}
              </div>
            </div>
          </section>

          <BannerSection2 />
          <Footer />
        </>
      )}
    </div>
  );
}

export default MenuImage;
