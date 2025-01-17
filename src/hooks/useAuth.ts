import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useRouter } from 'next/navigation';
import { RootState } from '@/store';

export const useAuth = (requireAuth: boolean = true) => {
  const router = useRouter();
  const admin = useSelector((state: RootState) => state.admin);
  const isAuthenticated = Boolean(admin._id);

  useEffect(() => {
    if (requireAuth && !isAuthenticated) {
      router.push('/login');
    }
    if (!requireAuth && isAuthenticated) {
      router.push('/dashboard');
    }
  }, [isAuthenticated, requireAuth, router]);

  return { isAuthenticated, admin };
};
