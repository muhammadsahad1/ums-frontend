"use client"
import React, { useEffect, useState } from "react";
import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "./ui/table";
import { deleteUser, getUsers, updateUser } from "@/api/user";
import { IUser } from "@/types/user";
import toast from "react-hot-toast";
import Modal from "./Modal";
import AddUser from "./AddUser";
import { useRouter } from "next/navigation";
import { useDispatch } from "react-redux";
import { setEmpty } from "@/store/adminSlice";

// Define valid modes for modal (create, edit, delete)
type ModalMode = 'create' | 'edit' | 'delete';

const UserTable: React.FC = () => {
    const [isLoading, setLoading] = useState(false);
    const [users, setUsers] = useState<IUser[] | undefined>([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState<number>(0);
    const [dropdownVisibility, setDropdownVisibility] = useState<string | null>(null);
    const [modalFor, setModalFor] = useState<ModalMode | "">("");
    const [selectedUser, setSelectedUser] = useState<IUser | undefined>();
    const router = useRouter()
    const dispatch = useDispatch()

    useEffect(() => {
        fetchUsers(currentPage);
    }, [currentPage]);

    const fetchUsers = async (page: number) => {
        setLoading(true);
        try {
            const result = await getUsers(page);
            if (result.status) {
                setUsers(result?.data);
                setTotalPages(result?.pagination?.totalPage || 1);
            } else if (result.message === "Unauthorized, please log in") {
                toast.error(result.message);
                dispatch(setEmpty())
                router.push('/login')
            }
        } catch (error) {
            console.error("Error fetching users: ", error);
            toast.error("Unable to fetch users. Please try again later.");
        } finally {
            setLoading(false);
        }
    };

    const handlePagination = (page: number) => {
        setCurrentPage(page);
        fetchUsers(page)
    };

    const toggleDropdown = (user_id: string) => {
        setDropdownVisibility(prevId => prevId === user_id ? null : user_id);
    };

    const handleModal = (thisfor: ModalMode, user: IUser) => {
        setDropdownVisibility(null)
        setModalFor(thisfor);
        setSelectedUser(user);
    };
    const handleDelete = async (user: IUser) => {
        setUsers(prevUsers => prevUsers?.filter(prev => prev._id !== user._id));

        const result = await deleteUser(user._id as string);
        if (result.status) {
            toast.success(`User ${user.firstName} ${user.lastName} deleted!`, {
                duration: 4000,
                style: {
                    transition: 'all 1s ease',
                },
            });
        } else {
            toast.error(result.message, {
                duration: 4000,
                style: {
                    transition: 'all 1s ease',
                },
            });
        }
    };

    const handleEdit = async (updatedUser: IUser) => {
        setUsers(prevUsers => prevUsers?.map(user =>
            user._id === updatedUser._id ? { ...user, ...updatedUser } : user));

        const result = await updateUser(updatedUser);
        if (result.status) {
            toast.success(`User ${updatedUser.firstName}'s details updated successfully!`, {
                duration: 4000,
                style: {
                    transition: 'all 1s ease',
                },
            });
        } else if (result.message === "Unauthorized, please log in") {
            toast.error(result.message);
            dispatch(setEmpty())
            router.push('/login')
        } else {
            toast.error(result.message)
        }
    };

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (dropdownVisibility && !(event.target as Element).closest('.dropdown-container')) {
                setDropdownVisibility(null);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, [dropdownVisibility]);

    // seting new user in usertable 
    const addNewUser = (newUser: IUser | undefined) => {
        try {
            if (newUser) {
                setUsers(prevUsers => [...prevUsers || [], newUser]);
            }
        } catch (error) {
            console.error("Error adding new user:", error);
            toast.error("Failed to add new user.");
        }
    }
    // for handling count of users
    const getStartIndex = () => {
        return (currentPage - 1) * 5 + 1
    }

    return (
        <div className="p-4 w-auto">
            <AddUser isAdded={addNewUser} />
            <Table className=" border border-zinc-800 rounded-sm">
                <TableCaption className="mb-4">List of registered users</TableCaption>
                <TableHeader>
                    <TableRow>
                        <TableHead className="w-16 text-center">NO</TableHead>
                        <TableHead className="w-36">User ID</TableHead>
                        <TableHead className="w-32">First Name</TableHead>
                        <TableHead className="w-32">Last Name</TableHead>
                        <TableHead>Email</TableHead>
                        <TableHead className="w-32">Phone</TableHead>
                        <TableHead className="w-20 text-center">Actions</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {isLoading ? (
                        <TableRow>
                            <TableCell colSpan={7} className="text-center py-8">
                                <div className="flex items-center justify-center">
                                    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-zinc-600"></div>
                                </div>
                            </TableCell>
                        </TableRow>
                    ) : users && users.length > 0 ? (
                        users.map((user, index) => (
                            <TableRow key={user._id}>
                                <TableCell className="text-center">{getStartIndex() + index}</TableCell>
                                <TableCell className="font-mono text-sm">{user._id}</TableCell>
                                <TableCell>{user.firstName}</TableCell>
                                <TableCell>{user.lastName}</TableCell>
                                <TableCell>{user.email}</TableCell>
                                <TableCell>{user.phoneNumber}</TableCell>
                                <TableCell>
                                    <div className="relative dropdown-container">
                                        <button
                                            onClick={() => toggleDropdown(user._id as string)}
                                            className="p-2 rounded-full hover:bg-zinc-600 hover:text-white transition-colors duration-200 w-8 h-8 flex items-center justify-center"
                                        >
                                            ⋮
                                        </button>

                                        {dropdownVisibility === user._id && (
                                            <div className="absolute right-0 mt-2 w-48 bg-white border border-gray-200 rounded-md shadow-lg z-10 transform opacity-100 scale-100 transition-all duration-200 origin-top-right">
                                                <ul className="py-1">
                                                    <li>
                                                        <button className="w-full px-4 py-2 text-sm text-left text-gray-700 hover:bg-zinc-600 hover:text-white transition-colors duration-200"
                                                            onClick={() => handleModal("edit", user)}
                                                        >
                                                            Edit User
                                                        </button>
                                                    </li>
                                                    <li>
                                                        <button className="w-full px-4 py-2 text-sm text-left text-gray-700 hover:bg-zinc-600 hover:text-white transition-colors duration-200"
                                                            onClick={() => handleModal("delete", user)}
                                                        >
                                                            Delete User
                                                        </button>
                                                    </li>
                                                </ul>
                                            </div>
                                        )}
                                    </div>
                                </TableCell>
                            </TableRow>
                        ))
                    ) : (
                        <TableRow>
                            <TableCell colSpan={7} className="text-center py-8 text-gray-500">
                                No users found.
                            </TableCell>
                        </TableRow>
                    )}
                </TableBody>
            </Table>

            {/* Pagination */}
            {totalPages > 1 && (
                <div className="mt-6 flex justify-between items-center px-2">
                    <button
                        onClick={() => handlePagination(currentPage - 1)}
                        disabled={currentPage <= 1}
                        className="px-4 py-2 bg-zinc-600 text-white rounded-md disabled:opacity-50 disabled:cursor-not-allowed hover:bg-zinc-700 transition-colors duration-200"
                    >
                        Previous
                    </button>
                    <span className="text-zinc-600 font-medium">
                        Page {currentPage} of {totalPages}
                    </span>
                    <button
                        onClick={() => handlePagination(currentPage + 1)}
                        disabled={currentPage >= totalPages}
                        className="px-4 py-2 bg-zinc-600 text-white rounded-md disabled:opacity-50 disabled:cursor-not-allowed hover:bg-zinc-700 transition-colors duration-200"
                    >
                        Next
                    </button>
                </div>
            )}

            {/* Modal Component for Edit or Delete */}
            <Modal
                isOpen={modalFor === "edit" || modalFor === "delete"}
                onClose={() => setModalFor("")}
                mode={modalFor || 'create'}
                userData={selectedUser}
                onSubmit={async (user: IUser) => {
                    try {
                        if (modalFor === "edit") {
                            await handleEdit(user);
                        } else if (modalFor === "delete") {
                            await handleDelete(user);
                        }
                    } catch (error) {
                        console.error("Error in Modal onSubmit: ", error);
                    } finally {
                        setModalFor("");
                    }
                }}
                onDelete={handleDelete}

            />

        </div>
    );
};

export default UserTable;
