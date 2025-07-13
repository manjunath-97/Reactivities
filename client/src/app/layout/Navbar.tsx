import { Group } from "@mui/icons-material";
import { AppBar, Box, Container, CssBaseline, LinearProgress, MenuItem, Toolbar, Typography } from "@mui/material";
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

                    <Observer>
                        {
                            () => uiStore.isLoading ? (
                                <LinearProgress color="secondary" sx={
                                    {
                                        position: "absolute",
                                        bottom: 0,
                                        left: 0,
                                        right: 0,
                                        top: 0
                                    }} />
                            ):null
                        }                        
                    </Observer>
                </AppBar>
        </Box>
        </>
    )
};