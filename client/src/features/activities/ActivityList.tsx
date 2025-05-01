import {  Box } from "@mui/material";
import ActivityCard from "./ActivityCard";

type Prop = {
    activities: Activity[]
}

export default function ActivityList({ activities }: Prop) {
    return (
        <Box sx={{display:"flex", flexDirection:"column", gap:3} }>
            {activities.map(activity => (
                <ActivityCard key={ activity.id} activity={activity} />
            ))}
        </Box>
    );
}