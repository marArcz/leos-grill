import { IProduct } from '@/app/lib/definitions'
import { formatToCurrency } from '@/app/lib/utils'
import { Add } from '@mui/icons-material'
import React, { use, useState } from 'react'
import { addTocart } from '../action'
import { useGetSession } from '@/hooks/use-get-session'
import { toast, useToast } from '@/hooks/use-toast'
import { Tables } from '@/app/lib/supabase'
import { useRouter } from 'next/navigation'

type Props = {
    product: Tables<'products'>
}
const ProductComponent = ({ product }: Props) => {
    const router = useRouter()
    const userSession = useGetSession();
    const [addingToCart, setAddingToCart] = useState(false);
    const { toast } = useToast()

    const handleAddToCart = () => {
        if (userSession) {
            setAddingToCart(true);
            addTocart({
                product_id: product.id,
                quantity: 1,
                user_id: userSession.user.id
            })
            .then(res => {
                toast({
                    title:'Successfully added to cart'
                })
            })
            .catch(err => {
                console.error(err);
                toast({
                    title:'Oh no something went wrong',
                    description:'Error occured while adding to cart please try again later!'
                })
            })
            .finally(() => setAddingToCart(false))
        }else{
            router.push('/signin')
        }
    }

    return (
        <div className='bg-[#2F2F2F] gap-4 rounded-lg h-full px-5 py-8 flex items-center w-full'>
            <img src="" className=' aspect-square xl:w-[40%] lg:w-[30%] rounded-full object-cover bg-gray-300' alt="" />
            <div className='flex-1'>
                <p className='text-lg'>{product.product_name}</p>
                <p className='text-gray-400'>{product.product_description}</p>
                <p className='mt-3 text-orange text-base'>{formatToCurrency(product.price ?? 0)}</p>

                <button disabled={userSession == null || addingToCart} onClick={handleAddToCart} className='mt-3 ms-auto rounded-full flex items-center justify-center gap-2 p-3 bg-yellow text-black font-medium'>
                    <Add />
                    <span>
                        {addingToCart? 'Adding to cart...':'Add to cart'}
                    </span>
                </button>
            </div>
        </div>
    )
}

export default ProductComponent