import React from 'react';
import { Button, CircularProgress } from '@mui/material';

type SectionNeo4jProps = {
    disabled: boolean;
    loading: boolean;
    onQuery1: () => void;
    onQuery2: () => void;
    onQuery3: () => void;
};

function SectionNeo4j({
    disabled,
    loading,
    onQuery1,
    onQuery2,
    onQuery3,
}: SectionNeo4jProps) {
    return (
        <div style={{ position: 'relative' }}>
            <Button
                onClick={onQuery1}
                disabled={disabled || loading}
                size="large"
                variant="contained"
            >
                User Influence
            </Button>
            <Button
                onClick={onQuery2}
                disabled={disabled || loading}
                style={{ margin: '0 10px' }}
                size="large"
                variant="contained"
            >
                User Influence Product
            </Button>
            <Button
                onClick={onQuery3}
                disabled={disabled || loading}
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

export default SectionNeo4j;
