import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import agent from "../api/agent";
import { useMemo } from "react";
import { Photo } from "@mui/icons-material";

export const useProfile = (id?: string) => {

    const queryClient = useQueryClient();

    const { data: profile, isLoading : isProfileLoading } = useQuery({
        queryKey: ['profile', id],
        queryFn: async () => {
            const response = await agent.get<Profile>(`/Profiles/${id}`);
            return response.data;
        },
        enabled:!!id
    });

    const { data: profilePhotos, isLoading: photosLoading } = useQuery({
        queryKey: ['photos', id],
        queryFn: async () => {
            const response = await agent.get<Photo[]>(`/profiles/${id}/photos`);
            return response.data;
        },
        enabled: !!id
    });

    const uploadPhoto = useMutation(
        {
            mutationFn: async (file: Blob) => {
                const formData = new FormData();
                formData.append('file', file);
                const response = await agent.post("/profiles/add-photo", formData, {
                    headers: {
                        "Content-Type" : "multipart/form-data"
                    }
                })
                return response.data;
            },
            onSuccess: (photo: Photo)=>{
                queryClient.invalidateQueries({
                    queryKey: ["photos", id]
                });

                queryClient.setQueryData(['user'], (data: User) => {
                    if (!data) return data;

                    return {
                        ...data,
                        imageUrl: data.imageUrl ?? photo.url
                    }
                });

                queryClient.setQueryData(['profile',id], (data: Profile) => {
                    if (!data) return data;

                    return {
                        ...data,
                        imageUrl: data.imageUrl ?? photo.url
                    }
                })

            }

        });

    const setMainPhoto = useMutation({
        mutationFn: async (photo: Photo) => {
            await agent.put(`/profiles/${photo.id}/setMain`);
        },
        onSuccess: (_,photo: Photo) => {
            queryClient.setQueryData(['user'], (userData: User) => {
                if (!userData) return userData;

                return {
                    ...userData,
                    imageUrl: photo.url
                }
            });

            queryClient.setQueryData(['profile', id], (profile: Profile) => {
                if (!profile) return profile;

                return {
                    ...profile,
                    imageUrl: photo.url
                }
            })
        }
    });

    const deletePhoto = useMutation(
        {
            mutationFn: async (photoId: string) => {
                await agent.delete(`/profiles/${photoId}/photos`);
            },

            onSuccess: (_, photoId) => {
                queryClient.setQueryData(["photos", id], (photos : Photo[]) => {
                    return photos.filter(p => p.id !== photoId);
                })
            }
        }
    )

    const  isCurrentUser  = useMemo(() => {
        return id === queryClient.getQueryData<User>(["user"])?.id;
    },[id, queryClient])
   
    return {
        profile,
        isProfileLoading,
        profilePhotos,
        photosLoading,
        isCurrentUser,
        uploadPhoto,
        setMainPhoto,
        deletePhoto
    }
}