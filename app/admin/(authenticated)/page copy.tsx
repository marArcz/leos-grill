'use client';
import { createClient } from '@/utils/supabase/client'
import { User } from '@supabase/supabase-js';
import React, { useEffect, useState } from 'react'
import { AttachMoney as MoneyIcon, AssignmentInd as OrdersIcon, KeyboardArrowDown } from '@mui/icons-material'
import { formatToCurrency } from '@/app/lib/utils';
import { useGetSession } from '@/hooks/use-get-session';
import { IOrderListFilter, orderStatusList, OrderWithOrderItems } from '@/app/lib/definitions';
import { useGetActiveOrders, useGetAllOrders, useUpdateOrder } from '@/app/lib/react-query/queriesAndMutations';
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
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Tables } from '@/app/lib/supabase';
import { toast } from '@/hooks/use-toast';
import UpdateOrderStatusDialog from '../ui/UpdateOrderStatusDialog';

const Dashboard = () => {
    const supabase = createClient();
    const [page, setPage] = useState(1)
    const { mutateAsync: updateOrder, isPending: isUpdatingOrder } = useUpdateOrder()
    const [filters, setFilters] = useState<IOrderListFilter>({})
    const { data: orders, isPending: isFetchingOrders } = useGetActiveOrders();
    const [updatingStatus, setUpdatingStatus] = useState<boolean>(false)
    const [selectedOrder, setSelectedOrder] = useState<OrderWithOrderItems | null>(null)
    const todaysRevenue = 2383;
    const todaysOrders = 240;
    const session = useGetSession();

    const updateOrderStatus = async (order: OrderWithOrderItems, status: string) => {
        try {
            const {order_items, ...orderDetails} = order
            const data = await updateOrder({
                ...orderDetails,
                status
            })

            toast({
                title: 'Successfully updated'
            })
        } catch (error) {
            toast({
                title:'Error order status update',
                variant: 'destructive'
            })
            console.error(error)
        }
    }

    const openUpdateStatusDialog = (order: OrderWithOrderItems) => {
        setSelectedOrder(order)
        setUpdatingStatus(true)
    }

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
                <div className="flex gap-4">
                    <div className='flex-1 mt-3'>
                        <p className='text-yellow mb-3 text-lg'>Active</p>
                        {orders && orders.map((order, index) => (
                            <div key={order.id} className={clsx("mb-3 rounded-2xl  border p-3", {
                                'bg-zinc-800': index == 0,
                            })}>
                                <div className="mx-auto text-center">
                                    <button type='button' onClick={() => openUpdateStatusDialog(order)} className='bg-orange px-3 rounded-full'>{order.status}</button>
                                    <UpdateOrderStatusDialog handleClose={() => setUpdatingStatus(false)} isOpen={updatingStatus} order={order} handleUpdateOrderStatus={updateOrderStatus} />
                                </div>
                                <div className="flex gap-3 w-full ">
                                    <img src={order.user_informations?.photo || '/images/profile-pic.jpg'} alt="" className='rounded-full size-10 object-cover' />
                                    <div className='mt-2 flex-1'>
                                        <p>{order.user_informations?.firstname + ' ' + order.user_informations?.lastname}</p>
                                        <div className="mt-3">
                                            <div className="bg-zinc-900 rounded-lg p-4 w-full">
                                                <p className='text-zinc-400 text-sm'>Order details</p>
                                                <p className='text-sm text-yellow'>#{order.order_number}</p>
                                                <div className="mt-2">
                                                    {order.order_items && order.order_items.map((orderItem) => (
                                                        <div key={orderItem.id} className='grid grid-cols-3 justify-between items-center'>
                                                            <div>
                                                                <p>{orderItem.product_name} <span className='text-orange'>x {orderItem.quantity}</span></p>
                                                            </div>
                                                            <div className=''>
                                                                <hr className='border-dotted border-collapse border-4' />
                                                            </div>
                                                            <p className='text-end'>
                                                                {formatToCurrency(orderItem.product_price ?? 0)}
                                                            </p>
                                                        </div>
                                                    ))}
                                                </div>
                                                <div className="mt-2">
                                                    <p className='text-orange'>Total: {formatToCurrency(order.total ?? 0)}</p>
                                                </div>
                                            </div>

                                            <div className="mt-2">
                                                {order.delivery_informations && (
                                                    <>

                                                    </>
                                                )}
                                            </div>
                                        </div>
                                    </div>
                                </div>

                            </div>
                        ))}
                    </div>
                    <div className="w-1/4">
                        <p className='text-yellow mb-3 text-lg'>Out for delivery</p>
                    </div>
                </div>
                {(!orders || orders.length == 0) && (
                    <p className='mt-3 text-zinc-400'>Nothing to show.</p>
                )}
            </div>
        </div>
    )
}

export default Dashboard