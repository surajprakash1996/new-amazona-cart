/** @format */


import React from "react";
import { makeStyles, Box, Typography} from "@material-ui/core";
import {Link as RouterLink} from 'react-router-dom';


const useStyles = makeStyles((theme) => ({
  avatar: props => ({
    background: `url(${props.seller.sellerLogo})`,
    backgroundRepeat:'no-repeat',
    backgroundSize:'cover',
    height: "300px",
    width:'100%',
    paddingTop:'200px'
  })
  
}));

const CarouselSellerCardComponent = (props) => {

  const { seller } = props;
  const classes = useStyles(seller);

  return (
    <RouterLink style={{
        textDecoration:'none'
    }}  to="/">
         <Box className={classes.avatar}>
            <Typography style={{
                fontSize:'20px',
                fontWeight:'bold',
                color:'white',
                backgroundColor:'black',
                opacity:'0.67',
                zIndex:'-1',
                marginTop:'10px'
            }}>{seller.seller.sellerName}</Typography>
         </Box>
    </RouterLink>
  )
};

export default CarouselSellerCardComponent;
