import { FilterList, Event } from "@mui/icons-material";
import { Box, ListItemText, MenuItem, MenuList, Paper, Typography } from "@mui/material";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css"
import useStore from '../../../lib/hooks/useStore';
import { observer } from "mobx-react-lite";

const ActivityFilters = observer(function()
{
    const { activityStore: { filter,startDate,setStartDate,setFilter} } = useStore();

    return (
        <Box display="flex" flexDirection="column" gap={3} borderRadius={3}>
            <Paper sx={{p:3, borderRadius:3}}>
                <Box sx={{ width:"100%" }}>
                    <Typography variant="h6" sx={{ display: "flex", alignItems: "center", mb:1, color:"primary.main" }}>
                        <FilterList sx={{mr:1}} />
                        Apply filters
                    </Typography>
                    <MenuList>
                        <MenuItem
                            selected={filter === "all"}
                            onClick={() => { setFilter("all"); } }
                        >
                            <ListItemText primary="All events"/>
                        </MenuItem>
                        <MenuItem
                            selected={filter === "isGoing"}
                            onClick={() => { setFilter("isGoing"); }}
                        >
                            <ListItemText primary="I'm going" />
                        </MenuItem>
                        <MenuItem
                            selected={filter === "isHosting"}
                            onClick={() => { setFilter("isHosting"); }}
                        >
                            <ListItemText primary="I'm hosting" />
                        </MenuItem>
                    </MenuList>
                </Box>
            </Paper>
            <Box component={Paper} sx={{ width:"100%",p: 3, borderRadius: 3 }}>
                <Typography variant="h6" sx={{ display: "flex", alignItems: "center", mb: 1, color: "primary.main" }}>
                    <Event sx={{ mr: 1 }} />
                    Select a date
                </Typography>    
                <Calendar
                    value={startDate}
                    onChange={(date) => {setStartDate(date as Date)}}
                />
            </Box>
        </Box>
    );
})

export default ActivityFilters;