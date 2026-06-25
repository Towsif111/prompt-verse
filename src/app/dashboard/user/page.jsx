"use client"
import React from 'react';
import { useSession } from '@/lib/auth-client';

const UserHomePage = () => {

    const {data: session, isPending} = useSession();

    if(isPending){
        return<div>Loading...</div>
    }

    const user = session?.user;
    console.log("Session data in UserHomePage: ",session);

    return (
        <div>
            <h2 className='text-2xl font-bold'>Welcome Back,{user?.name}</h2>
        </div>
    );
};

export default UserHomePage;