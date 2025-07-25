import { Person } from "@mui/icons-material";
import { Card, CardMedia, CardContent, Typography, Box, Divider, Chip } from "@mui/material";
import { Link } from "react-router";

type Props = {
    profile : Profile
}

export default function ProfileCard({ profile }: Props) {
    const following = false;

    return (
        <Link to={`/profiles/${profile.id}`} style={{ textDecoration: 'none' }}>
            <Card
                sx={{
                    borderRadius: 3, p: 3,
                    maxWidth: 250,
                    textDecoration: 'none'
                }}
                elevation={4}
            >
                <CardMedia
                    component='img'
                    src={profile?.imageUrl || '/images/user.png'}
                    sx={{ width: '100%', zIndex: 50 }}
                    alt={profile.displayName + ' image'}
                />
                <CardContent>
                    <Box display='flex' alignItems='center' gap={1} >
                        <Typography variant="h5">
                            {profile.displayName}
                        </Typography>

                        {following && <Chip size="small" label='Following'
                            color="secondary" variant="outlined" />}
                    </Box>
                    <Divider sx={{mb:2}} />
                    <Box display="flex" alignItems="center"  justifyContent="start">
                        <Person/>
                        <Typography sx={{ml:2}}>
                            20 followers
                        </Typography>
                    </Box>
                </CardContent>
            </Card>
        </Link>
    );
}