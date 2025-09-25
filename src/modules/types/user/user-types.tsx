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
    name: string,
    address: string,
    contactNumber: string,
    email: string,
    managerName: string,
    operatingHours: {
        days: string[],
        opening: string,
        closing: string
    },
    organisationId: number
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