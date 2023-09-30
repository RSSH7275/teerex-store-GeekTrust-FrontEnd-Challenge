import { allColor, allGender, allPrice, allType } from "./CategoryList";
import { Drawer, List } from "@mui/material";
import { panelFunction } from "./FunctionHandler";

/** Component Displays the Category Panel with filters on Mobile screen Size devices
 * 
 * @param {Boolean} isOpen  -Drawer opens when isOpen sets to true
 * @param {Boolean} onClose  -Drawer closes when onClose sets to false
 * @param {Function} handleColorChange - Function called when checkBox field for color is clicked
 * @param {Function} handleGenderChange -Function called when checkBox field for gender is clicked
 * @param {Function} handlePriceChange  -Function called when checkBox field for price is clicked
 * @param {Function} handletypeChange   -Function called when checkBox field for type is clicked
 * @returns {JSX.Element}  -returns element to render
 */

const CategoryPanelList = ({
  isOpen,
  onClose,
  handleColorChange,
  handleGenderChange,
  handlePriceChange,
  handletypeChange,
}) => {
  return (
    <>
      <Drawer anchor="right" open={isOpen} onClose={onClose}>
        <List sx={{ width: "150px", padding: "5px" }}>
          <h3>Colour</h3>
          {allColor.map((color) => {
            return <>{panelFunction(color, handleColorChange)}</>;
          })}

          <h3>Gender</h3>
          {allGender.map((gender) => {
            return <>{panelFunction(gender, handleGenderChange)}</>;
          })}

          <h3>Price</h3>
          {allPrice.map((price) => {
            return <>{panelFunction(price, handlePriceChange)}</>;
          })}

          <h3>Type</h3>
          {allType.map((withtype) => {
            return <>{panelFunction(withtype, handletypeChange)}</>;
          })}
        </List>
      </Drawer>
    </>
  );
};

export default CategoryPanelList;