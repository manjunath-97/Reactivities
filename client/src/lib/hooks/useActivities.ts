import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import agent from "../api/agent";
import { useAccount } from "./useAccount";

export const useActivities = (id? : string) => {

    const { currentUser }  = useAccount();
    const queryClient = useQueryClient();

    const { data: activities, isLoading } = useQuery({
        queryKey: ['activities'],
        queryFn: async () => {
            const response = await agent.get<Activity[]>('/Activities');
            return response.data;
        },
        enabled: !id && location.pathname === '/activities' && !!currentUser
    })

    const { data: activity, isLoading: isLoadingActivity } = useQuery({
        queryKey:['activity', id],
        queryFn : async () => {
            const response = await agent.get<Activity>(`/activities/${id}`);
            return response.data;
        },
        enabled: !!id && !!currentUser
    })

    const updateActivity = useMutation({
            mutationFn: async (activity: Activity) => {
                await agent.put("/Activities", activity);
            },
            onSuccess: async () => {
                await queryClient.invalidateQueries(
                    { queryKey: ['activities'] });
            }
        })

    const createActivity = useMutation({
        mutationFn: async  (activity: Activity) => {
            const response = await agent.post("/Activities", activity);
            return response.data;
        },
        onSuccess: async () => {
            await queryClient.invalidateQueries(
                { queryKey : ['activities']})
        }
    })

    const deleteActivity = useMutation({
        mutationFn: async (id: string)=>{
            await agent.delete(`/Activities/${id}`);
        },
        onSuccess: async () => {
            queryClient.invalidateQueries({
                queryKey: ["activities"]
            })
        }
    })


    return {
        activities,
        isLoading,
        updateActivity,
        createActivity,
        deleteActivity,
        activity,
        isLoadingActivity
    }
}