'use client'
import React, { useEffect, useState } from 'react'
import { jotiOne } from './fonts'
import Link from 'next/link'
import { Button } from "@/components/ui/button"
import clsx from 'clsx'
import { Search, ShoppingBag } from '@mui/icons-material'
import { createClient } from '@/utils/supabase/client'
import { Avatar, AvatarFallback } from '@/components/ui/avatar'
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Session, User } from '@supabase/supabase-js'
import { useRouter } from 'next/navigation'
import { useGetAllCartItems } from '../lib/react-query/queriesAndMutations'

const Navbar = ({ filled = false }) => {
    const [session, setSession] = useState<Session | null>(null)
    const router = useRouter();
    const supabase = createClient()
    const { data: cartItems, isPending:cartItemsLoading } = useGetAllCartItems();
    useEffect(() => {
        // Check initial session
        const getSession = async () => {
            const { data: { session } } = await supabase.auth.getSession()
            setSession(session)
        }
        getSession()
        // Listen for auth state changes
        const { data: authListener } = supabase.auth.onAuthStateChange((event, session) => {
            console.log("Auth event:", event)  // Optional: log auth events (SIGNED_IN, SIGNED_OUT, etc.)
            setSession(session)
        })

        // Cleanup on unmount
        return () => {
            authListener?.subscription.unsubscribe()
        }
    }, [supabase])

    const handleSignOut = async () => {
        const { error } = await supabase.auth.signOut();

        if (error) {
            console.error("Error signing out:", error.message)
        } else {
            // Redirect to a sign-in or home page after successful sign-out
            router.push('/auth/signin')
        }
    }

    return (
        <nav className={clsx("w-full header z-50 left-0 ", {
            "bg-gradient-to-b from-gray-950 to-gray-900/10 backdrop-blur-none": filled
        })}>
            <div className="wrapper grid grid-cols-3 items-center justify-between h-full py-2">
                <a href="/" className={`logo`}>
                    <img src="/images/logo.png" width={76} height={76} alt="" />
                </a>
                <ul className="nav-menu justify-center md:flex hidden">
                    <li>
                        <Link className="nav-link" href="/">Home</Link>
                    </li>
                    <li>
                        <Link className="nav-link" href="/menu">Menu</Link>
                    </li>
                    <li>
                        <Link className="nav-link" href="/contact-us">Contact Us</Link>
                    </li>
                </ul>
                <ul className="nav-menu justify-end md:col-span-1 col-span-2 flex">
                    <li>
                        <Link className="nav-link " href={'#'}>
                            <Search className='text-primary' />
                        </Link>
                    </li>
                    {session?.user ? (
                        <>
                            <li>
                                <Link className="nav-link relative" href='/cart'>
                                    <ShoppingBag className='text-primary' />
                                    {cartItems && (
                                        <span className='bg-yellow text-white px-1 w-fit h-fit text-center absolute text-sm rounded-md font-medium'>{cartItems.length}</span>
                                    )}
                                </Link>
                            </li>
                            <li>
                                <DropdownMenu>
                                    <DropdownMenuTrigger>
                                        <Avatar>
                                            <AvatarFallback>{session.user.email?.[0]?.toUpperCase() ?? 'A'}</AvatarFallback>
                                        </Avatar>
                                    </DropdownMenuTrigger>
                                    <DropdownMenuContent>
                                        <DropdownMenuLabel>My Account</DropdownMenuLabel>
                                        <DropdownMenuSeparator />
                                        <DropdownMenuItem>Profile</DropdownMenuItem>
                                        <DropdownMenuItem onClick={handleSignOut}>Sign Out</DropdownMenuItem>
                                    </DropdownMenuContent>
                                </DropdownMenu>
                            </li>
                        </>
                    ) : (
                        <li>
                            <Link href="/auth/signin" className="btn hover:bg-white hover:text-black transition-all active:bg-white active:text-black rounded-3xl text-white border-white border py-2 px-6 bg-gray-900 flex justify-center" >Sign In</Link>
                        </li>
                    )}
                </ul>
            </div>
        </nav>
    )
}

export default Navbar