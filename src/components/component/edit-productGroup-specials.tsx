"use client"

import React, { useState } from 'react';
import { X } from 'lucide-react'

interface Props {
    onClose: () => void;
}

export const EditProductGroupSpecials = ({ onClose }: Props) => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [product, setProduct] = useState('');
    const [productSpecial, setProductSpecial] = useState('');
    const [specialPrice, setSpecialPrice] = useState(0);
    const [specialType, setSpecialType] = useState('');
    const [specialValue, setSpecialValue] = useState('');
    const [storeID, setStoreID] = useState('');
    const [specialStartDate, setSpecialStartDate] = useState('');
    const [specialExpDate, setSpecialExpDate] = useState('');
    const [isActive, setIsActive] = useState(false);

    const handleSpecialToggle = () => setIsActive(!isActive);

    const saveSpecial = () => {
        // Save logic here
        console.log("Special saved");
        setIsModalOpen(false);
    };

    return (
        <div className='flex gap-2 pt-8 pr-2'>
                <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
                    <div className="bg-white p-6 rounded-lg sm:max-w-[600px] w-full">
                        <div className="flex justify-end cursor-pointer">
                            <X size={18} color='red' onClick={onClose}/>
                        </div>
                        <div className="text-xl font-semibold">Set New Product Special</div>
                        <p className="text-gray-600">Select the product and set the special with the required fields. Click save once completed.</p>
                        <div className="grid gap-4 py-4">
                            <div className="flex gap-4">
                                <div className="w-full">
                                    <label className="text-left pt-4">Product</label>
                                    <select
                                        className="w-full p-2 rounded-lg border border-gray-300"
                                        onChange={(e) => setProduct(e.target.value)}
                                    >
                                        <option value="">Select Product</option>
                                        {/* Replace with your product data */}
                                        <option value="Product1">Product1</option>
                                        <option value="Product2">Product2</option>
                                    </select>
                                </div>
                                <div className="w-full">
                                    <label className="text-left pt-4">Special:</label>
                                    <input
                                        type="input"
                                        placeholder="10"
                                        onChange={(e) => setProductSpecial(e.target.value)}
                                        className="w-full p-2 rounded-lg border border-gray-300"
                                    />
                                </div>
                            </div>
                            <div className="flex gap-4">
                                <div className="w-full">
                                    <label className="text-left pt-4">Special Price:</label>
                                    <input
                                        type="input"
                                        placeholder="10"
                                        onChange={(e) => setSpecialPrice(Number(e.target.value))}
                                        className="w-full p-2 rounded-lg border border-gray-300"
                                    />
                                </div>
                                <div className="w-full">
                                    <label className="text-left pt-4">Special Type:</label>
                                    <select
                                        className="w-full p-2 rounded-lg border border-gray-300"
                                        onChange={(e) => setSpecialType(e.target.value)}
                                    >
                                        <option>Select Type</option>
                                        <option value="Special">Special</option>
                                    </select>
                                </div>
                            </div>
                            <div className="flex gap-4">
                                <div className="w-full">
                                    <label className="text-left pt-4">Special Value:</label>
                                    <select
                                        className="w-full p-2 rounded-lg border border-gray-300"
                                        onChange={(e) => setSpecialValue(e.target.value)}
                                    >
                                        <option>Select Value</option>
                                        <option value="Percentage">Percentage</option>
                                        <option value="Amount">Amount</option>
                                    </select>
                                </div>
                                <div className="w-full">
                                    <label className="text-left pt-4">Store ID:</label>
                                    <select
                                        className="w-full p-2 rounded-lg border border-gray-300"
                                        onChange={(e) => setStoreID(e.target.value)}
                                    >
                                        <option>Select Store ID</option>
                                        <option value="S001">S001</option>
                                        <option value="S002">S002</option>
                                    </select>
                                </div>
                            </div>
                            <div className="flex gap-4">
                                <div className="w-[270px]">
                                    <label className="text-left pt-4">Start Date:</label>
                                    <input
                                        type="date"
                                        onChange={(e) => setSpecialStartDate(e.target.value)}
                                        className="w-full p-2 rounded-lg border border-gray-300"
                                    />
                                </div>
                                <div className="w-[270px]">
                                    <label className="text-left pt-4">Expiry Date:</label>
                                    <input
                                        type="date"
                                        onChange={(e) => setSpecialExpDate(e.target.value)}
                                        className="w-full p-2 rounded-lg border border-gray-300"
                                    />
                                </div>
                            </div>
                            <div className="flex flex-col">
                                <label className="text-left p-1">Active/Inactive:</label>
                                <div className="checkbox-apple">
                                    <input
                                        className="yep"
                                        id="check-apple"
                                        type="checkbox"
                                        checked={isActive}
                                        onClick={handleSpecialToggle}
                                    />
                                    <label htmlFor="check-apple"></label>
                                </div>
                            </div>
                        </div>
                        <button
                            onClick={saveSpecial}
                            className="bg-black text-white p-2 w-full rounded-lg hover:bg-red"
                        >
                            Save
                        </button>
                    </div>
                </div>
        </div>
    );
};
