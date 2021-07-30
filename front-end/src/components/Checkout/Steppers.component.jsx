import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';


const useStyles = makeStyles((theme) => ({
    root: {
      width: '100%',
    }
}));

function getSteps() {
    return ['Sign in', 'Shipping Address', 'Payment', 'Place Order'];
  }

const SteppersComponent = (props) => {
  const classes = useStyles();
  const [activeStep] = React.useState(props.stepperState);
  const steps = getSteps();

  return (
    <div className={classes.root}>
      <Stepper activeStep={activeStep} alternativeLabel>
        {steps.map((label) => (
          <Step key={label}>
            <StepLabel>{label}</StepLabel>
          </Step>
        ))}
      </Stepper>
    </div>
  );
}

export default SteppersComponent

