export interface IUser {
    _id?: string,
    firstName: string
    lastName: string,
    email: string,
    phoneNumber: string,
    role?: string
}

export interface IUsersResponse {
    status: boolean;
    data?: IUser[],
    pagination?: {
        totalUsers: number
        currentPage: number,
        totalPage: number,
        pageSize: number
    }
    message: string;
}


//
export interface ILoginData {
    email: string,
    password: string
}

export interface ILoginResponse {
    status: boolean;
    data?: {
        _id: string,
        firstName: string
        lastName: string,
        email: string,
        phoneNumber: string,
        role: string
    }
    message: string;
}

//
export interface ICreateUser {
    firstName: string,
    lastName: string,
    email: string,
    phoneNumber: string,
    role: string
}

export interface ICreateUserResponse {
    status: boolean,
    data?: {
        firstName: string,
        lastName: string,
        email: string,
        phoneNumber: string,
        role: string,
        _id: string,
        createdAt: string,
        updatedAt: string,
        __v: string
    },
    message: string;
}

//
export interface IUpdateUser {
    _id?: string,
    firstName?: string,
    lastName?: string,
    email?: string,
    phoneNumber?: string,
}

export interface IupdateUserResponse {
    status: boolean,
    data?: {
        firstName: string,
        lastName: string,
        email: string,
        phoneNumber: string,
        role: string,
        _id: string,
        createdAt: string,
        updatedAt: string,
        __v: string
    },
    message: string;
}


// 
export interface ILoginForm {
    email: string,
    password: string,
}

export interface ILogoutResponse {
    message?: string
    data?: {}
    status?: boolean
}