'use client'
import { AddProductFormSchema, SigninFormSchema } from '@/app/lib/definitions'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbList,
    BreadcrumbPage,
    BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"

import { zodResolver } from '@hookform/resolvers/zod'
import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { Button } from '@/components/ui/button'
import ImageUploadDialog from '@/components/ui/image-upload-dialog'
import { useAddProduct, useGetCategories } from '@/app/lib/react-query/queriesAndMutations'

const AddProductPage = () => {
    const [uploadingImage, setUploadingImage] = useState(false)
    const { mutateAsync: addProduct, isPending: addProductLoading } = useAddProduct();
    const { data: categories, isPending: getCategoriesLoading } = useGetCategories();

    const form = useForm<z.infer<typeof AddProductFormSchema>>({
        resolver: zodResolver(AddProductFormSchema),
        defaultValues: {
            name: '',
            price: 0,
            image: '',
            quantity: 1,
            categoryId: ''
        }
    })

    const onSubmit = async (formData: z.infer<typeof AddProductFormSchema>) => {
        const data = await addProduct(formData);

    }

    return (
        <div className='p-3 relative'>
            {/* <div className="absolute top-[50%] translate-y-[-50%] left-[50%] translate-x-[-50%] bg-zinc-600 bg-opacity-60 flex items-center justify-center p-5">
                <div>
                    <span>Adding</span>
                </div>
            </div> */}
            <div className="flex">

            </div>
            {/* <hr className='my-3' /> */}
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
                                    name='name'
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Name</FormLabel>
                                            <FormControl>
                                                <Input placeholder='Name' type='text' {...field} />
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
                                    name='quantity'
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Quantity</FormLabel>
                                            <FormControl>
                                                <Input placeholder='Quantity' type='number' {...field} />
                                            </FormControl>
                                        </FormItem>
                                    )}
                                />
                            </div>
                            <div className="mb-6">
                                <FormField
                                    control={form.control}
                                    name='categoryId'
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
                            {/* submit button */}
                            {/* <button className='bg-dark_2 py-2 rounded w-full block btn' type='submit'>Submit</button> */}
                            <Button type='submit' disabled={addProductLoading} className='p-3 text-dark font-medium bg-yellow rounded text-center w-full'>
                                {addProductLoading ? 'Adding product...' : 'Add Product'}
                            </Button>
                        </div>
                    </div>
                </form>
            </Form>
        </div>
    )
}

export default AddProductPage