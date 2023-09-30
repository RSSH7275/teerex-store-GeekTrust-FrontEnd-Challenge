import DeleteIcon from "@mui/icons-material/Delete";
import React, { useContext } from "react";
import { Button, IconButton, Stack } from "@mui/material";
import { AddOutlined, ShoppingCartOutlined } from "@mui/icons-material";
import { Box } from "@mui/system";
import Header from "./Header";
import HomeContext from "../HomeContext";
import "./Cart.css";
import Divider from "@mui/material/Divider";

/** Definition of Data Structures used
 *
 * @typedef {Object} CartItem  - Data on Item added to Cart
 *
 * @property {Number} id        - Unique ID for each Item
 * @property {String} imageURL  - Having URL of the Item image
 * @property {String} name      - The name of the Item
 * @property {String} type      - The type that Item Belongs to
 * @property {Number} price     - The Price of the Particular Item
 * @property {String} currency  - The Price to Buy the Item
 * @property {String} color     - The color of the Particular Item
 * @property {String} gender    - The gender that Each Item belongs to
 * @property {Number} quantity  - The Total quantity available for each Item
 *
 */

/**
 *  This Function Gets the total value of all items added to the Cart
 *
 *  @param {Array.<Object>} items - Array of objects with complete data of item added to the cart
 *  @returns {Number}  -returns a total sum of all available items values in the cart
 */

export const getTotalCartValue = (items) => {
  if (items.length == 0) {
    return 0;
  }

  let totalVal = 0;
  items.map((item) => {
    totalVal += item.quantity * item.price;
  });
  return totalVal;
};

/**
 * Component to display current item added to the cart and handleAdd, handleDelete Buttons to update the quantity of the cart
 *
 * @param {Number} value - Current quantity of Item added to cart
 * @param {Function} handleAdd - Updates the quantity of item present in a cart by adding +1
 * @param {Function} handleDelete - Deletes the item from  a cart
 * @returns {JSX.Element} - returns a jsx element to render
 */

const ProductListHandler = ({ value, handleAdd, handleDelete }) => {
  return (
    <Stack direction="row" alignItems="center">
      <DeleteIcon size="small" color="primary" onClick={handleDelete} />
      <Box padding="0.5rem">{value}</Box>
      <IconButton size="small" color="primary" onClick={handleAdd}>
        <AddOutlined />
      </IconButton>
    </Stack>
  );
};

/**
 * // Component to display the current state of items added to cart
 *
 * @returns {JSX.Element} -returns a jsx element to render
 */

const Cart = () => {
  const { items, addToCart, removeCartItem } = useContext(HomeContext);
  if (!items.length) {
    return (
      <>
        <Header />
        <Box className="cartBox emptyBox">
          <ShoppingCartOutlined className="cartlogo" />
          <Box color="floralwhite;" textAlign="center">
            <h4>Your Cart is Empty.Add Items for CheckOut</h4>
          </Box>
        </Box>
      </>
    );
  }
  return (
    <>
      <Header />
      <Box className="cartBox emptyBox">
        {items.map((item) => (
          <Box key={item.id} className="itemBox">
            <Box className="image-Box">
              <img
                src={item.imageURL}
                alt={item.name}
                width="100%"
                height="100%"
              />
            </Box>
            <Box
              display="flex"
              flexDirection="column"
              justifyContent="space-between"
              height="5rem"
              paddingX="1rem"
            >
              <div>{item.name}</div>
              <Box className="Box-content">
                <ProductListHandler
                  handleAdd={() => addToCart(item)}
                  handleDelete={() => removeCartItem(item.id)}
                  value={item.quantity}
                />

                <Box padding="0.5rem" fontWeight="700">
                  {item.price}
                </Box>
              </Box>
            </Box>
          </Box>
        ))}

        <Divider className="lineColor" />
        <Box
          padding="1rem"
          display="flex"
          justifyContent="space-between"
          alignItems="center"
        >
          <Box color="#3C3C3C" alignSelf="center">
            Total Amount -
          </Box>
          <Box
            color="#3C3C3C"
            fontWeight="700"
            fontSize="1.5rem"
            alignSelf="center"
            data-testid="cart-total"
          >
            ₹{getTotalCartValue(items)}
          </Box>
        </Box>
      </Box>
    </>
  );
};

export default Cart;
