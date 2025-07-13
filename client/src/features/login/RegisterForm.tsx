import { LockOpen } from "@mui/icons-material";
import { Paper, Typography, Button, Box } from "@mui/material";
import { useAccount }  from "../../lib/hooks/useAccount";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import TextInput from "../../shared/components/TextInput";
import { RegisterSchema, registerSchema } from "../../lib/schemas/registerSchema";
import { Link } from "react-router";

export default function LoginForm()
{
    const { registerUser } = useAccount();

	const { control, handleSubmit,setError, formState: { isValid, isSubmitting } } = useForm<RegisterSchema>(
		{
			mode: "onTouched",
			resolver : zodResolver(registerSchema)
		});

    const onSubmit = async (data : RegisterSchema) => {
        await registerUser.mutateAsync(data, {
            onError: (error) => {
                if (Array.isArray(error))
                {
                    error.forEach(
                        (err) => {
                            if (err.includes('Email')) setError('email', { message: err });
                            else if (err.includes('Password')) setError('password', { message: err })
                        }
                    )
                }
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
                    Register
                </Typography>
            </Box>
            <TextInput
                name="displayName"
                label="Name"
                control={control}
            />
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
                Register
            </Button>
            <Box>
                <Typography sx={{ textAlign: 'center' }}>
                    Already have an account?
                    <Typography sx={{ ml: 2 }} component={Link} to='/login' color="primary">
                        Login
                    </Typography>
                </Typography>
            </Box>
       </Paper>
	);
}