/**
 * Component to display the checkbox input field for a given valueType
 * @param {Object} valueType - The Value is of type Object
 * @param {function} clickFunction  - The function to be called when the checkbox field is clicked
 * @returns {JSX.Element} - returns element to be rendered
 */

export const panelFunction = (valueType, clickFunction) => {
  return (
    <div className="category">
      <input
        type="checkbox"
        label={valueType.label}
        key={valueType.value}
        value={valueType.value}
        onClick={(e) => clickFunction(e)}
      />
      {valueType.label}
    </div>
  );
};

/**
 * This Function handles the value when click  on checkbox input field and  sorts list of items according to specific filter attribute.
 *
 * @param {String} clickVal  -Contains the value of checkBox input field
 * @param {Array.<Object>} list -Array of Object having data of list of items
 * @param {Array} filte  -Array having list of clicked values
 * @param {Function} setFilter -The function to update the filte state
 * @param {Array.<Object>} filterNameBy -Array of Object having sorted filtered data of items
 * @param {Function} setFiltName  -The function to update the filterNameBy state
 * @param {Array.<Object>} setItemList  -The function to update the itemList state
 * @param {Array.<Object>} setfiltItem  -The function to update the filtItemList state
 * @param {String} value  -The value to check the given conditions
 */

export const handleSelectFilter = (
  clickVal,
  list,
  filte,
  setFilter,
  filterNameBy,
  setFiltName,
  setItemList,
  setfiltItem,
  value
) => {
  let nextfiltr;
  let spliValue;
  let Min_Price;
  let Max_Price;
  let filtCategory;

  if (value === "price") {
    spliValue = clickVal.split("-");
    Max_Price = spliValue[1];
    Min_Price = spliValue[0];
  }

  if (filte.includes(clickVal)) {
    let MIN_Length=0; // Minimum length of an Array (with no objects)

    nextfiltr = filte.filter((ele) => ele !== clickVal);
    if (nextfiltr.length) {
      setFilter(nextfiltr);
    } else {
      setFilter([]);
    }

    if (value === "price") {
      filtCategory =
        spliValue.length === 1
          ? filterNameBy.filter((ele) => !(ele.price >= Min_Price))
          : filterNameBy.filter(
              (ele) => !(ele.price >= Min_Price && ele.price <= Max_Price)
            );
    }

    if (value !== "price") {
      if (value === "color") {
        filtCategory = filterNameBy.filter((ele) => ele.color != clickVal);
      }
      if (value === "gender") {
        filtCategory = filterNameBy.filter((ele) => ele.gender != clickVal);
      }
      if (value === "type") {
        filtCategory = filterNameBy.filter((ele) => ele.type != clickVal);
      }
    }

    if (filtCategory.length !== MIN_Length) {
      setFiltName(filtCategory);
      setItemList(filtCategory);
      setfiltItem(filtCategory);
    }

    if (filtCategory.length == MIN_Length && list.length !== MIN_Length) {
      setFiltName(filtCategory);
      setItemList(list);
      setfiltItem(list);
    }
  } else {
    if (value === "price") {
      filtCategory =
        spliValue.length === 1
          ? list.filter((ele) => ele.price >= Min_Price)
          : list.filter(
              (ele) => ele.price >= Min_Price && ele.price <= Max_Price
            );
    }

    if (value !== "price") {
      filtCategory = list.filter(
        (ele) =>
          ele.color == clickVal ||
          ele.gender == clickVal ||
          ele.type == clickVal
      );
    }

    let filtcategoryset = [...filtCategory, ...filterNameBy];

    setFiltName(filtcategoryset); // stores and keep the Track of sorted list of items selected by user on category panel 
    setItemList(filtcategoryset); // stores same list of sorted items as setFiltName function but used to display the sorted list of items  
    setfiltItem(filtcategoryset);  // stores same list of sorted items as setFiltName and setItemList function  but used to display it when filter is applied on top of the search result 
    nextfiltr = [...filte, clickVal];

    setFilter(nextfiltr);
  }
};

/**
 * // This function when called, Checks a given condition of Each Filters on a Panel ,
 *         to sort the List of available items
 *
 *
 * @param {Function} handlePanelFilt - CallBack Function gets call when  Someone clicks Filter CheckBox field.
 * @param {String} clickVal - Contains the value of checkBox input field
 * @param {Array.<Object>} itemTrack    -  Array of Objects which has a complete Data on all available list of items
 * @param {Array.<Object>} valOne   - Array of Objects Which has Selected List of Data of a Particular Filter When Clicked
 * @param {Array.<Object>} valTwo  - Array of Objects Which has Selected List of Data of a Particular Filter When Clicked
 * @param {Array.<Object>} valThree - Array of Objects Which has Selected List of Data of a Particular Filter When Clicked
 * @param {Array.<Object>} storeSrchtxt - Array of Objects Which has Selected List of Data of a Particular Filter Searched using Search Text
 * @returns {Function} - returns a CallBack function having arguments
 */

export const handleSelectPanel = (
  handlePanelFilt,
  clickVal,
  itemTrack,
  valOne,
  valTwo,
  valThree,
  storeSrchtxt
) => {
  let MIN_Length=0; // Minimum length of an Array (with no objects)

  if (valOne.length == MIN_Length && valTwo.length == MIN_Length && valThree.length == MIN_Length) {
    if (storeSrchtxt.length) {
      return handlePanelFilt(clickVal, storeSrchtxt);
    }
    return handlePanelFilt(clickVal, itemTrack);
  }

  if (valOne.length !== MIN_Length && valTwo.length !== MIN_Length && valThree.length !== MIN_Length) {
    if (valOne.length < valTwo.length && valOne.length < valThree.length) {
      return handlePanelFilt(clickVal, valOne);
    }
    if (valTwo.length < valOne.length && valTwo.length < valThree.length) {
      return handlePanelFilt(clickVal, valTwo);
    }
    if (valThree.length < valTwo.length && valThree.length < valOne.length) {
      return handlePanelFilt(clickVal, valThree);
    }

    if (valThree.length == valTwo.length && valThree.length == valOne.length) {
      return handlePanelFilt(clickVal, valThree);
    }
  }

  if (
    (valOne.length !== MIN_Length && valTwo.length !== MIN_Length) ||
    (valTwo.length !== MIN_Length && valThree.length !== MIN_Length) ||
    (valOne.length !== MIN_Length && valThree.length !== MIN_Length)
  ) {
    if (valOne.length && valTwo.length) {
      if (valOne.length < valTwo.length) {
        return handlePanelFilt(clickVal, valOne);
      }

      if (valTwo.length < valOne.length) {
        return handlePanelFilt(clickVal, valTwo);
      }

      if (valTwo.length == valOne.length) {
        return handlePanelFilt(clickVal, valTwo);
      }
    }

    if (valTwo.length && valThree.length) {
      if (valTwo.length < valThree.length) {
        return handlePanelFilt(clickVal, valTwo);
      }
      if (valThree.length < valTwo.length) {
        return handlePanelFilt(clickVal, valThree);
      }
      if (valTwo.length == valThree.length) {
        return handlePanelFilt(clickVal, valThree);
      }
    }

    if (valOne.length && valThree.length) {
      if (valOne.length < valThree.length) {
        return handlePanelFilt(clickVal, valOne);
      }
      if (valThree.length < valOne.length) {
        return handlePanelFilt(clickVal, valThree);
      }
      if (valOne.length == valThree.length) {
        return handlePanelFilt(clickVal, valOne);
      }
    }
  }

  if (valOne.length !== MIN_Length || valTwo.length !== MIN_Length || valThree.length !== MIN_Length) {
    if (valOne.length) {
      return handlePanelFilt(clickVal, valOne);
    }

    if (valTwo.length) {
      return handlePanelFilt(clickVal, valTwo);
    }

    if (valThree.length) {
      return handlePanelFilt(clickVal, valThree);
    }
  }
};

export default { panelFunction, handleSelectPanel, handleSelectFilter };
