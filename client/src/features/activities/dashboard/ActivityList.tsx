import {  Box, Typography } from "@mui/material";
import ActivityCard from "./ActivityCard";
import { useActivities } from "../../../lib/hooks/useActivities";

export default function ActivityList() {
    const { activities, isLoading } = useActivities();

    if (isLoading) 
        return <Typography variant="h3"> Loading...</Typography>

    if (!activities)
        return <Typography variant="h6"> No Activities found! </Typography>

    return (
        <Box sx={{display:"flex", flexDirection:"column", gap:3} }>
            {activities.map(activity => (
                <ActivityCard key={activity.id} activity={activity}/>
            ))}
        </Box>
    );
}