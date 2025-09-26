export interface User {
    uid: number,
    username: string,
    password: string,
    id_no: string,
    emp_name: string,
    emp_surname: string,
    role: UserRole,
    insertedAt: string,
    updatedAt: string,
    active: boolean,
    isDeleted: boolean,
    deletedAt: string
}

export type UsersResponse = {
    message: string;
    data: User[];
}

export type UserResponse = {
    message: string;
    data: User;
}

// Create Branch
export interface CreateUser {
    username: string;
    password: string;
    id_no: string;
    emp_name: string;
    emp_surname: string;
    role: UserRole;
    organisation: number;
    branch: number;
}

// UserRole 
export enum UserRole {
    ADMIN = 'Admin',
    USER = 'User',
    MANAGER = 'Manager',
    SUPERVISOR = 'Supervisor',
    HR = 'HR',
    MD = 'MD',
    OWNER = 'Owner',
}