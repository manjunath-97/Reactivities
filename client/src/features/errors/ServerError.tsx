import { Divider, Paper, Typography } from '@mui/material';
import { useLocation } from 'react-router';
export default function ServerError() {
    const { state } = useLocation();
    return (
            <Paper>
             {state.error ?
                (<>
                    <Typography gutterBottom color="secondary" variant="h3" sx={{ px: "4", pt: "2" }}>
                        {state.error?.message || 'There has been an error'}
                    </Typography>
                    <Divider />
                    <Typography variant="body1" sx={{ p: "4" }}>
                        {state.error?.details || 'Internal Server error!'}
                    </Typography>
                </>)
                :
                (
                    <Typography>
                        Internal server error!
                    </Typography>
                )}
            </Paper>
    );
}