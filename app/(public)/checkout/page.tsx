"use client";

import React, { useEffect, useState } from 'react'
import DeliveryInformationForm from '../components/DeliveryInformationForm';
import { useCreateOrder, useGetAllCartItems, useGetDeliveryInfos } from '@/app/lib/react-query/queriesAndMutations';
import { formatToCurrency, generateOrderNumber } from '@/app/lib/utils';
import { useGetSession } from '@/hooks/use-get-session';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import clsx from 'clsx';
import { Pencil, Trash } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';
import { useRouter } from 'next/navigation';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { OrderStatus } from '@/app/lib/order-status';

const CheckoutPage = () => {
    const [deliveryInfoId, setDeliveryInfoId] = useState<number | null>(null)
    const [cartTotal, setCartTotal] = useState(0)
    const [deliveryFee, setDeliveryFee] = useState(30);
    const [paymentMethod, setPaymentMethod] = useState<string>('cod');
    const [grandTotal, setGrandTotal] = useState(0)
    const [showDeliveryInfoDialog, setShowDeliveryInfoDialog] = useState(false)
    const session = useGetSession();
    const { data: deliveryInfos, isPending: fetchingDeliveryInfos, refetch: refetchDeliveryInfos } = useGetDeliveryInfos(session?.user.id || null)
    const {mutateAsync:createOrder, isPending:isCreatingOrder} = useCreateOrder();
    const { toast } = useToast();
    const { data: cartItems } = useGetAllCartItems(session?.user.id ?? null);

    const router = useRouter()
    // compute subtotal
    useEffect(() => {
        if (cartItems) {
            console.log('cart items: ', cartItems)
            let total = 0;
            for (let cartItem of cartItems) {
                total += (cartItem.quantity ?? 0) * (cartItem.product?.price ?? 0)
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

    const onProceed = async () => {
        if (!deliveryInfoId) {
            toast({
                title: 'Please select your delivery information'
            })
        }
        else if (!paymentMethod) {
            toast({
                title: 'Please select your payment method'
            })
        }
        else {
            // on proceed
            if (session?.user_information) {
                try {
                    console.log('creating order 1')
                    const data = await createOrder({
                        order_number: generateOrderNumber(),
                        account_id:session.user.id,
                        user_id: session.user_information.id,
                        status: OrderStatus.Pending,
                        is_cancelled: false,
                        total: grandTotal,
                        payment_method: paymentMethod,
                        ordered_at: (new Date()).toDateString(),
                        delivery_information_id: deliveryInfoId
                    })
                    if (data) {
                        toast({
                            title: 'Successfully placed order!'
                        })
                        if (paymentMethod == 'cod') {
                            router.push(`/orders/${data.id}`)
                        } else {
                            router.push(`/payment?deliveryInfo=${deliveryInfoId}`)
                        }
                    }else{
                        console.log('not created: ', data)
                        toast({
                            variant: 'destructive',
                            title: 'Oh no something went wrong your order can\'t be created!'
                        })
                    }
                } catch (error) {
                    console.log('Error in creating order: ', error)
                    toast({
                        variant: 'destructive',
                        title: 'Oh no something went wrong please try again later!'
                    })
                }
            }else{
                toast({
                    variant: 'destructive',
                    title: 'You are not signed in!'
                })
            }
        }
    }


    return (
        <div className='wrapper pt-10'>
            <div className="flex lg:flex-row flex-col gap-8">
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
                                                            <Pencil size={18} />
                                                        </Button>
                                                        <Button variant="ghost" className='px-3'>
                                                            <Trash size={18} />
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
                    <hr className='my-3' />
                    <h2 className="text-2xl font-medium">Payment Method</h2>
                    <div className="mt-7">
                        <RadioGroup value={paymentMethod} onValueChange={v => setPaymentMethod(v)} className='space-y-4'>
                            <div className="flex items-center space-x-2">
                                <RadioGroupItem value="cod" id="r1" />
                                <Label className='text-lg' htmlFor="r1">Cash on delivery</Label>
                            </div>
                            <div className="flex items-center space-x-2">
                                <RadioGroupItem value="gcash" id="r2" />
                                <Label className='text-lg' htmlFor="r2">GCash</Label>
                            </div>
                        </RadioGroup>
                    </div>
                    <div className="mt-14">
                        <button type='button' disabled={isCreatingOrder} onClick={onProceed} className='btn bg-orange px-4 py-3 uppercase rounded-md'>
                            {isCreatingOrder?'Please wait...':'Proceed to payment'}
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default CheckoutPage