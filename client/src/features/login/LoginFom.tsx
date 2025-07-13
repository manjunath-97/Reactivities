import { LockOpen } from "@mui/icons-material";
import { Paper, Typography, Button, Box } from "@mui/material";
import { useAccount }  from "../../lib/hooks/useAccount";
import { LoginSchema, loginSchema } from "../../lib/schemas/loginSchema";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import TextInput from "../../shared/components/TextInput";
import { Link, useLocation, useNavigate } from "react-router";

export default function LoginForm()
{
    const { loginUser } = useAccount();
    const location  = useLocation();
    const  navigate  = useNavigate();

	const { control, handleSubmit, formState: { isValid, isSubmitting } } = useForm<LoginSchema>(
		{
			mode: "onTouched",
			resolver : zodResolver(loginSchema)
		});

    const onSubmit = async (data : LoginSchema) => {
        await loginUser.mutateAsync(data, {
            onSuccess: () => {
                navigate(location.state?.path || '/activities');
            }
        });
    }

	return (
        <Paper
            component="form"
            onSubmit={handleSubmit(onSubmit)}
            sx={
                {
                    display: "flex",
                    flexDirection:"column",
                    borderRadius: 3,
                    p: 3,
                    gap: 3,
                    maxWidth: "md",
                    mx: "auto"
                }
            }>

            <Box
                display="flex"
                alignItems="center"
                justifyContent="center"
                gap={3}
                color="secondary.main"
            >
                <LockOpen fontSize="large"></LockOpen>
                <Typography variant="h4">
                    Sign In
                </Typography>
            </Box>
            <TextInput
                name="email"
                label="E-Mail"
                control={control}
            />
            <TextInput
                name="password"
                label="Password"
                control={control}
                type="password"
             />
            <Button
                type="submit"
                disabled={!isValid || isSubmitting}
                variant="contained"
                size="large"
            >
                Login
            </Button>
            <Typography sx={{ textAlign: 'center' }}>
                Don't have an account?
                <Typography sx={{ ml: 2 }} component={Link} to='/register' color="primary">
                    Sign up
                </Typography>
            </Typography>
       </Paper>
	);
}