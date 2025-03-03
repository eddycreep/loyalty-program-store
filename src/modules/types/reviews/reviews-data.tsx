export interface Reviews {
    review_id: number,
    review_title: string,
    description: string,
    review_category: string,
    store_id: string,
    reward: string,
    reward_price: number,
    reward_type: string,
    region: string,
    loyalty_tier: string,
    age_group: string,
    start_date: string,
    expiry_date: string,
    isActive: boolean
}

export interface ReviewInfo {
    review_id: number,
    review_title: string,
    review_category: string,
}

export type ReviewInfoResponse = ReviewInfo[]