"use client";

import { fetchCart } from '@/app/lib/data';
import { CartItemWithProduct } from '@/app/lib/definitions';
import { useGetCartItems, useRemoveCartItem, useUpdateCartItem } from '@/app/lib/react-query/queriesAndMutations';
import { Tables } from '@/app/lib/supabase';
import { formatToCurrency } from '@/app/lib/utils';
import { Button } from '@/components/ui/button';
import { toast } from '@/hooks/use-toast';
import { Add, ShoppingBag, Remove, Delete, Close } from '@mui/icons-material'
import React, { useEffect, useState } from 'react'

const CartPage = () => {
    const rowsPerPage = 10;
    const [paginationIndex, setPaginationIndex] = useState(0);
    const { data: cartItems, isPending: isGettingCartItems, isError: isErrorCartItems, refetch: refetchCartItems } = useGetCartItems(rowsPerPage, paginationIndex)
    const { mutateAsync: updateCartItem, isPending: isLoadingUpdateCartItem } = useUpdateCartItem();
    const { mutateAsync: removeCartItem, isPending: isLoadingRemoveCartItem } = useRemoveCartItem();

    const updateQuantity = async (cartItem: Tables<'cart_items'>, action = 'up') => {
        let item;
        if (action == 'up') {
            item = { ...cartItem, quantity: (cartItem.quantity || 1) + 1 };
        } else {
            item = { ...cartItem, quantity: (cartItem.quantity || 1) - 1 };
        }

        const updatedCartItem = await updateCartItem(item);

        if (!updatedCartItem) {
            toast({ title: 'Please try again later!' })
        } else {
            toast({ title: 'Success!' })
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
                    <div className="grid grid-cols-6 mb-3 items-center gap-3">
                        <div className='col-span-2'>Item</div>
                        <div>Price</div>
                        <div>Quantity</div>
                        <div>Total</div>
                        <div>Remove</div>
                    </div>
                    {cartItems && cartItems.length > 0 ? (
                        <>
                            <div className='space-y-3'>
                                {cartItems.map((cartItem, index) => (
                                    <div className='grid grid-cols-6 items-center gap-3 border-b pb-3'>
                                        <div className='flex items-center gap-4 col-span-2'>
                                            <img src="/images/hero-bg.jpg" className='size-20 object-cover' alt="" />
                                            <p className=''>{cartItem.product?.product_name}</p>
                                        </div>
                                        <div>
                                            <p className=''>{formatToCurrency(cartItem.product?.price ?? 0)}</p>
                                        </div>
                                        <div className='flex '>
                                            <Button disabled={isLoadingUpdateCartItem} onClick={() => updateQuantity(cartItem, 'up')} className='text-sm rounded-full p-3 w-3 h-3'><Add /></Button>
                                            <span className='mx-5 text-xl'>{cartItem.quantity}</span>
                                            <Button disabled={isLoadingUpdateCartItem} onClick={() => updateQuantity(cartItem, 'down')} className='text-sm rounded-full p-3 w-3 h-3'><Remove /></Button>
                                        </div>
                                        <div>
                                            <p>{formatToCurrency((cartItem.product?.price || 0) * (cartItem.quantity))}</p>
                                        </div>
                                        <div>
                                            <button className=''>
                                                <Close />
                                            </button>
                                        </div>
                                    </div>
                                ))}
                            </div>
                            <div className="mt-8">
                                <h4 className='text-2xl font-bold'>Cart Totals</h4>
                            </div>
                        </>
                    ) : (
                        <p>Cart is empty.</p>
                    )}
                </>
            )}
        </section>
    )
}

export default CartPage