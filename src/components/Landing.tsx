"use client"

import React from 'react';
import { useRouter } from 'next/navigation'
import { useSelector } from 'react-redux';
import { RootState } from '@/store';
import Image from 'next/image';

const Landing: React.FC = () => {
    const router = useRouter()
    const admin = useSelector((state: RootState) => state?.admin)
    console.log("admin ==>", admin);

    return (

        <div className='max-w-6xl mx-auto p-4 w-full bg-black min-h-screen mt-40'>
            <div className='flex flex-col-reverse md:flex-row items-center justify-between gap-8 md:gap-16'>

                <div className="w-full md:w-1/2 text-center md:text-left">
                    <h2 className="text-4xl sm:text-5xl md:text-6xl font-bold leading-tight text-white">
                        Streamlined <br />
                        User Management <br />
                        <span className="text-blue-600">Made Simple</span>
                    </h2>
                    <p className="mt-4 text-base sm:text-lg md:text-xl text-gray-300">
                        Effortlessly manage users
                    </p>
                    <p className="mt-2 text-gray-300 text-base sm:text-lg md:text-xl ">
                        Monitor activity, control access, and maintain security
                    </p>
                </div>
                <div className='w-full md:w-1/3 flex justify-center md:justify-start '>
                    <Image
                        src="/admin.png"
                        alt="Admin Dashboard"
                        width={300}
                        height={200}
                        priority
                        className='object-contain'
                    />
                </div>
            </div>
        </div>

    );
};

export default Landing;