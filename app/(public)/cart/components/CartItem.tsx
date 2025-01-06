import { Tables } from '@/app/lib/supabase'
import React from 'react'

type Props = {
    cartItem: Tables<'cart_items'>
}

const CartItem = ({cartItem}:Props) => {
    return (
        <div className="grid grid-cols">
                <div>
                    {cartItem.product_id}
                </div>
        </div>
    )
}

export default CartItem