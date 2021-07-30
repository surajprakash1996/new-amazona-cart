/** @format */

import React from "react";
import Button from "@material-ui/core/Button";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import ArrowDropDownIcon from "@material-ui/icons/ArrowDropDown";

import { Link as LinkRouter } from "react-router-dom";

export default function IsSellerMenuComponent() {
  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <div>
      <Button
        style={{ color: "white", textTransform: "capitalize" }}
        onClick={handleClick}
        endIcon={<ArrowDropDownIcon />}>
        Seller
      </Button>
      <Menu
        id="simple-menu"
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleClose}>
          
        <MenuItem
          component={LinkRouter}
          to="/admin/product-list/seller"
          onClick={handleClose}>
          Product List
        </MenuItem>

        <MenuItem
          component={LinkRouter}
          to="/admin/order-list/seller"
          onClick={handleClose}>
          Order List
        </MenuItem>
      </Menu>
    </div>
  );
}
