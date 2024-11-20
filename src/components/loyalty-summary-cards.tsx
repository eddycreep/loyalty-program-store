import { Card, CardHeader, CardContent } from "@/components/ui/card"; // Adjust import path if necessary
import { DollarSign, TrendingUp, ShoppingCart, Users } from "lucide-react";

// Dummy data for cards
const activeMembersData = [
    { title: "Active Loyalty Members", value: "15,234", isCurrency: false, increase: "234 from last month" }
];

const redeemedSpecialsData = [
    { title: "Total Specials Redeemed", value: "45,678", isCurrency: false, increase: "1,234 from last month" }
];

const redeemedRewardsData = [
    { title: "Rewards Redeemed", value: "12,345", isCurrency: false, increase: "543 from last month" }
];

const revenueSpecialsData = [
    { title: "Revenue from Specials", value: "234,567", isCurrency: true, increase: "12,345 from last month" }
];

export const LoyaltySummaryCards = () => {
    return (
        // Container with flex-wrap for small/medium screens and justify-between for large screens
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6 p-2">
            <div>
                {activeMembersData.map((card, index) => (
                    // Adjusted card width: w-[315px] on small screens, wider on larger screens
                    <Card key={index} className="shadow-lg hover:shadow-xl w-[315px] md:w-[400px] lg:w-[390px]">
                        <CardHeader>
                            <div className="flex items-center justify-between">
                                <p className="text-gray-500 text-sm p-2">Active Loyalty Members</p>
                                <div className="p-2 bg-indigo-300 text-indigo-600 rounded-full">
                                    <Users size={24} />
                                </div>
                            </div>
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold">
                                {card.isCurrency ? `R${card.value || 0}` : card.value || 0}
                            </div>
                            <div className="text-gray-400 text-sm">+{card.increase}</div>
                        </CardContent>
                    </Card>
                ))}
            </div>
            <div>
                {redeemedSpecialsData.map((card, index) => (
                    <Card key={index} className="shadow-lg hover:shadow-xl w-[315px] md:w-[400px] lg:w-[390px]">
                        <CardHeader>
                            <div className="flex items-center justify-between">
                                <p className="text-gray-500 text-sm">Total Specials Redeemed</p>
                                <div className="p-2 bg-indigo-300 text-indigo-600 rounded-full">
                                    <ShoppingCart size={24} />
                                </div>
                            </div>
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold">
                                {card.isCurrency ? `R${card.value || 0}` : card.value || 0}
                            </div>
                            <div className="text-gray-400 text-sm">+{card.increase}</div>
                        </CardContent>
                    </Card>
                ))}
            </div>
            <div>
                {redeemedRewardsData.map((card, index) => (
                    <Card key={index} className="shadow-lg hover:shadow-xl w-[315px] md:w-[400px] lg:w-[390px]">
                        <CardHeader>
                            <div className="flex items-center justify-between">
                                <p className="text-gray-500 text-sm">Rewards Redeemed</p>
                                <div className="p-2 bg-indigo-300 text-indigo-600 rounded-full">
                                    <TrendingUp size={24} />
                                </div>
                            </div>
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold">
                                {card.isCurrency ? `R${card.value || 0}` : card.value || 0}
                            </div>
                            <div className="text-gray-400 text-sm">+{card.increase}</div>
                        </CardContent>
                    </Card>
                ))}
            </div>
            <div>
                {revenueSpecialsData.map((card, index) => (
                    <Card key={index} className="shadow-lg hover:shadow-xl w-[315px] md:w-[400px] lg:w-[390px]">
                        <CardHeader>
                            <div className="flex items-center justify-between">
                                <p className="text-gray-500 text-sm">Revenue from Specials</p>
                                <div className="p-2 bg-indigo-300 text-indigo-600 rounded-full">
                                    <DollarSign size={24} />
                                </div>
                            </div>
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold">
                                {card.isCurrency ? `R${card.value || 0}` : card.value || 0}
                            </div>
                            <div className="text-gray-400 text-sm">+{card.increase}</div>
                        </CardContent>
                    </Card>
                ))}
            </div>
        </div>
    );
};