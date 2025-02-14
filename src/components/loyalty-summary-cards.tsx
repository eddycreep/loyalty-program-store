import { Card, CardHeader, CardContent } from "@/components/ui/card"; // Adjust import path if necessary
import { DollarSign, TrendingUp, ShoppingCart, Users, Trophy, Coins } from "lucide-react";

// Dummy data for cards
const activeMembersData = [
    { title: "Active Loyalty Members", value: "0", isCurrency: false, increase: "0 from last month" }
];

const redeemedSpecialsData = [
    { title: "Total Specials Redeemed", value: "0", isCurrency: false, increase: "0 from last month" }
];

const redeemedRewardsData = [
    { title: "Rewards Redeemed", value: "0", isCurrency: false, increase: "0 from last month" }
];

const revenueSpecialsData = [
    { title: "Revenue from Specials", value: "0", isCurrency: true, increase: "0 from last month" }
];

export const LoyaltySummaryCards = () => {
    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            <div>
                {activeMembersData.map((card, index) => (
                    <Card key={index} className="shadow-lg hover:shadow-xl w-full">
                        <CardHeader>
                            <div className="flex items-center justify-between">
                                <p className="text-black font-bold text-sm p-2">Active Loyalty Members</p>
                                <div className="p-2 bg-indigo-300 text-indigo-600 rounded-full">
                                    <Users size={24} />
                                </div>
                            </div>
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl text-black font-bold">
                                {card.isCurrency ? `R${card.value || 0}` : card.value || 0}
                            </div>
                            <div className="text-gray-400 text-sm">+{card.increase}</div>
                        </CardContent>
                    </Card>
                ))}
            </div>
            <div>
                {redeemedSpecialsData.map((card, index) => (
                    <Card key={index} className="shadow-lg hover:shadow-xl w-full">
                        <CardHeader>
                            <div className="flex items-center justify-between">
                                <p className="text-black font-bold text-sm">Total Specials Redeemed</p>
                                <div className="p-2 bg-indigo-300 text-indigo-600 rounded-full">
                                    <ShoppingCart size={24} />
                                </div>
                            </div>
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl text-black font-bold">
                                {card.isCurrency ? `R${card.value || 0}` : card.value || 0}
                            </div>
                            <div className="text-gray-400 text-sm">+{card.increase}</div>
                        </CardContent>
                    </Card>
                ))}
            </div>
            <div>
                {redeemedRewardsData.map((card, index) => (
                    <Card key={index} className="shadow-lg hover:shadow-xl w-full">
                        <CardHeader>
                            <div className="flex items-center justify-between">
                                <p className="text-black font-bold text-sm">Rewards Redeemed</p>
                                <div className="p-2 bg-indigo-300 text-indigo-600 rounded-full">
                                    <Trophy size={24} />
                                </div>
                            </div>
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl text-black font-bold">
                                {card.isCurrency ? `R${card.value || 0}` : card.value || 0}
                            </div>
                            <div className="text-gray-400 text-sm">+{card.increase}</div>
                        </CardContent>
                    </Card>
                ))}
            </div>
            <div>
                {revenueSpecialsData.map((card, index) => (
                    <Card key={index} className="shadow-lg hover:shadow-xl w-full">
                        <CardHeader>
                            <div className="flex items-center justify-between">
                                <p className="text-black font-bold text-sm">Revenue from Specials</p>
                                <div className="p-2 bg-indigo-300 text-indigo-600 rounded-full">
                                    <Coins size={24} />
                                </div>
                            </div>
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl text-black font-bold">
                                {card.isCurrency ? `R${card.value || 0}` : card.value || 0}
                            </div>
                            <div className="text-gray-400 text-sm">+R{card.increase}</div>
                        </CardContent>
                    </Card>
                ))}
            </div>
        </div>
    );
};