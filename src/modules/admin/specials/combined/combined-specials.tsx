"use client"

import React from 'react';
import { colors } from '@/utils/colors';
import { useState, useEffect, useCallback } from 'react';
import toast from 'react-hot-toast';
import { Edit, Expand, Trash2, Shrink, X, XOctagon, ShieldAlert, PlusCircle } from "lucide-react";
import { AddCombinedSpecials } from "@/modules/admin/specials/combined/add-combined-specials";
import { EditCombinedSpecials } from "@/modules/admin/specials/combined/edit-combined-specials";
import { CombinedDeleteConfirmation } from "@/modules/admin/specials/combined/delete-combined-confirmation";
import SquareCircleLoader from "@/lib/square-circle-loader";
import { useSession } from '@/context';
import { getAllCombinedSpecials } from '@/components/data/specials/combined/get-all-combined-specials';

//get-active-group-specials
export interface CombinedProps {
    special_id: number,
    special_name: string,
    description: string,
    special: string,
    special_price: number,
    special_type: string,
    store_id: string,
    start_date: string,
    expiry_date: string,
    special_value: string,
    isActive: boolean,
    loyalty_tier: string,
    age_group: string,
    combinedSpecialItems: CombinedSpecialItem[]
}
type CombinedSpecialsResponse = CombinedProps[]


interface CombinedSpecialItem {
    special_id: number,
    special_group_id: number,
    product_description: string,
}

export const CombinedSpecials = () => {
    const { user } = useSession();
    const [combinedSpecials, setCombinedSpecials] = useState<CombinedSpecialsResponse>([]);

    //expandRows state variables
    const [selectedCombinedSpecial, setSelectedCombinedSpecial] = useState<CombinedProps | null>(null);
    const [expandedCombinedRow, setExpandedCombinedRow] = useState<number | null>(null);
    
    const [combinedSpecialsComponent, setCombinedSpecialsComponent] = useState(false);
    const [editCombinedSpecialsPopup, setEditCombinedSpecialsPopup] = useState(false);
    const [combinedDeletePopUp, setCombinedDeletePopUp] = useState(false);

    const [loadingData, setLoadingData] = useState(false);
    const [isError, setIsError] = useState(false);
    const [selectedCombinedSpecialID, setSelectedCombinedSpecialID] = useState(0);

    const headers = ['Special ID', 'Group ID', 'Special Name', 'Special', 'Products', 'Special Price', 'Special Value', 'Action']

    const getCombinedSpecials = useCallback(async () => {
        setLoadingData(true);

        try{
            const combinedSpecialsData = await getAllCombinedSpecials(user)
            setCombinedSpecials(combinedSpecialsData)
            console.log("combined-specials data returned my gee: ", combinedSpecialsData)
            setLoadingData(false);

        } catch (error) {
            console.log("error fetching combined-specials", error)
            setIsError(true);
            setLoadingData(false); // Ensure loading state is reset on error
        }
    }, [user])

    const toggleEditGroupProductPage = () => {
        setEditCombinedSpecialsPopup(!editCombinedSpecialsPopup);
    };

    const closeEditSpecialsPopup = () => {
        setEditCombinedSpecialsPopup(false);
    }

    const handleEditCombinedSpecial = (special_id: any) => {
        const selected = combinedSpecials.find((item) => item.special_id === special_id) || null;
        
        if (selected) {
            setSelectedCombinedSpecial(selected);
            setEditCombinedSpecialsPopup(true);
        } else {
            toast.error('Error passing the product specials!', {
                icon: <X color={colors.red} size={24} />,
                duration: 3000,
            });
        }
    };


    //expand combined special
    const handleExpandCombinedClick = (id: number) => {
        setExpandedCombinedRow(expandedCombinedRow === id ? null : id);
    };

    const toggleCombinedDeletePage = (specialId: number) => {
        setCombinedDeletePopUp(!combinedDeletePopUp);
        setSelectedCombinedSpecialID(specialId)
    };

    //combined specials
    const toggleCombinedSpecials = () => {
        setCombinedSpecialsComponent(!combinedSpecialsComponent);
    }

    // Initial data fetch on component mount
    useEffect(() => {
        getCombinedSpecials();
    }, [getCombinedSpecials]); // Only run on mount or when getCombinedSpecials changes

    // Set up interval for auto-refresh when modals are closed
    useEffect(() => {
        // Only set up the interval if no modals are open
        if (!combinedSpecialsComponent && !editCombinedSpecialsPopup) {
            const specialInterval = setInterval(() => {
                getCombinedSpecials();
            }, 120000);
    
            return () => {
                clearInterval(specialInterval);
            };
        }
    }, [combinedSpecialsComponent, editCombinedSpecialsPopup, getCombinedSpecials]); // Only manage interval when modals toggle 


    // Show loading state but still allow modal to render
    const loadingContent = loadingData ? (
        <div className="pt-10 flex flex-col items-center justify-center">
            <SquareCircleLoader />
            <p className="text-gray-500 uppercase pt-4">Loading data, please be patient.</p>
        </div>
    ) : null;

    // Error content to display
    const errorContent = isError ? (
        <div className="flex flex-col items-center justify-center pt-10">
            <XOctagon size={34} className="text-black" />
            <p className="ml-2 uppercase pt-2 text-red">An error occured when fetching combined specials</p>
        </div>
    ) : null;

    // Empty state content
    const emptyContent = !loadingData && !isError && combinedSpecials.length === 0 ? (
        <div className="flex flex-col items-center justify-center pt-10">
            <ShieldAlert size={34} className="text-black" />
            <p className="ml-2 uppercase pt-2 text-green">No combined specials have been set for customers. Add new specials to enhance their experience!</p>
        </div>
    ) : null;

    return (
        <div className="pb-14 pt-20">
            <div className="flex justify-between">
                <div className="flex flex-col pl-2 pt-6">
                    <h4 className="text-xl font-semibold text-purple">Combined Specials</h4>
                    <p className="text-gray-400">Assign exclusive combined specials that customers can purchase</p>
                </div>
                <div className='flex gap-2 pt-8 pr-2'>
                    <button onClick={ toggleCombinedSpecials } className="bg-green text-white py-2 px-2 w-10 h-10 rounded-lg hover:bg-emerald-300">
                        <PlusCircle size={21}/> 
                    </button>
                </div>
            </div>
            <div className="bg-white text-gray-600 font-bold flex items-center justify-between divide-x divide-gray-500 p-3 mt-4 mx-2 rounded shadow-lg">
                {headers?.map((header, index) => (
                    <p key={index} className={`text-xs uppercase flex-1 text-center ${index === 1 ? 'hidden lg:block' : ''}`}>
                        {header}
                    </p>
                ))}
            </div>
            
            {/* Show loading, error, or empty state */}
            {loadingContent}
            {errorContent}
            {emptyContent}
            
            {/* Show data table when we have data */}
            {!loadingData && !isError && combinedSpecials.length > 0 && (
                <div className="overflow-x-auto">
                    <div className="min-w-[900px]">
                        {combinedSpecials.map(({ special_id, special_name, special, special_type, special_price, store_id, start_date, expiry_date, special_value, isActive, combinedSpecialItems }) => {
                            // Get first item for main row display (or null if array is empty)
                            const firstItem = combinedSpecialItems && combinedSpecialItems.length > 0 ? combinedSpecialItems[0] : null;
                            
                            return (
                                <div key={special_id} className="pt-2 max-h-[350px] pb-1 space-y-2 overflow-y-auto">
                                    <div className="bg-white text-gray-600 flex flex-col p-3 mx-2 rounded shadow-md">
                                        <div className="grid grid-cols-8 gap-2 items-center">
                                            <p className="text-sm text-center text-purple">{special_id || '--:--'}</p>
                                            <p className="text-sm text-center text-purple">{firstItem?.special_group_id || '--:--'}</p>
                                            <p className="text-sm text-center">{special_name || '--:--'}</p>
                                            <p className="text-sm text-center">{special || '--:--'}</p>
                                            <p className="text-sm text-center">{firstItem?.product_description || '--:--'}</p>
                                            <p className="text-sm text-center">R{special_price || '--:--'}</p>
                                            <p className="text-sm text-center">{special_value || '--:--'}</p>
                                            <div className="flex items-center justify-center gap-4">
                                            <button className="flex items-center cursor-pointer bg-white text-purple border border-purple hover:bg-indigo-100 p-1 rounded-lg" onClick={() => handleExpandCombinedClick(special_id)}>
                                                {expandedCombinedRow === special_id ? (<Shrink size={21} />) : (<Expand size={21} />)}
                                            </button>
                                            <button className="flex items-center cursor-pointer bg-white text-gray-500 border border-gray-500 hover:bg-gray-200 p-1 rounded-lg" onClick={() => handleEditCombinedSpecial(special_id)}>
                                                <Edit size={21} /> 
                                            </button>
                                            <button className="flex items-center cursor-pointer bg-white text-red border border-red hover:bg-rose-100 p-1 rounded-lg" onClick={() => toggleCombinedDeletePage(special_id)}>
                                                <Trash2 size={21} /> 
                                            </button>
                                            </div>
                                        </div>
                                        {expandedCombinedRow === special_id && (
                                            <div className="pt-4">
                                                <div className="grid grid-cols-8 gap-2 pt-2 bg-gray-100 rounded shadow-inner p-4 text-center text-sm">
                                                    <p></p>
                                                    <p className="font-bold text-gray-600 text-xs uppercase">Group ID</p>
                                                    <p className="font-bold text-gray-600 text-xs uppercase">Products</p>
                                                    <p className="font-bold text-gray-600 text-xs uppercase">Store ID</p>
                                                    <p className="font-bold text-gray-600 text-xs uppercase">Start Date</p>
                                                    <p className="font-bold text-gray-600 text-xs uppercase">Expiry Date</p>
                                                    <p className="font-bold text-gray-600 text-xs uppercase">Status</p>
                                                    <p></p>
                                                    {/* Map through all combined special items */}
                                                    {combinedSpecialItems && combinedSpecialItems.length > 0 ? (
                                                        combinedSpecialItems.map((item, index) => (
                                                            <React.Fragment key={`${item.special_group_id}-${index}`}>
                                                                <p></p>
                                                                <p className="text-sm text-purple pr-4">{item.special_group_id || '--:--'}</p>
                                                                <p className="text-sm text-gray-500">{item.product_description || '--:--'}</p>
                                                                <p className="text-sm text-gray-500">{store_id || '--:--'}</p>
                                                                <p className="text-sm text-gray-500">{start_date ? start_date.split(" ")[0] : '--:--'}</p>
                                                                <p className="text-sm text-red">{expiry_date ? expiry_date.split(" ")[0] : '--:--'}</p>
                                                                <p className={`text-sm ${isActive === true ? 'text-green' : 'text-red'}`}>{isActive ? 'Active' : 'Inactive'}</p>
                                                                <p></p>
                                                            </React.Fragment>
                                                        ))
                                                    ) : (
                                                        <React.Fragment>
                                                            <p></p>
                                                            <p className="text-sm text-gray-400 col-span-6">No items available</p>
                                                            <p></p>
                                                        </React.Fragment>
                                                    )}
                                                </div>
                                            </div>
                                        )}
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </div>
            )}
            {combinedSpecialsComponent && (<AddCombinedSpecials onClose={ toggleCombinedSpecials } />)}
            {editCombinedSpecialsPopup && <EditCombinedSpecials onClose={ closeEditSpecialsPopup } selectedCombinedSpecial={selectedCombinedSpecial} />}
            {combinedDeletePopUp && (<CombinedDeleteConfirmation specialID={selectedCombinedSpecialID} isOpen={combinedDeletePopUp} onClose={toggleCombinedDeletePage}/> )}
        </div>
    )
}