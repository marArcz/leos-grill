'use client';
import { createClient } from '@/utils/supabase/client'
import { User } from '@supabase/supabase-js';
import React, { useEffect, useState } from 'react'
import { AttachMoney as MoneyIcon, AssignmentInd as OrdersIcon } from '@mui/icons-material'
import { formatToCurrency } from '@/app/lib/utils';
import { useGetSession } from '@/hooks/use-get-session';
import { IOrderListFilter } from '@/app/lib/definitions';
import { useGetAllOrders } from '@/app/lib/react-query/queriesAndMutations';
import clsx from 'clsx';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Button } from '@/components/ui/button';
const Dashboard = () => {
    const supabase = createClient();
    const [page, setPage] = useState(1)
    const [filters, setFilters] = useState<IOrderListFilter>({})
    const { data: orders, isPending: isFetchingOrders } = useGetAllOrders(filters);
    const todaysRevenue = 2383;
    const todaysOrders = 240;
    const session = useGetSession();



    return (
        <div className='p-2'>
            <div className="text-center mt-3">
                <h1 className='text-center text-2xl mt-3 text-yellow'>Leo’s Grill Dashboard</h1>
                {/* <p className='text-zinc-400 text-lg'>Welcome to Leo’s Grill Admin panel</p> */}
            </div>
            <div className="grid lg:grid-cols-4 grid-cols-2 gap-4 w-full mt-5">
                {/* cards */}
                <div className="card flex space-x-5 bg-zinc-800">
                    <div className="rounded-md p-2 size-16 flex justify-center items-center bg-opacity-10 bg-yellow">
                        <MoneyIcon className='text-yellow' />
                    </div>
                    <div>
                        <p className='lg:text-3xl text-2xl'>{formatToCurrency(todaysRevenue)}</p>
                        <p className='text-stone-400'>Today's Revenue</p>
                    </div>
                </div>
                <div className="card flex space-x-5 bg-zinc-800">
                    <div className="rounded-md p-2 size-16 flex justify-center items-center bg-opacity-10 bg-green-600">
                        <OrdersIcon className='text-green-600' />
                    </div>
                    <div>
                        <p className='lg:text-3xl text-2xl'>{todaysOrders}</p>
                        <p className='text-stone-400'>Today's Orders</p>
                    </div>
                </div>
                <div className="card flex space-x-5 bg-zinc-800">
                    <div className="rounded-md p-2 size-16 flex justify-center items-center bg-opacity-10 bg-orange">
                        <OrdersIcon className='text-orange' />
                    </div>
                    <div>
                        <p className='lg:text-3xl text-2xl'>{todaysOrders}</p>
                        <p className='text-stone-400'>Avg. daily revenue</p>
                    </div>
                </div>
            </div>
            <div className="mt-7">
                <p className='text-md text-white mb-3'>Orders</p>
                {orders && orders.map((order, index) => (
                    <div key={order.id} className={clsx("mb-3 rounded-2xl  border p-3", {
                        'bg-zinc-800': index == 0,
                    })}>
                        <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                                <div className="text-center w-max mb-2 mx-auto bg-orange rounded-xl px-3">
                                    {order.status}
                                </div>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent>
                                <DropdownMenuLabel>My Account</DropdownMenuLabel>
                                <DropdownMenuSeparator />
                                <DropdownMenuItem>Profile</DropdownMenuItem>
                                <DropdownMenuItem>Billing</DropdownMenuItem>
                                <DropdownMenuItem>Team</DropdownMenuItem>
                                <DropdownMenuItem>Subscription</DropdownMenuItem>
                            </DropdownMenuContent>
                        </DropdownMenu>


                        <div className="flex gap-3">
                            <img src={order.user_informations?.photo || '/images/profile-pic.jpg'} alt="" className='rounded-full size-10 object-cover' />
                            <div className='mt-2 '>
                                <p>{order.user_informations?.firstname + ' ' + order.user_informations?.lastname}</p>
                                <div className="mt-3">
                                    <p className='text-zinc-400 text-sm'>Order details</p>
                                    <div className="mt-2">
                                        {order.order_items && order.order_items.map((orderItem) => (
                                            <div key={orderItem.id} className='grid grid-cols-3 justify-between items-center'>
                                                <div>
                                                    <p>{orderItem.product_name} <span className='text-orange'>x {orderItem.quantity}</span></p>
                                                </div>
                                                <div className='text-center'>. . . . . . . . . </div>
                                                <p>
                                                    {formatToCurrency(orderItem.product_price ?? 0)}
                                                </p>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </div>

                    </div>
                ))}
                {(!orders || orders.length == 0) && (
                    <p className='mt-3 text-zinc-400'>Nothing to show.</p>
                )}
            </div>
        </div>
    )
}

export default Dashboard