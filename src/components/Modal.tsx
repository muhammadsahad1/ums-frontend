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
import { ICreateUser, IUser } from '@/types/user';
import toast from 'react-hot-toast';
import { validation } from '@/utils/validation';

interface ModalProps {
    isOpen: boolean;
    onClose: () => void;
    mode: 'create' | 'edit' | 'delete';
    userData?: IUser;
    onSubmit: (user: ICreateUser | IUser) => Promise<void> | undefined;
    onDelete: (user: IUser) => void;
    isLoading?: boolean; // Add loading state here
}

const Modal: React.FC<ModalProps> = ({
    isOpen,
    onClose,
    mode,
    userData,
    onSubmit,
    onDelete,
    isLoading
}) => {
    const [user, setUser] = useState<IUser | ICreateUser | null>(null);
    const [errors, setErrors] = useState<any>({});

    const userValidation = validation();

    useEffect(() => {
        if (userData) {
            setUser(userData);
        } else if (mode === 'create') {
            setUser({ firstName: '', lastName: '', email: '', phoneNumber: '' } as ICreateUser);
        }
    }, [userData, mode]);

    const handleSubmit = () => {
        if (user) {
            const errorMessages: any = {};
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
                return;
            }          

            onSubmit(user);
            setErrors({});
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
                setUser(mode === 'create' ? { firstName: '', lastName: '', email: '', phoneNumber: '' } as ICreateUser : null);
            }
        }
        setErrors({});
    }, [userData, isOpen, mode]);

    return (
        <Dialog open={isOpen} onOpenChange={onClose}>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle className="text-2xl font-bold">
                        {mode === 'edit' ? 'Edit User' : mode === 'create' ? 'Create User' : 'Delete User'}
                    </DialogTitle>
                    <DialogDescription className="text-sm text-gray-600">
                        {mode === 'edit'
                            ? 'Edit user details below.'
                            : mode === 'create'
                                ? 'Create a new user by filling out the details below.'
                                : null}
                    </DialogDescription>
                </DialogHeader>

                {(mode === 'edit' || mode === 'create') && user && (
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

                {mode === 'delete' && user && (
                    <DialogDescription className="text-sm text-gray-600">
                        Are you sure you want to delete this user? This action cannot be undone.
                    </DialogDescription>
                )}

                <DialogFooter className="mt-6">
                    <Button
                        onClick={mode === 'delete' ? handleDelete : handleSubmit}
                        disabled={isLoading}
                        className={`${mode === 'delete'
                            ? 'bg-red-600 text-white hover:bg-red-700 transition duration-200'
                            : 'bg-zinc-900 text-white hover:bg-zinc-850 transition duration-200'
                            }`}
                    >
                        {isLoading ? 'Creating...' : (mode === 'delete' ? 'Delete' : mode === "create" ? "Insert" : "Save")}
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
};

export default Modal;
