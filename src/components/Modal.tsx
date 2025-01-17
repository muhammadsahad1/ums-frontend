import React, { useState, useEffect } from 'react';
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Button } from './ui/button';
import { IUser } from '@/types/user';
import toast from 'react-hot-toast';
import { validation } from '@/utils/validation'; // Assuming validation is in utils/validation.ts

interface ModalProps {
    isOpen: boolean;
    onClose: () => void;
    mode: 'create' | 'edit' | 'delete';
    userData?: IUser;
    onSubmit: (user: IUser) => void;
    onDelete: (user: IUser) => void;
}

const Modal: React.FC<ModalProps> = ({
    isOpen,
    onClose,
    mode,
    userData,
    onSubmit,
    onDelete,
}) => {
    const [user, setUser] = useState<IUser | null>(null);
    const [errors, setErrors] = useState<any>({});

    const userValidation = validation();
    useEffect(() => {
        if (userData) {
            setUser(userData);
        }
    }, [userData]);

    const handleSubmit = () => {
        if (user) {
            const errorMessages: any = {};

            // Perform validation checks
            if (!user.firstName || !userValidation.validateFirstName(user.firstName)) {
                errorMessages.firstName = 'First name must be at least 2 characters long and only contain letters.';
            }
            if (!user.lastName || !userValidation.validateLastName(user.lastName)) {
                errorMessages.lastName = 'Last name must be at least 2 characters long and only contain letters.';
            }
            if (!user.email || !userValidation.validateEmail(user.email)) {
                errorMessages.email = 'Invalid email address.';
            }
            if (!user.phoneNumber || !userValidation.validatePhoneNumber(user.phoneNumber)) {
                errorMessages.phoneNumber = 'Phone number must be 10 digits.';
            }

            if (Object.keys(errorMessages).length > 0) {
                setErrors(errorMessages);
                return; // Stop submission if there are errors
            }

            onSubmit(user);
            setErrors('');
            onClose();
        }
    };

    const handleDelete = () => {
        if (user) {
            onDelete(user);
            onClose();
        }
    };

    useEffect(() => {
        if (isOpen) {
            if (userData) {
                setUser(userData);
            } else {
                setUser(null);
            }
        }
        setErrors({});
    }, [userData, isOpen]);

    return (
        <Dialog open={isOpen} onOpenChange={onClose}>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle className="text-2xl font-bold">
                        {mode === 'edit' ? 'Edit User' : 'Delete User'}
                    </DialogTitle>
                    <DialogDescription className="text-sm text-gray-600">
                        {mode === 'edit'
                            ? 'Edit user details below.'
                            : 'Are you sure you want to delete this user? This action cannot be undone.'}
                    </DialogDescription>
                </DialogHeader>
                {mode === 'edit' && user && (
                    <div className="space-y-4 mt-4">
                        <div>
                            <label htmlFor="firstName" className="block text-sm font-semibold text-gray-700 mb-1">
                                First Name
                            </label>
                            <Input
                                id="firstName"
                                value={user.firstName || ''}
                                onChange={(e) => setUser({ ...user, firstName: e.target.value })}
                                placeholder="First Name"
                                className="text-zinc-900 border font-semibold border-zinc-300 focus:border-zinc-500 focus:ring focus:ring-blue-200"
                            />
                            {errors.firstName && <div className="text-red-500 text-sm">{errors.firstName}</div>}
                        </div>

                        <div>
                            <label htmlFor="lastName" className="block text-sm font-semibold text-gray-700  mb-1">
                                Last Name
                            </label>
                            <Input
                                id="lastName"
                                value={user.lastName || ''}
                                onChange={(e) => setUser({ ...user, lastName: e.target.value })}
                                placeholder="Last Name"
                                className="text-zinc-900 border font-semibold border-zinc-300 focus:border-zinc-500 focus:ring focus:ring-blue-200"
                            />
                            {errors.lastName && <div className="text-red-500 text-sm">{errors.lastName}</div>}
                        </div>

                        <div>
                            <label htmlFor="email" className="block text-sm font-semibold text-gray-700 mb-1">
                                Email
                            </label>
                            <Input
                                id="email"
                                value={user.email || ''}
                                onChange={(e) => setUser({ ...user, email: e.target.value })}
                                placeholder="Email"
                                className="text-zinc-900 border font-semibold border-zinc-300 focus:border-zinc-500 focus:ring focus:ring-blue-200"
                            />
                            {errors.email && <div className="text-red-500 text-sm">{errors.email}</div>}
                        </div>

                        <div>
                            <label htmlFor="phoneNumber" className="block text-sm font-semibold text-gray-700 mb-1">
                                Phone Number
                            </label>
                            <Input
                                id="phoneNumber"
                                value={user.phoneNumber || ''}
                                onChange={(e) => setUser({ ...user, phoneNumber: e.target.value })}
                                placeholder="Phone Number"
                                className="text-zinc-900 border font-semibold border-zinc-300 focus:border-zinc-500 focus:ring focus:ring-blue-200"
                            />
                            {errors.phoneNumber && <div className="text-red-500 text-sm">{errors.phoneNumber}</div>}
                        </div>
                    </div>
                )}
                <DialogFooter className="mt-6">
                    <Button
                        onClick={mode === 'delete' ? handleDelete : handleSubmit}
                        className={`${mode === "delete" ? "bg-red-600 text-white hover:bg-red-700  transition duration-200`" : "text-whitebg-zinc-900 hover:bg-zinc-850 transition duration-200"}`}
                    >
                        {mode === 'delete' ? 'Delete' : 'Save'}
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog >
    );
};

export default Modal;
