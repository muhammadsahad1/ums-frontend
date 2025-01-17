import {
    ICreateUser,
    ICreateUserResponse,
    ILoginData,
    ILoginResponse,
    IUpdateUser,
    IupdateUserResponse,
    IUsersResponse,
} from "@/types/user";
import axioInstance from "@/utils/api";
import { userAPI } from "./user/userApi";

// ================================> User API's <============================== //

export const getUsers = async (): Promise<IUsersResponse> => {
    try {
        const response = await axioInstance.get(userAPI.getUsers);
        console.log("res ==>", response);
        return response.data;
    } catch (error: any) {
        console.error("Error in getUsers:", error);
        const message =
            error.response?.data?.message ||
            "Unable to fetch users. Please try again later.";
        return {
            status: false,
            message,
        };
    }
};

export const login = async (formdata: ILoginData): Promise<ILoginResponse> => {
    try {
        const response = await axioInstance.post(userAPI.login, formdata);
        return response.data;
    } catch (error: any) {
        console.error("Error in login:", error);
        const message =
            error.response?.data?.message ||
            "Login failed. Please check your credentials and try again.";
        return {
            status: false,
            message,
        };
    }
};

export const createUser = async (
    formdata: ICreateUser
): Promise<ICreateUserResponse> => {
    try {
        const response = await axioInstance.post(userAPI.createUser, formdata);
        return response.data;
    } catch (error: any) {
        console.error("Error in createUser:", error);
        const message =
            error.response?.data?.message ||
            "Failed to create user. Please check the details and try again.";
        return {
            status: false,
            message,
        };
    }
};

export const updateUser = async (formdata: IUpdateUser): Promise<IupdateUserResponse> => {
    try {
        const response = await axioInstance.put(
            `${userAPI.updateUser}${formdata._id}`,
            formdata
        );
        return response.data;
    } catch (error: any) {
        console.error("Error in updateUser:", error);
        const message =
            error.response?.data?.message ||
            "Failed to update user. Please try again later.";
        return {
            status: false,
            message,
        };
    }
};

export const deleteUser = async (user_id: string) => {
    try {
        const response = await axioInstance.put(`${userAPI.deleteUser}${user_id}`);
        return response.data;
    } catch (error: any) {
        console.error("Error in deleteUser:", error);
        const message =
            error.response?.data?.message ||
            "Failed to delete user. Please try again later.";
        return {
            status: false,
            message,
        };
    }
};


export const logout = async () => {
    try {
        const response = await axioInstance.post(userAPI.logout)
        return response
    } catch (error: any) {
        console.error("Error in deleteUser:", error);
        const message =
            error.response?.data?.message ||
            "Failed to logout user. Please try again later.";
        return {
            status: false,
            message,
        };
    }
}