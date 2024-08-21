'use client';
import { useState, useEffect } from "react";
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import Profile from '@components/Profile';
import { data } from 'autoprefixer';

const MyProfile = () =>
{
    const router = useRouter();
    const { data: session } = useSession();
    const [posts, setPosts] = useState([]);

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

                const filteredPosts = posts.filter((p) => p._id !== posts._id);
                setPosts(filteredPosts);

            } catch (error)
            {
                console.log('Failed to delete prompt', error);
            }
        }


    };

    return (
        <Profile
            name='My'
            desc='Welcome to your personalized profile page'
            data={posts}
            handleEdit={handleEdit}
            handleDelete={handleDelete}
        />
    );
};

export default MyProfile;