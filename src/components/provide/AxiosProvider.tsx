"use client"
import { useAuthErrorHandler } from '@/hooks/useAuthErro'
import { setupAxiosInterceptors } from '@/utils/api'
import React, { useEffect } from 'react'

const AxiosProvider = ({ children }: { children: React.ReactNode }) => {
    const handleAUthErr = useAuthErrorHandler()
    useEffect(() => {
        setupAxiosInterceptors(handleAUthErr)
    }, [])
    return (
        <>{children}</>
    )
}

export default AxiosProvider