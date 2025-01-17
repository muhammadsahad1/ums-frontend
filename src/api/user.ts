import { ICreateUser, ICreateUserResponse, ILoginData, ILoginResponse, IUpdateUser } from "@/types/user";
import axioInstance from "@/utils/api";
import { userAPI } from "./user/userApi";

// ================================> User API's <============================== //

export const login = async (formdata: ILoginData): Promise<ILoginResponse> => {
    try {
        console.log(formdata);
        
        const response = await axioInstance.post(userAPI.login, formdata)
        console.log("res ==>",response);
        
        return response.data
        
    } catch (error) {
        console.log("err in login", error)
        return {
            status: false,
            message: "Error in login axios"
        }
    }
}

export const createUser = async (formdata: ICreateUser): Promise<ICreateUserResponse> => {
    try {
        const response = await axioInstance.post(userAPI.createUser, formdata)
        return response.data
    } catch (error) {
        console.log("err in createUser", error)
        return {
            status: false,
            message: "Error in createUser axios"
        }
    }
}

export const updateUser = async (fromdata: IUpdateUser) => {
    try {
        const response = await axioInstance.put(`${userAPI.updateUser}${fromdata._id}`, fromdata)
        return response.data
    } catch (error) {
        console.log("err in createUser", error)
        return {
            status: false,
            message: "Error in updating user axios"
        }
    }
}

export const deleteUser = async (user_id: string) => {
    try {
        const response = await axioInstance.put(`${userAPI.deleteUser}${user_id}`)
        return response.data
    } catch (error) {
        console.log("err in createUser", error)
        return {
            status: false,
            message: "Error in updating user axios"
        }
    }
}

