import { Button, styled } from "@mui/material";

const StyledButton = styled(Button)(({ theme }) => ({
    '&.Mui-disabled' : {
        backgroundColor: theme.palette.grey[600],
        color: theme.palette.text.disabled
    }
}))

export default StyledButton;