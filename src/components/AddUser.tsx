import React, { useState } from "react";
import { Button } from "./ui/button";
import Modal from "./Modal";
import { ICreateUser, IUser } from "@/types/user";
import { createUser } from "@/api/user";
import toast from "react-hot-toast";
import { setEmpty } from "@/store/adminSlice";
import { useDispatch } from "react-redux";
import { useRouter } from "next/router";

interface AddUserProps {
    isAdded: (user?: IUser) => void;
}

const AddUser: React.FC<AddUserProps> = ({ isAdded }) => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const dispatch = useDispatch()
    const router = useRouter()

    const handleCreateUser = async (userData: ICreateUser) => {
        setIsLoading(true);
        try {
            const result = await createUser(userData);
            if (result.status) {

                isAdded(result?.data);
                toast.success('User created successfully!', {
                    duration: 4000,
                    style: { transition: 'all 1s ease' },
                });
            } else if (result.message === "Unauthorized, please log in") {
                toast.error(result.message);
                dispatch(setEmpty())
                router.push('/login')
            } else {
                toast.error(result.message)
            }
        } catch (error) {
            toast.error('Failed to create user');
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="flex justify-end p-2 sm:p-6 md:p-8">
            <Button
                onClick={() => setIsModalOpen(true)}
                className="bg-zinc-900 text-sm sm:text-base px-3 py-2 sm:px-4 sm:py-2.5 hover:bg-zinc-800 transition-colors duration-200 w-full sm:w-auto"
            >
                Add new user
            </Button>

            <Modal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                mode="create"
                onSubmit={(user) => {
                    if ('id' in user) {
                        console.error('Unexpected user ID in create mode.');
                    } else {
                        return handleCreateUser(user as ICreateUser);
                    }
                }}
                onDelete={() => { }}
                isLoading={isLoading}
            />
        </div>
    );
};

export default AddUser;
