// Updated: Customer interface matches LoyaltyCustomer entity structure
export interface Customer {
    customer_id: number;
    first_name: string;
    last_name: string;
    mobile_number: string;
    age: number;
    gender: string;
    birthday: string;
    ethnicity: string;
    id_number: string;
    employment_status: string;
    email: string;
    address: string;
    signup_date: string;
    total_purchases: number | null;
    loyalty_tier: string;
    preferred_contact_method: string;
    profile_image: string | null;
    card_number: string | null;
    pushToken: string | null;
    insertedAt: string;
    updatedAt: string;
    organisationId?: {
        uid: number;
        name: string;
    } | null;
}

export type CustomersResponse = {
    message: string;
    data: Customer[];
}

export type CustomerResponse = {
    message: string;
    data: Customer;
}

// Create Customer (for signup)
export interface CreateCustomer {
    organisationId: number;
    first_name: string;
    last_name: string;
    mobile_number: string;
    age: number;
    gender: string;
    birthday: string;
    ethnicity: string;
    id_number: string;
    employment_status: string;
    email: string;
    address: string;
    preferred_contact_method: string;
}