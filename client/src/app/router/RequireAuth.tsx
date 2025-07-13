import { useAccount } from "../../lib/hooks/useAccount";
import { Typography } from "@mui/material";
import { Outlet, useLocation, Navigate } from "react-router";

export default function RequireAuth() {
	const { currentUser, isLoadingUserInfo } = useAccount();
	const location = useLocation();

	if (isLoadingUserInfo)
		return (<Typography variant="h4"> Loading...</Typography>);

	if (!currentUser)
		return (<Navigate to="/login" state={{ from: location}} />);

	return (<Outlet />);
}