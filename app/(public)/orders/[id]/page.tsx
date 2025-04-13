'use client'
import { useGetOrderDetails } from '@/app/lib/react-query/queriesAndMutations';
import { useSearchParams } from 'next/navigation'
import React from 'react'
import { formatDate } from 'date-fns'

const OrderDetails = ({ params }: { params: { id: string } }) => {

    const { data: orderDetails, isPending: fetchingOrderDetails } = useGetOrderDetails(params.id);

    console.log('order details: ', orderDetails)
    return (
        <div className='wrapper pt-5'>
            <h1 className='text-2xl'>Order <span className='text-yellow'>#{orderDetails?.order_number} </span></h1>
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
                            {orderDetails?.items && orderDetails.items.map((orderItem, index) => (
                                <div className="mt-2 flex">
                                    <div></div>
                                    <div>
                                        <p>Product Name: <span>{orderItem.product_name}</span></p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </>
                )
            }
        </div>
    )
}

export default OrderDetails