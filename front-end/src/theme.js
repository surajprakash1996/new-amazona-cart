/** @format */

import { createMuiTheme } from "@material-ui/core/styles";
import teal from "@material-ui/core/colors/teal";
import orange from "@material-ui/core/colors/orange";

const theme = createMuiTheme({
  palette: {
    primary: {
      main: teal[500],
      light: teal[300],
    },
    secondary: {
      main: orange[500],
      light: orange[300],
    },
  },
  shape: {
    borderRadius: "2px",
  },
});

export default theme;
