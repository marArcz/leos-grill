'use client';

import { IOrderListFilter } from '@/app/lib/definitions';
import { useGetAllOrders } from '@/app/lib/react-query/queriesAndMutations';
import React, { useState } from 'react'

const OrdersPage = () => {
    const [page, setPage] = useState(1)
    const [filters, setFilters] = useState<IOrderListFilter>({})
    const { data: orders, isPending: isFetchingOrders } = useGetAllOrders(filters);

    return (
        <>
            <h1 className='text-yellow text-lg'>Orders</h1>
            <div className="mt-3">
                {orders && orders.map((order) => (
                    <div key={order.id} className='border mb-3 p-4'>
                        <p className='text-white font-medium'>#{order.order_number}</p>
                    </div>
                ))}
            </div>
        </>
    )
}

export default OrdersPage