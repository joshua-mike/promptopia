'use client';
import { useState, useEffect } from "react";
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/router';
import Profile from '@components/Profile';
import { data } from "autoprefixer";

const MyProfile = () =>
{
    const { data: session } = useSession();

    const [posts, setPosts] = useState([]);

    const fetchPosts = async () =>
    {
        const response = await fetch('/api/users/${session.user.id}/posts');
        const data = await response.json();
        setPosts(data);
    }

    useEffect(() =>
    {
        if (session?.user.id) fetchPosts();
    }, []);

    const handleEdit = () => { };
    const handleDelete = async () => { };

    return (
        <Profile
            name='My'
            description='Welcome to your personalized profile page'
            data={[data]}
            handleEdit={handleEdit}
            handleDelete={handleDelete}
        />
    );
};

export default MyProfile;