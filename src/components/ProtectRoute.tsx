"use client"

import { RootState } from "@/store";
import { useRouter } from "next/navigation";
import { useSelector } from "react-redux";
import React, { useEffect } from "react";

interface ProtectRouteProps {
    children: React.ReactNode;
}

export const ProtectRoute: React.FC<ProtectRouteProps> = ({ children }) => {
    const admin = useSelector((state: RootState) => state.admin);
    const router = useRouter();

    useEffect(() => {
        if (!admin) {
            router.push('/login');
        }
    }, [admin, router]);


    if (!admin) {
        return null;
    }

    return <>{children}</>;
};
