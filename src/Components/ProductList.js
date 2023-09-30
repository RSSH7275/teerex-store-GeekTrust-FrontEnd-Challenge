import React, { useEffect, useState, useContext } from "react";
import {
  Button,
  Rating,
  CardContent,
  CardActions,
  CardMedia,
  Card,
  Grid,
  Typography,
} from "@mui/material";
import "./ProductList.css";
import HomeContext from "../HomeContext";

/**
 * This Component Displays complete list of data items on Landing Page (Main Page)
 *
 */

const ProductList = ({ itemList }) => {
  const { addToCart } = useContext(HomeContext);

  return (
    <>
      <Card className="card" key={itemList.id}>
        <CardMedia component="img" height="240" image={itemList.imageURL} />
        <CardContent>
          <Typography>{itemList.name}</Typography>
          <Typography>₹{itemList.price}</Typography>
        </CardContent>
        <CardActions>
          <Button onClick={() => addToCart(itemList)}>Add to cart</Button>
        </CardActions>
      </Card>
    </>
  );
};

export default ProductList;
