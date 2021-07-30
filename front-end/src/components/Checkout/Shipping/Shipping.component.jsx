/** @format */

import React from "react";

import SteppersComponent from "../Steppers.component";
import ShippingFormComponent from "./Shipping.form.component";

const ShippingComponent = () => {
  return (
    <div>
      <SteppersComponent stepperState={1} />
      <ShippingFormComponent />
    </div>
  );
};

export default ShippingComponent;
