'use client'
import { IProduct } from '@/app/lib/definitions'
import { formatToCurrency } from '@/app/lib/utils'
import { Add } from '@mui/icons-material'
import React, { use, useState } from 'react'
import { addTocart } from '../action'
import { useGetSession } from '@/hooks/use-get-session'
import { toast, useToast } from '@/hooks/use-toast'
import { Tables } from '@/app/lib/supabase'
import { useRouter } from 'next/navigation'
import { useAddCartItem, useGetCartItem, useUpdateCartItem } from "@/app/lib/react-query/queriesAndMutations";

type Props = {
    product: Tables<'products'>
}
const ProductComponent = ({ product }: Props) => {
    const router = useRouter()
    const userSession = useGetSession();
    const [addingToCart, setAddingToCart] = useState(false);
    const { toast } = useToast()
    const { data: existingCartItem, error: errorFetchingCartItem } = useGetCartItem(product.id)
    const { mutateAsync: updateCartItem, isPending: pendingUpdateCartItem } = useUpdateCartItem()
    const { mutateAsync: addCartItem, isPending: pendingAddCartItem } = useAddCartItem()


    console.log('existing cart item: ', existingCartItem)

    const handleAddToCart = async () => {
        if (userSession) {
            let cartItem = {
                product_id: product.id,
                quantity: 1,
                user_id: userSession.user.id
            };
            setAddingToCart(true);
            if (existingCartItem) {
                updateCartItem({
                    ...existingCartItem,
                    quantity: (existingCartItem.quantity ?? 0) + 1
                })
                    .then(res => {
                        toast({
                            title: 'Successfully updated cart'
                        })
                    })
                    .catch(err => {
                        console.error(err);
                        toast({
                            title: 'Oh no something went wrong',
                            description: 'Error occured while adding to cart please try again later!'
                        })
                    })
                    .finally(() => setAddingToCart(false))
            } else {
                addCartItem(cartItem)
                    .then(res => {
                        toast({
                            title: 'Successfully added to cart'
                        })
                    })
                    .catch(err => {
                        console.error(err);
                        toast({
                            title: 'Oh no something went wrong',
                            description: 'Error occured while adding to cart please try again later!'
                        })
                    })
                    .finally(() => setAddingToCart(false))
            }
        } else {
            router.push('/signin')
        }
    }

    return (
        <div className='bg-[#2F2F2F] gap-4 rounded-lg h-full px-5 py-8 flex items-center w-full'>
            <img src={product?.image ?? ''} className=' aspect-square xl:w-[40%] lg:w-[30%] rounded-full object-cover bg-gray-300' alt="" />
            <div className='flex-1'>
                <p className='text-lg'>{product.product_name}</p>
                <p className='text-gray-400'>{product.product_description}</p>
                <p className='mt-3 text-orange text-base'>{formatToCurrency(product.price ?? 0)}</p>

                <button disabled={userSession == null || addingToCart} onClick={handleAddToCart} className='mt-3 ms-auto rounded-full flex items-center justify-center gap-2 p-3 bg-yellow text-black font-medium'>
                    <Add />
                    <span>
                        {addingToCart ? 'Adding to cart...' : 'Add to cart'}
                    </span>
                </button>
            </div>
        </div>
    )
}

export default ProductComponent