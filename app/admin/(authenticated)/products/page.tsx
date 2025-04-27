'use client';
import React, { useState } from 'react'
import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
import { useGetAllProducts, useGetProducts } from '@/app/lib/react-query/queriesAndMutations'
import { formatToCurrency } from '@/app/lib/utils';
import Link from 'next/link';

const ProductsPage = () => {
    const LIMIT = 10;
    const [page, setPage] = useState(1);
    const { data: products, isPending: fetchingProducts } = useGetAllProducts(page, LIMIT);

    return (
        <>
            <div className="flex">
                <div>
                    <h2 className='text-lg text-yellow'>Products</h2>
                </div>
                <div className="ms-auto">
                    <Link href="/admin/products/add" className='bg-orange px-4 rounded py-1'>
                        Add
                    </Link>
                </div>
            </div>
            <Table>
                {/* <TableCaption>A list of your recent invoices.</TableCaption> */}
                <TableHeader>
                    <TableRow>
                        <TableHead className="">Product</TableHead>
                        <TableHead className='w-[100px]'>Price</TableHead>
                        <TableHead>Category</TableHead>
                        <TableHead className="text-left">Availability</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {products && products.map((product, index) => (
                        <TableRow key={index}>
                            <TableCell>
                                <div className="flex">
                                    <img src={product.image ?? ''} alt="" />
                                    <span>{product.product_name}</span>
                                </div>
                            </TableCell>
                            <TableCell>{formatToCurrency(product.price || 0)}</TableCell>
                            <TableCell>{product.id}</TableCell>
                            <TableCell className='text-left'>{product.is_available ? 'Available' : 'Not Available'}</TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>

        </>
    )
}

export default ProductsPage