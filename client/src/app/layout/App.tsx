import { Box, Container, CssBaseline, Typography } from "@mui/material";
import axios from "axios";
import { useState, useEffect } from "react"
import NavBar from "./Navbar";
import ActivityDashboard from "../../features/activities/ActivityDashboard";
import { blueGrey } from "@mui/material/colors";

function App() {

    const [activities, setActivities] = useState<Activity[]>([]);

    useEffect(() => {
        axios.get<Activity[]>('https://localhost:5001/api/Activities').
            then(response => setActivities(response.data))

        return () => {}
    }, [])

    return (
        <Box sx={{bgcolor:"#eeeeee"} }>
            <CssBaseline/>
            <NavBar />
            <Container maxWidth='xl' sx={{mt: 3}}>
                <Typography variant='h3'>Reactivities</Typography>
                <ActivityDashboard activities={activities} />
            </Container>
        </Box>
  )
}

export default App
