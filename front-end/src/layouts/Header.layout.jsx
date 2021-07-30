/** @format */

import React from "react";
import { makeStyles} from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Button from "@material-ui/core/Button";
import Box from '@material-ui/core/Box'
import IconButton from "@material-ui/core/IconButton";
import Badge from "@material-ui/core/Badge";
import ShoppingCartIcon from "@material-ui/icons/ShoppingCart";

import LogoutComponent from "../components/Logout/Logout.component";
import AdminMenuComponent from "../components/Admin/Admin Component/Admin.Menu.component";
import IsSellerComponent from "../components/Admin/Admin Component/IsSeller.Menu.component";


import SearchComponent from '../components/Search/Search.component';
import SideComponent from '../components/Sidebar/SideBar.component';


import { Link as RouterLink, Route } from "react-router-dom";
import { useSelector } from "react-redux";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  title: {
    flexGrow: 1,
    color: "white",
    textDecoration: "none",
    fontWeight: "bold",
    fontSize: "24px",
  },
}));

export default function Header() {
  const classes = useStyles();
  const { cartItems } = useSelector((state) => state.Cart);
  const { userInfo } = useSelector((state) => state.User);
  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Toolbar>
          
          <Box mr={2}>
            <SideComponent />
          </Box>

          <RouterLink to="/" className={classes.title}>
            Amazona Cart
          </RouterLink>

           <Route
              render={({ history }) => (
                <SearchComponent history={history} />
              )}
            />

          <Button
            style={{ textTransform: "capitalize", marginRight: "5px" }}
            color="inherit"
            component={RouterLink}
            to="/">
            Products
          </Button>

          <IconButton
            component={RouterLink}
            to="/cart"
            edge="start"
            color="inherit"
            aria-label="menu">
            <Badge
              badgeContent={cartItems.length === 0 ? "0" : cartItems.length}
              color="secondary">
              <ShoppingCartIcon />
            </Badge>
          </IconButton>

          {userInfo ? (
            <LogoutComponent />
          ) : (
            <Button
              component={RouterLink}
              to="/sign-in"
              size="small"
              style={{
                marginLeft: "20px",
                textTransform: "capitalize",
                color: "white",
                fontWeight: "bold",
              }}
              color="secondary"
              variant="contained">
              Sign In
            </Button>
          )}

          {userInfo && userInfo.isSeller ? <IsSellerComponent /> : null}

          {userInfo && userInfo.isAdmin ? <AdminMenuComponent /> : null}
        </Toolbar>
      </AppBar>
    </div>
  );
}
