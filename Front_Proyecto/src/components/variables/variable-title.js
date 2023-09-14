import { Card, CardContent, Typography } from '@mui/material';
import { Box } from '@mui/system';
import React from 'react';
import VariablesRegistradas from './variablesRegistradas';
const Variabletitle = () => {
    return (
        <Card>
            <CardContent>
                <Box
                    sx={{
                        alignItems: 'center',
                        display: 'flex',
                        justifyContent: 'space-between',
                        flexWrap: 'wrap',
                        m: -1
                    }}
                >
                <Typography
                    sx={{m: 1}}
                    variant="h4"
                >
                    Variables
                </Typography>
                <VariablesRegistradas></VariablesRegistradas>
                </Box>
            </CardContent>
        </Card>
    );
};

export default Variabletitle;