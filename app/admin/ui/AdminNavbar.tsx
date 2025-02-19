import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Session } from '@supabase/supabase-js';

import React, { useState } from 'react'
import Link from 'next/link';
import { ShoppingBag } from '@mui/icons-material';

const AdminNavbar = () => {
    const [session, setSession] = useState<Session | null>(null)
    const handleSignout = () => {

    }
    return (
        <nav className="w-full header z-50 left-0 ">
            <div className="wrapper flex items-center justify-center h-full py-2">
                <a href="/" className={`logo`}>
                    <img src="/images/logo.png" width={85} height={85} alt="" />
                </a>
                {session?.user && (
                    <ul className="nav-menu justify-end md:col-span-1 col-span-2 flex ">
                        <li>
                            <Link className="nav-link " href='/cart'>
                                <ShoppingBag className='text-primary' />
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
                                    <DropdownMenuItem onClick={handleSignout}>Sign Out</DropdownMenuItem>
                                </DropdownMenuContent>
                            </DropdownMenu>
                        </li>
                    </ul>
                )}
            </div>
        </nav>
    )
}

export default AdminNavbar