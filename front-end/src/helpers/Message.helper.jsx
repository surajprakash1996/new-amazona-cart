/** @format */

import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Alert from "@material-ui/lab/Alert";
const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
    "& > * + *": {
      marginTop: theme.spacing(2),
    },
  },
}));

const MessageHelper = (props) => {
  const classes = useStyles();
  const { severity, message } = props;

  return (
    <div className={classes.root}>
      <Alert severity={severity}>{message}</Alert>
    </div>
  );
};

export default MessageHelper;
