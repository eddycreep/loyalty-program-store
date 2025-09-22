export interface Organisation {
    uid: number,
    name: string,
    description: string,
    email: string,
    website: string,
    logo: string,
    createdAt: string,
    updatedAt: string,
    active: boolean,
    isDeleted: boolean
}

export type OrganisationsResponse = {
    message: string;
    data: Organisation[] | null;
}

export type OrganisationResponse = {
    message: string;
    data: Organisation;
}