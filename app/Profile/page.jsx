'use client';
import { useState, useEffect, useCallback } from "react";
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import Profile from '@components/Profile';

const MyProfile = () =>
{
    const router = useRouter();
    const { data: session } = useSession();
    const [posts, setPosts] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const [currentPost, setCurrentPost] = useState(null);

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

    const handleShowModal = useCallback((post) =>
    {
        setCurrentPost(post);
        setShowModal(true);
        console.log('Attempting to show modal.');
    }, []);

    const onClose = useCallback(() =>
    {
        setShowModal(false);
        setCurrentPost(null);
        console.log('Modal closed.');
    }, []);

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

    const handleEditWrapper = useCallback((post) =>
    {
        return () => handleEdit && handleEdit(post);
    }, [handleEdit]);

    const handleDeleteWrapper = useCallback((post) =>
    {
        return () => handleDelete && handleDelete(post);
    }, [handleDelete]);

    const handleShowModalWrapper = useCallback((post) =>
    {
        return () => handleShowModal && handleShowModal(post);
    }, [handleShowModal]);

    return (
        <Profile
            name='My'
            desc='Welcome to your personalized profile page'
            data={posts}
            showModal={showModal}
            onClose={onClose}
            handleEdit={handleEdit}
            handleDelete={handleDelete}
            handleShowModal={handleShowModal}
            currentPost={currentPost}
            handleEditWrapper={handleEditWrapper}
            handleDeleteWrapper={handleDeleteWrapper}
            handleShowModalWrapper={handleShowModalWrapper}
        />
    );
};

export default MyProfile;