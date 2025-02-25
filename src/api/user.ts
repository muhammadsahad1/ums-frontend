import {
    ICreateUser,
    ICreateUserResponse,
    ILoginData,
    ILoginResponse,
    ILogoutResponse,
    IUpdateUser,
    IupdateUserResponse,
    IUsersResponse,
} from "@/types/user";
import axioInstance from "@/utils/api";
import { userAPI } from "./user/userApi";
import { clearTokens, getTokens, setTokens } from "@/utils/tokenManagement";
import { IRefreshResponse } from "@/types/Token";

// ================================> User API's <============================== //

export const getUsers = async (page: number): Promise<IUsersResponse> => {
    try {
        const response = await axioInstance.get(`${userAPI.getUsers}/?limit=${5}&page=${page}`);
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
        const { tokens } = response.data

        // here setup the tokens in localstorage
        setTokens(tokens)

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
        console.log("new ", formdata)
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
        const response = await axioInstance.post(`${userAPI.deleteUser}${user_id}`);
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


export const logout = async (): Promise<ILogoutResponse> => {
    try {
        const response = await axioInstance.post(userAPI.logout)
        return response.data
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

// refresh function 
export const refreshToken = async (): Promise<string | undefined> => {
    try {
        const tokens = getTokens()

        if (!tokens?.refresh_token) throw new Error("No refresh token available")

        const response = await axioInstance.post<IRefreshResponse>(userAPI.refresh, { refresh_token: refreshToken })

        setTokens(response.data.tokens)
        return response.data.tokens.access_token

    } catch (error) {
        clearTokens()
        throw error
    }
}