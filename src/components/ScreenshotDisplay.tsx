import React from 'react';
import { Paper } from '@mui/material';

interface IScreenshotDisplay {
    imageLink: string
}


export default function ScreenshotDisplay({ imageLink }: IScreenshotDisplay) {
    return (
        <Paper variant="outlined">
            <img src="https://images.data.gov.sg/api/traffic-images/2018/12/2eaa2556-8ccf-4467-a9d8-85901b79e0b1.jpg" />
        </Paper>

    )
}
