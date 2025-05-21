'use client'
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';

import React from 'react'
import { Menu } from '@mui/icons-material';
import { useGetSession } from '@/hooks/use-get-session';

const AdminNavbar = () => {
    const userSession = useGetSession();
    const handleSignout = () => {

    }
    return (
        <nav className="w-full rounded-md bg-zinc-800 px-5">
            <div className=" flex items-center justify-between h-full py-2">
                <button className='text-white p-0' type='button'>
                    <Menu className='p-0 m-0'/>
                </button>
                {/* <p className='text-xl font-medium'>Welcome {userSession?.user.user_metadata.firstname ?? 'Admin'}!</p> */}
                {userSession?.user && (
                    <ul className="nav-menu justify-end md:col-span-1 col-span-2 flex ">
                        <li>
                            <DropdownMenu>
                                <DropdownMenuTrigger>
                                    <Avatar>
                                        <AvatarFallback>{userSession.user.email?.[0]?.toUpperCase() ?? 'A'}</AvatarFallback>
                                    </Avatar>
                                    <span>{userSession.user.user_metadata.name}</span>
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