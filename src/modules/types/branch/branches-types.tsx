export interface Branch {
    uid: number,
    name: string,
    address: string,
    contactNumber: string,
    email: string,
    isActive: true,
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