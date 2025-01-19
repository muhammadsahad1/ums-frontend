import React from "react";
import { LogOut, LogIn, Users } from "lucide-react";
import { toast } from "react-hot-toast";
import { useRouter } from "next/navigation";
import { useSelector, useDispatch } from "react-redux";
import { logout } from "@/api/user";
import { setEmpty } from "@/store/adminSlice";
import { RootState } from "@/store";

const Navbar = () => {
    const router = useRouter();
    const dispatch = useDispatch();
    const admin = useSelector((state: RootState) => state.admin);

    const handleLogin = () => {
        router.push("/login");
    };

    const handleLogout = async () => {
        try {
            const result = await logout();
            if (result?.status) {
                toast.success("Logged out successfully", {
                    style: {
                        background: '#323232',
                        color: '#fff',
                        borderRadius: '8px',
                        border: '1px solid #404040'
                    }
                });
                dispatch(setEmpty());
                router.push("/login");
            } else if (result.message === "Unauthorized, please log in") {
                toast.error(result.message);
                dispatch(setEmpty());
                router.push('/login');
            } else {
                toast.error(result.message);
            }
        } catch (error) {
            toast.error("Error logging out", {
                style: {
                    background: '#323232',
                    color: '#fff',
                    borderRadius: '8px',
                    border: '1px solid #404040'
                }
            });
        }
    };

    return (
        <nav className="fixed top-0 left-0 right-0 z-50">
            <div className="bg-zinc-900/95 backdrop-blur-lg border-b border-zinc-800">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex items-center justify-between h-16">
                        <div className="flex items-center space-x-3">
                            <Users className="w-6 h-6 text-zinc-400" />
                            <h1
                                className="text-xl font-semibold text-zinc-200 cursor-pointer hover:text-white transition-colors"
                                onClick={() => router.push("/")}
                            >
                                UMS
                                
                            </h1>
                        </div>

                        {admin._id ? (
                            <button
                                onClick={handleLogout}
                                className="inline-flex items-center px-4 py-2 rounded-lg text-sm font-medium text-zinc-200 
                                         bg-zinc-800 hover:bg-zinc-700 transition-all duration-200 space-x-2
                                         border border-zinc-700 hover:border-zinc-600 shadow-lg hover:shadow-xl"
                            >
                                <LogOut className="w-4 h-4" />
                                <span>Logout</span>
                            </button>
                        ) : (
                            <button
                                onClick={handleLogin}
                                className="inline-flex items-center px-4 py-2 rounded-lg text-sm font-medium text-zinc-200 
                                         bg-zinc-800 hover:bg-zinc-700 transition-all duration-200 space-x-2
                                         border border-zinc-700 hover:border-zinc-600 shadow-lg hover:shadow-xl"
                            >
                                <LogIn className="w-4 h-4" />
                                <span>Login</span>
                            </button>
                        )}
                    </div>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;