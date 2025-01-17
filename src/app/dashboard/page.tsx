import Navbar from '@/components/Navbar'
import UserTable from '@/components/UserTable'
import React from 'react'

const page: React.FC = () => {
    return (
        <div>
            <Navbar />
            <div className='flex justify-center items-center '>
                <UserTable />
            </div>
        </div>
    )
}

export default page