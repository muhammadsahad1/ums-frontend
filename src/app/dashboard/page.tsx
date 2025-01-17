"use client"

import Navbar from '@/components/Navbar'
import UserTable from '@/components/UserTable'
import React from 'react'
import { withAuth } from '@/hoc/withAuth';

const page: React.FC = () => {
    return (
        <div>
            <Navbar />
            <div className='flex justify-center items-center mt-32'>
                <UserTable />
            </div>
        </div>
    )
}

export default withAuth(page)