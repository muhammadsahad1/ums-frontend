import { setEmpty } from "@/store/adminSlice";
import toast from "react-hot-toast";
import { useDispatch } from "react-redux";
import { useRouter } from "next/navigation";

export const useAuthErrorHandler = () => {
    const dispatch = useDispatch();
    const router = useRouter();

    return (error: any): void => {
        localStorage.removeItem('access_token');
        localStorage.removeItem('refresh_token');

        // Clear auth state in redux
        dispatch(setEmpty());
        toast.error('Session expired. Please login again.');


        router.replace('/login');
    };
};