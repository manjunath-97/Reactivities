import { Group, Menu } from "@mui/icons-material";
import { AppBar, Box, Button, Container, CssBaseline, IconButton, MenuItem, Toolbar, Typography } from "@mui/material";

export default function NavBar() {
    return (
        <>
        <CssBaseline/>
        <Box sx={{ flexGrow: 1 }}>
            <AppBar position="static" sx={{
                backgroundImage: "linear-gradient(135deg, #182a73 0%, #218aae 69%, #20a7ac 89%)"
            }}>

                <Container maxWidth="xl">
                        <Toolbar sx={{ display: "flex", justifyContent: "space-between" }}>
                            <Box>
                                <MenuItem sx={{display:'flex', gap: 2}}>
                                    <Group fontSize="large" />
                                    <Typography variant="h4" component="div" sx={{ flexGrow: 1 }}>
                                        Reactivities
                                    </Typography>
                                </MenuItem>
                            </Box>
                            <Box sx={{display:"flex"} }>
                                <MenuItem sx={{ fontSize: '1.2rem', textTransform: "uppercase", fontWeight: "bold" }}>
                                        Activities
                                </MenuItem>
                                <MenuItem sx={{ fontSize: '1.2rem', textTransform: "uppercase", fontWeight: "bold" }}>
                                    about
                                </MenuItem>
                                <MenuItem sx={{ fontSize: '1.2rem', textTransform: "uppercase", fontWeight: "bold" }}>
                                    contact
                                </MenuItem>
                            </Box>
                            <Button size="large" variant="contained" color="warning">
                                Create activity
                            </Button>
                    </Toolbar>
                </Container>
            </AppBar>
        </Box>
        </>
    )
};