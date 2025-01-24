"use client"

import { apiEndPoint, colors } from '@/utils/colors';
import axios from 'axios';
import { useState, useEffect } from 'react';
import toast from 'react-hot-toast';
import { Edit, Expand, Trash2, Shrink, X, Check, XOctagon, ShieldAlert } from "lucide-react";

import { AddProductsSpecials } from "@/modules/admin/specials/product/add-product-specials";
import { EditProductSpecials } from "@/modules/admin/specials/product/edit-product-specials";
import { DeleteSpecialConfirmation } from "@/modules/admin/specials/product/delete-special-confirmation";
import { Special } from "@/modules/admin/specials/product/edit-product-specials";
import SquareCircleLoader from "@/lib/square-circle-loader";

//get-all-active-product-specials
interface ProductSpecialsProps {
    special_id: number,
    special_name: string,
    special: string,
    special_type: string,
    store_id: string,
    start_date: string,
    expiry_date: string,
    special_value: string,
    isActive: boolean,
    specialItem: SpecialItem
}
type ProductSpecialsResponse = ProductSpecialsProps[]

interface SpecialItem {
    special_id: number,
    product_description: string,
    special_price: number
}

export const ProductSpecials = () => {
    const [productSpecials, setProductSpecials] = useState<ProductSpecialsResponse>([]);

    // Define the type of selectedSpecial to accept either ProductSpecialsProps or null
    const [selectedProductSpecial, setSelectedProductSpecial] = useState<ProductSpecialsProps | null>(null);
    const [expandedRow, setExpandedRow] = useState<number | null>(null);

    const [productSpecialsComponent, setProductSpecialsComponent] = useState(false);
    const [editProductsPopup, setEditProductsPopup] = useState(false);
    const [deletePopUp, setDeletePopUp] = useState(false);

    const [loadingData, setLoadingData] = useState(false);
    const [isError, setIsError] = useState(false);
    const [selectedSpecialID, setSelectedSpecialID] = useState(0);

    const headers = ['Special ID',	'Special Name',	'Special',	'Product', 'Special Price', 'Special Value', 'Action']

    const geAllProductSpecials = async () => {
        setLoadingData(true);

        try{
            const url = `specials/get-all-product-specials`
            const response = await axios.get<ProductSpecialsResponse>(`${apiEndPoint}/${url}`)
            setProductSpecials(response?.data)
            setLoadingData(false);

        } catch (error) {
            console.log("AN ERROR OCCURED WHEN FETCHING PRODUCT SPECIALS:", error)
            setIsError(true);
        }
    }

    const handleEditProductSpecial = (special_id: any) => {
        const selected = productSpecials.find((item) => item.special_id === special_id) || null;
        
        if (selected) {
            setSelectedProductSpecial(selected);
            setEditProductsPopup(true);
        } else {
            toast.error('Error passing the product specials!', {
                icon: <X color={colors.red} size={24} />,
                duration: 3000,
            });
        }
    };

    const closeEditProductsPopup = () => {
        setEditProductsPopup(false);
    }

    const toggleDeletePage = (specialId: number) => {
        setDeletePopUp(!deletePopUp);
        setSelectedSpecialID(specialId);
    };

    const handleExpandClick = (id: number) => {
        setExpandedRow(expandedRow === id ? null : id);
    };

    const toggleProductSpecials = () => {
        setProductSpecialsComponent(!productSpecialsComponent);
    }

    useEffect(() => {
        geAllProductSpecials();
    
        const specialInterval = setInterval(() => {
            geAllProductSpecials();

        }, 120000); // 2 minutes
    
        return () => clearInterval(specialInterval); // Clean up interval on unmount
    },[]);


    if (loadingData) {
        return (
            <div>
                <div className="flex justify-between">
                    <div className="flex flex-col pl-2 pt-6">
                        <h4 className="text-2xl font-semibold text-purple">Product Specials</h4>
                        <p className="text-gray-500">Assign exclusive product specials that customers can purchase</p>
                    </div>
                    <div className='flex gap-2 pt-8 pr-2 sm:pt-4 sm:pr-1'>
                        <button onClick={ toggleProductSpecials } className="bg-green text-white p-2 w-40 h-10 rounded-lg hover:bg-emerald-300">
                            Add Special
                        </button>
                    </div>
                </div>
                <div className="bg-white text-gray-500 flex items-center justify-between divide-x divide-gray-500 p-3 mt-4 mx-2 rounded shadow-lg">
                    {headers?.map((header, index) => (
                        <p key={index} className={`text-xs uppercase font-medium flex-1 text-center ${header === 'Product' || header === 'Special Price' ? 'hidden sm:block' : ''}`}>
                            {header}
                        </p>
                    ))}
                </div>
                <div className="pt-10 flex flex-col items-center justify-center">
                    <SquareCircleLoader />
                    <p className="text-gray-500 uppercase pt-4">Loading data, please be patient.</p>
                </div>
            </div>
        )
    }


    if (isError) {
        return (
            <div>
                <div className="flex justify-between">
                    <div className="flex flex-col pl-2 pt-6">
                        <h4 className="text-2xl font-semibold text-purple">Product Specials</h4>
                        <p className="text-gray-500">Assign exclusive product specials that customers can purchase</p>
                    </div>
                    <div className='flex gap-2 pt-8 pr-2 sm:pt-4 sm:pr-1'>
                        <button onClick={ toggleProductSpecials } className="bg-green text-white p-2 w-40 h-10 rounded-lg hover:bg-emerald-300">
                            Add Special
                        </button>
                    </div>
                </div>
                <div className="bg-white text-gray-500 flex items-center justify-between divide-x divide-gray-500 p-3 mt-4 mx-2 rounded shadow-lg">
                    {headers?.map((header, index) => (
                        <p key={index} className={`text-xs uppercase font-medium flex-1 text-center ${header === 'Product' || header === 'Special Price' ? 'hidden sm:block' : ''}`}>
                            {header}
                        </p>
                    ))}
                </div>
                <div className="flex flex-col items-center justify-center pt-10">
                    <XOctagon size={34} />
                    <p className="ml-2 uppercase pt-2 text-red">An error occured when fetching product specials</p>
                </div>
            </div>
        )
    }


    if (productSpecials.length === 0) {
        return (
            <div>
                <div className="flex justify-between">
                    <div className="flex flex-col pl-2 pt-6">
                        <h4 className="text-2xl font-semibold text-purple">Product Specials</h4>
                        <p className="text-gray-500">Assign exclusive product specials that customers can purchase</p>
                    </div>
                    <div className='flex gap-2 pt-8 pr-2 sm:pt-4 sm:pr-1'>
                        <button onClick={ toggleProductSpecials } className="bg-green text-white p-2 w-40 h-10 rounded-lg hover:bg-emerald-300">
                            Add Special
                        </button>
                    </div>
                </div>
                <div className="bg-white text-gray-500 flex items-center justify-between divide-x divide-gray-500 p-3 mt-4 mx-2 rounded shadow-lg">
                    {headers?.map((header, index) => (
                        <p key={index} className={`text-xs uppercase font-medium flex-1 text-center ${header === 'Product' || header === 'Special Price' ? 'hidden sm:block' : ''}`}>
                            {header}
                        </p>
                    ))}
                </div>
                <div className="flex flex-col items-center justify-center pt-10">
                    <ShieldAlert size={34} />
                    <p className="ml-2 uppercase pt-2 text-green">No specials have been set for customers. Add new specials to enhance their experience!</p>
                </div>
            </div>
        )
    }


    return (
        <div>
            <div className="flex justify-between">
                <div className="flex flex-col pl-2 pt-6">
                    <h4 className="text-2xl font-semibold text-purple">Product Specials</h4>
                    <p className="text-gray-500">Assign exclusive product specials that customers can purchase</p>
                </div>
                <div className='flex gap-2 pt-8 pr-2 sm:pt-4 sm:pr-1'>
                    <button onClick={ toggleProductSpecials } className="bg-green text-white p-2 w-40 h-10 rounded-lg hover:bg-emerald-300">
                        Add Special
                    </button>
                </div>
            </div>
            <div className="bg-white text-gray-500 flex items-center justify-between divide-x divide-gray-500 p-3 mt-4 mx-2 rounded shadow-lg">
                {headers?.map((header, index) => (
                    <p key={index} className={`text-xs uppercase font-medium flex-1 text-center ${header === 'Product' || header === 'Special Price' ? 'hidden sm:block' : ''}`}>
                        {header}
                    </p>
                ))}
            </div>
            {productSpecials?.map(({ special_id, special_name, special, special_type, store_id, start_date, expiry_date, special_value, isActive, specialItem }) => (
                <div key={special_id} className="pt-2 max-h-[350px] pb-1 space-y-2">
                    <div className="bg-white flex flex-col p-2 mx-2 rounded shadow-md">
                        <div className="flex items-center justify-between">
                            <p className="text-sm flex-1 text-center text-gray-400">{special_id}</p>
                            <p className="text-sm flex-1 text-center">{special_name || '--:--'}</p>
                            <p className="text-sm flex-1 text-center">{special || '--:--'}</p>
                            <p className={`text-sm flex-1 text-center ${'hidden sm:block'}`}>{specialItem.product_description}</p>
                            <p className={`text-sm flex-1 text-center ${'hidden sm:block'}`}>{specialItem.special_price}</p>
                            <p className="text-sm flex-1 text-center">{special_value || '--:--'}</p>
                            <div className="flex items-center justify-center text-sm flex-1 text-center gap-4">
                                <button className="flex items-center justify-center cursor-pointer bg-white text-purple border border-purple hover:bg-indigo-100 p-1 rounded-lg" onClick={() => handleExpandClick(special_id)}>
                                    {expandedRow === special_id ? (<Shrink size={21} />) : (<Expand size={21} />)}
                                </button>
                                <button className="flex items-center justify-center cursor-pointer bg-white text-gray-500 border border-gray-500 hover:bg-gray-200 p-1 rounded-lg" onClick={() => handleEditProductSpecial(special_id)}>
                                    <Edit size={21} />
                                </button>
                                <button className="flex items-center justify-center cursor-pointer bg-white text-red border border-red hover:bg-rose-100 p-1 rounded-lg" onClick={() => toggleDeletePage(special_id) }>
                                    <Trash2 size={21} />
                                </button>
                            </div>
                        </div>
                        {expandedRow === special_id && (
                            <div className="pt-4">
                                <div className="grid grid-cols-7 gap-4 pt-2 bg-gray-100 rounded shadow-inner text-center p-4 text-sm">
                                    <p className="font-medium text-gray-600"></p>
                                <div>
                                    <p className="font-medium text-gray-600">Special Type</p>
                                    <p className="text-sm">{special_type || '--:--'}</p>
                                </div>
                                <div>
                                    <p className="font-medium text-gray-600">Store ID</p>
                                    <p className="text-sm uppercase">{store_id || '--:--'}</p>
                                </div>
                                <div>
                                    <p className="font-medium text-gray-600">Start Date</p>
                                    <p className="text-sm uppercase">{start_date || '--:--'}</p>
                                </div>
                                <div>
                                    <p className="font-medium text-gray-600">Expiry Date</p>
                                    <p className="text-sm uppercase text-red">{expiry_date || '--:--'}</p>
                                </div>
                                <div>
                                    <p className="font-medium text-gray-600">Status</p>
                                    <p className={`text-sm ${isActive === true ? 'text-green' : 'text-red'}`}>
                                        {isActive === true ? 'Active' : 'Inactive'}
                                    </p>
                                </div>
                            </div>
                            </div>
                        )}
                    </div>
                </div>
            ))}
            {productSpecialsComponent && (<AddProductsSpecials onClose={ toggleProductSpecials } />)}
            {editProductsPopup && <EditProductSpecials onClose={ closeEditProductsPopup } selectedSpecial={selectedProductSpecial as unknown as Special} />}
            {deletePopUp && (<DeleteSpecialConfirmation specialID={selectedSpecialID} isOpen={deletePopUp} onClose={toggleDeletePage}/> )}
    </div>
    )
}