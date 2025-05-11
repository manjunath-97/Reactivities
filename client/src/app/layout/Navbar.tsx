import { Group } from "@mui/icons-material";
import { AppBar, Box, Container, CssBaseline, MenuItem, Toolbar, Typography } from "@mui/material";
import { NavLink } from "react-router";
import MenuItemLink from "../../shared/MenuItemLink";


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
                                <MenuItem sx={{ display: 'flex', gap: 2 }} component={NavLink} to='/'>
                                    <Group fontSize="large" />
                                    <Typography variant="h4" component="div" sx={{ flexGrow: 1 }}>
                                        Reactivities
                                    </Typography>
                                </MenuItem>
                            </Box>
                            <Box sx={{ display: "flex" }}>
                                <MenuItemLink to='/activities'>
                                    Activities
                                </MenuItemLink>
                                <MenuItemLink to='/createActivity'>
                                    Create an Activity!
                                </MenuItemLink>
                            </Box>
                            <MenuItem>
                                User Menu
                            </MenuItem>
                    </Toolbar>
                </Container>
            </AppBar>
        </Box>
        </>
    )
};