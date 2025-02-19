'use client';
import { createClient } from '@/utils/supabase/client'
import { User } from '@supabase/supabase-js';
import React, { useEffect, useState } from 'react'

const Dashboard = () => {
    const supabase = createClient();
    const [user, setUser] = useState<User | null>(null)

    useEffect(() => {
        const getUser = async () => {
            const { data: { user } } = await supabase.auth.getUser();
            setUser(user);
        }
        getUser();
    }, [])


    return (
        <div>
            {user ? (
             <p>{user.id}</p>   
            ):(
                <p>Not logged in!</p>
            )}
        </div>
    )
}

export default Dashboard