/** @format */

import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardContent from "@material-ui/core/CardContent";

import Typography from "@material-ui/core/Typography";
import Box from "@material-ui/core/Box";
import RatingComponent from "./Rating.component";
import Loading from "../../helpers/Loading.helper";
import { Avatar } from "@material-ui/core";


const useStyles = makeStyles((theme) => ({
  root: {
    maxWidth: "100%",
    margin:'10px'
  },

}));

const SellerProfileComponent = (props) => {
  const classes = useStyles();
  const { sellerProfile } = props;
  if(sellerProfile  === undefined || !sellerProfile) {
      return <Loading/>
  }
  const {sellerName, sellerLogo, sellerDescription, sellerNumbReviews,sellerRatings} = sellerProfile.seller; 
  return (
    <Card className={classes.root}>
      <CardActionArea>

        <CardContent>
             
         <Box my={1}>
            <Avatar src={sellerLogo}/>
          </Box>

          <Box my={1}>
            <Typography style={{fontSize:'14px', fontWeight:"bold"}}>
             Seller {sellerName}
            </Typography>
          </Box>

          <Box my={1}>
            <RatingComponent rating={sellerRatings} reviews={sellerNumbReviews} />
          </Box>

          <Box my={1}>
          <Typography style={{fontSize:'11px'}}>
              {sellerDescription.substring(0,30)}
            </Typography>
          </Box>

        </CardContent>
      </CardActionArea>

 
    </Card>
  );
};

export default SellerProfileComponent;

