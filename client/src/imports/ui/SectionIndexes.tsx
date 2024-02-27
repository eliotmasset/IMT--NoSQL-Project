import React from 'react';
import { Button, CircularProgress } from '@mui/material';

type SectionIndexesProps = {
    disabled: boolean;
    loading: boolean;
    onCreate: () => void;
    onDelete: () => void;
};

function SectionIndexes({
    disabled,
    loading,
    onCreate,
    onDelete,
}: SectionIndexesProps) {
    return (
        <div style={{ position: 'relative' }}>
            <Button
                disabled={disabled || loading}
                style={{ marginRight: '10px' }}
                size="large"
                variant="contained"
                onClick={onCreate}
            >
                Create
            </Button>
            <Button
                disabled={disabled || loading}
                size="large"
                variant="contained"
                color="error"
                onClick={onDelete}
            >
                Delete
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

export default SectionIndexes;
