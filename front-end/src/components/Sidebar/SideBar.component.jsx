/** @format */

import React, { useState } from "react";
import {
  SwipeableDrawer,
  List,
  ListItem,
  ListItemText,
  ListSubheader,
  IconButton,
} from "@material-ui/core";
import MenuIcon from "@material-ui/icons/Menu";

import {Link as RouterLink } from 'react-router-dom';

import { useSelector } from "react-redux";
import Loading from "../../helpers/Loading.helper";
import MessageHelper from "../../helpers/Message.helper";


const SideBarComponent = () => {
  const [isOpen, setIsOpen] = useState(false);
  const toggleDrawer = (open) => (event) => {
    if (
      event &&
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return;
    }
    setIsOpen(open);
  };

  const {error: errorCategory, loading: loadingCategory, category: categoryState} = useSelector((state) => state.ProductCategory);

  return (
    <div>
      <IconButton onClick={toggleDrawer(true)} style={{ color: "white" }}>
        <MenuIcon />
      </IconButton>

      <SwipeableDrawer
        open={isOpen}
        anchor="left"
        onClose={toggleDrawer(false)}
        onOpen={toggleDrawer(true)}>
        
        {
            loadingCategory || categoryState === null ||  categoryState === undefined ? <Loading /> : errorCategory ? <MessageHelper severity="error" message={errorCategory}/> : (
                <React.Fragment>
                   <List component="nav"  style={{
                       width:"300px"
                   }} subheader={
                    <ListSubheader component="div" id="nested-list-subheader">
                      Product Category
                    </ListSubheader>
            }>
                {categoryState.map((c) => (
                  <ListItem
                    button
                    key={c}
                    onClick={toggleDrawer(false)}
                    component={RouterLink}
                    to={`/search/category/${c}`}>
                    <ListItemText primary={c.charAt(0).toUpperCase() + c.slice(1)} />
                  </ListItem>
                ))}
              </List>
                </React.Fragment>
            )
        }

      </SwipeableDrawer>
    </div>
  );
};

export default SideBarComponent;
