import { Box, Container, CssBaseline, Typography } from "@mui/material";
import { useState } from "react"
import NavBar from "./Navbar";
import ActivityDashboard from "../../features/activities/ActivityDashboard";
import { useActivities } from "../../lib/hooks/useActivities";

function App() {


    const [selectedActivity, setSelectedActivity] = useState<Activity | undefined>(undefined);

    const [editMode, setEditMode] = useState<boolean>(false);

    // Queries
    const { activities, isPending } = useActivities();

    const handleSelectActivity = (id : string) => {
        const activity = activities!.find(x => x.id === id);
        setSelectedActivity(activity);
    };

    const handleCancelSelectActivity = () => {
        setSelectedActivity(undefined);
    }

    const HandleOpenForm = (id? : string) => {
        if (id) {
            handleSelectActivity(id)
        }
        else {
            handleCancelSelectActivity();
        }
        setEditMode(true);
    }

    const HandleCloseForm = () => {
        setEditMode(false);
    }

    const submitForm = (activity: Activity) => {
        //if (activity.id) {
        //    setActivities(activities.map(a => a.id === activity.id ? activity : a));
        //    setSelectedActivity(activity);
        //}
        //else {
        //    const newActivity = { ...activity, id: activities.length.toString() }
        //    setActivities([...activities, newActivity]);
        //    setSelectedActivity(newActivity);
        //}
        console.log(activity);
        setEditMode(false);

    }

    const deleteActivity = (id: string) => {
        console.log(id);
    }


    return (
        <Box sx={{bgcolor:"#eeeeee", minHeight:'10vh'} }>
            <CssBaseline/>
            <NavBar openForm={HandleOpenForm} />
            <Container maxWidth='xl' sx={{ mt: 3 }}>

            {(!activities || isPending) ?
                    (<Typography>Loading...</Typography>) :
                    (<ActivityDashboard
                        activities={activities}
                        selectedActivity={selectedActivity}
                        selectActivity={handleSelectActivity}
                        cancelSelectActivity={handleCancelSelectActivity}
                        editMode={editMode}
                        openForm={HandleOpenForm}
                        closeForm={HandleCloseForm}
                        submitForm={submitForm}
                        deleteActivity={deleteActivity}
                    />)
                }
            </Container>
        </Box>
  )
}

export default App
