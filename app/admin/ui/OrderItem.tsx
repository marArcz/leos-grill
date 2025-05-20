import { Tables } from '@/app/lib/supabase'
import React from 'react'

type IProps = {
    itemDetails:Tables<'order_items'>
}
const OrderItem = ({itemDetails}:IProps) => {
  return (
    <div>

    </div>
  )
}

export default OrderItem