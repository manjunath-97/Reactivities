import { Box, Container, CssBaseline } from "@mui/material";
import NavBar from "./Navbar";
import Home from "../../features/home/HomePage";
import { Outlet, useLocation } from "react-router";

function App() {

    const location = useLocation();

    return (
        <Box sx={{bgcolor:"#eeeeee", minHeight:'10vh'} }>
            <CssBaseline />

            {(location.pathname === "/") ?
                <Home/> :
                <>
                    < NavBar />
                    <Container maxWidth='xl' sx={{ mt: 3 }}>
                        <Outlet />
                    </Container>
                </>}
        </Box>
  )
}

export default App
