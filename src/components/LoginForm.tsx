"use client"

import { login } from "@/api/user";
import { ILoginData } from "@/types/user";
import { validation } from "@/utils/validation";
import React, { useState } from "react";
import toast from "react-hot-toast";
import { useRouter } from 'next/navigation'
import { useDispatch } from "react-redux";
import { setAdminDetails } from "@/store/adminSlice";

const LoginForm: React.FC = () => {
    const [formData, setFormData] = useState<ILoginData>({
        email: "",
        password: ""
    });

    const [errors, setErrors] = useState({
        email: "",
        password: ""
    });

    const router = useRouter()
    const dispatch = useDispatch()
    const [isLoading, setLoading] = useState(false)

    const userValidation = validation();
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));

        setErrors(prev => ({
            ...prev,
            [name]: ""
        }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        setLoading(!isLoading)
        e.preventDefault();
        let newErrors = {
            email: "",
            password: ""
        };
        let isValid = true;

        // Validate email
        if (!formData.email) {
            newErrors.email = "Email is required";
            isValid = false;
        } else if (!userValidation.validateEmail(formData.email)) {
            newErrors.email = "Invalid email address";
            isValid = false;
        }

        // Validate password
        if (!formData.password) {
            newErrors.password = "Password is required";
            isValid = false;
        } else if (!userValidation.validatePassword(formData.password)) {
            newErrors.password = "At least 6 characters, one number, one uppercase, and one lowercase letter"
            isValid = false
        }

        setErrors(newErrors);

        if (isValid) {
            try {
                const result = await login(formData);
                console.log(result)
                if (result.status) {
                    dispatch(setAdminDetails(result.data))
                    toast.success("Welcome back, Admin! You are now logged in.")
                    router.push('/dashboard')
                } else {
                    toast.error('Invalid login credentials. Please check your email and password.')
                }
                console.log("Login Successful:", result);

            } catch (error) {
                console.error("Error during login:", error);
                toast.error("An error occurred while logging in. Please try again later.")
            }
        }
        setLoading(!isLoading)
    };

    return (
        <div className="min-h-screen flex items-center justify-evenly bg-black">
            <div className="hidden sm:flex sm:w-1/3 sm:items-center sm:justify-center">

                <div className="text-center mb-8">
                    <h1 className="text-4xl font-bold text-zinc-100">User Management System </h1>
                    <p className="text-zinc-400 mt-2 ">Admin Control Panel</p>
                </div>
            </div>

            <div className="w-full max-w-md  rounded-lg p-6">
                <h2 className="text-2xl font-bold mb-6 text-center text-zinc-200">Admin Login</h2>
                <form onSubmit={handleSubmit} className="space-y-6">
                    <div>
                        <label className="block text-sm font-medium text-zinc-700 mb-2">Email</label>
                        <input
                            type="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            placeholder="Enter your email"
                            className="w-full p-3 border border-zinc-700 text-zinc-500 bg-zinc-950 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        />
                        {errors.email && <p className="text-red-500 text-sm mt-2">{errors.email}</p>}
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-zinc-700 mb-2">Password</label>
                        <input
                            type="password"
                            name="password"
                            value={formData.password}
                            onChange={handleChange}
                            placeholder="Enter your password"
                            className="w-full p-3 border border-zinc-700 text-red bg-zinc-950 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        />
                        {errors.password && <p className="text-red-500 text-sm mt-2">{errors.password}</p>}
                    </div>
                    {isLoading ? (
                        <div className="flex items-center justify-center">
                            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-zinc-600"></div>
                        </div>
                    ) : (
                        <button
                            type="submit"
                            className="w-full font-semibold cursor-pointer bg-zinc-950 text-zinc-200 py-3 rounded-md hover:bg-zinc-900 transition duration-300"
                        >
                            Login
                        </button>
                    )}


                </form>
            </div>
        </div>
    );
};

export default LoginForm;