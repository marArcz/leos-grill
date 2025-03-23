"use client";

import { DeliveryInformationSchema } from '@/app/lib/definitions'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { zodResolver } from '@hookform/resolvers/zod'
import React, { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import DeliveryInformationForm from '../components/DeliveryInformationForm';
import { useGetAllCartItems, useGetDeliveryInfos } from '@/app/lib/react-query/queriesAndMutations';
import { formatToCurrency } from '@/app/lib/utils';
import Link from 'next/link';
import { useGetSession } from '@/hooks/use-get-session';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import clsx from 'clsx';
import PrimaryBtn from '@/components/ui/primary-button';
import { Pencil, Trash } from 'lucide-react';
import { Button } from '@/components/ui/button';

const CheckoutPage = () => {
    const { data: cartItems } = useGetAllCartItems();
    const [deliveryInfoId, setDeliveryInfoId] = useState<Number | null>(null)
    const [cartTotal, setCartTotal] = useState(0)
    const [deliveryFee, setDeliveryFee] = useState(30);
    const [grandTotal, setGrandTotal] = useState(0)
    const [showDeliveryInfoDialog, setShowDeliveryInfoDialog] = useState(false)
    const session = useGetSession();
    const { data: deliveryInfos, isPending: fetchingDeliveryInfos, refetch: refetchDeliveryInfos } = useGetDeliveryInfos(session?.user.id || null)

    // compute subtotal
    useEffect(() => {
        if (cartItems) {
            console.log('cart items: ', cartItems)
            let total = 0;
            for (let cartItem of cartItems) {
                // console.log('cartitem total: ', (cartItem.quantity) * (cartItem.product?.price ?? 0))
                total += (cartItem.quantity) * (cartItem.product?.price ?? 0)
            }
            setCartTotal(total)
        }
    }, [cartItems])

    useEffect(() => {
        setGrandTotal(cartTotal + deliveryFee)
    }, [cartTotal, deliveryFee])

    const onFinishAddingDeliveryInfo = (refetch = false) => {
        if (refetch) {
            refetchDeliveryInfos();
            setShowDeliveryInfoDialog(false)
        }
    }


    return (
        <div className='wrapper pt-10'>
            <div className="flex gap-8">
                <div className="md:w-1/2 w-full">
                    <h2 className='font-bold text-2xl'>Delivery Information</h2>
                    <div className="mt-5">
                        {fetchingDeliveryInfos ? (
                            <p>Fetching delivery informations...</p>
                        ) : (
                            <div>
                                {/* Display list of delivery info */}
                                {deliveryInfos && deliveryInfos.length > 0 ? (
                                    <>
                                        {deliveryInfos.map((deliveryInfo, index) => (
                                            <div
                                                key={index}
                                                className={clsx("relative p-3 block rounded-md border-stone-700 border mb-2 cursor-pointer", {
                                                    "bg-stone-700 border-stone-500": deliveryInfoId === deliveryInfo.id,
                                                    "hover:bg-stone-800": deliveryInfoId !== deliveryInfo.id,
                                                })}
                                            >
                                                <label
                                                    htmlFor={`deliveryInfo-${index}`}
                                                    className="w-11/12 cursor-pointer"
                                                >
                                                    <p className='font-medium'>{deliveryInfo.firstname} {deliveryInfo.middlename} {deliveryInfo.lastname}</p>
                                                    <p className='text-sm'>{deliveryInfo.street}, {deliveryInfo.city}, {deliveryInfo.barangay}</p>
                                                </label>
                                                <input id={`deliveryInfo-${index}`} type="radio" name='deliveryInfo' className='absolute opacity-0' checked={deliveryInfo.id === deliveryInfoId} value={deliveryInfo.id} onChange={e => setDeliveryInfoId(Number(e.target.value))} />
                                                {/* action buttons */}
                                                {deliveryInfo.id === deliveryInfoId && (
                                                    <div className="actions absolute end-[5px] top-[5px]">
                                                        <Button variant="ghost" className='px-3'>
                                                            <Pencil size={18}/>
                                                        </Button>
                                                        <Button variant="ghost" className='px-3'>
                                                            <Trash size={18}/>
                                                        </Button>
                                                    </div>
                                                )}
                                            </div>
                                        ))}
                                    </>
                                ) : (
                                    <>
                                        <p>Nothing found.</p>
                                        {/* <button className='mt-5 text-yellow underline underline-offset-4'>Add new delivery information</button> */}
                                    </>
                                )}
                                <Dialog open={showDeliveryInfoDialog} onOpenChange={(s) => setShowDeliveryInfoDialog(s)}>
                                    <DialogTrigger asChild>
                                        <button className='mt-5 text-yellow underline underline-offset-4'>Add new delivery information</button>
                                    </DialogTrigger>
                                    <DialogContent>
                                        <DialogHeader>
                                            <DialogTitle>New Delivery Information</DialogTitle>
                                            <DialogDescription>
                                                Enter your delivery information below.
                                            </DialogDescription>
                                        </DialogHeader>
                                        <DeliveryInformationForm onFinish={onFinishAddingDeliveryInfo} />
                                    </DialogContent>
                                </Dialog>
                            </div>
                        )}
                    </div>
                </div>
                <div className='flex-1'>
                    <h2 className='text-2xl font-bold'>Cart Totals</h2>
                    <div className="flex justify-between mt-4">
                        <p className='text-lg'>Subtotal</p>
                        <p>{formatToCurrency(cartTotal)}</p>
                    </div>
                    <div className="flex justify-between mt-4">
                        <p className='text-lg'>Delivery Fee</p>
                        <p>{formatToCurrency(deliveryFee)}</p>
                    </div>
                    <hr className='mt-2' />
                    <div className="flex justify-between mt-2">
                        <p className='text-lg font-medium'>Grand Total</p>
                        <p className='font-medium'>{formatToCurrency(grandTotal)}</p>
                    </div>
                    <div className="mt-14">
                        <Link href="/payment" className='btn bg-orange px-4 py-3 uppercase rounded-md'>Proceed to payment</Link>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default CheckoutPage