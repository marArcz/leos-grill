'use client';
import { createClient } from '@/utils/supabase/client'
import { User } from '@supabase/supabase-js';
import React, { useEffect, useState } from 'react'
import { AttachMoney as MoneyIcon, AssignmentInd as OrdersIcon } from '@mui/icons-material'
import { formatToCurrency } from '@/app/lib/utils';
const Dashboard = () => {
    const supabase = createClient();
    const [user, setUser] = useState<User | null>(null)
    const todaysRevenue = 2383;
    const todaysOrders = 240;

    useEffect(() => {
        const getUser = async () => {
            const { data: { user } } = await supabase.auth.getUser();
            setUser(user);
        }
        getUser();
    }, [])


    return (
        <div>
            <div className="grid lg:grid-cols-4 grid-cols-2 gap-4 w-full ">
                {/* cards */}
                <div className="card flex space-x-5 bg-zinc-800">
                    <div className="rounded-md p-2 size-16 flex justify-center items-center bg-opacity-10 bg-yellow">
                        <MoneyIcon className='text-yellow'/>
                    </div>
                    <div>
                        <p className='lg:text-3xl text-2xl'>{formatToCurrency(todaysRevenue)}</p>
                        <p className='text-stone-400'>Today's Revenue</p>
                    </div>
                </div>
                <div className="card flex space-x-5 bg-zinc-800">
                    <div className="rounded-md p-2 size-16 flex justify-center items-center bg-opacity-10 bg-green-600">
                        <OrdersIcon className='text-green-600'/>
                    </div>
                    <div>
                        <p className='lg:text-3xl text-2xl'>{todaysOrders}</p>
                        <p className='text-stone-400'>Today's Orders</p>
                    </div>
                </div>
                <div className="card flex space-x-5 bg-zinc-800">
                    <div className="rounded-md p-2 size-16 flex justify-center items-center bg-opacity-10 bg-orange">
                        <OrdersIcon className='text-orange'/>
                    </div>
                    <div>
                        <p className='lg:text-3xl text-2xl'>{todaysOrders}</p>
                        <p className='text-stone-400'>Avg. daily revenue</p>
                    </div>
                </div>
            </div>
            <div className="mt-3 border p-3 rounded-md">
                <p className='text-zinc-400'>Today's Orders</p>
                <p>Nothing to show.</p>
            </div>
        </div>
    )
}

export default Dashboard