import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import agent from "../api/agent";
import { useAccount } from "./useAccount";

export const useActivities = (id?: string) => {

    const { currentUser } = useAccount();
    const queryClient = useQueryClient();

    const { data: activities, isLoading } = useQuery({
        queryKey: ['activities'],
        queryFn: async () => {
            const response = await agent.get<Activity[]>('/Activities');
            return response.data;
        },
        enabled: !id && location.pathname === '/activities' && !!currentUser,
        select: (data) => {

            return data.map(activity => {
                const host = activity.attendees.find(x => x.id = activity.hostId);

                return {
                    ...activity,
                    isHost: activity.hostId === currentUser?.id,
                    isGoing: activity.attendees.some(a => a.id === currentUser?.id),
                    hostImageUrl: host?.imageUrl
                }
            })
        }
    });

    const { data: activity, isLoading: isLoadingActivity } = useQuery({
        queryKey: ['activity', id],
        queryFn: async () => {
            const response = await agent.get<Activity>(`/activities/${id}`);
            return response.data;
        },
        enabled: !!id && !!currentUser,
        select: (data) => {

            const host = data.attendees.find(x => x.id = data.hostId);

            return {
                ...data,
                isHost: data.hostId === currentUser?.id,
                isGoing: data.attendees.some(a => a.id === currentUser?.id),
                hostImageUrl: host?.imageUrl
            }
        }
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
        mutationFn: async (activity: Activity) => {
            const response = await agent.post("/Activities", activity);
            return response.data;
        },
        onSuccess: async () => {
            await queryClient.invalidateQueries(
                { queryKey: ['activities'] })
        }
    })

    const deleteActivity = useMutation({
        mutationFn: async (id: string) => {
            await agent.delete(`/Activities/${id}`);
        },
        onSuccess: async () => {
            queryClient.invalidateQueries({
                queryKey: ["activities"]
            })
        }
    })

    const updateAttendance = useMutation({
        mutationFn: async (id: string) => {
            await agent.post(`/Activities/${id}/attend`);
        },
        onMutate: async (activitId: string) => {
            await queryClient.cancelQueries({ queryKey: ['activity', activitId] });

            const prevActivity = queryClient.getQueryData<Activity>(["activity", activitId]);

            queryClient.setQueryData<Activity>(["activity", id], oldActivity => {

                if (!oldActivity || !currentUser) {
                    return oldActivity
                }

                const isHost = oldActivity.hostId === currentUser.id;
                const isAttending = oldActivity.attendees.some(x => x.id === currentUser.id);

                return (
                    {
                        ...oldActivity,
                        isCancelled: isHost ? !oldActivity.isCancelled : oldActivity.isCancelled,
                        attendees: isAttending
                            ? (isHost
                                ? oldActivity.attendees
                                : oldActivity.attendees.filter(x => x.id != currentUser.id))
                            : [...oldActivity.attendees, {
                                id: currentUser.id,
                                displayName: currentUser.displayName,
                                imageUrl: currentUser.imageUrl
                            }]
                    })
            })

            return { prevActivity };
        },
        onError: (error, activityId, context) => {
            console.log('prevActivity' + context?.prevActivity);
            console.log(error);
            if (context?.prevActivity) {
                queryClient.setQueryData(['activity', activityId], context.prevActivity)
            }
        }
    })


    return {
        activities,
        isLoading,
        updateActivity,
        createActivity,
        deleteActivity,
        activity,
        isLoadingActivity,
        updateAttendance
    }
}