export interface Branch {
    uid: number,
    name: string,
    address: string,
    contactNumber: string,
    email: string,
    isActive: boolean,
    managerName: string,
    operatingHours: JSON,
    isDeleted: boolean,
    createdAt: string,
    updatedAt: string
}

export type BranchesResponse = {
    message: string;
    data: Branch[];
}

export type BranchResponse = {
    message: string;
    data: Branch;
}

// Create Branch
export interface CreateBranch {
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


export interface SuccessResponse {
    message: string;
}