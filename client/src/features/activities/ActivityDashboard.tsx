import {  Grid2} from "@mui/material";
import ActivityList from "./ActivityList";
import ActivityDetails from "./ActivityDetails";
import ActivityForm from "./forms/ActivityForm";

type Props = {
    activities: Activity[]
    selectedActivity?: Activity;
    selectActivity: (id: string) => void
    cancelSelectActivity: () => void
    editMode: boolean
    openForm: (id?: string) => void
    closeForm: () => void
};

export default function ActivityDashboard({
    activities,
    selectedActivity,
    selectActivity,
    cancelSelectActivity,
    editMode,
    openForm,
    closeForm}: Props)
{
    return (
        <Grid2 container spacing={2}>
            <Grid2 size={7}>
                <ActivityList activities={activities} selectActivity={selectActivity} />
            </Grid2>
            <Grid2 size={5}>
                {!editMode && selectedActivity &&
                    <ActivityDetails
                        selectedActivity={selectedActivity}
                        cancelSelectActivity={cancelSelectActivity}
                        openForm={openForm} 
                    />}
                {editMode && <ActivityForm closeForm={closeForm} activity={selectedActivity}/>}
            </Grid2>
        </Grid2>
    )
}