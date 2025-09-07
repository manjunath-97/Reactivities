import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import agent from "../api/agent";
import { LoginSchema } from "../schemas/loginSchema";
import { RegisterSchema } from "../schemas/registerSchema";
import { useNavigate } from "react-router";
import { toast } from "react-toastify";

export const useAccount = () => {
    const queryClient = useQueryClient();
    const navigate = useNavigate();

    const loginUser = useMutation({
        mutationFn: async (userCreds: LoginSchema) => {
            await agent.post('/login?useCookies=true', userCreds);
        },
        onSuccess: async () => {
            await queryClient.invalidateQueries({
                queryKey: ['user']
            });
        }
    })

    const logoutUser = useMutation({
        mutationFn: async () => {
            await agent.post('/account/logout');
        },
        onSuccess: async () => {
            queryClient.removeQueries({ queryKey: ['user'] });
            queryClient.removeQueries({ queryKey: ['activities'] });
            navigate('/');
        }
    })

    const { data: currentUser, isLoading: isLoadingUserInfo } = useQuery({
        queryKey: ['user'],
        queryFn: async () => {
            const response = await agent.get<User>('/account/user-info');
            console.log(response.data)
            return response.data;
        },
        enabled: !queryClient.getQueryData(['user'])
    })

    const registerUser = useMutation({
        mutationFn: async (registrationInfo: RegisterSchema) => {
            await agent.post('/account/register', registrationInfo);
        },
        onSuccess: async () => {
            toast.success("Registration Successfull! You can login now.");
            navigate("/login");
        }
    })

    return {
        loginUser,
        currentUser,
        logoutUser,
        isLoadingUserInfo,
        registerUser
    }
}