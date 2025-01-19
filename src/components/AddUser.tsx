import React, { useState } from "react";
import { Button } from "./ui/button";
import { PlusCircle } from "lucide-react";
import Modal from "./Modal";
import { ICreateUser, IUser } from "@/types/user";
import { createUser } from "@/api/user";
import toast from "react-hot-toast";
import { setEmpty } from "@/store/adminSlice";
import { useDispatch } from "react-redux";
import { useRouter } from "next/navigation";

interface AddUserProps {
    isAdded: (user?: IUser) => void;
}

const AddUser = ({ isAdded }: AddUserProps) => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const dispatch = useDispatch();
    const router = useRouter();

    const handleCreateUser = async (userData: ICreateUser) => {
        setIsLoading(true);
        try {
            const result = await createUser(userData);
            if (result.status) {
                isAdded(result?.data);
                toast.success('User created successfully!', {
                    duration: 4000,
                    style: { 
                        background: '#323232',
                        color: '#fff',
                        borderRadius: '8px',
                        border: '1px solid #404040'
                    },
                });
                setIsModalOpen(false);
            } else if (result.message === "Unauthorized, please log in") {
                toast.error(result.message);
                dispatch(setEmpty());
                router.push('/login');
            } else {
                toast.error(result.message, {
                    style: { 
                        background: '#323232',
                        color: '#fff',
                        borderRadius: '8px',
                        border: '1px solid #404040'
                    },
                });
            }
        } catch (error) {
            toast.error('Failed to create user', {
                style: { 
                    background: '#323232',
                    color: '#fff',
                    borderRadius: '8px',
                    border: '1px solid #404040'
                },
            });
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="relative">
            <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-semibold text-zinc-200">User Management</h2>
                <Button
                    onClick={() => setIsModalOpen(true)}
                    className="bg-zinc-800 hover:bg-zinc-700 text-zinc-200 px-4 py-2 rounded-lg transition-all duration-200 flex items-center gap-2 shadow-lg hover:shadow-xl"
                    disabled={isLoading}
                >
                    <PlusCircle className="w-4 h-4" />
                    <span className="hidden sm:inline">Add new user</span>
                    <span className="sm:hidden">Add user</span>
                </Button>
            </div>

            <Modal
                isOpen={isModalOpen}
                onClose={() => !isLoading && setIsModalOpen(false)}
                mode="create"
                onSubmit={(user) => {
                    if ('id' in user) {
                        console.error('Unexpected user ID in create mode.');
                        return Promise.reject('Invalid user data');
                    } else {
                        return handleCreateUser(user as ICreateUser);
                    }
                }}
                onDelete={() => {}}
                isLoading={isLoading}
            />
        </div>
    );
};

export default AddUser;