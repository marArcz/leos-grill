'use client';
import { useState } from 'react';
import { AttachMoney as MoneyIcon, AssignmentInd as OrdersIcon } from '@mui/icons-material';
import { formatToCurrency } from '@/app/lib/utils';
import { useGetSession } from '@/hooks/use-get-session';
import { IOrderListFilter, orderStatusList, OrderWithOrderItems } from '@/app/lib/definitions';
import { useGetActiveOrders, useGetOutForDeliveries, useUpdateOrder } from '@/app/lib/react-query/queriesAndMutations';
import clsx from 'clsx';
import { Button } from '@/components/ui/button';
import { Dialog, DialogClose, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { toast } from '@/hooks/use-toast';

const Dashboard = () => {
    const [page, setPage] = useState(1)
    const { mutateAsync: updateOrder, isPending: isUpdatingOrder } = useUpdateOrder()
    const [filters, setFilters] = useState<IOrderListFilter>({})
    const { data: orders, isPending: isFetchingOrders, refetch: refetchActiveOrders } = useGetActiveOrders();
    const { data: outForDeliveries, isPending: isFetchingOutForDeliveries, refetch: refetchOutForDeliveries } = useGetOutForDeliveries();
    const todaysRevenue = 2383;
    const todaysOrders = 240;
    const session = useGetSession();

    const updateOrderStatus = async (order: OrderWithOrderItems, status: string) => {

        try {
            const { order_items, delivery_informations, user_informations, ...orderDetails } = order
            console.log('updating order: ', orderDetails)
            const data = await updateOrder({
                ...orderDetails,
                status
            })

            console.log(data)

            refetchActiveOrders()

            refetchOutForDeliveries()

            toast({
                title: 'Successfully updated'
            })
        } catch (error) {
            toast({
                title: 'error'
            })
            console.error('Error updating order status: ', error)
        }
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
                                    <Dialog>
                                        <DialogTrigger className='' asChild>
                                            <button type='button' className={clsx(
                                                'bg-orange px-3 rounded-full',
                                                {
                                                    'bg-muted': isUpdatingOrder
                                                })}>{order.status}</button>
                                        </DialogTrigger>
                                        <DialogContent>
                                            <DialogHeader>
                                                <DialogTitle className=''>Update Status</DialogTitle>
                                            </DialogHeader>
                                            <div className="mt-3 space-y-5">
                                                {orderStatusList.map((orderStatus, index) => (
                                                    <DialogClose asChild>
                                                        <Button onClick={() => updateOrderStatus(order, orderStatus)} key={index} type='button' className={clsx('block w-full', {
                                                            'bg-orange': orderStatus.toLowerCase() == order.status?.toLowerCase(),
                                                        })} variant="ghost">{orderStatus}</Button>
                                                    </DialogClose>
                                                ))}
                                            </div>
                                        </DialogContent>
                                    </Dialog>
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
                                                                {/* <div className='border-white border-dotted border-2 p-0'></div> */}
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
                        {outForDeliveries && outForDeliveries.map((order, index) => (
                            <div key={order.id} className={clsx("mb-3 rounded-2xl  border p-3", {
                                'bg-zinc-800': index == 0,
                            })}>
                                <div className="mx-auto text-center">
                                    <Dialog>
                                        <DialogTrigger className='' asChild>
                                            <button type='button' className={clsx(
                                                'bg-orange px-3 rounded-full',
                                                {
                                                    'bg-muted': isUpdatingOrder
                                                })}>{order.status}</button>
                                        </DialogTrigger>
                                        <DialogContent>
                                            <DialogHeader>
                                                <DialogTitle className=''>Update Status</DialogTitle>
                                            </DialogHeader>
                                            <div className="mt-3 space-y-5">
                                                {orderStatusList.map((orderStatus, index) => (
                                                    <DialogClose asChild>
                                                        <Button onClick={() => updateOrderStatus(order, orderStatus)} key={index} type='button' className={clsx('block w-full', {
                                                            'bg-orange': orderStatus.toLowerCase() == order.status?.toLowerCase(),
                                                        })} variant="ghost">{orderStatus}</Button>
                                                    </DialogClose>
                                                ))}
                                            </div>
                                        </DialogContent>
                                    </Dialog>
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
                                                                {/* <div className='border-white border-dotted border-2 p-0'></div> */}
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
                </div>
                {(!orders || orders.length == 0) && (
                    <p className='mt-3 text-zinc-400'>Nothing to show.</p>
                )}
            </div>
        </div>
    )
}

export default Dashboard