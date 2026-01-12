// ✅ Updated: Reward interface for relationship
export interface Reward {
    reward_id: number;
    reward_title: string;
    reward_type: string;
    reward_price: number;
    reward: string;
}

// ✅ Updated: Reviews interface - removed reward fields, added reward_id and reward relationship
export interface Reviews {
    review_id: number,
    review_title: string,
    description: string,
    review_category: string,
    store_id: string,
    reward_id?: number | null, // ✅ NEW: Optional reward ID
    reward?: Reward | null, // ✅ NEW: Reward relationship (when included in API response)
    region: string,
    loyalty_tier: string,
    age_group: string,
    start_date: string,
    expiry_date: string,
    isActive: boolean
    branch: number, // Removed: organisation (only branchId is saved)
}

export interface ReviewInfo {
    review_id: number,
    review_title: string,
    review_category: string,
}

export type ReviewInfoResponse = ReviewInfo[]