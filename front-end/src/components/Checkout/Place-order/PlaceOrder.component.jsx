/** @format */

import React from "react";
import SteppersComponent from "../Steppers.component";
import PlaceOrderScreen from "./PlaceOrder.Screen";

const PlaceOrderComponent = () => {

  return (
    <div>
      <SteppersComponent stepperState={3} />
      <PlaceOrderScreen />
    </div>
  );
};

export default PlaceOrderComponent;
