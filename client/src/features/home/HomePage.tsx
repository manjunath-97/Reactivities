import { Box, Button, Paper, Typography } from "@mui/material";
import { Group } from "@mui/icons-material";
import { Link } from "react-router";

export default function Home() {
    return (
            <Paper sx={
                {
                    color:"white",
                    display: "flex",
                    flexDirection: "column",
                    gap: 6,
                    height: "100vh",
                    alignContent: 'center',
                    alignItems: "center",
                backgroundImage: "linear-gradient(135deg, #182a73 0%, #218aae 69%, #20a7ac 89%)",
                    borderRadius:"0"

                }} elevation={4} >

                <Box sx={{mt:15,display:"flex", gap:"3", alignContent:"center", alignItems:"center", color:"white"}}>
                    <Group sx={{ height: 110, width: 110 }} />
                    <Typography variant="h1">
                        Reactivities
                    </Typography>
                </Box>
                <Typography variant="h2"> Welcome to Reactivities!</Typography>
                <Button
                    component={Link}
                    to="/activities"
                    sx={{ height:80, borderRadius:4, fontSize:"1.5rem" }}
                    size="large"
                    variant="contained"
                >
                    Reactivities
                </Button>
            </Paper>
            )
}