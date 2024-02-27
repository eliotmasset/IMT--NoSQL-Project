import React from 'react';
import { Button, CircularProgress } from '@mui/material';

type SectionPostgresProps = {
    disabled: boolean;
    loading: boolean;
    onQuery1: () => void;
    onQuery2: () => void;
    onQuery3: () => void;
};

function SectionPostgres({
    disabled,
    loading,
    onQuery1,
    onQuery2,
    onQuery3,
}: SectionPostgresProps) {
    return (
        <div style={{ position: 'relative' }}>
            <Button
                disabled={disabled || loading}
                onClick={onQuery1}
                size="large"
                variant="contained"
            >
                User Influence
            </Button>
            <Button
                disabled={disabled || loading}
                onClick={onQuery2}
                style={{ margin: '0 10px' }}
                size="large"
                variant="contained"
            >
                User Influence Product
            </Button>
            <Button
                disabled={disabled || loading}
                onClick={onQuery3}
                size="large"
                variant="contained"
            >
                Viral Product
            </Button>
            {loading && (
                <CircularProgress
                    thickness={5}
                    size={24}
                    sx={{
                        position: 'absolute',
                        top: '50%',
                        left: '50%',
                        marginTop: '-12px',
                        marginLeft: '-12px',
                    }}
                />
            )}
        </div>
    );
}

export default SectionPostgres;
