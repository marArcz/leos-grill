'use client';

import { useGetOrders } from '@/app/lib/react-query/queriesAndMutations';
import { Button } from '@/components/ui/button';
import { useGetSession } from '@/hooks/use-get-session';
import Link from 'next/link';
import React from 'react'

const OrdersPage = () => {
  const userSession = useGetSession();
  const { data: orders } = useGetOrders(userSession?.user.id || null);


  return (
    <div className="wrapper pt-10">
      <h2 className='text-2xl font-medium'>Orders</h2>
      <hr className='my-3' />
      <div className="mt-3 space-y-1">
        {orders && orders.map((order, index) => (
          <div className='border p-3 rounded-md' key={order.id}>
            <p className='text-yellow text-sm mb-3'>#{order.order_number}</p>
            <Link className='' href={`/orders/${order.id}`}>
              <Button>
                Track Order
              </Button>
            </Link>
          </div>
        ))}
      </div>
    </div>
  )
}

export default OrdersPage