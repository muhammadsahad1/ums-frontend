"use client"
import LoginForm from '@/components/LoginForm'
import { RootState } from '@/store';
import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux';

const page: React.FC = () => {
    const router = useRouter();
    const [loading, setLoading] = useState(true);
    const admin = useSelector((state: RootState) => state.admin);

    useEffect(() => {
        if (admin._id) {
            console.log("keri");
            
            router.push('/dashboard')
        } else {
            setLoading(false);
            console.log("lerii")
        }
    }, [admin, router]);

    // if (loading) {
    //     consol
    // return null;
    // }
    return (
        
        <div><LoginForm /></div>
    )
}

export default page