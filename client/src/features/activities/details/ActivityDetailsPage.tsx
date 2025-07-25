import { Grid2, Typography } from "@mui/material";
import { useParams } from "react-router";
import { useActivities } from "../../../lib/hooks/useActivities";
import ActivityDetailsChats from "./ActivityDetailsChats";
import ActivityDetailsHeader from "./ActivityDetailsHeader";
import ActivityDetailsInfo from "./ActivityDetailsInfo";
import ActivityDetailsSideBar from "./ActivityDetailsSideBar";

export default function ActivityDetailsPage() {


    const { id } = useParams();
    const { activity, isLoadingActivity } = useActivities(id);


    if (isLoadingActivity)
        return <Typography>Loading...</Typography>;

    if (!activity)
        return <Typography>No selected item</Typography>;

    return (
            <Grid2 container spacing={3}>
                <Grid2 size={8}>
                    <ActivityDetailsHeader activity={activity} />
                    <ActivityDetailsInfo activity={activity} />
                    <ActivityDetailsChats />
                </Grid2>
                <Grid2 size={4}>
                    <ActivityDetailsSideBar activity={activity} />
                </Grid2>
            </Grid2> 

    );
}
