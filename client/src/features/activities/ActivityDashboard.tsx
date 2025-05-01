import {  Grid2} from "@mui/material";
import ActivityList from "./ActivityList";
import ActivityDetails from "./ActivityDetails";

type Props = {
    activities : Activity[]
};

export default function ActivityDashboard({ activities }: Props ) {
    return (
        <Grid2 container spacing={2}>
            <Grid2 size={7}>
                <ActivityList activities={activities} />
            </Grid2>
            <Grid2 size={5}>
                {activities[0] && <ActivityDetails activity={activities[0]} />}
            </Grid2>
        </Grid2>
    )
}