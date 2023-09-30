import React, { useEffect, useState, useContext } from "react";
import { Grid, Button } from "@mui/material";
import { Box } from "@mui/system";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import "./Header.css";
import { useHistory } from "react-router-dom";
import HomeContext from "../HomeContext";

/** This Function displays navabar header and handles the navigation between the pages when clicked on buttons present on navbar
 *
 * @returns {JSX.Element} -returns the jsx element to render
 */

const Header = () => {
  const { items } = useContext(HomeContext);

  const history = useHistory();

  const homePage = () => {
    history.push("/");
  };

  const cartPage = () => {
    history.push("/cart");
  };

  return (
    <>
      <header className="homePage-Header">
        <Grid item xs={12}>
          <Box className="navtext" onClick={homePage}>
            <h2>Teerex Store</h2>
          </Box>
        </Grid>

        <Grid item xs={12} className="navBarHeader">
          <Box className="product-Text">
            <Button onClick={homePage}>Products</Button>
          </Box>

          <Box>
            <Button sx={{ textTransform: "none" }} onClick={cartPage}>
              <ShoppingCartIcon />
              <span>{items.length}</span>
            </Button>
          </Box>
        </Grid>
      </header>
    </>
  );
};

export default Header;
