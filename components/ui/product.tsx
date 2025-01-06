import { IProduct } from '@/app/lib/definitions'
import { formatToCurrency } from '@/app/lib/utils'
import React from 'react'

type Props = {
    product: IProduct
}
const ProductComponent = ({ product }: Props) => {
    return (
        <div className="text-center">
            <img src="" className="w-3/4 bg-gray-300 mx-auto aspect-square object-cover rounded-lg" alt="" />
            <p className="mt-3">{product.name}</p>
            <p className='text-secondary'>{formatToCurrency(product.price)}</p>
        </div>
    )
}

export default ProductComponent