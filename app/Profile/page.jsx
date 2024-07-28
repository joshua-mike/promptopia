'use client';
import { useState, useEffect } from "react";
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/router';
import Profile from '@components/Profile';

const MyProfile = () =>
{
    const handleEdit = () => { };
    const handleDelete = async () => { };

    return (
        <Profile
            name='Mine'
            description='Welcome to your personalized profile page'
            data={[]}
            handleEdit={handleEdit}
            handleDelete={handleDelete}
        />
    );
};

export default MyProfile;