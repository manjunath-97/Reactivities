import { AccessTime, Place } from "@mui/icons-material";
import { Avatar, Box, Button, Card, CardContent, CardHeader, Chip, Divider, Typography } from "@mui/material";
import { Link, NavLink } from "react-router";
import { formatDate }  from "../../../lib/util/util.ts";
import AvatarPopover from "../../../shared/components/AvatarPopover.tsx";

type Prop = {
    activity: Activity,
}

export default function ActivityCard({ activity }: Prop) {

    const label = activity.isHost ? "You are hosting" : "You are going";
    const color = activity.isHost ? 'secondary' : activity.isGoing ? 'warning' : 'default';

	return (
        <Card elevation={3} variant="outlined" sx={{ borderRadius: 3 }} >
            <Box display="flex" alignItems="center" justifyContent="space-between">
                <CardHeader
                    avatar={
                        <Avatar
                            src={activity.hostImageUrl}
                            sx={{ height: 80, width: 80 }}
                            alt="Host user Image"
                        />
                    }
                    title={activity.title}
                    titleTypographyProps={{
                        fontWeight: "bold",
                        fontSize: 20
                    }}
                    subheader={
                        <>
                            Hosted by{' '}
                            <Link to={`/profiles/${activity.hostId}`}>
                                {activity.hostDisplayName}
                            </Link>
                        </>
                    }
                >
                </CardHeader> 
                <Box display="flex" flexDirection="column" gap={2} mr={2}>
                    {(activity.isHost || activity.isGoing) && <Chip label={label} color={color} sx={{ borderRadius: 2 }} variant="outlined" />}
                    {(activity.isCancelled) && <Chip label='cancelled' color='error' sx={{ borderRadius: 2 }} />}
                </Box>
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
            <Box display="flex" sx={{gap:2, backgroundColor:"grey.200", py: 2, pl: 3}}>
                {
                    activity.attendees.map(
                        (att) => {
                            return (
                                <AvatarPopover profile={att} />    
                            )
                        }
                    )
                }
            </Box>

            <CardContent sx={{ display: "flex", justifyContent: "space-between", pb: 2 }}>
                <Typography variant="body2"> {activity.description} </Typography>
                <Button component={NavLink} to={`/activities/${activity.id}`} size="medium" variant="contained" sx={{borderRadius:50} }>View</Button>
            </CardContent>
		</Card>
	);
}