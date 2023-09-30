import { Search, SentimentDissatisfied } from "@mui/icons-material";
import { Grid, InputAdornment, TextField, Button } from "@mui/material";
import { Box, color } from "@mui/system";
import axios from "axios";
import { useSnackbar } from "notistack";
import React, { useContext, useEffect, useState } from "react";
import { config } from "../App";
import "./HomePage.css";
import Header from "./Header";
import ProductList from "./ProductList";
import FilterAltIcon from "@mui/icons-material/FilterAlt";
import { allColor, allGender, allPrice, allType } from "./CategoryList";
import CategoryPanelList from "./CategoryPanelhandler";
import {
  panelFunction,
  handleSelectPanel,
  handleSelectFilter,
} from "./FunctionHandler";

/**
 * Definition of Data Structure used
 *
 * @typedef {Object} Item  - Data on Item available to buy
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
 */

const HomePage = () => {
  const { enqueueSnackbar } = useSnackbar();
  const [itemList, setItemList] = useState([]);
  const [useStoreItem, setStoreItem] = useState([]);
  const [searchtxt, setSearchtxt] = useState([]);
  const [filtItemList, setfiltItem] = useState([]);
  const [storeSrchtxt, setstoreSrchText] = useState([]);
  const [isPanelOpen, setisPanelOpen] = useState(false);

  useEffect(() => {
    fetchApiCall();
  }, []);

  /**
   *
   * Make an API Call to fetch and get the Items List and store the Items List for display the stored items
   *
   * @returns {Array.<Item>}
   *           returns an array of object with complete set of  data on all available products
   */

  const fetchApiCall = async () => {
    try {
      const response = await axios.get(config.endpoint);
      const data = response.data;
      setItemList(data);
      setStoreItem(data);
      return data;
    } catch (error) {
      if (error.response) {
        enqueueSnackbar(error.response.data.message, { variant: "error" });
      } else {
        enqueueSnackbar("Check that Backend is running properly", {
          variant: "error",
        });
      }
    }
  };

  /**
   *
   * @param {string} srchVal
   *     Whenver User types on the search Bar, written text will get sorted and displayed the list of available Item based on srchVal (Text)
   *
   * @returns {string}
   *       returns the string of searched text
   */

  const lettercapitalizer = (srchVal) => {
    const strArr = srchVal.split(" ");
    for (let i = 0; i < strArr.length; i++) {
      strArr[i] = strArr[i].charAt(0).toUpperCase() + strArr[i].slice(1);
    }
    return strArr.join(" ");
  };

  /**
   * This function gets called when user types some text on the search Input field
   * @param {{ target: { value: string } }} event
   *     JS event object gets trigerred when users types something on search input field
   *     and whatever the value comes from the callBack function (lettercapitalizer), it stores that value into a variable declared.
   *
   */

  const handleSearchtext = (event) => {
    let settext = event.target.value;
    let newWord = lettercapitalizer(settext);
    setSearchtxt(newWord);
  };

  useEffect(() => {
    ItemListfilt(searchtxt);
  }, [searchtxt]);

  /**
   * This Function Checks the searchtxt value, whether the value matches,
   * if it's matches then  it will sort the items and stores the filtered list of items.
   * @param {string} searchtxt
   *         This value obtained when user types some text on the search input field
   *
   */

  const ItemListfilt = (searchtxt) => {
    const filtItem = itemList.filter(
      (ele) =>
        ele.name == searchtxt || ele.color == searchtxt || ele.type == searchtxt
    );
    if (filtItem.length) {
      setfiltItem(filtItem);
      setstoreSrchText(filtItem);
    } else {
      setfiltItem([]);
      setstoreSrchText([]);
    }
  };

  /**
   *
   *  Code for Category Panel to filter the T-Shirts according to specific Attributes (Color,Gender,Price Range,Type)
   *
   *  */

  /**
   * Code for  Color-filter of Category Panel
   *
   */

  const [filtcol, setFiltcol] = useState([]); // it stores the value ["Red","Blue","Green"] when user clicks on checkbox input field
  const [filtColor, setFiltColor] = useState([]); //it stores the list of sorted items [{...}]  , when user clicks on checkbox input field

  /**
   * // This Function handles Color-Panel when User Click on color-filter Input field
   *
   * @param {string} clickVal
   *         clickVal have a value of Particular color-filter whenever the User Clicks
   * @param {Array.<Item>} list
   *        Contains list of Item which may be already sorted or may contain complete list of data of Item,
   *        depends on what type in Category Panel user has first click
   */

  const handleColorFilt = (clickVal, list) => {
    let value = "color"; // the value is defined here to pass as an argument to handleSelectFilter function for checking the conditions defined in that function

    handleSelectFilter(
      clickVal,
      list,
      filtcol,
      setFiltcol,
      filtColor,
      setFiltColor,
      setItemList,
      setfiltItem,
      value
    );
  };

  /**
   * This Function gets called when user clicks on filter Color in the Category Panel.
   * @param {{ target: { value: string } }} event
   *    JS event object gets trigerred when user Clicks on Category Panel
   *
   */

  const handleColorChange = (event) => {
    let clickVal = event.target.value;

    handleSelectPanel(
      handleColorFilt,
      clickVal,
      useStoreItem,
      gender,
      price,
      typefil,
      storeSrchtxt
    );
  };

  /**
   *
   * Code for Gender Filter of Category Panel
   *
   */

  const [filtgen, setFiltgen] = useState([]); // it stores the value ["Men","Women"] when user clicks on checkbox input field
  const [gender, setGender] = useState([]); //it stores the list of sorted items [{...}]  , when user clicks on checkbox input field

  /**
   * // This Function handles Gender-Panel when User Click on Gender-filter Input field.
   *
   *
   * @param {string} clickVal
   *         clickVal have a value of Particular Gender-type whenever the User Clicks
   * @param {Array.<Item>} list
   *     Contains list of Item which may be already sorted or may contain complete list of data of Item,
   *     depends on what type in Category Panel user has first click
   *
   */

  const handlegenfilt = (clickVal, list) => {
    let value = "gender"; // the value is defined here to pass as an argument to handleSelectFilter function for checking the condition defined in that function

    handleSelectFilter(
      clickVal,
      list,
      filtgen,
      setFiltgen,
      gender,
      setGender,
      setItemList,
      setfiltItem,
      value
    );
  };

  /**
   * This Function gets called when user clicks on filter Gender in the Category Panel.
   * @param {{ target: { value: string } }} event
   *    JS event object gets trigerred when user Clicks on Category Panel
   *
   */

  const handleGenderChange = (event) => {
    let clickVal = event.target.value;

    handleSelectPanel(
      handlegenfilt,
      clickVal,
      useStoreItem,
      filtColor,
      price,
      typefil,
      storeSrchtxt
    );
  };

  /**
   *  // Code for Price-Filter of Category Panel
   *
   */

  const [filtprice, setFiltprice] = useState([]); // it stores the value ["0-250","250-450"] when user clicks on checkbox input field
  const [price, setPrice] = useState([]); //it stores the list of sorted items [{...}]  , when user clicks on checkbox input field

  /**
   * // This Function handles Price-Panel when User Click on Price-filter Input field.
   *
   *
   * @param {string} clickVal
   *         clickVal have a value of Particular Price-filter whenever the User Clicks
   * @param {Array.<Item>} list
   *     Contains list of Item which may be already sorted or may contain complete list of data of Item,
   *     depends on what type in Category Panel user has first click
   *
   */

  const handlePricefilt = (clickVal, list) => {
    let value = "price"; // the value is defined here to pass as an argument to handleSelectFilter function for checking the condition defined in that function

    handleSelectFilter(
      clickVal,
      list,
      filtprice,
      setFiltprice,
      price,
      setPrice,
      setItemList,
      setfiltItem,
      value
    );
  };

  /**
   * This Function gets called when user clicks on filter Price in the Category Panel.
   * @param {{ target: { value: string } }} event
   *    JS event object gets trigerred when user Clicks on Category Panel
   *
   */

  const handlePriceChange = (event) => {
    let clickVal = event.target.value;

    handleSelectPanel(
      handlePricefilt,
      clickVal,
      useStoreItem,
      filtColor,
      gender,
      typefil,
      storeSrchtxt
    );
  };

  /**
   *  // Code for Type-Filter of Category Panel
   *
   */
  const [filttype, setFiltype] = useState([]); // it stores the value ["Polo","Basic","Hoddie"] when user clicks on checkbox input field
  const [typefil, settypefilt] = useState([]); //it stores the list of sorted items [{...}]  , when user clicks on checkbox input field

  /**
   * // This Function handles Type-Panel when User Click on type-filter Input field
   *
   * @param {string} clickVal
   *         clickVal have a value of Particular type-filter whenever the User Clicks
   * @param {Array.<Item>} list
   *        Contains list of Item which may be already sorted or may contain complete list of data of Item,
   *        depends on what type in Category Panel user has first click
   */

  const handletypeFilt = (clickVal, list) => {
    let value = "type"; // the value is defined here to pass as an argument to handleSelectFilter function for checking the condition defined in that function

    handleSelectFilter(
      clickVal,
      list,
      filttype,
      setFiltype,
      typefil,
      settypefilt,
      setItemList,
      setfiltItem,
      value
    );
  };

  /**
   * This Function gets called when user clicks on filter type in the Category Panel.
   * @param {{ target: { value: string } }} event
   *    JS event object gets trigerred when user Clicks on Category Panel
   *
   */

  const handletypeChange = (event) => {
    let clickVal = event.target.value;

    handleSelectPanel(
      handletypeFilt,
      clickVal,
      useStoreItem,
      filtColor,
      price,
      gender,
      storeSrchtxt
    );
  };

  /**
   * // This Function handles Category Panel View, Whenever User Clicks filter Icon on Mobile Screen-Size Device
   *
   */

  const handleFilterIconClick = () => {
    setisPanelOpen(true);
  };

  return (
    <>
      <Header />

      <Grid item xs={12} className="position">
        <TextField
          placeholder="Search for products..."
          className="search-desktop"
          size="large"
          sx={{ m: 1, width: "82vh" }}
          variant="outlined"
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <Search sx={{ color: "#606060" }} />
              </InputAdornment>
            ),
          }}
          onChange={(event) => handleSearchtext(event)}
        />
      </Grid>

      <Grid className="mobile-search-Filter">
        <TextField
          placeholder="Search for products..."
          className="search-mobile"
          size="large"
          sx={{ m: 1, width: "100%" }}
          variant="outlined"
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <Search sx={{ color: "#606060" }} />
              </InputAdornment>
            ),
          }}
          onChange={(event) => handleSearchtext(event)}
        />

        <Button onClick={handleFilterIconClick} className="displayFilter">
          <FilterAltIcon />
        </Button>

        <CategoryPanelList
          isOpen={isPanelOpen}
          onClose={() => setisPanelOpen(false)}
          handleColorChange={handleColorChange}
          handleGenderChange={handleGenderChange}
          handlePriceChange={handlePriceChange}
          handletypeChange={handletypeChange}
        />
      </Grid>

      <Grid className="container">
        <Grid item md={3} xs={12} className="category-Panel">
          <div className="sub-container">
            <Grid>
              <h3>Colour</h3>
              {allColor.map((color) => {
                return <>{panelFunction(color, handleColorChange)}</>;
              })}
            </Grid>

            <Grid>
              <h3>Gender</h3>
              {allGender.map((gender) => {
                return <>{panelFunction(gender, handleGenderChange)}</>;
              })}
            </Grid>

            <Grid>
              <h3>Price</h3>
              {allPrice.map((price) => {
                return <>{panelFunction(price, handlePriceChange)}</>;
              })}
            </Grid>

            <Grid>
              <h3>Type</h3>
              {allType.map((withtype) => {
                return <>{panelFunction(withtype, handletypeChange)}</>;
              })}
            </Grid>
          </div>
        </Grid>
        <Grid item md={9} xs={12} className="product-Panel">
          <Grid container spacing={2}>
            {filtItemList.length > 0 ? (
              filtItemList.map((item) => {
                const { id } = item;
                return (
                  <Grid item key={id} xs={12} md={6} lg={4}>
                    <ProductList itemList={item} />
                  </Grid>
                );
              })
            ) : (
              <>
                {itemList.length ? (
                  itemList.map((item) => {
                    const { id } = item;
                    return (
                      <Grid item key={id} xs={12} md={6} lg={4}>
                        <ProductList itemList={item} />
                      </Grid>
                    );
                  })
                ) : (
                  <Box className="loading">
                    <SentimentDissatisfied color="action" />
                    <h4>No products found</h4>
                  </Box>
                )}
              </>
            )}
          </Grid>
        </Grid>
      </Grid>
    </>
  );
};

export default HomePage;
