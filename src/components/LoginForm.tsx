import { login } from "@/api/user";
import { ILoginData } from "@/types/user";
import { validation } from "@/utils/validation";
import React, { useState } from "react";
import toast from "react-hot-toast";
import { useRouter } from 'next/navigation';
import { useDispatch } from "react-redux";
import { setAdminDetails } from "@/store/adminSlice";
import { Mail, Lock, Loader2 } from "lucide-react";

const LoginForm = () => {
    const [formData, setFormData] = useState<ILoginData>({
        email: "",
        password: ""
    });

    const [errors, setErrors] = useState({
        email: "",
        password: ""
    });

    const router = useRouter();
    const dispatch = useDispatch();
    const [isLoading, setLoading] = useState(false);
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
        e.preventDefault();
        let newErrors = {
            email: "",
            password: ""
        };
        let isValid = true;

        if (!formData.email) {
            newErrors.email = "Email is required";
            isValid = false;
        } else if (!userValidation.validateEmail(formData.email)) {
            newErrors.email = "Invalid email address";
            isValid = false;
        }

        if (!formData.password) {
            newErrors.password = "Password is required";
            isValid = false;
        } else if (!userValidation.validatePassword(formData.password)) {
            newErrors.password = "Password must have at least 6 characters, including numbers, uppercase and lowercase letters";
            isValid = false;
        }

        setErrors(newErrors);

        if (isValid) {
            setLoading(true);
            try {
                const result = await login(formData);
                if (result.status) {
                    dispatch(setAdminDetails(result.data));
                    toast.success("Welcome back, Admin!", {
                        style: {
                            background: '#323232',
                            color: '#fff',
                            borderRadius: '8px',
                            border: '1px solid #404040'
                        }
                    });
                    router.push('/dashboard');
                } else {
                    toast.error('Invalid credentials', {
                        style: {
                            background: '#323232',
                            color: '#fff',
                            borderRadius: '8px',
                            border: '1px solid #404040'
                        }
                    });
                }
            } catch (error) {
                toast.error("Login failed. Please try again.", {
                    style: {
                        background: '#323232',
                        color: '#fff',
                        borderRadius: '8px',
                        border: '1px solid #404040'
                    }
                });
            } finally {
                setLoading(false);
            }
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-black-950">
            <div className="w-full max-w-6xl flex items-center justify-center px-4 py-8">
                <div className="hidden lg:flex lg:w-1/2 lg:pr-8">
                    <div className="text-center">
                        <h1 className="text-4xl font-bold text-zinc-100 mb-4">
                            User Management System
                        </h1>
                        <p className="text-lg text-zinc-400">
                            Admin Control Panel
                        </p>
                    </div>
                </div>

                <div className="w-full max-w-md lg:w-1/2">
                    <div className="bg-zinc-900/50 backdrop-blur-lg rounded-xl p-8 shadow-xl border border-zinc-800">
                        <h2 className="text-2xl font-bold mb-8 text-zinc-100 text-center">
                            Admin Login
                        </h2>

                        <form onSubmit={handleSubmit} className="space-y-6">
                            <div className="space-y-2">
                                <label className="block text-sm font-medium text-zinc-300">
                                    Email Address
                                </label>
                                <div className="relative">
                                    <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-zinc-500" />
                                    <input
                                        type="email"
                                        name="email"
                                        value={formData.email}
                                        onChange={handleChange}
                                        placeholder="Enter your email"
                                        className="w-full pl-10 pr-4 py-3 bg-zinc-900 border border-zinc-700 text-zinc-100 rounded-lg 
                                                 focus:outline-none focus:border-zinc-500 focus:ring-1 focus:ring-zinc-500 
                                                 placeholder:text-zinc-500 transition-all duration-200"
                                    />
                                </div>
                                {errors.email && (
                                    <p className="text-red-400 text-sm mt-1">{errors.email}</p>
                                )}
                            </div>

                            <div className="space-y-2">
                                <label className="block text-sm font-medium text-zinc-300">
                                    Password
                                </label>
                                <div className="relative">
                                    <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-zinc-500" />
                                    <input
                                        type="password"
                                        name="password"
                                        value={formData.password}
                                        onChange={handleChange}
                                        placeholder="Enter your password"
                                        className="w-full pl-10 pr-4 py-3 bg-zinc-900 border border-zinc-700 text-zinc-100 rounded-lg 
                                                 focus:outline-none focus:border-zinc-500 focus:ring-1 focus:ring-zinc-500 
                                                 placeholder:text-zinc-500 transition-all duration-200"
                                    />
                                </div>
                                {errors.password && (
                                    <p className="text-red-400 text-sm mt-1">{errors.password}</p>
                                )}
                            </div>

                            <button
                                type="submit"
                                disabled={isLoading}
                                className="w-full py-3 px-4 bg-zinc-800 hover:bg-zinc-700 text-zinc-100 rounded-lg 
                                         font-medium transition-all duration-200 flex items-center justify-center
                                         disabled:opacity-50 disabled:cursor-not-allowed shadow-lg hover:shadow-xl"
                            >
                                {isLoading ? (
                                    <Loader2 className="w-5 h-5 animate-spin" />
                                ) : (
                                    'Login'
                                )}
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default LoginForm;