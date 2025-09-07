import { Box, Button, Divider, ImageList, ImageListItem, Typography } from "@mui/material";
import { useParams } from "react-router";
import { useProfile } from "../../lib/hooks/useProfile";
import { useState } from "react";
import PhotoUploadWidget from "../../shared/components/PhotoUploadWidget";
import StarButton from "../../shared/components/StarButton";
import DeletePhoto from "../../shared/components/DeleteButton";

export default function ProfilePhotos() {

    const { id } = useParams();
    const { profilePhotos, photosLoading, isCurrentUser, uploadPhoto, setMainPhoto, deletePhoto, profile } = useProfile(id);
    const [editMode, setEditMode] = useState(false);

    const handleUpload = (file: Blob) => {
        uploadPhoto.mutate(file, {
            onSuccess: () => {
                setEditMode(false);
            }
        });
    }

    if (photosLoading) return (<Typography>Photos loading...!</Typography>);

    if (!profilePhotos) return <Typography>No photos found for this user</Typography>

    return (
        <Box>
            <Box display="flex" justifyContent="space-between">
                <Typography variant="h5">Photos</Typography>
                {
                    isCurrentUser &&
                    (
                        <Button onClick={() => setEditMode(!editMode)} >
                            {editMode ? 'Cancel' : 'upload photo'}
                        </Button>)
                }
            </Box >
            <Divider sx={{ my: 2 }} />

            {
                editMode ?
                    (<PhotoUploadWidget uploadPhoto={handleUpload} loading={uploadPhoto.isPending} />) :
                    (
                        <>
                            {profilePhotos?.length === 0 ?
                                (<Typography> No photos!</Typography>) :
                                (
                                <ImageList sx={{ height: 450 }} cols={6} rowHeight={164}>
                                    {profilePhotos.map((photo) => (
                                        <ImageListItem key={photo.id}>
                                            <img
                                                srcSet={`${photo.url.replace(
                                                    '/upload/',
                                                    '/upload/w_164,h_164,c_fill,f_auto,dpr_2,g_face/'
                                                )}`}
                                                src={`${photo.url.replace(
                                                    '/upload/',
                                                    '/upload/w_164,h_164,c_fill,f_auto,g_face/'
                                                )}`}

                                                alt={'user profile image'}
                                                loading="lazy"
                                            />
                                            {
                                                isCurrentUser &&
                                                (<div>
                                                    <Box sx={
                                                        {
                                                            position: "absolute",
                                                            top: 0,
                                                            left: 0
                                                        }
                                                    }
                                                        onClick={() => setMainPhoto.mutate(photo)}
                                                    >
                                                        <StarButton selected={profile?.imageUrl === photo.url} />
                                                    </Box>

                                                    {
                                                        (profile?.imageUrl !== photo.url) &&
                                                        <Box sx={
                                                            {
                                                                position: "absolute",
                                                                top: 0,
                                                                right: 0
                                                            }
                                                        }
                                                            onClick={() => deletePhoto.mutate(photo.id)}
                                                        >
                                                            <DeletePhoto />
                                                        </Box>
                                                    }

                                                </div>)
                                            }


                                        </ImageListItem>
                                    ))}
                                </ImageList>)}

                    </>)
        }
        </Box>
    );
}