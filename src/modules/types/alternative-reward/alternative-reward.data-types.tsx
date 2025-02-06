export interface AlternativeRewardProps {
    reward_id: number;
    reward_title:  string;
    description:  string;
    reward:  string;
    reward_type:  string;
    reward_price: number;
    start_date:  string;
    expiry_date:  string;
    loyalty_tier:  string;
    age_group:  string;
    isActive: boolean;
}

export type AlternativeRewardResponse = AlternativeRewardProps[]


export interface AlternativeRewardInfo {
    reward_id: number;
    reward_title: string;
}

export type AlternativeRewardInfoResponse = AlternativeRewardInfo[]