import { AccessTime, Place } from "@mui/icons-material";
import { Avatar, Box, Button, Card, CardContent, CardHeader, Chip, Divider, Typography } from "@mui/material";
import { Link, NavLink } from "react-router";
import  formatDate  from "../../../lib/util/util.ts";

type Prop = {
    activity: Activity,
}

export default function ActivityCard({ activity }: Prop) {
    const isHost = false;
    const isGoing = false;
    const lable = isHost ? "You are hosting" : "You are going";
    const isCancelled = false;
    const color = isHost ? 'secondary' : isGoing ? 'warning' : 'default';

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

            <Divider sx={{ mb: 3 }} />

            <CardContent sx={{ p: 0 }}>
                <Box display="flex" alignItems="center" sx={{ mb: 2, px: 2 }}>
                    <Box display="flex" flexGrow={0} alignItems="center">
                        <AccessTime sx={{ mr: 1 }} />
                        <Typography variant="body2" noWrap> {formatDate(activity.date)} </Typography>
                    </Box>
                    <Place sx={{ ml: 3, mr: 1 }} />
                    <Typography variant="body2"> {activity.venue} </Typography>
                </Box>
            </CardContent>

            <Divider sx={{mb:3}} />
            <Box display="flex" flexDirection="column" sx={{gap:2, backgroundColor:"grey.200", py: 2, pl: 3}}>
                Attendees go here!
            </Box>

            <CardContent sx={{ display: "flex", justifyContent: "space-between", pb: 2 }}>
                <Typography variant="body2"> {activity.description} </Typography>
                <Button component={NavLink} to={`/activities/${activity.id}`} size="medium" variant="contained">View</Button>
            </CardContent>
		</Card>
	);
}