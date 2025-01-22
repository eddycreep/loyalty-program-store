export interface Rewards {
    reward_title: string,
    description: string,
    reward: string,
    reward_type: string,
    reward_price: number,
    store_id: string,
    region: string,
    start_date: string,
    expiry_date: string,
    isActive: boolean; 
    loyaltyTier: string,
    ageGroup: string,
}

export interface RewardInfo {
    reward_id: number,
    reward_title: string,
    reward_type: string,
}

export type RewardInfoResponse = RewardInfo[]