import React from 'react';
import { Paper, Card } from '@mui/material';

interface IScreenshotDisplay {
    imageLink: string
}


export default function ScreenshotDisplay({ imageLink }: IScreenshotDisplay) {
    if (imageLink !== "") {
        return (
            <Paper variant="outlined">
                <img src={imageLink} />
            </Paper>
        )
    } else {
        return (
            <Card className="card marginRight" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                <p><em>No Image Found!</em></p>
            </Card>
        )
    }
}
