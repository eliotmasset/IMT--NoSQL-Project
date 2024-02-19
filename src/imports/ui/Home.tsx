import React from "react";
import { Button } from '@mui/material';
import CloudDownloadIcon from '@mui/icons-material/CloudDownload';

function Home() {
    const style = {
        container: {
            display: "flex",
            flexDirection: "column" as const,
            justifyContent: "center",
            alignItems: "center",
            height: "100vh",
        }
    };

    return (
        <div style={style.container}>
            <Button size="large" variant="contained" endIcon={<CloudDownloadIcon />}>Generate Data</Button>
        </div>
    );
};

export default Home;