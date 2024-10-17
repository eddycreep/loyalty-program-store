'use client'

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Smartphone, Mail, MessageSquare, Globe, QrCode, Edit, Tag } from "lucide-react"
import { Calendar, Gift, Heart, Soup } from 'lucide-react'
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Label } from "@/components/ui/label";
import { RewardCards } from "@/components/component/rewards-cards";
import { EditRewards } from "@/components/component/edit-rewards"

// Define the Reward type
type Reward = {
    id: number
    task: string
    reward: string
    type: 'percentage' | 'fixed'
    icon: JSX.Element
}

// Define the initial rewards
const initialRewards: Reward[] = [
        // { id: 1, task: 'Share product on social media', reward: '10% off next purchase', type: 'percentage', icon: <Share2 className="h-6 w-6" /> },
        { id: 1, task: 'Attend in-store event', reward: '$5 store credit', type: 'fixed', icon: <Calendar className="h-6 w-6" /> },
        { id: 2, task: 'Refer a friend', reward: 'Free gift with next purchase', type: 'fixed', icon: <Gift className="h-6 w-6" /> },
        // { id: 4, task: 'Join loyalty program', reward: '15% off first purchase', type: 'percentage', icon: <Users className="h-6 w-6" /> },
        { id: 3, task: 'Complete a Product Review', reward: '5% off reviewed product', type: 'percentage', icon: <Soup className="h-6 w-6" /> },
]

export const RewardsModule = () => {
    const [editProductsPopup, setEditProductsPopup] = useState(false);
    const headers = ['Title', 'Task', 'Reward', 'Type', 'Action']

    //vercel
    const [rewards, setRewards] = useState<Reward[]>(initialRewards)
    const [newReward, setNewReward] = useState<Omit<Reward, 'id' | 'icon'>>({ task: '', reward: '', type: 'percentage' })

    const handleAddReward = () => {
        if (newReward.task && newReward.reward) {
            setRewards([...rewards, { ...newReward, id: rewards.length + 1, icon: <Heart className="h-6 w-6" /> }])
            setNewReward({ task: '', reward: '', type: 'percentage' })
        }
    }

    const handleDeleteReward = (id: number) => {
        setRewards(rewards.filter(reward => reward.id !== id))
    }

    const toggleEditProductPage = () => {
        setEditProductsPopup(!editProductsPopup);
    };

    return (
        <div className='w-full h-full flex flex-col gap-4 rounded-lg overflow-y mb-80'>
            <div>
                <RewardCards />
            </div>
            <div>
            <div className="flex justify-between">
                    <div className="flex flex-col pl-2 pt-6">
                        <h4 className="text-2xl font-semibold text-red">Customer Rewards</h4>
                        <p className="text-gray-500">Provide customers with multiple options to redeem their rewards.</p>
                    </div>
                    <div className='flex gap-2 pt-8 pr-2'>
                            <Dialog>
                                <DialogTrigger asChild>
                                    <Button className="bg-black text-white p-2 w-40 rounded-lg hover:bg-red">Add Reward</Button>
                                </DialogTrigger>
                                <DialogContent className="sm:max-w-[600px]">
                                    <DialogHeader>
                                    <DialogTitle>Add New Group Special</DialogTitle>
                                    <DialogDescription>
                                        Select the product and set the special with the required fields. Click save once completed.
                                    </DialogDescription>
                                    </DialogHeader>
                                    <div className="grid gap-4 py-4">
                                        <div className="flex gap-4">
                                            <div className="w-full">
                                                <Label htmlFor="name" className="text-left pt-4">
                                                    Special ID:
                                                </Label>
                                                <select 
                                                    className="w-full p-2 rounded-lg border border-gray-300"
                                                    // onChange={(e) => setSpecialGroupId(Number(e.target.value))} // Store the selected product idx
                                                >
                                                        <option value="" className="dash-text">Select Special</option>
                                                            <option value="1">Buy 3 Get 20% Off</option>
                                                            <option value="2">Buy 1 Get 5% Off</option>
                                                            <option value="3">Buy 4 Get 15% Off</option>
                                                            <option value="4">Buy 2 Get R20 Off</option>
                                                            <option value="5">Buy 3 Get R50 Off</option>
                                                </select>
                                            </div>
                                            <div className="w-full">
                                                <Label htmlFor="name" className="text-left pt-4">
                                                    Product:
                                                </Label>
                                                <select 
                                                    className="w-full p-2 rounded-lg border border-gray-300"
                                                    // onChange={(e) => setGroupProduct(e.target.value)}
                                                >
                                                        {/* {data?.map(({ idx, Product_Description }) => */}
                                                            <option  value="TEST">TEST</option>
                                                        {/* )} */}
                                                </select>
                                            </div>
                                        </div>
                                        <div className="flex gap-4">
                                            <div className="w-full">
                                                <Label htmlFor="name" className="text-left pt-4">
                                                    Special:
                                                </Label>
                                                <input type="input" placeholder="buy 2 and get 20% off next purchase" className='w-full p-2 rounded-lg border border-gray-300'/>
                                            </div>
                                            <div className="w-full">
                                                <Label htmlFor="name" className="text-left pt-4">
                                                    Special Price:
                                                </Label>
                                                <input type="input" placeholder="10.99"  className='w-full p-2 rounded-lg border border-gray-300'/>
                                            </div>
                                        </div>
                                        <div className="flex gap-4">
                                            <div className="w-full">
                                                <Label htmlFor="name" className="text-left pt-4">
                                                    Special Type:
                                                </Label>
                                                <select 
                                                    className="w-full p-2 rounded-lg border border-gray-300"
                                                    // onChange={(e) => setSpecialGroupType(e.target.value)}
                                                >
                                                        <option>Select Type</option>
                                                            <option value="Combined Special">Combined Special</option>
                                                </select>
                                            </div>
                                            <div className="w-full">
                                                <Label htmlFor="name" className="text-left pt-4">
                                                    Special Value:
                                                </Label>
                                                <select 
                                                    className="w-full p-2 rounded-lg border border-gray-300"
                                                    // onChange={(e) => setSpecialType(e.target.value)}
                                                >
                                                        <option>Select Value</option>
                                                            <option value="Percentage">Percentage</option>
                                                            <option value="Amount">Amount</option>
                                                </select>
                                            </div>
                                        </div>
                                        <div className="flex gap-4">
                                            <div className="w-full">
                                                <Label htmlFor="username" className="text-left pt-4">
                                                    Start Date:
                                                </Label>
                                                <input type="date"className='w-full p-2 rounded-lg border border-gray-300'/>
                                            </div>
                                            <div className="w-full">
                                                <Label htmlFor="username" className="text-left pt-4">
                                                    Expiry Date:
                                                </Label>
                                                <input type="date" className='w-full p-2 rounded-lg border border-gray-300'/>
                                            </div>
                                        </div>
                                        <div className="flex flex-col w-full">
                                                <Label htmlFor="isactive" className="text-left pt-4">
                                                    Active/Inactive:
                                                </Label>
                                                <div className="checkbox-apple">
                                                    <input className="yep" 
                                                    id="check-apple" 
                                                    type="checkbox" 
                                                    // onClick={ handleGroupSpecialToggle }
                                                />
                                                    <label htmlFor="check-apple"></label>
                                                </div>
                                            </div>
                                    </div>
                                    <DialogFooter>
                                        <button  className="bg-black text-white p-2 w-full rounded-lg hover:bg-red">
                                            Save
                                        </button>
                                    </DialogFooter>
                                </DialogContent>
                            </Dialog>
                    </div>
                </div>
                <div className="bg-white text-gray-500 flex items-center justify-between divide-x divide-gray-500 p-3 mt-4 mx-2 rounded shadow-lg">
                    {headers?.map((header, index) => (
                        <p key={index} className={`text-xs uppercase font-medium flex-1 text-center ${index === 1 ? 'hidden lg:block' : ''}`}>
                            {header}
                        </p>
                    ))}
                </div>
                <div className="pt-2 max-h-[550px] pb-2 space-y-2">
                {/* {allProductSpecials?.map(({ special_id, special, special_type, store_id, start_date, expiry_date, special_value, isActive, product_description, special_price }) => { */}
                            <div className="bg-white flex flex-col p-3 mx-2 rounded shadow-lg">
                                <div className="flex items-center justify-between">
                                    <p className="text-sm flex-1 text-center text-red">Product Reviews</p>
                                    <p className="text-sm flex-1 text-center">Customers can earn rewards by submitting product reviews</p>
                                    <p className="text-sm flex-1 text-center">10% Discount on Cart</p>
                                    <p className="text-sm flex-1 text-center">Percentage</p>
                                    {editProductsPopup && <EditRewards onClose={ toggleEditProductPage } />}
                                    <button className="text-sm flex-1 text-center flex items-center justify-center cursor-pointer" onClick={ toggleEditProductPage }>
                                        <Edit />
                                    </button>
                                </div>
                            </div>
                            <div className="bg-white flex flex-col p-3 mx-2 rounded shadow-lg">
                                <div className="flex items-center justify-between">
                                    <p className="text-sm flex-1 text-center text-red">Product Reviews</p>
                                    <p className="text-sm flex-1 text-center">Customers can earn rewards by submitting product reviews</p>
                                    <p className="text-sm flex-1 text-center">10% Discount on Cart</p>
                                    <p className="text-sm flex-1 text-center">Percentage</p>
                                    <p className="text-sm flex-1 text-center flex items-center justify-center cursor-pointer">
                                        <Edit />
                                    </p>
                                </div>
                            </div>
                            <div className="bg-white flex flex-col p-3 mx-2 rounded shadow-lg">
                                <div className="flex items-center justify-between">
                                    <p className="text-sm flex-1 text-center text-red">Product Reviews</p>
                                    <p className="text-sm flex-1 text-center">Customers can earn rewards by submitting product reviews</p>
                                    <p className="text-sm flex-1 text-center">10% Discount on Cart</p>
                                    <p className="text-sm flex-1 text-center">Percentage</p>
                                    <p className="text-sm flex-1 text-center flex items-center justify-center cursor-pointer">
                                        <Edit />
                                    </p>
                                </div>
                            </div>
                            <div className="bg-white flex flex-col p-3 mx-2 rounded shadow-lg">
                                <div className="flex items-center justify-between">
                                    <p className="text-sm flex-1 text-center text-red">Product Reviews</p>
                                    <p className="text-sm flex-1 text-center">Customers can earn rewards by submitting product reviews</p>
                                    <p className="text-sm flex-1 text-center">10% Discount on Cart</p>
                                    <p className="text-sm flex-1 text-center">Percentage</p>
                                    <p className="text-sm flex-1 text-center flex items-center justify-center cursor-pointer">
                                        <Edit />
                                    </p>
                                </div>
                            </div>
                            <div className="bg-white flex flex-col p-3 mx-2 rounded shadow-lg">
                                <div className="flex items-center justify-between">
                                    <p className="text-sm flex-1 text-center text-red">Product Reviews</p>
                                    <p className="text-sm flex-1 text-center">Customers can earn rewards by submitting product reviews</p>
                                    <p className="text-sm flex-1 text-center">10% Discount on Cart</p>
                                    <p className="text-sm flex-1 text-center">Percentage</p>
                                    <p className="text-sm flex-1 text-center flex items-center justify-center cursor-pointer">
                                        <Edit />
                                    </p>
                                </div>
                            </div>
                            <div className="bg-white flex flex-col p-3 mx-2 rounded shadow-lg">
                                <div className="flex items-center justify-between">
                                    <p className="text-sm flex-1 text-center text-red">Product Reviews</p>
                                    <p className="text-sm flex-1 text-center">Customers can earn rewards by submitting product reviews</p>
                                    <p className="text-sm flex-1 text-center">10% Discount on Cart</p>
                                    <p className="text-sm flex-1 text-center">Percentage</p>
                                    <p className="text-sm flex-1 text-center flex items-center justify-center cursor-pointer">
                                        <Edit />
                                    </p>
                                </div>
                            </div>
                            <div className="bg-white flex flex-col p-3 mx-2 rounded shadow-lg">
                                <div className="flex items-center justify-between">
                                    <p className="text-sm flex-1 text-center text-red">Product Reviews</p>
                                    <p className="text-sm flex-1 text-center">Customers can earn rewards by submitting product reviews</p>
                                    <p className="text-sm flex-1 text-center">10% Discount on Cart</p>
                                    <p className="text-sm flex-1 text-center">Percentage</p>
                                    <p className="text-sm flex-1 text-center flex items-center justify-center cursor-pointer">
                                        <Edit />
                                    </p>
                                </div>
                            </div>
                            <div className="bg-white flex flex-col p-3 mx-2 rounded shadow-lg">
                                <div className="flex items-center justify-between">
                                    <p className="text-sm flex-1 text-center text-red">Product Reviews</p>
                                    <p className="text-sm flex-1 text-center">Customers can earn rewards by submitting product reviews</p>
                                    <p className="text-sm flex-1 text-center">10% Discount on Cart</p>
                                    <p className="text-sm flex-1 text-center">Percentage</p>
                                    <p className="text-sm flex-1 text-center flex items-center justify-center cursor-pointer">
                                        <Edit />
                                    </p>
                                </div>
                            </div>
                    {/* })} */}
                </div>
            </div>
        </div>
    );
}