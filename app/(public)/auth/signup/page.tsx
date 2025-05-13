"use client"
import { SignupFormSchema } from '@/app/lib/definitions'
import { koulen } from '@/app/ui/fonts'
import Link from 'next/link'
import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { zodResolver } from "@hookform/resolvers/zod"

import { Button } from "@/components/ui/button"
import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { createClient } from '@/utils/supabase/client'
import { createAccount } from './action'
import { AuthError } from '@supabase/supabase-js'
import { useRouter } from 'next/navigation'
import { Info } from '@mui/icons-material'

const SignUpPage = () => {
    const [isCreatingAccount, setIsCreatingAccount] = useState(false);
    const [error, setError] = useState<AuthError | null>(null)
    const router = useRouter();

    const form = useForm<z.infer<typeof SignupFormSchema>>({
        resolver: zodResolver(SignupFormSchema),
        defaultValues: {
            firstname: '',
            lastname: '',
            email: '',
            phone: '',
            password: '',
            confirmPassword: ''
        }
    })

    const onSubmit = async (data: z.infer<typeof SignupFormSchema>) => {
        try {
            setIsCreatingAccount(true)
            await createAccount(data)
            setIsCreatingAccount(false)
            router.push('/');
        } catch (error) {
            setError(error as AuthError);
            setIsCreatingAccount(false)
        }
    }

    return (
        <section className="wrapper py-10">
            <div className="mx-auto xl:w-[50%] md:w-[60%] w-full p-4">
                <div className="text-center">
                    <h4 className=' text-2xl text-center' style={koulen.style}>Sign up to Leo’s Grill</h4>
                    <p className='mt-2 text-yellow'>Create your account</p>
                </div>
                <div className="mt-4">
                    <Form {...form}>
                        <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-6'>
                            {error && (
                                <div className='bg-red-300 p-3 rounded text-red-800'>
                                    <p className='flex gap-2'>
                                        <Info />
                                        <span>{error.message}</span>
                                    </p>
                                </div>
                            )}
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                                <FormField
                                    control={form.control}
                                    name="firstname"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Firstname</FormLabel>
                                            <FormControl>
                                                <Input placeholder="Firstname" {...field} />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                                <FormField
                                    control={form.control}
                                    name="lastname"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Lastname</FormLabel>
                                            <FormControl>
                                                <Input placeholder="Lastname" {...field} />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                            </div>
                            <FormField
                                control={form.control}
                                name="email"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Email Address</FormLabel>
                                        <FormControl>
                                            <Input placeholder="Email address" {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="phone"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Phone Number</FormLabel>
                                        <FormControl>
                                            <Input placeholder="Phone Number" {...field} />
                                        </FormControl>
                                        <FormDescription>Enter your phone number in this format +639*********.</FormDescription>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                                <FormField
                                    control={form.control}
                                    name="password"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Password</FormLabel>
                                            <FormControl>
                                                <Input placeholder="Password" type='password' {...field} />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                                <FormField
                                    control={form.control}
                                    name="confirmPassword"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Confirm Password</FormLabel>
                                            <FormControl>
                                                <Input placeholder="Confirm Password" type='password' {...field} />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                            </div>
                            <Button type='submit' disabled={isCreatingAccount} className='p-3 text-dark font-semibold bg-yellow rounded text-center w-full'>
                                {isCreatingAccount ? 'Signing up...' : 'Sign Up'}
                            </Button>
                        </form>
                    </Form>
                    <p className='text-gray-400 mt-3 text-end'>Already have an account? <Link href="/auth/signin" className='text-orange'>Sign in here</Link></p>
                </div>
            </div>
        </section>
    )
}

export default SignUpPage