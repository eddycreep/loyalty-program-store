export interface Special {
    special_id: number,
    special_name: string,
    special: string,
    description: string,
    special_type: string,
    special_price: number,
    store_id: string,
    start_date: string,
    expiry_date: string,
    special_value: string,
    loyalty_tier: string,
    age_group: string,
    isActive: number
}

export interface SaveSpecial {
    special_name: string,
    special: string,
    description: string,
    special_price: number,
    special_type: string,
    store_id: string,
    start_date: string,
    expiry_date: string,
    special_value: string,
    loyalty_tier: string,
    age_group: string,
    isActive: number
}

//special items
export interface SpecialItems {
    special_id: number,
    product_description: string,
}

export interface SpecialInfo {
    special_id: number,
    special_name: string,
    special: string,
    special_type: string
}
export type SpecialInfoRes = SpecialInfo[]