"use client";

import { fetchCart } from '@/app/lib/data';
import { CartItemWithProduct } from '@/app/lib/definitions';
import { useGetCartItems, useRemoveCartItem, useUpdateCartItem } from '@/app/lib/react-query/queriesAndMutations';
import { Tables } from '@/app/lib/supabase';
import { Button } from '@/components/ui/button';
import { toast } from '@/hooks/use-toast';
import { Add, ShoppingBag, Remove, Delete } from '@mui/icons-material'
import React, { useEffect, useState } from 'react'

const CartPage = () => {
    const rowsPerPage = 10;
    const [paginationIndex, setPaginationIndex] = useState(0);
    const { data: cartItems, isPending: isGettingCartItems, isError: isErrorCartItems, refetch:refetchCartItems } = useGetCartItems(rowsPerPage, paginationIndex)
    const { mutateAsync: updateCartItem, isPending: isLoadingUpdateCartItem } = useUpdateCartItem();
    const { mutateAsync: removeCartItem, isPending: isLoadingRemoveCartItem } = useRemoveCartItem();

    const updateQuantity = async(cartItem: Tables<'cart_items'>, action='up') => {
        let item;
        if(action == 'up'){
            item = {...cartItem, quantity: (cartItem.quantity || 1) + 1};
        }else{
            item = {...cartItem, quantity: (cartItem.quantity || 1) - 1};
        }

        const updatedCartItem = await updateCartItem(item);

        if(!updatedCartItem) {
            toast({title:'Please try again later!'})
        }else{
            toast({title:'Success!'})
            refetchCartItems()
        }
    }   

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
                            <table className=' table w-full justify-start text-center'>
                                <thead>
                                    <tr className='text-start justify-start'>
                                        <th>Product</th>
                                        <th>Price</th>
                                        <th>Quantity</th>
                                        <th>Sub Total</th>
                                        <th>Action</th>
                                    </tr>
                                </thead>
                                <tbody className=''>
                                    {cartItems.map((cartItem, index) => (
                                        <tr key={cartItem.id}>
                                            <td>{cartItem.product?.product_name}</td>
                                            <td>{cartItem.product?.price}</td>
                                            <td>
                                                <Button disabled={isLoadingUpdateCartItem} onClick={() => updateQuantity(cartItem, 'up')} className='text-sm rounded-full p-3 w-3 h-3'><Add /></Button>
                                                <span className='mx-5 text-xl'>{cartItem.quantity}</span>
                                                <Button disabled={isLoadingUpdateCartItem} onClick={() => updateQuantity(cartItem, 'down')} className='text-sm rounded-full p-3 w-3 h-3'><Remove /></Button>
                                            </td>
                                            <td>{(cartItem.product?.price || 0) * (cartItem.quantity || 0)}</td>
                                            <td className='flex gap-1 justify-center'>
                                                <Button onClick={() => removeCartItem(cartItem.id)} variant={'destructive'}><Delete className='' /></Button>
                                            </td>
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