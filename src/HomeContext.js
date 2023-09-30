import { createContext, useState } from "react";
import { useSnackbar } from "notistack";

const HomeContext = createContext();

/**
 *  This function is to handle list of data of items Added to the cart While Navigation between the pages,
 *  and in addition it also handles  Update the quantity or remove the list of items added to the cart
 *
 *
 */

export function CartDataProvide({ children }) {
  const [items, setItems] = useState([]);
  const [itemTrack, setItemTracker] = useState([]);
  const { enqueueSnackbar } = useSnackbar();

  /**
   *  // function checks the  condition for the added item's quantity in the cart,if the quantity is more than available quantity,
   *    it will show error message on screen
   *
   * @param {Array.<Object>} itemList - Array of Objects having complete list of item added to the cart
   *
   *
   */

  const addToCart = (itemList) => {

    let MIN_QTY=0; // Minimum Available Quantity of an item

    let prevItem = items.find((item) => item.id === itemList.id); // to find the items if it was previously was in the item list
    const quantityInCart = prevItem ? prevItem.quantity : 0; // if item was previously is in the item list add the quantity value otherwise add 0 to it
    // item's quantity here will keep changing according to user behaviour

    let prevTrack = itemTrack.find((itemtrack) => itemtrack.id === itemList.id); // to find the items if it was previously was in the item list
    const prevTrackItem = prevTrack ? prevTrack.quantity : 0; // if item was previously is in the item list add the quantity value otherwise add 0 to it
    // item's quantity here will not change, it will remain same as quantity defined from backend API data

    if (quantityInCart < prevTrackItem) {
      if (prevItem) {
        setItems(
          items.map((item) =>
            item.id === itemList.id
              ? { ...item, quantity: item.quantity + 1 }
              : item
          )
        );
        enqueueSnackbar("Item added to cart", { variant: "success" });
      } else {
        setItems([...items, { ...itemList, quantity: 1 }]);
        setItemTracker([...itemTrack, { ...itemList }]);
      }
    }

    if (quantityInCart === MIN_QTY && prevTrackItem === MIN_QTY) {
      if (prevItem) {
        setItems(
          items.map((item) =>
            item.id === itemList.id && itemList.quantity > MIN_QTY
              ? { ...item, quantity: item.quantity + 1 }
              : item
          )
        );

        enqueueSnackbar(
          "Item Is out Of Stock,we will notify you shortly when item available",
          { variant: "info" }
        );
      } else {
        if (itemList.quantity !== MIN_QTY) {
          setItems([...items, { ...itemList, quantity: 1 }]);
          setItemTracker([...itemTrack, { ...itemList }]);
        } else {
          setItems([...items, { ...itemList, quantity: 0 }]);
        }
        enqueueSnackbar(" Added Item  in the Cart", { variant: "success" });
      }
    }
    if (
      quantityInCart !== MIN_QTY &&
      prevTrackItem !== MIN_QTY &&
      quantityInCart === prevTrackItem
    ) {
      enqueueSnackbar(
        "Cannot Add Item  greater than available quantity in the Cart",
        { variant: "error" }
      );
    }
  };

  /** // This function gets called, for delete the item added to the cart
   *
   * @param {Number} id -Unique ID for each Item
   */

  const removeCartItem = (id) => {
    setItems(items.filter((item) => item.id !== id));
  };

  return (
    <HomeContext.Provider value={{ items, addToCart, removeCartItem }}>
      {children}
    </HomeContext.Provider>
  );
}

export default HomeContext;
