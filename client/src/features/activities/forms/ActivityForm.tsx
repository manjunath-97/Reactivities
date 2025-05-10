import { Box, Button, Paper, TextField, Typography } from "@mui/material";
import { FormEvent } from "react";
import { useActivities } from "../../../lib/hooks/useActivities";

type Props = {
    closeForm: () => void;
    activity: Activity | undefined;
}

export default function ActivityForm({ closeForm, activity }: Props) {

    const { updateActivity,createActivity } = useActivities();
    const handleSubmit = async (event : FormEvent<HTMLFormElement>) =>
    {
        event.preventDefault();
        const formData = new FormData(event.currentTarget);
        const data: { [key: string]: FormDataEntryValue } = {};

        formData.forEach((value, key) => {
            data[key] = value;
        })

        if (activity) {
            data.id = activity.id;
            await updateActivity.mutateAsync(data as unknown as Activity);
        }
        else {
            await createActivity.mutateAsync(data as unknown as Activity);
        }
        closeForm();
    }

    return (
        <Paper sx={{borderRadius:3, padding:3}}>
            <Typography variant="h5" gutterBottom color="primary">
                Create a new Activity
            </Typography>

            <Box component="form" onSubmit={handleSubmit} display="flex" flexDirection="column" gap={3}>
                <TextField name="title" label="title" defaultValue={activity?.title} />
                <TextField name="description"  label="Description" defaultValue={activity?.description} multiline={true} rows={3} />
                <TextField name="category" label="Category" defaultValue={activity?.category} />
                <TextField name="date" label="Date" type="date" defaultValue={(activity?.date) ?
                    (new Date(activity?.date).toISOString().split("T")[0]) :
                    (new Date().toISOString().split("T")[0])} />
                <TextField name="city" label="City" defaultValue={activity?.city} />
                <TextField name="venue" label="venue" defaultValue={activity?.venue} />
                <Box sx={{ display: "flex", justifyContent: "end", gap: 3 }}>
                    <Button color="inherit" onClick={closeForm}>Cancel</Button>
                    <Button color="success"
                        type="submit"
                        variant="contained"
                        disabled={updateActivity.isPending || createActivity.isPending}
                    >Submit
                    </Button>
                </Box>
            </Box>
        </Paper>
    );
}