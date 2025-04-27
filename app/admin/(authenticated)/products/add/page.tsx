'use client'
import { AddProductFormSchema, SigninFormSchema } from '@/app/lib/definitions'
import { Form, FormControl, FormField, FormItem, FormLabel } from '@/components/ui/form'
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

const AddProductPage = () => {
    const [uploadingImage, setUploadingImage] = useState(false)
    const form = useForm<z.infer<typeof AddProductFormSchema>>({
        resolver: zodResolver(AddProductFormSchema),
        defaultValues: {
            name: '',
            price: 0,
            image: '',
            quantity: 1,
            categoryId: 0
        }
    })

    const onSubmit = async (formData: z.infer<typeof AddProductFormSchema>) => {

    }

    return (
        <div className='p-3'>
            <div className="flex">

            </div>
            {/* <hr className='my-3' /> */}
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)}>
                    <div className="flex space-x-3">
                        <div className='w-2/5'>
                            <img src="/images/placeholder.jpeg" alt="" className='w-full object-cover rounded-sm' />
                            <button onClick={() => setUploadingImage(true)} className='btn bg-dark_2 w-full py-3 px-2 mt-2'>Upload Image</button>
                            <ImageUploadDialog isOpen={uploadingImage} handleOnClose={() => setUploadingImage(false)}/>
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
                                                <Input placeholder='Price' type='number' {...field} />
                                            </FormControl>
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
                                            <FormLabel>Category</FormLabel>
                                            <FormControl>
                                                <Select>
                                                    <SelectTrigger className="">
                                                        <SelectValue placeholder="Theme" />
                                                    </SelectTrigger>
                                                    <SelectContent>
                                                        <SelectItem value="light">Light</SelectItem>
                                                        <SelectItem value="dark">Dark</SelectItem>
                                                        <SelectItem value="system">System</SelectItem>
                                                    </SelectContent>
                                                </Select>
                                            </FormControl>
                                        </FormItem>
                                    )}
                                />
                            </div>
                        </div>
                    </div>
                </form>
            </Form>
        </div>
    )
}

export default AddProductPage