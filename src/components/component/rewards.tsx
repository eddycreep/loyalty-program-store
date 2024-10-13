"use client"

import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Label } from "@/components/ui/label";

interface Props {
    onClose: () => void;
    open: boolean; // Accepting an open prop to control visibility
}

export const RewardsDialog = ({ onClose }: Props) => {
    return (
        <Dialog>
            <DialogTrigger asChild>
                <Button className="bg-black text-white p-2 w-40 rounded-lg hover:bg-red">Add Group Special</Button>
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
    )
}