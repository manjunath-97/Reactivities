import { Box, Button, Paper, Typography } from "@mui/material";
import { useEffect } from "react";
import { useActivities } from "../../../lib/hooks/useActivities";
import { NavLink } from "react-router";
import { useParams, useNavigate } from "react-router";
import { useForm, FieldValues } from "react-hook-form";
import { ActivitySchema, activitySchema } from "../../../lib/schemas/activitySchema";
import { zodResolver } from "@hookform/resolvers/zod";
import TextInput from "../../../shared/components/TextInput";
import SelectInput from "../../../shared/components/SelectInput";
import { categoryOptions } from "./categoryOptions";
import DateInput from "../../../shared/components/DateInput";
import LocationInput from "../../../shared/components/LocationInput";

export default function ActivityForm() {
    const navigate = useNavigate(); 

    const { reset, handleSubmit, control } = useForm<ActivitySchema>({
        mode: "onTouched",
        resolver: zodResolver(activitySchema)
    });
    const { id } = useParams();

    const { updateActivity, createActivity, activity, isLoading } = useActivities(id);

    useEffect(
        () => {
            if (activity) {
                reset({
                    ...activity,
                    location: {
                        city: activity.city,
                        venue: activity.venue,
                        latitude: activity.latitude,
                        longitude : activity.longitude
                    }
                });
            }
        }, [activity, reset])

    const onSubmit = (data: FieldValues) =>
    {
        const { location, ...rest } = data;
        const flattenedData = { ...rest, ...location };

        try
        {
            if (activity) {
                updateActivity.mutate({ ...activity, ...flattenedData }, { onSuccess: () => { navigate(`/activities/${activity.id}`) } });
            }
            else {
                createActivity.mutate(flattenedData, {
                    onSuccess: (id) => navigate(`/activities/${id}`)
                })
            }
        }
        catch (er)
        {
            console.log(er);
        }
    }

    if (isLoading) {
        return <Typography>Loading...</Typography>
    }

    return (
        <Paper sx={{borderRadius:3, padding:3}}>
            <Typography variant="h5" gutterBottom color="primary">
                { activity ? 'Edit Activity' : "Create an Activity"}
            </Typography>

            <Box component="form" onSubmit={handleSubmit(onSubmit)} display="flex" flexDirection="column" gap={3}>
                <TextInput
                    name="title"
                    label="Title"
                    control={control}
                />
                <TextInput
                    name="description"
                    label="Description"
                    control={control}
                    multiline
                    rows={4} 
                />
                <Box display="flex" gap={3}>
                    <SelectInput
                        name="category"
                        label="Category"
                        control={control}
                        items={categoryOptions} />
                    <DateInput
                        name="date"
                        label="Date"
                        control={control}
                    />

                </Box>
                <LocationInput control={control} label='Enter the location' name="location" />
                
                <Box sx={{ display: "flex", justifyContent: "end", gap: 3 }}>
                    <Button color="inherit" component={ NavLink}  to='/activities'>Cancel</Button>
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