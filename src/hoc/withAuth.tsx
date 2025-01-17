'use client';

import { useAuth } from '@/hooks/useAuth';
import { ComponentType } from 'react';

export function withAuth<T extends object>(Component: ComponentType<T>) {
    return function AuthenticatedComponent(props: T) {
        const { isAuthenticated } = useAuth(true);

        if (!isAuthenticated) {
            return null; // or render a loader
        }

        return <Component {...props} />;
    };
}
