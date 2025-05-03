import { Box, Container, CssBaseline, Typography } from "@mui/material";
import axios from "axios";
import { useState, useEffect } from "react"
import NavBar from "./Navbar";
import ActivityDashboard from "../../features/activities/ActivityDashboard";

function App() {

    const [activities, setActivities] = useState<Activity[]>([]);

    const [selectedActivity, setSelectedActivity] = useState<Activity | undefined>(undefined);

    const [editMode, setEditMode] = useState<boolean>(false);


    useEffect(() => {
        axios.get<Activity[]>('https://localhost:5001/api/Activities').
            then(response => setActivities(response.data))

        return () => {}
    }, [])

    const handleSelectActivity = (id : string) => {
        const activity = activities.find(x => x.id === id);
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
        if (activity.id)
        {
            setActivities(activities.map(a => a.id === activity.id ? activity : a));
            setSelectedActivity(activity);
        }
        else {
            const newActivity = { ...activity, id: activities.length.toString() }
            setActivities([...activities, newActivity]);
            setSelectedActivity(newActivity);
        }
        setEditMode(false);

    }

    const deleteActivity = (id: string) => {
        setActivities(activities.filter(a => a.id !== id));
        setSelectedActivity(undefined);
    }


    return (
        <Box sx={{bgcolor:"#eeeeee"} }>
            <CssBaseline/>
            <NavBar openForm={HandleOpenForm} />
            <Container maxWidth='xl' sx={{mt: 3}}>
                <Typography variant='h3'>Reactivities</Typography>
                <ActivityDashboard
                    activities={activities}
                    selectedActivity={selectedActivity}
                    selectActivity={handleSelectActivity}
                    cancelSelectActivity={handleCancelSelectActivity}
                    editMode={editMode}
                    openForm={HandleOpenForm}
                    closeForm={HandleCloseForm}
                    submitForm={submitForm}
                    deleteActivity={deleteActivity}
                />
            </Container>
        </Box>
  )
}

export default App
