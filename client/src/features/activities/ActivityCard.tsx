import { Button, Card, CardActions, CardContent, Chip, Typography } from "@mui/material";

type Prop = {
	activity: Activity
}

export default function ActivityCard({activity} : Prop ) {
	return (
        <Card variant="outlined" sx={{ borderRadius: 3 }} >
			<CardContent>
                <Typography gutterBottom variant="h5"> {activity.title} </Typography>
                <Typography variant="h2" sx={{ color: 'text.secondary', fontSize: 14 }}> {activity.date} </Typography>
                <Typography variant="body2"> {activity.description} </Typography>
                <Typography variant="subtitle1"> {activity.city} / { activity.venue} </Typography>
            </CardContent>
            <CardActions sx={{ display: "flex", justifyContent: "space-between", pb: 2 }}>
                <Chip label={activity.category} variant="outlined"/>
                <Button size="medium" variant="contained">View</Button>
            </CardActions>
		</Card>
	);
}