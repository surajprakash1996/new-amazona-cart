/** @format */

import React from "react";
import SteppersComponent from "../Steppers.component";
import PaymentFormComponent from "./Payment.form.component";

const PaymentComponent = () => {
  return (
    <div>
      <SteppersComponent stepperState={2} />
      <PaymentFormComponent />
    </div>
  );
};

export default PaymentComponent;
