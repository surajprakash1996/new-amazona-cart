/** @format */

import React, { useState } from "react";
import { TextField, Button, makeStyles, Box } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  inputStyle: {
    backgroundColor: "white",
    color: "black",
    border: "none",
    marginRight: "5px",
    height: "33px",
    "&:hover": {
      border: "none",
      ouline: "none",
    },
  },
  searchButton: {
    textTransform: "capitalize",
    fontWeight: "bold",
  },
}));

const Search = (props) => {

  const [querySearch, setQuerySearch] = useState('');
  const classes = useStyles();
  
  const onSubmitHandler = (e) => {
    e.preventDefault();   
    props.history.push(`/search/name/${querySearch}`);
    setQuerySearch('');
  };

  return (
      <form onSubmit={onSubmitHandler}>
        <Box display="flex" alignItems="center" justifyContent="center">
          <Box>
            <TextField
              name="q"
              variant="outlined"
              InputProps={{
                className: classes.inputStyle,
              }}
              placeholder="Search Product"
              onChange={(e) => setQuerySearch(e.target.value)}
            />
          </Box>
          <Box>
            <Button
              type="submit"
              color="secondary"
              className={classes.searchButton}
              size="small"
              variant="contained">
              Search
            </Button>
          </Box>
        </Box>
      </form>
  );
};

export default Search;
