'use client';

import { Provider, useSelector } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { persistor, RootState, store } from '@/store';
import Navbar from '../Navbar';
import { Toaster } from 'react-hot-toast';
import { usePathname } from 'next/navigation';

const NavigationWrapper = ({ children }: { children: React.ReactNode }) => {
    const pathname = usePathname();
    const admin = useSelector((state: RootState) => state.admin);

    const hideNavbarPaths = ['/login'];
    const shouldShowNavbar = !hideNavbarPaths.includes(pathname) ;
    console.log("",shouldShowNavbar)

    if (admin === undefined) {
        return null;
    }

    return (
        <>
            <Toaster />
            {shouldShowNavbar && <Navbar />}
            {children}
        </>
    );
};

export function Providers({ children }: { children: React.ReactNode }) {
    return (
        <Provider store={store}>
            <PersistGate loading={null} persistor={persistor}>
                <NavigationWrapper>
                    {children}
                </NavigationWrapper>
            </PersistGate>
        </Provider>
    );
}
