"use client"

import Navbar from '@/components/Navbar'
import UserTable from '@/components/UserTable'
import React from 'react'
import { withAuth } from '@/hoc/withAuth';
import { ProtectRoute } from '@/route/PrivateRoute';


const page: React.FC = () => {
    return (
        <ProtectRoute>
            <div className='flex justify-center items-center min-h-screen'>
                <UserTable />
            </div>
        </ProtectRoute>
    )
}

export default withAuth(page)