"use client"
import React from "react";
import { IoLogOut } from "react-icons/io5";
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
        router.push("/login"); // Navigate to the login page
    };

    const handleLogout = async () => {
        try {
            const result = await logout(); // Call the logout API
            if (result?.status) {
                toast.success("Logged out successfully");
                dispatch(setEmpty());
                router.push("/login");
            } else {
                toast.error("Error logging out");
            }
        } catch (error) {
            console.error("Logout error:", error);
            toast.error("Error logging out");
        }
    };

    return (
        <nav
            className="flex justify-between items-center px-6 py-4 bg-transparent backdrop-blur-sm fixed w-full top-0 left-0 z-10"
            style={{ height: "60px" }}
        >
            <div className="flex justify-between w-full">
                <div className="ms-32">
                    <h1
                        className="text-white text-2xl font-bold cursor-pointer"
                        onClick={() => router.push("/")}
                    >
                        UMS
                    </h1>
                </div>
                <div className="me-32">
                    {admin._id ? (
                        <div
                            className="flex items-center cursor-pointer text-white"
                            onClick={handleLogout}
                        >
                            <IoLogOut size={24} className="mr-2" />
                            <span className="font-medium">Logout</span>
                        </div>
                    ) : (
                        <button
                            className="px-6 py-2 text-sm font-medium bg-zinc-900 text-white cursor-pointer rounded-lg transition-all duration-300 shadow-sm"
                            onClick={handleLogin}
                        >
                            Login
                        </button>
                    )}
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
