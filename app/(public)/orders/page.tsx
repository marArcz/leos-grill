'use client';

import { useGetOrders } from '@/app/lib/react-query/queriesAndMutations';
import { formatToCurrency } from '@/app/lib/utils';
import { Button } from '@/components/ui/button';
import { useGetSession } from '@/hooks/use-get-session';
import Link from 'next/link';
import React from 'react'

const OrdersPage = () => {
    const userSession = useGetSession();
    // const [orders, setOrders] = useState<Tables<'orders'>[]>([])
    const { data: orders } = useGetOrders(userSession?.user.id || null);

    return (
        <div className="wrapper pt-10">
            <h2 className='text-2xl font-medium'>Orders</h2>
            <hr className='my-3' />
            <div className="mt-3 space-y-1">
                {orders && orders.map((order, index) => (
                    <div className='border p-3 rounded-md' key={order.id}>
                        <p className='text-yellow text-sm mb-3'>#{order.order_number}</p>
                        <p className='mb-3'>Order details</p>
                        {order.order_items && order.order_items.map((orderItem, index) => (
                            <>
                                <div className="flex gap-3 w-full ">
                                    <img src={order.user_informations?.photo || '/images/profile-pic.jpg'} alt="" className='rounded-full size-10 object-cover' />
                                    <div className='mt-2 flex-1'>
                                        <p>{order.user_informations?.firstname + ' ' + order.user_informations?.lastname}</p>
                                    </div>
                                </div>
                                <div className="mt-3">
                                    <div className="bg-zinc-900 rounded-lg p-4 w-full">
                                        <div className="flex">
                                            <div>
                                                <p className='text-zinc-400 text-sm'>Order details</p>
                                                <p className='text-sm text-yellow'>#{order.order_number}</p>
                                            </div>
                                            <div className="ms-auto text-yellow">{order.status}</div>
                                        </div>
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

                                    {/* <div className="mt-2 mb-3">
                                        {order.delivery_informations && (
                                            <div>
                                                <span>{order.delivery_informations.barangay}</span>
                                                <span>{order.delivery_informations.street}</span>
                                            </div>
                                        )}
                                    </div> */}
                                </div>
                            </>
                        ))}
                        <Link className='mt-3 ' href={`/orders/${order.id}`}>
                            <Button className='bg-yellow'>
                                View Order
                            </Button>
                        </Link>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default OrdersPage