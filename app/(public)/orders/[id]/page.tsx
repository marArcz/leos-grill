'use client'
import { useGetOrderDetails } from '@/app/lib/react-query/queriesAndMutations';
import { useSearchParams } from 'next/navigation'
import React from 'react'
import { formatDate } from 'date-fns'
import { formatToCurrency } from '@/app/lib/utils';
import Link from 'next/link';

const OrderDetails = ({ params }: { params: { id: string } }) => {

    const { data: orderDetails, isPending: fetchingOrderDetails } = useGetOrderDetails(params.id);

    console.log('order details: ', orderDetails)
    return (
        <div className='wrapper pt-5'>
            <ul className="flex gap-1">
                <li className='text-xl'>
                    <Link href={'/orders'} className='text-yellow underline underline-offset-4'>Orders</Link>
                </li>
                <li className='text-xl'>/</li>
                <li className='text-xl'>
                    #{orderDetails?.order_number}
                </li>
            </ul>
            <p className='text-base text-stone-500'>Order Details</p>
            <hr className='my-2' />
            {
                fetchingOrderDetails ? (
                    <p>Fetching order details...</p>
                ) : (
                    <>
                        <p className=' mt-3'>Your order has been placed on {formatDate(new Date(orderDetails?.ordered_at ?? ''), 'MMMM dd, yyyy')} and is currently <span className='text-orange'>{orderDetails?.status}.</span></p>
                        <div className="mt-3 border rounded-md p-4">
                            <p className="text-sm text-stone-500">Products</p>
                            {orderDetails?.order_items && orderDetails.order_items.map((orderItem, index) => (
                                <div key={orderDetails.id}>
                                    <div className="mt-2 flex">
                                        <div></div>
                                        <div className='flex w-full items-center'>
                                            <div>
                                                <p className='text-orange text-lg'>{orderItem.product_name}</p>
                                                <p>{formatToCurrency(orderItem.product_price ?? 0)}</p>
                                                <p className='mt-3 text-sm'>Subtotal:</p>
                                                <p className='bg-orange w-min px-2 rounded-md mt-2'>{formatToCurrency((orderItem.product_price ?? 0) * (orderItem.quantity ?? 0))}</p>
                                            </div>
                                            <div className='lg:ms-[50%] ms-auto'>
                                                <p>x{orderItem.quantity}</p>
                                            </div>
                                        </div>
                                    </div>
                                    <hr className='my-3' />
                                </div>
                            ))}
                        </div>
                        <div className="mt-4 border rounded-md p-4">
                            {/* <p className="text-sm text-stone-500">Order details</p> */}
                            <p className='text-lg '>Payment method: <span className='ms-3 font-medium'>{orderDetails?.payment_method == 'cod' ? 'Cash on delivery' : 'Gcash'}</span></p>
                            <p className='text-lg '>Total: <span className='ms-3 text-yellow font-medium'>{formatToCurrency(orderDetails?.total ?? 0)}</span></p>
                        </div>
                    </>
                )
            }
        </div>
    )
}

export default OrderDetails