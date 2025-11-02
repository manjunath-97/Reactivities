import { Group } from "@mui/icons-material";
import { AppBar, Box, CircularProgress, Container, CssBaseline, LinearProgress, MenuItem, Toolbar, Typography } from "@mui/material";
import { NavLink } from "react-router";
import MenuItemLink from "../../shared/MenuItemLink";
import useStore from "../../lib/hooks/useStore";
import { Observer } from "mobx-react-lite";
import { useAccount } from "../../lib/hooks/useAccount";
import UserMenu  from "../../app/layout/UserMenu";

export default function NavBar() {
    const { uiStore } = useStore();
    const { currentUser } = useAccount();

    return (
        <>
        <CssBaseline/>
        <Box sx={{ flexGrow: 1 }}>
            <AppBar position="fixed" sx={{
                backgroundImage: "linear-gradient(135deg, #182a73 0%, #218aae 69%, #20a7ac 89%)"
            }}>

                <Container maxWidth="xl">
                        <Toolbar sx={{ display: "flex", justifyContent: "space-between" }}>
                            <Box>
                                <MenuItem sx={{ display: 'flex', gap: 2 }} component={NavLink} to='/'>
                                    <Group fontSize="large" />
                                    <Typography variant="h4" component="div" sx={{ flexGrow: 1,position:"relative" }}>
                                        Reactivities
                                    </Typography>
                                    <Observer>
                                        {
                                            () => uiStore.isLoading ? (
                                                <CircularProgress size={20} thickness={7} sx={
                                                    {
                                                        color:"white",
                                                        position: "absolute",
                                                        left: "105%",
                                                        top: "30%"
                                                    }} />
                                            ) : null
                                        }
                                    </Observer>
                                </MenuItem>
                            </Box>
                            <Box sx={{ display: "flex" }}>
                                <MenuItemLink to='/activities'>
                                    Activities
                                </MenuItemLink>
                                <MenuItemLink to='/counter'>
                                    Counter
                                </MenuItemLink>
                                <MenuItemLink to='/TestErrors'>
                                    TestErrors
                                </MenuItemLink>
                            </Box>
                            <Box display='flex' alignItems='center'>
                                {
                                    currentUser ?
                                        <UserMenu /> :
                                        (<>
                                            <MenuItemLink to='/login'>Login</MenuItemLink>
                                            <MenuItemLink to='/register'>Register</MenuItemLink>
                                        </>)
                                }                        
                             </Box>
                    </Toolbar>
                    </Container>
                </AppBar>
        </Box>
        </>
    )
};