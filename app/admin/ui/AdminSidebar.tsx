'use client';
import React from "react";
import { Dashboard, Group, Settings, ExitToApp, Inventory as ProductsIcon, Category as CategoriesIcon, PlaylistAddCheck as OrdersIcon } from "@mui/icons-material";
import Link from "next/link";
import { usePathname } from "next/navigation";
import clsx from "clsx";

const AdminSidebar: React.FC = () => {

    const pathName = usePathname();

    const doesPathMatches = (basePath: string, pathName:string) : boolean => {
        const escapedPath = basePath.replace(/\//g, '\\/');
        const pattern = `^${escapedPath}(\\/.*)?$`;
        const regex = new RegExp(pattern)
        return regex.test(pathName)
    }


    return (
        <div className="h-full w-64 bg-zinc-800 rounded-lg text-white flex flex-col">
            <div className="text-center pt-3">
                <Link href="/" className=''>
                    <img src="/images/logo.png" className="w-14 mx-auto" alt="" />
                </Link>
                <div className="p-4 text-center text-xl font-medium border-b border-gray-700">
                    Admin Panel
                </div>
            </div>
            <nav className="flex-1">
                <ul className="space-y-2 p-4">
                    <li>
                        <Link
                            href="/admin"
                            className={clsx("flex items-center space-x-3 p-2 rounded hover:bg-zinc-700", {
                                "bg-zinc-200 text-yellow bg-opacity-10": pathName == '/admin'
                            })}
                        >
                            <Dashboard />
                            <span>Dashboard</span>
                        </Link>
                    </li>
                    <li>
                        <Link
                            href="/admin/products"
                            className={clsx("flex items-center space-x-3 p-2 rounded hover:bg-zinc-700", {
                                "bg-zinc-200 text-yellow bg-opacity-10": doesPathMatches('/admin/products',pathName)
                            })}
                        >
                            <ProductsIcon />
                            <span>Products</span>
                        </Link>
                    </li>
                    <li>
                        <Link
                            href="/admin/categories"
                            className={clsx("flex items-center space-x-3 p-2 rounded hover:bg-zinc-700", {
                                "bg-zinc-200 text-yellow bg-opacity-10": doesPathMatches('/admin/categories',pathName)
                            })}
                        >
                            <CategoriesIcon />
                            <span>Categories</span>
                        </Link>
                    </li>
                    <li>
                        <Link
                            href="/admin/orders"
                            className={clsx("flex items-center space-x-3 p-2 rounded hover:bg-zinc-700", {
                                "bg-zinc-200 text-yellow bg-opacity-10": doesPathMatches('/admin/orders',pathName)
                            })}
                        >
                            <OrdersIcon />
                            <span>Order History</span>
                        </Link>
                    </li>
                    <li>
                        <Link
                            href="#"
                            className="flex items-center space-x-3 p-2 rounded hover:bg-zinc-700"
                        >
                            <Group />
                            <span>Users</span>
                        </Link>
                    </li>
                    <li>
                        <Link
                            href="#"
                            className="flex items-center space-x-3 p-2 rounded hover:bg-zinc-700"
                        >
                            <Settings />
                            <span>Settings</span>
                        </Link>
                    </li>
                </ul>
            </nav>
            <div className="p-4 border-t border-gray-700">
                <a
                    href="#"
                    className="flex items-center space-x-3 p-2 rounded hover:bg-gray-700"
                >
                    <ExitToApp />
                    <span>Logout</span>
                </a>
            </div>
        </div>
    );
};

export default AdminSidebar;