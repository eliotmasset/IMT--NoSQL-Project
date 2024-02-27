import React from 'react';
import { TextField } from '@mui/material';

type SectionParametersProps = {
    disabled: boolean;
};

function SectionParameters({ disabled = false }: SectionParametersProps) {
    return (
        <div>
            <TextField
                disabled={disabled}
                label="Username"
                variant="standard"
            ></TextField>
            <TextField
                disabled={disabled}
                style={{ margin: '0 10px' }}
                label="Product"
                variant="standard"
            ></TextField>
            <TextField
                disabled={disabled}
                label="Depth"
                variant="standard"
            ></TextField>
        </div>
    );
}

export default SectionParameters;
