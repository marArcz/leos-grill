import React from 'react'
import AdminNavbar from '../ui/AdminNavbar'
import AdminSidebar from '../ui/AdminSidebar'

const AdminLayout = ({ children }: { children: React.ReactNode }) => {
    return (
        <>
            <div className="flex space-x-3 h-screen p-3 overflow-hidden">
                <AdminSidebar />
                <main className=' w-full h-full overflow-y-auto pe-2'>
                    <AdminNavbar />
                    <div className="mt-3 ">
                        {children}
                    </div>
                </main>
            </div>
        </>
    )
}

export default AdminLayout