"use client"

import { SigninFormSchema } from '@/app/lib/definitions'
import { koulen } from '@/app/ui/fonts'
import { zodResolver } from '@hookform/resolvers/zod'
import Link from 'next/link'
import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { signin } from './action'
import { FormControl, FormField, FormItem, FormLabel, FormMessage, Form } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { useRouter } from 'next/navigation'
import { useToast } from '@/hooks/use-toast'

const SignInPage = () => {
    const [isSigningIn, setIsSigningIn] = useState(false);
    const router = useRouter()
    const { toast } = useToast()
    const form = useForm<z.infer<typeof SigninFormSchema>>({
        resolver: zodResolver(SigninFormSchema),
        defaultValues: {
            email: '',
            password: '',
            role:'customer'
        }
    })

    const onSubmit = async (data: z.infer<typeof SigninFormSchema>) => {
        setIsSigningIn(true);
        signin(data)
            .then((res) => {
                router.push('/')
            })
            .catch((err) => {
                toast({
                    title: "Uh oh! Something went wrong.",
                    description: err.message,
                    variant: 'destructive'
                })
            })
    }

    return (
        <section className="wrapper py-10">
            <div className="mx-auto xl:w-[40%] md:w-[50%] p-4">
                <div className="text-center">
                    <h4 className=' text-2xl text-center' style={koulen.style}>Sign In to Leo’s Grill</h4>
                    <p className='mt-2'>New user? <Link href="/auth/signup" className='text-orange'>Sign up here</Link></p>
                </div>
                <div className="mt-8">
                    <Form {...form}>
                        <form onSubmit={form.handleSubmit(onSubmit)}>
                            <div className="mb-4">
                                <FormField
                                    control={form.control}
                                    name="email"
                                     render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Email Address</FormLabel>
                                            <FormControl>
                                                <Input required placeholder="Email Address" {...field} />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                            </div>
                            <div className="mb-4">
                                <FormField
                                    control={form.control}
                                    name="password"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Password</FormLabel>
                                            <FormControl>
                                                <Input required type="password" placeholder="Password" {...field} />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                            </div>
                            <div className='mt-10'>
                                <Button type='submit' disabled={isSigningIn} className='p-3 text-dark font-semibold bg-yellow rounded text-center w-full'>
                                    {isSigningIn ? 'Signing in...' : 'Sign In'}
                                </Button>
                            </div>
                            <div className="mt-5 flex justify-between">
                                <div className='flex gap-2'>
                                    <input type="checkbox" name="" id="remember" />
                                    <label htmlFor="remember" className=''>Keep me logged in</label>
                                </div>
                                <div className=''>
                                    <Link href="#" className='text-gray-400'>Forgot Password?</Link>
                                </div>
                            </div>
                        </form>
                    </Form>
                </div>
            </div>
        </section>
    )
}

export default SignInPage