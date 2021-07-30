import React from 'react';
import Button from '@material-ui/core/Button';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import { useDispatch, useSelector } from 'react-redux';

import { Logout } from '../../action-creators/User.action';
import {Link as RouterLink } from 'react-router-dom';
import {Box, Divider} from '@material-ui/core';
import ArrowDropDownIcon from '@material-ui/icons/ArrowDropDown';

export default function SimpleMenu() {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const { userInfo } = useSelector((state) => state.User);
  const { name } = userInfo;
  const dispatch = useDispatch();

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const logoutHandler = () => {
      dispatch(Logout());
      handleClose();
  }

  return (
    <div>
      <Button  onClick={handleClick} style={{textTransform: 'capitalize', color:'white'}} endIcon={<ArrowDropDownIcon/>}>
        { name }
      </Button>
      <Menu
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleClose}
      >
        <Box mb={3}>
          <MenuItem component={RouterLink} to="/order-mine" onClick={handleClose}>Order List</MenuItem>
          <MenuItem component={RouterLink} to="/user-profile" onClick={handleClose}>User</MenuItem>
        </Box>
        <Divider />
        <MenuItem onClick={() => logoutHandler()}>Logout</MenuItem>
      </Menu>
    </div>
  );
}
