export interface Products {
    id: number,
    item_code: string
    selling_incl_1: number,
    special_price_incl: number,
    description_1: string
}
export type ProductsResponse = Products[]


export interface Stores {
    id: number,
    code: string,
    description: string,
    address_1: string,
    address_2: string,
    address_3: string,
    address_4: string,
    address_5: string,
    address_6: string,
    address_7: string,
    address_8: string,
}
export type StoresResponse = Stores[]


export interface Tiers {
    tier_id: number,
    tier: string,
    eligibility: string,
    rewards: string,
    discounts: string,
    min_spending_amount: number,
    max_spending_amount: number,
}
export type TiersResponse = Tiers[]


export interface AgeGroups {
    age_group_id: number,
    age_range: string,
    group_name: string,
}
export type AgeGroupsResponse = AgeGroups[]


export interface UserActivity {
    emp_id: number,
    emp_name: string,
    activity_id: number,
    activity: string,
    activity_type: string,
    time_logged: string,
    log_message: string,
}