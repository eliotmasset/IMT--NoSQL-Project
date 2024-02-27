import React, { useState } from 'react';
import { Button, CircularProgress, TextField } from '@mui/material';
import ArrowCircleRightIcon from '@mui/icons-material/ArrowCircleRight';

type SectionGenerateProps = {
    disabled: boolean;
    loading: boolean;
    onSubmit: (nbUsers: number) => void;
};

function SectionGenerate({
    disabled = false,
    loading = false,
    onSubmit,
}: SectionGenerateProps) {
    const [nbUsers, setNbUsers] = useState<number>(1);
    const [error, setError] = useState<string | null>(null);

    const handleInputNbUsers = (e: any) => {
        setNbUsers(e.target.value);

        if (!e.target.value) {
            setError('Not a number.');
        } else if (e.target.value < 1) {
            setError('Minimum is 1.');
        } else {
            setError(null);
        }
    };

    const handleSubmit = () => {
        if (error == null) {
            onSubmit(nbUsers);
        }
    };

    return (
        <>
            <TextField
                label="Number of Users"
                placeholder="1"
                disabled={disabled || loading}
                InputLabelProps={{
                    shrink: true,
                }}
                type="number"
                variant="standard"
                value={nbUsers}
                onChange={handleInputNbUsers}
                error={error != null}
                helperText={error}
            ></TextField>
            <Button
                disabled={disabled || loading}
                style={{ marginTop: '10px' }}
                size="large"
                variant="contained"
                endIcon={<ArrowCircleRightIcon />}
                onClick={handleSubmit}
            >
                Create Data
            </Button>
            {loading && (
                <CircularProgress
                    thickness={5}
                    size={24}
                    sx={{
                        marginTop: '-34px',
                    }}
                />
            )}
        </>
    );
}

export default SectionGenerate;
