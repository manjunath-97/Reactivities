import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import agent from "../api/agent";



export const useActivities = (id? : string) => {

    const queryClient = useQueryClient();

    const { data: activities, isPending } = useQuery({
        queryKey: ['activities'],
        queryFn: async () => {
            const response = await agent.get<Activity[]>('/Activities');
            return response.data;
        }
    })

    const { data: activity, isLoading } = useQuery({
        queryKey:['activity', id],
        queryFn : async () => {
            const response = await agent.get<Activity>(`/activities/${id}`);
            return response.data;
        },
        enabled : !!id
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
        isPending,
        updateActivity,
        createActivity,
        deleteActivity,
        activity,
        isLoading
    }
}