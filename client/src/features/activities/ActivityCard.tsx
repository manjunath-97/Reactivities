import { Avatar, Box, Button, Card, CardActions, CardContent, CardHeader, Chip, Typography } from "@mui/material";
import { Link, NavLink } from "react-router";

type Prop = {
    activity: Activity,
}

export default function ActivityCard({ activity }: Prop) {
    const isHost = false;
    const isGoing = false;
    const lable = isHost ? "You are hosting" : "You are going";
    const isCancelled = false;
    const color = isHost ? 'Secondary' : isGoing ? 'warning' : 'default';

	return (
        <Card elevation={3} variant="outlined" sx={{ borderRadius: 3 }} >
            <Box display="flex" alignItems="center" justifyContent="space-between">
                <CardHeader
                    avatar={<Avatar sx={{ height: 80, width: 80 }} />}
                    title={activity.title}
                    titleTypographyProps={{
                        fontWeight: "bold",
                        fontSize: 20
                    }}
                    subheader={
                        <>
                            Hosted by{' '}<Link to={`/profiles/bob`}>Bob</Link>
                        </>
                    }
                >
                </CardHeader>   
            </Box>
            <Box display="flex" flexDirection="column" gap={2} mr={2}>
                {(isHost || isGoing) && <Chip label={lable} color={color} sx={{ borderRadius: 2 }} />}
                {(isCancelled) && <Chip label='cancelled' color='error' sx={{ borderRadius : 2 }} />}
            </Box>

			<CardContent>
                <Typography gutterBottom variant="h5"> {activity.title} </Typography>
                <Typography variant="h2" sx={{ color: 'text.secondary', fontSize: 14 }}> {activity.date} </Typography>
                <Typography variant="body2"> {activity.description} </Typography>
                <Typography variant="subtitle1"> {activity.city} / { activity.venue} </Typography>
            </CardContent>
            <CardActions sx={{ display: "flex", justifyContent: "space-between", pb: 2 }}>
                <Chip label={activity.category} variant="outlined" />
                <Box display="flex" gap={2}>
                    <Button component={NavLink} to={`/activities/${activity.id}`} size="medium" variant="contained">View</Button>
                    <Button size="medium" variant="contained" color="error">Delete</Button>
                </Box>
            </CardActions>
		</Card>
	);
}