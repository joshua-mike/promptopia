'use client';
import { useState, useEffect } from "react";
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import Profile from '@components/Profile';
import ImageModal from '@components/ImageModal';

const MyProfile = () =>
{
    const router = useRouter();
    const { data: session } = useSession();
    const [posts, setPosts] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const refreshPage = () =>
    {
        router.replace(router.asPath);
    }

    useEffect(() =>
    {
        const fetchPosts = async () =>
        {
            const response = await fetch(`/api/users/${session?.user.id}/posts`);
            const data = await response.json();
            setPosts(data);
        }

        if (session?.user.id) fetchPosts();

    }, [session?.user.id]);

    const handleEdit = (posts) =>
    {
        router.push(`/update-prompt?id=${posts._id}`);
    };

    const handleShowModal = () =>
    {
        setShowModal(true);
        console.log('Attempting to show modal.');
        refreshPage();

        // return (<ImageModal
        //     show={showModal}
        //     handleShowModal={() => handleShowModal()}
        //     onClose={() => setShowModal(false)}
        //     prompt={"generate industrial looking house in the mountains surrounded by trees"}
        // />);
    }

    const handleDelete = async (posts) =>
    {
        const hasConfirmed = confirm('Are you sure you want to delete this pompt?');

        if (hasConfirmed)
        {
            try
            {
                await fetch(`/api/prompt/${posts._id.toString()}`, {
                    method: 'DELETE'
                });

                if (Array.isArray(posts))
                {
                    const filteredPosts = posts.filter((p) => p._id !== posts._id);
                    setPosts(filteredPosts);
                }
                else
                {
                    console.log('Posts variable is not an array.');
                    setPosts([]);
                }

            } catch (error)
            {
                console.log('Failed to delete prompt', error);
            }
        }
    };

    return (showModal ? <ImageModal show={showModal} handleShowModal={() => handleShowModal()} onClose={() => setShowModal(false)} prompt={"generate industrial looking house in the mountains surrounded by trees"} /> :
        <Profile
            name='My'
            desc='Welcome to your personalized profile page'
            data={posts}
            showModal={showModal}
            handleEdit={handleEdit}
            handleDelete={handleDelete}
            handleShowModal={handleShowModal}
        />
    );
};

export default MyProfile;