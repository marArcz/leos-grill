'use client';

import { useGetCategories, useGetProductById, useUpdateProduct } from '@/app/lib/react-query/queriesAndMutations'
import React, { useState } from 'react'
import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbList,
    BreadcrumbPage,
    BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"
import { UpdateProductFormSchema } from '@/app/lib/definitions';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import ImageUploadDialog from '@/components/ui/image-upload-dialog';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

const UpdateProductPage = ({ params }: { params: { id: string } }) => {
    const [uploadingImage, setUploadingImage] = useState(false)
    const { data: categories, isPending: getCategoriesLoading } = useGetCategories();
    const { data: productDetails } = useGetProductById(Number(params.id));
    const { mutateAsync: updateProduct, isPending: isUpdatingProduct } = useUpdateProduct();

    const form = useForm<z.infer<typeof UpdateProductFormSchema>>({
        resolver: zodResolver(UpdateProductFormSchema),
        defaultValues: {
            product_name: '',
            price: 0,
            image: productDetails?.image ?? '',
            category_id: productDetails?.category_id ?? 0,
            product_description: '',
        }
    })


    const onSubmit = async (formData: z.infer<typeof UpdateProductFormSchema>) => {
        const data = await updateProduct(formData);

    }

    return (
        <>
            <Breadcrumb className='mb-3'>
                <BreadcrumbList>
                    <BreadcrumbItem>
                        <Link href="/admin/products">
                        Products
                        </Link>
                    </BreadcrumbItem>
                    <BreadcrumbSeparator />
                    <BreadcrumbItem>
                        <BreadcrumbPage>Update Product</BreadcrumbPage>
                    </BreadcrumbItem>
                </BreadcrumbList>
            </Breadcrumb>
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)}>
                    <div className="flex space-x-3">
                        <div className='w-2/5'>
                            <img src={form.getValues().image || '/images/placeholder.jpeg'} alt="" className='w-full object-cover rounded-sm' />
                            <button type='button' onClick={() => setUploadingImage(true)} className='btn bg-dark_2 w-full py-3 px-2 mt-2'>Upload Image</button>
                            <ImageUploadDialog
                                onFinishUpload={(publicUrl) => {
                                    form.setValue('image', publicUrl)
                                    setUploadingImage(false);
                                }}
                                bucket='products'
                                isOpen={uploadingImage}
                                handleOnClose={() => setUploadingImage(false)} />
                        </div>
                        <div className=' flex-grow'>
                            <p className='text-zinc-400'>Product Details</p>
                            <hr className='my-2' />
                            <div className="mb-4">
                                <FormField
                                    control={form.control}
                                    name='product_name'
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Name</FormLabel>
                                            <FormControl>
                                                <Input placeholder='Enter product name' type='text' {...field} />
                                            </FormControl>
                                        </FormItem>
                                    )}
                                />
                            </div>
                            <div className="mb-6">
                                <FormField
                                    control={form.control}
                                    name='price'
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Price</FormLabel>
                                            <FormControl>
                                                <Input type="number" placeholder="Enter price" {...field} />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                            </div>
                            <div className="mb-6">
                                <FormField
                                    control={form.control}
                                    name='category_id'
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Category: </FormLabel>
                                            <FormControl>
                                                <Select
                                                    value={String(field.value)}
                                                    onValueChange={(value) => field.onChange(value)}
                                                    disabled={getCategoriesLoading}
                                                >
                                                    <SelectTrigger className="">
                                                        <SelectValue placeholder="Select One" />
                                                    </SelectTrigger>
                                                    <SelectContent>
                                                        {categories && categories.map((category) => (
                                                            <SelectItem value={String(category.id)} key={category.id}>{category.category_name}</SelectItem>
                                                        ))}
                                                    </SelectContent>
                                                </Select>
                                            </FormControl>
                                        </FormItem>
                                    )}
                                />
                            </div>
                            <div className="mb-6">
                                <FormField
                                    control={form.control}
                                    name='product_description'
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Description</FormLabel>
                                            <FormControl>
                                                <Textarea placeholder='Describe product...' {...field} />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                            </div>
                            {/* submit button */}
                            {/* <button className='bg-dark_2 py-2 rounded w-full block btn' type='submit'>Submit</button> */}
                            <Button type='submit' disabled={isUpdatingProduct} className='p-3 text-dark font-medium bg-yellow rounded text-center w-full'>
                                {isUpdatingProduct ? 'Adding product...' : 'Add Product'}
                            </Button>
                        </div>
                    </div>
                </form>
            </Form>
        </>
    )
}

export default UpdateProductPage