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
import { MoreVertical, Edit2, Trash2 } from "lucide-react";
import { deleteUser, getUsers, updateUser } from "@/api/user";
import { IUser } from "@/types/user";
import toast from "react-hot-toast";
import Modal from "./Modal";
import AddUser from "./AddUser";
import { useRouter } from "next/navigation";
import { useDispatch } from "react-redux";
import { setEmpty } from "@/store/adminSlice";

type ModalMode = 'create' | 'edit' | 'delete';

const UserTable = () => {
    const [isLoading, setLoading] = useState(false);
    const [users, setUsers] = useState<IUser[] | undefined>([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState<number>(0);
    const [dropdownVisibility, setDropdownVisibility] = useState<string | null>(null);
    const [modalFor, setModalFor] = useState<ModalMode | "">("");
    const [selectedUser, setSelectedUser] = useState<IUser | undefined>();
    const router = useRouter();
    const dispatch = useDispatch();

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
                dispatch(setEmpty());
                router.push('/login');
            }
        } catch (error) {
            toast.error("Unable to fetch users. Please try again later.");
        } finally {
            setLoading(false);
        }
    };

    const handlePagination = (page: number) => {
        setCurrentPage(page);
        fetchUsers(page);
    };

    const toggleDropdown = (user_id: string) => {
        setDropdownVisibility(prevId => prevId === user_id ? null : user_id);
    };

    const handleModal = (thisfor: ModalMode, user: IUser) => {
        setDropdownVisibility(null);
        setModalFor(thisfor);
        setSelectedUser(user);
    };

    const handleDelete = async (user: IUser) => {
        setUsers(prevUsers => prevUsers?.filter(prev => prev._id !== user._id));
        const result = await deleteUser(user._id as string);
        if (result.status) {
            toast.success(`User ${user.firstName} ${user.lastName} deleted!`);
        } else {
            toast.error(result.message);
        }
    };

    const handleEdit = async (updatedUser: IUser) => {
        setUsers(prevUsers => prevUsers?.map(user =>
            user._id === updatedUser._id ? { ...user, ...updatedUser } : user));
        const result = await updateUser(updatedUser);
        if (result.status) {
            toast.success(`User ${updatedUser.firstName}'s details updated successfully!`);
        } else if (result.message === "Unauthorized, please log in") {
            toast.error(result.message);
            dispatch(setEmpty());
            router.push('/login');
        } else {
            toast.error(result.message);
        }
    };

    const addNewUser = (newUser: IUser | undefined) => {
        try {
            if (newUser) {
                setUsers(prevUsers => [...prevUsers || [], newUser]);
            }
        } catch (error) {
            toast.error("Failed to add new user.");
        }
    };

    const getStartIndex = () => (currentPage - 1) * 5 + 1;

    return (
        <div className="w-full max-w-7xl mx-auto p-6">
            <div className="mb-6">
                <AddUser isAdded={addNewUser} />
            </div>

            <div className="bg-zinc-900 rounded-lg shadow-lg overflow-hidden">
                <div className="overflow-x-auto">
                    <Table className="w-full">
                        <TableCaption className="py-4 text-zinc-400">
                            List of registered users
                        </TableCaption>
                        <TableHeader>
                            <TableRow className="border-b border-zinc-800">
                                <TableHead className="w-16 text-center font-semibold text-zinc-300">NO</TableHead>
                                <TableHead className="w-36 font-semibold text-zinc-300">User ID</TableHead>
                                <TableHead className="w-32 font-semibold text-zinc-300">First Name</TableHead>
                                <TableHead className="w-32 font-semibold text-zinc-300">Last Name</TableHead>
                                <TableHead className="font-semibold text-zinc-300">Email</TableHead>
                                <TableHead className="w-32 font-semibold text-zinc-300">Phone</TableHead>
                                <TableHead className="w-20 text-center font-semibold text-zinc-300">Actions</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {isLoading ? (
                                <TableRow>
                                    <TableCell colSpan={7} className="text-center py-8">
                                        <div className="flex items-center justify-center">
                                            <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-zinc-500"></div>
                                        </div>
                                    </TableCell>
                                </TableRow>
                            ) : users && users.length > 0 ? (
                                users.map((user, index) => (
                                    <TableRow key={user._id} className="border-b border-zinc-800 hover:bg-zinc-800/50 transition-colors">
                                        <TableCell className="text-center text-zinc-300">{getStartIndex() + index}</TableCell>
                                        <TableCell className="font-mono text-sm text-zinc-400">{user._id}</TableCell>
                                        <TableCell className="text-zinc-300">{user.firstName}</TableCell>
                                        <TableCell className="text-zinc-300">{user.lastName}</TableCell>
                                        <TableCell className="text-zinc-300">{user.email}</TableCell>
                                        <TableCell className="text-zinc-300">{user.phoneNumber}</TableCell>
                                        <TableCell>
                                            <div className="relative dropdown-container">
                                                <button
                                                    onClick={() => toggleDropdown(user._id as string)}
                                                    className="p-2 rounded-full hover:bg-zinc-700 transition-colors duration-200 w-8 h-8 flex items-center justify-center mx-auto"
                                                >
                                                    <MoreVertical className="w-4 h-4 text-zinc-400" />
                                                </button>
                                                {dropdownVisibility === user._id && (
                                                    <div className="absolute right-0 mt-2 w-48 bg-zinc-900 border border-zinc-700 rounded-md shadow-xl z-10">
                                                        <ul className="py-1">
                                                            <li>
                                                                <button
                                                                    className="w-full px-4 py-2 text-sm text-left text-zinc-300 hover:bg-zinc-800 flex items-center gap-2"
                                                                    onClick={() => handleModal("edit", user)}
                                                                >
                                                                    <Edit2 className="w-4 h-4" />
                                                                    Edit User
                                                                </button>
                                                            </li>
                                                            <li>
                                                                <button
                                                                    className="w-full px-4 py-2 text-sm text-left text-zinc-300 hover:bg-zinc-800 flex items-center gap-2"
                                                                    onClick={() => handleModal("delete", user)}
                                                                >
                                                                    <Trash2 className="w-4 h-4" />
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
                                    <TableCell colSpan={7} className="text-center py-8 text-zinc-500">
                                        No users found.
                                    </TableCell>
                                </TableRow>
                            )}
                        </TableBody>
                    </Table>
                </div>

                {totalPages > 1 && (
                    <div className="flex justify-between items-center px-6 py-4 border-t border-zinc-800">
                        <button
                            onClick={() => handlePagination(currentPage - 1)}
                            disabled={currentPage <= 1}
                            className="px-4 py-2 bg-zinc-800 text-zinc-300 rounded-md disabled:opacity-50 disabled:cursor-not-allowed hover:bg-zinc-700 transition-colors"
                        >
                            Previous
                        </button>
                        <span className="text-zinc-400">
                            Page {currentPage} of {totalPages}
                        </span>
                        <button
                            onClick={() => handlePagination(currentPage + 1)}
                            disabled={currentPage >= totalPages}
                            className="px-4 py-2 bg-zinc-800 text-zinc-300 rounded-md disabled:opacity-50 disabled:cursor-not-allowed hover:bg-zinc-700 transition-colors"
                        >
                            Next
                        </button>
                    </div>
                )}
            </div>

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