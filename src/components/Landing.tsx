"use client"

import React from 'react';
import { useRouter } from 'next/navigation'
import { useSelector } from 'react-redux';
import { RootState } from '@/store';


const Landing: React.FC = () => {
    const router = useRouter()
    const admin = useSelector((state: RootState) => state?.admin)
    console.log("admin ==>", admin);

    return (
        <div className='max-w-6xl p-4 w-full bg-black min-h-screen '>
            <div className='flex flex-col md:flex-row justify-center items-center'>
                <div className="mt-16 md:mt-32 text-center md:text-left">
                    <div className='mt-10 md:mt-20'>
                        <h2 className="text-4xl sm:text-5xl md:text-6xl font-bold leading-tight">
                            Streamlined <br />
                            User Management <br />
                            <span className="text-blue-600">Made Simple</span>
                        </h2>
                        <p className="mt-4 text-base sm:text-lg md:text-xl text-gray-700">
                            Effortlessly manage users
                        </p>
                        <p className="mt-2 text-base sm:text-lg md:text-xl text-gray-700">
                            Monitor activity, control access, and maintain security
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Landing