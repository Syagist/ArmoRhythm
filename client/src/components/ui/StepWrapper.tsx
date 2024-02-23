import React from 'react';
import Grid from '@mui/material/Grid';
import Card from '@mui/material/Card';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import Stepper from '@mui/material/Stepper';
import Container from '@mui/material/Container';
import {StepWrapperProps} from "@/types/components/stepWrapperProps";

const steps = ['Track Ifo', 'Upload Cover', 'Upload createTrack']

const StepWrapper: React.FC<StepWrapperProps> = ({activeStep, children}) => {
    return (
        <Container>
            <Stepper activeStep={activeStep}>
                {steps.map((step, index) =>
                    <Step
                        key={index}
                        completed={activeStep > index}
                    >
                        <StepLabel>{step}</StepLabel>
                    </Step>
                )}
            </Stepper>
            <Grid container justifyContent="center" style={{margin: '70px 0 ', height: 270}}>
                <Card style={{width: 600}}>
                    {children}
                </Card>
            </Grid>
        </Container>
    );
};

export default StepWrapper;
