"use client"

import Navbar from '@/components/Navbar'
import UserTable from '@/components/UserTable'
import React from 'react'
import { withAuth } from '@/hoc/withAuth';
import AddUser from '@/components/AddUser';
import Heading from '@/components/Heading';
import { ProtectRoute } from '@/components/ProtectRoute';

const page: React.FC = () => {
    return (
        <ProtectRoute>
            <div className='flex justify-center mt-32 w-1/2'>
                <Heading />
            </div>
            <div className='flex justify-center items-center'>
                <UserTable />
            </div>
        </ProtectRoute>
    )
}

export default withAuth(page)