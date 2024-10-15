'use client'

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Smartphone, Mail, MessageSquare, Globe, QrCode, Edit, Tag } from "lucide-react"
import { Calendar, Gift, Heart, Soup } from 'lucide-react'
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Label } from "@/components/ui/label";
import { RewardCards } from "@/components/component/rewards-cards"

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
    const [showRewardsDialog, setShowRewardsDialog] = useState(false);
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

    return (
        <div className='w-full h-full flex flex-col gap-4 rounded-lg overflow-y mb-80'>
            <div>
                <RewardCards />
            </div>
            <div>
                <div className="bg-white text-gray-500 flex items-center justify-between divide-x divide-gray-500 p-3 mt-4 mx-2 rounded shadow-lg">
                    {headers?.map((header, index) => (
                        <p key={index} className={`text-xs uppercase font-medium flex-1 text-center ${index === 1 ? 'hidden lg:block' : ''}`}>
                            {header}
                        </p>
                    ))}
                </div>
                <div className="pt-2 max-h-[350px] pb-2 space-y-2 overflow-y-auto">
                {/* {allProductSpecials?.map(({ special_id, special, special_type, store_id, start_date, expiry_date, special_value, isActive, product_description, special_price }) => { */}
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
            {/* <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {rewards.map(reward => (
              <Card key={reward.id} className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 overflow-hidden">
                <CardHeader className="bg-gray-100 p-4">
                  <CardTitle className="flex items-center gap-3 text-lg font-semibold text-gray-800">
                    <div className="p-2 bg-primary rounded-full text-white">
                      {reward.icon}
                    </div>
                    {reward.task}
                  </CardTitle>
                </CardHeader>
                <CardContent className="p-4">
                <p className="text-gray-600 mb-2">Task: {reward.reward}</p>
                    {reward.type === 'percentage' ? (
                    <Percent className="mr-2" />
                    ) : (
                    <Coins className="mr-2" />
                    )}
                  <Badge variant="secondary" className="mt-2 font-medium">
                    {reward.type === 'percentage' ? 'Percentage' : 'Fixed Amount'}
                  </Badge>
                </CardContent>
                <CardFooter className="flex justify-end space-x-2 p-4 bg-gray-50">
                  <Button size="sm" variant="outline" className="hover:bg-gray-200 transition-colors">
                    <Edit className="h-4 w-4 mr-1" />
                    Edit
                  </Button>
                  <Button size="sm" variant="destructive" onClick={() => handleDeleteReward(reward.id)} className="hover:bg-red-600 transition-colors">
                    <Trash2 className="h-4 w-4 mr-1" />
                    Delete
                  </Button>
                </CardFooter>
              </Card>
            ))}
            </div> */}
            {/* <Card>
                <CardContent className="pt-6">
                <h2 className="text-2xl font-semibold mb-4">Alternative Ways to Redeem Discounts</h2>
                <ul className="space-y-4">
                        <div className="flex justify-between">
                            <div className="flex">
                                <div className="h-12 w-16 flex justify-center pt-3 border rounded bg-gray-100">
                                    <QrCode />
                                </div>
                                <div className="pl-2">
                                    <p className="font-bold">In-store kiosks: 20% Off Cart</p>
                                    <p>Customers can scan their loyalty card or enter their ID number to retrieve available discounts.</p>
                                </div>
                            </div>
                            <div>
                            <Dialog>
                            <DialogTrigger asChild>
                                <Button className="bg-black text-white p-2 rounded-lg hover:bg-red">
                                    <Edit />
                                </Button>
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
                                            >
                                                    <option>sleelct product</option>
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
                                        <input type="input" placeholder="10.99" className='w-full p-2 rounded-lg border border-gray-300'/>
                                    </div>
                                </div>
                                <div className="flex gap-4">
                                    <div className="w-full">
                                        <Label htmlFor="name" className="text-left pt-4">
                                            Special Type:
                                        </Label>
                                        <select 
                                            className="w-full p-2 rounded-lg border border-gray-300"
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
                                                    <input type="date"  className='w-full p-2 rounded-lg border border-gray-300'/>
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
                                                    />
                                                        <label htmlFor="check-apple"></label>
                                                    </div>
                                                </div>
                                        </div>
                                        <DialogFooter>
                                            <button className="bg-black text-white p-2 w-full rounded-lg hover:bg-red">
                                                Save
                                            </button>
                                        </DialogFooter>
                                    </DialogContent>
                            </Dialog>
                            </div>
                        </div>
                        <div className="flex justify-between">
                            <div className="flex">
                                <div className="h-12 w-16 flex justify-center pt-3 border rounded bg-gray-100">
                                    <Smartphone />
                                </div>
                                <div className="pl-2">
                                    <p className="font-bold">Mobile app:</p>
                                    <p>Customers can view and activate their discounts directly from our mobile application.</p>
                                </div>
                            </div>
                            <div>
                                <Button className="bg-black text-white p-2 rounded-lg hover:bg-red">
                                    <Edit />
                                </Button>
                            </div>
                        </div>
                        <div className="flex justify-between">
                            <div className="flex">
                                <div className="h-12 w-16 flex justify-center pt-3 border rounded bg-gray-100">
                                    <Mail />
                                </div>
                                <div className="pl-2">
                                    <p className="font-bold">Email notifications:</p>
                                    <p>We send personalized emails with discount codes that can be used online or in-store.</p>
                                </div>
                            </div>
                            <div>
                                <Button className="bg-black text-white p-2 rounded-lg hover:bg-red">
                                    <Edit />
                                </Button>
                            </div>
                        </div>
                        <div className="flex justify-between">
                            <div className="flex">
                                <div className="h-12 w-16 flex justify-center pt-3 border rounded bg-gray-100">
                                    <MessageSquare />
                                </div>
                                <div className="pl-2">
                                    <p className="font-bold">SMS:</p>
                                    <p>Customers can opt-in to receive text messages with their available discounts and redemption codes.</p>
                                </div>
                            </div>
                            <div>
                                <Button className="bg-black text-white p-2 rounded-lg hover:bg-red">
                                    <Edit />
                                </Button>
                            </div>
                        </div>
                        <div className="flex justify-between">
                            <div className="flex">
                                <div className="h-12 w-16 flex justify-center pt-3 border rounded bg-gray-100">
                                    <Globe />
                                </div>
                                <div className="pl-2">
                                    <p className="font-bold">Website account:</p>
                                    <p>Logged-in customers can see and apply their discounts during online checkout.</p>
                                </div>
                            </div>
                            <div>
                                <Button className="bg-black text-white p-2 rounded-lg hover:bg-red">
                                    <Edit />
                                </Button>
                            </div>
                        </div>
                </ul>
                </CardContent>
            </Card> */}
            <div className="grid gap-4">
                <Card>
                    <CardHeader>
                        <CardTitle className="text-lg">Recently Added Specials & Discounts</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <ul className="space-y-4">
                        {[
                            { name: "Summer Fruits Bonanza", start: "2023-06-01", end: "2023-06-30", products: "All summer fruits", usage: 234 },
                            { name: "Gourmet Cheese Festival", start: "2023-07-01", end: "2023-07-15", products: "Imported cheeses", usage: 156 },
                            { name: "Organic Veggies Week", start: "2023-07-01", end: "2023-07-07", products: "Organic vegetables", usage: 89 },
                            { name: "Artisan Bread Showcase", start: "2023-06-15", end: "2023-06-25", products: "Artisan breads", usage: 112 },
                        ].map((promo, index) => (
                            <li key={index} className="border-b pb-2">
                            <div className="flex items-center">
                                <Tag className="h-4 w-4 mr-2 text-muted-foreground" />
                                <span className="font-semibold">{promo.name}</span>
                            </div>
                            <p className="text-sm text-muted-foreground">
                                {promo.start} to {promo.end} | {promo.products}
                            </p>
                            <p className="text-sm">Used by {promo.usage} customers</p>
                            </li>
                        ))}
                        </ul>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
}