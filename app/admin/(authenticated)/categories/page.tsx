'use client';

import { useDeleteCategory, useGetCategories } from '@/app/lib/react-query/queriesAndMutations'
import { Button } from '@/components/ui/button';
import { Table, TableCell, TableHead, TableHeader } from '@/components/ui/table';
import { toast } from '@/hooks/use-toast';
import { TableBody, TableRow } from '@mui/material';
import Link from 'next/link'
import React from 'react'

const CategoriesPage = () => {
    const { data: categories, isPending: isFetchingCategories } = useGetCategories();
    const { mutateAsync: deleteCategory, isPending: isDeletingCategory } = useDeleteCategory();
    
    const handleDeleteCategory = async (id: number) => {
        try {
            await deleteCategory(id);
            toast({
                title: 'Successfully deleted category!'
            })
        } catch (error) {
            console.error(error);
            toast({
                title: 'Error: ' + error
            })
        }
    }

    return (
        <>
            <div className="flex">
                <div>
                    <h2 className='text-lg text-yellow'>Categories</h2>
                </div>
                <div className="ms-auto">
                    <Link href="/admin/categories/add" className='bg-orange px-4 rounded py-1'>
                        Add
                    </Link>
                </div>
            </div>
            <Table>
                <TableHeader>
                    <TableRow>
                        <TableHead className='w-1/5'>Image</TableHead>
                        <TableHead>Category</TableHead>
                        <TableHead>Action</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {categories && categories.map((category, index) => (
                        <TableRow key={category.id}>
                            <TableCell>
                                <img src={category.image ?? ''} className='w-full rounded' alt="" />
                            </TableCell>
                            <TableCell>
                                {category.category_name}
                            </TableCell>
                            <TableCell>
                                <div className="flex gap-2">
                                    <Button disabled={isDeletingCategory} type='button'>
                                        <Link href={`/admin/categories/edit/${category.id}`}>
                                            Edit
                                        </Link>
                                    </Button>

                                    <Button disabled={isDeletingCategory} onClick={() => handleDeleteCategory(category.id)} type='button'>Delete</Button>
                                </div>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </>
    )
}

export default CategoriesPage