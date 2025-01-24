export interface LoyaltyTiersProps {
    tier: string;
    eligibility: string;
    rewards: string;
    discounts: string;
    min_spending_amount: number;
    max_spending_amount: number;
}

export type LoyaltyTiersResponse = LoyaltyTiersProps[]


export interface TierInfo {
    tier_id: number;
    tier: string;
}

export type TierInfoResponse = TierInfo[]