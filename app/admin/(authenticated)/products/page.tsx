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
import { useDeleteProduct, useGetAllProducts, useGetProducts, useUpdateProduct } from '@/app/lib/react-query/queriesAndMutations'
import { formatToCurrency } from '@/app/lib/utils';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { toast } from '@/hooks/use-toast';

const ProductsPage = () => {
    const LIMIT = 10;
    const [page, setPage] = useState(1);
    const { data: products, isPending: isFetchingProducts, refetch:refetchProducts } = useGetAllProducts(page, LIMIT);

    const { mutateAsync: deleteProduct, isPending: isDeletingProduct } = useDeleteProduct();

    const handleDeleteProduct = async (id: number) => {
        try {
            await deleteProduct(id);
            toast({
                title: 'Successfully deleted!'
            })
            refetchProducts()
        } catch (error) {
            toast({
                title: 'Something went wrong please try again later!',
                variant: 'destructive'
            })
            console.error(error)
        }
    }

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
                        <TableHead className="w-2/5">Product</TableHead>
                        <TableHead className='w-[120px]'>Price</TableHead>
                        <TableHead>Category</TableHead>
                        <TableHead className="text-left">Availability</TableHead>
                        <TableHead className="text-left">Action</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {products && products.map((product, index) => (
                        <TableRow key={index}>
                            <TableCell>
                                <div className="flex items-center gap-4">
                                    <img className='lg:w-2/5 rounded' src={product.image ?? ''} alt="" />
                                    <span>{product.product_name}</span>
                                </div>
                            </TableCell>
                            <TableCell>{formatToCurrency(product.price || 0)}</TableCell>
                            <TableCell>{product.category?.category_name}</TableCell>
                            <TableCell className='text-left'>{product.is_available ? 'Available' : 'Not Available'}</TableCell>
                            <TableCell>
                                <div className="flex gap-2">
                                    <Button disabled={isDeletingProduct} type='button'>
                                        <Link href={`/admin/products/edit/${product.id}`}>
                                            Edit
                                        </Link>
                                    </Button>

                                    <Button disabled={isDeletingProduct} onClick={() => handleDeleteProduct(product.id)} type='button'>Delete</Button>
                                </div>
                            </TableCell>
                        </TableRow>
                    ))}
                    {isFetchingProducts && (
                        <TableRow>
                            <TableCell colSpan={5} className='text-center'>
                                Fetching products please wait...
                            </TableCell>
                        </TableRow>
                    )}
                </TableBody>
            </Table>
            <div className="flex items-center justify-center gap-4 mt-6">
                <button
                    onClick={() => setPage((p) => Math.max(p - 1, 1))}
                    disabled={page === 1}
                    className={`px-4 py-2 rounded ${page === 1 ? 'bg-gray-300 text-gray-500 cursor-not-allowed' : 'bg-blue-500 text-white hover:bg-blue-600'
                        }`}
                >
                    Previous
                </button>
                <span className="text-sm font-medium text-gray-700">Page {page}</span>
                <button
                    onClick={() => setPage((p) => p + 1)}
                    disabled={(products?.length || 0) < LIMIT}
                    className={`px-4 py-2 rounded ${(products?.length || 0) < LIMIT ? 'bg-gray-300 text-gray-500 cursor-not-allowed' : 'bg-blue-500 text-white hover:bg-blue-600'
                        }`}
                >
                    Next
                </button>
            </div>
        </>
    )
}

export default ProductsPage