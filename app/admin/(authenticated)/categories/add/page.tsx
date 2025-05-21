'use client';
import { AddCategoryFormSchema } from '@/app/lib/definitions';
import { Breadcrumb, BreadcrumbItem, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from '@/components/ui/breadcrumb';
import { zodResolver } from '@hookform/resolvers/zod';
import Link from 'next/link';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Textarea } from '@/components/ui/textarea'
import { toast } from '@/hooks/use-toast'
import ImageUploadDialog from '@/components/ui/image-upload-dialog'
import React, { useState } from 'react'
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { useAddCategory } from '@/app/lib/react-query/queriesAndMutations';
import { useRouter } from 'next/navigation';

const AddCategoryPage = () => {
    const { mutateAsync: addCategory, isPending: isAddingCategory } = useAddCategory();
    const [uploadingImage, setUploadingImage] = useState(false)
    const router = useRouter();


    const form = useForm<z.infer<typeof AddCategoryFormSchema>>({
        resolver: zodResolver(AddCategoryFormSchema),
        defaultValues: {
            category_name: '',
            category_description: '',
            image: ''
        }
    })

    const onSubmit = async (formData: z.infer<typeof AddCategoryFormSchema>) => {
        try {
            const data = await addCategory(formData);
            toast({
                title: 'Successfully added category!'
            })
            router.push("/admin/categories")
        } catch (error) {
            toast({
                title: 'Error adding category please try again later!'
            })
        }

    }

    return (
        <>
            <Breadcrumb className='mb-3'>
                <BreadcrumbList>
                    <BreadcrumbItem>
                        {/* <BreadcrumbLink href="/admin/products">Products</BreadcrumbLink> */}
                        <Link href="/admin/categories">
                            Categories
                        </Link>
                    </BreadcrumbItem>
                    <BreadcrumbSeparator />
                    <BreadcrumbItem>
                        <BreadcrumbPage>Add Category</BreadcrumbPage>
                    </BreadcrumbItem>
                </BreadcrumbList>
            </Breadcrumb>

            <div className="mt-3">
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
                                <p className='text-zinc-400'>Category Details</p>
                                <hr className='my-2' />
                                <div className="mb-4">
                                    <FormField
                                        control={form.control}
                                        name='category_name'
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>Category Name</FormLabel>
                                                <FormControl>
                                                    <Input placeholder='Enter category name' type='text' {...field} />
                                                </FormControl>
                                            </FormItem>
                                        )}
                                    />
                                </div>
                                <div className="mb-6">
                                    <FormField
                                        control={form.control}
                                        name='category_description'
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>Description</FormLabel>
                                                <FormControl>
                                                    <Textarea placeholder='Describe category...' {...field} />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                </div>
                                <Button type='submit' disabled={isAddingCategory} className='p-3 text-dark font-medium bg-yellow rounded text-center w-full'>
                                    {isAddingCategory ? 'Adding category...' : 'Add category'}
                                </Button>
                            </div>
                        </div>
                    </form>
                </Form>
            </div>
        </>
    )
}

export default AddCategoryPage