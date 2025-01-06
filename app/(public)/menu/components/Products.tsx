import { useGetProducts } from '@/app/lib/react-query/queriesAndMutations';
import React from 'react'
import { Tables } from '@/app/lib/supabase';
import ProductComponent from './ProductComponent';

type Props = {
    activeCategory: Tables<'categories'>;
}
const Products = ({activeCategory}:Props) => {
    const {data:products} = useGetProducts(activeCategory.id);

    return (
        <div className="grid xl:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-5">
            {products && products.map((product, index) => (
                <div key={index}>
                    <ProductComponent key={index} product={product} />
                </div>
            ))}
        </div>
    )
}

export default Products