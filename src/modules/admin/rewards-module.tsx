'use client'

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Smartphone, Mail, MessageSquare, Globe, QrCode, ScrollText, Edit, Tag, AlignCenterVertical } from "lucide-react"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { RewardsDialog } from "@/components/component/rewards"
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export const RewardsModule = () => {
    const [showRewardsDialog, setShowRewardsDialog] = useState(false);

    return (
        <div className='w-full h-full flex flex-col gap-4 rounded-lg overflow-y mb-52'>
            <div className="flex justify-center items-center pt-6">
                <AlignCenterVertical size={60} color="gray"/>
            </div>
            <Card>
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
            </Card>
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