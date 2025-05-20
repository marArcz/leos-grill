'use client';
import { SigninFormSchema } from '@/app/lib/definitions';
import { jotiOne, koulen } from '@/app/ui/fonts';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { createClient } from '@/utils/supabase/client';
import { zodResolver } from '@hookform/resolvers/zod';
import { Search, ShoppingBag } from '@mui/icons-material'
import { Session } from '@supabase/supabase-js';  
import clsx from 'clsx'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import React, { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import AdminNavbar from '../../ui/AdminNavbar';
import { useToast } from '@/hooks/use-toast';
import lottieJson from '@/public/animations/fire.json';
import Lottie from 'react-lottie-player'
import { signin } from './action';

const SignInPage = () => {
    const [role, setRole] = useState<string | null>(null)
    const [signinError, setSigninError] = useState("");
    const [isSigningIn, setIsSigningIn] = useState(false);
    const [session, setSession] = useState<Session | null>(null)
    const router = useRouter();
    const { toast } = useToast()

    const form = useForm<z.infer<typeof SigninFormSchema>>({
        resolver: zodResolver(SigninFormSchema),
        defaultValues: {
            email: '',
            password: '',
            role:'Admin'
        }
    })

    const handleSubmit = async (formData: z.infer<typeof SigninFormSchema>) : Promise<void> => {
        console.log('signing in')
        setIsSigningIn(true);
        signin(formData)
            .then((success) => {
                if(success){
                    toast({
                        title:'Success'
                    })
                    router.push('/admin/')
                }else{
                    // alert('failed to login!');
                    toast({
                        title:'Invalid email and password!',
                        
                        variant: 'destructive'
                    })
                }
            })
            .catch(error => console.log('error admin signin: ', error))
            .finally(() => setIsSigningIn(false))
    }


    return (
        <>
            <AdminNavbar />
            <section className=' mx-auto xl:w-[40%] md:w-[50%] py-8 mt-10 px-4'>
                <div className="text-center">
                    <p className='text-3xl' style={koulen.style}>ADMIN SIGNIN</p>
                    <p className='mt-2 text-lg text-gray-400'>Welcome to Leo’s grill Admin Panel!</p>
                </div>
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(handleSubmit)}>
                        <div className="mb-4">
                            <FormField
                                control={form.control}
                                name="email"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Email Address</FormLabel>
                                        <FormControl>
                                            <Input placeholder="Email Address" {...field} />
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
                                            <Input type="password" placeholder="Password" {...field} />
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
            </section>
        </>
    )
}

export default SignInPage