import React from "react";
import { CssBaseline, ThemeProvider, createTheme } from "@mui/material";
import Home from "./Home.tsx";
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";


const router = createBrowserRouter([
    {
      path: "/",
      element: <Home />,
    },
]);

const darkTheme = createTheme({
    palette: {
      mode: 'dark',
    },
});

function App() {
    return (
        <ThemeProvider theme={darkTheme}>
            <CssBaseline />
            <React.StrictMode>
                <RouterProvider router={router} />
            </React.StrictMode>
        </ThemeProvider>
    );
}

export default App;
