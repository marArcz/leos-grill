"use client";

import { useGetCartItems, useRemoveCartItem, useUpdateCartItem } from '@/app/lib/react-query/queriesAndMutations';
import { Tables } from '@/app/lib/supabase';
import { formatToCurrency } from '@/app/lib/utils';
import { Button } from '@/components/ui/button';
import { useGetSession } from '@/hooks/use-get-session';
import { toast } from '@/hooks/use-toast';
import { Add, ShoppingBag, Remove, Close } from '@mui/icons-material'
import Link from 'next/link';
import React, { useState } from 'react'

const CartPage = () => {
    const rowsPerPage = 10;
    const userSession = useGetSession();
    const [paginationIndex, setPaginationIndex] = useState(0);
    const { data: cartItems, isPending: isGettingCartItems, isError: isErrorCartItems, refetch: refetchCartItems } = useGetCartItems(userSession?.user.id ?? '', rowsPerPage, paginationIndex)
    const { mutateAsync: updateCartItem, isPending: isLoadingUpdateCartItem } = useUpdateCartItem();
    const { mutateAsync: removeCartItem, isPending: isLoadingRemoveCartItem } = useRemoveCartItem();

    const getTotal = () => {
        if (cartItems) {
            let total = 0;
            for (const item of cartItems) {
                total += (item.product?.price ?? 0) * (item.quantity ?? 0)
            }
            return total;
        }
        return 0;
    }
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

    const onRemoveItem = async (id: number) => {
        await removeCartItem(id)
        toast({ title: 'Successfully removed!' });
        refetchCartItems();
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
                                    <div key={cartItem.id} className='grid grid-cols-6 items-center gap-3 border-b pb-3'>
                                        <div className='flex items-center gap-4 col-span-2'>
                                            <img src={cartItem.product?.image ?? ''} className='size-20 object-cover' alt="" />
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
                                            <p>{formatToCurrency((cartItem.product?.price || 0) * (cartItem.quantity ?? 0))}</p>
                                        </div>
                                        <div>
                                            <button className='' onClick={() => onRemoveItem(cartItem.id)}>
                                                <Close />
                                            </button>
                                        </div>
                                    </div>
                                ))}
                            </div>
                            <div className="mt-8">
                                <h4 className='text-2xl font-bold'>Cart Totals</h4>
                                <div className="mt-3 text-lg flex w-1/3 justify-between">
                                    <p className='text-yellow font-medium'>Total</p>
                                    <p className='text-yellow font-medium'>{formatToCurrency(getTotal())}</p>
                                </div>
                                <div className="mt-8">
                                    <Link href="/checkout" className='btn bg-orange px-4 py-3 uppercase rounded-md'>Proceed to checkout</Link>
                                </div>
                            </div>
                        </>
                    ) : (
                        <>
                            <div className="text-center mt-4">
                                <p className='text-gray-400 text-xl'>Your cart is empty.</p>
                            </div>
                        </>
                    )}
                </>
            )}
        </section>
    )
}

export default CartPage