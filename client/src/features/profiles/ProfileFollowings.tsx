import { Box, Divider ,Typography } from "@mui/material";
import { useParams } from "react-router";
import { useProfile } from "../../lib/hooks/useProfile";
import ProfileCard from "./ProfileCard";

type Props = {
    activeTab: number
}

export default function ProfileFollowings({ activeTab} : Props) {

    const { id } = useParams();
    const predicate = activeTab === 3 ? "followers" : "followings";
    const { profile, loadingFollowings, followings } = useProfile(id, predicate);

    return (
        <Box>
            <Box display="flex">
                <Typography variant="h5">
                    {activeTab === 3 ? `People following ${profile?.displayName}`
                        : `People ${profile?.displayName}'s following'`}
                </Typography>
            </Box>
            <Divider sx={{ my: 2 }} />
            {
                loadingFollowings ? <Typography> Loading ...</Typography> : (
                    <Box display="flex" marginTop={3} gap={3}>
                        {followings?.map(x => <ProfileCard key={ x.id} profile={x} />)}

                    </Box>)
            }

        </Box>
            );
}