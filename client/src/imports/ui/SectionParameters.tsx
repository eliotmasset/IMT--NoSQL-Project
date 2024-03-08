import React, { useState } from 'react';
import { TextField } from '@mui/material';

type SectionParametersProps = {
    userId: number;
    setUserId: (userId: number) => void;
    productId: number;
    setProductId: (productId: number) => void;
    depth: number;
    setDepth: (depth: number) => void;
    disabled: boolean;
};

function SectionParameters({
    userId,
    setUserId,
    productId,
    setProductId,
    depth,
    setDepth,
    disabled = false,
}: SectionParametersProps) {
    const [userIdError, setUserIdError] = useState<string | null>(null);
    const [productIdError, setProductIdError] = useState<string | null>(null);
    const [depthError, setDepthError] = useState<string | null>(null);

    const handleInputUserId = (e: any) => {
        if (!e.target.value) {
            setUserIdError('Not a number.');
        } else if (e.target.value < 0) {
            setUserIdError('Minimum is 0.');
        } else {
            setUserIdError(null);
            setUserId(e.target.value);
        }
    };

    const handleInputProductId = (e: any) => {
        if (!e.target.value) {
            setProductIdError('Not a number.');
        } else if (e.target.value < 0) {
            setProductIdError('Minimum is 0.');
        } else {
            setProductIdError(null);
            setProductId(e.target.value);
        }
    };

    const handleInputDepth = (e: any) => {
        if (!e.target.value) {
            setDepthError('Not a number.');
        } else if (e.target.value < 0) {
            setDepthError('Minimum is 0.');
        } else {
            setDepthError(null);
            setDepth(e.target.value);
        }
    };

    return (
        <div>
            <TextField
                label="userId"
                placeholder="0"
                disabled={disabled}
                InputLabelProps={{
                    shrink: true,
                }}
                type="number"
                variant="standard"
                value={userId}
                onChange={handleInputUserId}
                error={userIdError != null}
                helperText={userIdError}
            ></TextField>
            <TextField
                style={{ margin: '0 10px' }}
                label="productId"
                placeholder="0"
                disabled={disabled}
                InputLabelProps={{
                    shrink: true,
                }}
                type="number"
                variant="standard"
                value={productId}
                onChange={handleInputProductId}
                error={productIdError != null}
                helperText={productIdError}
            ></TextField>
            <TextField
                label="depth"
                placeholder="1"
                disabled={disabled}
                InputLabelProps={{
                    shrink: true,
                }}
                type="number"
                variant="standard"
                value={depth}
                onChange={handleInputDepth}
                error={depthError != null}
                helperText={depthError}
            ></TextField>
        </div>
    );
}

export default SectionParameters;
