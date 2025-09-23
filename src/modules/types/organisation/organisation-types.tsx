// Single Organisation
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

// All Organisations Response
export type OrganisationsResponse = {
    message: string;
    data: Organisation[] | null;
}

// Single Organisation Response
export type OrganisationResponse = {
    message: string;
    data: Organisation;
}

// Create Organisation
export interface CreateOrganisation {
    name: string,
    description: string,
    email: string,
    website: string,
    logo: string
}