"use client";

import { fetchCart } from '@/app/lib/data';
import { useGetCartItems } from '@/app/lib/react-query/queriesAndMutations';
import { Tables } from '@/app/lib/supabase';
import { Button } from '@/components/ui/button';
import { ShoppingBag } from '@mui/icons-material'
import React, { useEffect, useState } from 'react'

const CartPage = () => {
  const rowsPerPage = 10;
  const [paginationIndex, setPaginationIndex] = useState(0);
  const { data: cartItems, isPending: isGettingCartItems, isError: isErrorCartItems } = useGetCartItems(rowsPerPage, paginationIndex)

  return (
    <section className="py-8 wrapper">
      <h3 className='text-2xl text-yellow flex gap-2 items-center'>
        <ShoppingBag />
        <span>My Cart</span>
      </h3>
      <hr className='my-3' />
      {isGettingCartItems ? (
        <p>Fetching cart data...</p>
      ) : (
        <>
          {cartItems && cartItems.length > 0 ? (
            <div>
              <table className=' table w-full'>
                <thead>
                    <th>#</th>
                    <th>Product</th>
                    <th>Price</th>
                    <th>Quantity</th>
                    <th>Sub Total</th>
                    <th>Action</th>
                </thead>
                <tbody>
                  {cartItems.map((cartItem, index) => (
                    <tr key={cartItem.id}>
                      <th>{index + 1}</th>
                      <th>{cartItem.product?.product_name}</th>
                      <th>{cartItem.product?.price}</th>
                      <th>{cartItem.quantity}</th>
                      <th>{cartItem.quantity || 0 * (cartItem.product?.price || 0)}</th>
                      <th>
                        <Button>Remove</Button>
                      </th>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <p>Cart is empty.</p>
          )}
        </>
      )}
    </section>
  )
}

export default CartPage