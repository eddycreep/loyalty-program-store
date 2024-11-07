'use client'

import React from 'react';
import { useQuery } from "@/hooks/useQuery";
import { apiEndPoint, colors } from '@/utils/colors';
import axios from 'axios';
import { useState, useEffect } from 'react';
import toast from 'react-hot-toast';
import { Edit, Expand, Trash2, Shrink} from "lucide-react";
import { EditProductSpecials } from "@/components/component/edit-product-specials";
import { EditProductGroupSpecials } from "@/components/component/edit-productGroup-specials";
import { CombinedSpecialsComponent } from "@/components/combined-specials-manager";
import { ProductsSpecialsComponent } from "@/components/product-specials-manager";
import { DeleteConfirmation } from "@/components/component/delete-confirmation"
import { CombinedDeleteConfirmation } from "@/components/component/delete-combined-confirmation"

interface ProductProps {
    idx: number,
    Stockcode: number,
    Product_Description: string,
    Category: string,
    DepNum: number,
    SubNum: number,
    Soh: number,
    VarPrc: number,
    VatPerc: number,
    Discount: number,
    ExclCost: number,
    Markup: number,
    GPPerc: number,
    ExclSell: number,
    ExclSell2: number,
    ExclSell3: number,
    Markup2: number,
    GPPerc2: number,
    Markup3: number,
    GPPerc3: number,
    IncSell: number,
    IncSell2: number,
    ROS: number,
    Discount_Expiry: string,
    Special: string,
    Special_ExpiryDate: string,
    Client_ID: number,
    Product_Image: Buffer
}

type ProductResponse = ProductProps[]


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
    isActive: number,
    product_description: string,
    special_price: number,
}
type ProductSpecialsResponse = ProductSpecialsProps[]

//get-active-group-specials
interface CombinedSpecials {
    special_id: number,
    special_name: string,
    special: string,
    special_type:string,
    store_id: string,
    start_date: string,
    expiry_date: string,
    special_value: string,
    isActive: number,
    special_group_id: number,
    product_description: string,
    special_price: number
}
type CombinedSpecialsResponse = CombinedSpecials[]


export const ProductsManModule = () => {
    const [editProductsPopup, setEditProductsPopup] = useState(false);
    const [editGroupProductsPopup, setEditGroupProductsPopup] = useState(false);
    const [deletePopUp, setDeletePopUp] = useState(false);
    const [combinedDeletePopUp, setCombinedDeletePopUp] = useState(false);
    const [expandedRow, setExpandedRow] = useState<number | null>(null);
    const [expandedCombinedRow, setExpandedCombinedRow] = useState<number | null>(null);
    
    

    //all specials
    const [allProductSpecials, setAllProductSpecials] = useState<ProductSpecialsResponse>([]);
    const [allCombinedSpecials, setAllCombinedSpecials] = useState<CombinedSpecialsResponse>([]);

    //toggle special components
    const [productSpecialsComponent, setProductSpecialsComponent] = useState(false);
    const [combinedSpecialsComponent, setCombinedSpecialsComponent] = useState(false);

    const headers = ['Special ID',	'Special Name',	'Special',	'Product', 'Special Price', 'Special Value', 'Action']
    //const combinedHeaders = ['Special ID', 'Special Name', 'Special', 'Products', 'Special Price', 'Special Value', 'Action']
    const combinedHeaders = ['Special ID', 'Special Group ID', 'Products', 'Special Name', 'Special',  'Special Price', 'Special Value', 'Action']

    const url = `products/getproducts`;
    const { data, loading, error } = useQuery<ProductResponse>(url);

    const toggleEditProductPage = () => {
        setEditProductsPopup(!editProductsPopup);
    };

    const toggleEditGroupProductPage = () => {
        setEditGroupProductsPopup(!editGroupProductsPopup);
    };

    const toggleDeletePage = () => {
        setDeletePopUp(!deletePopUp);
    };

    //expand product special
    const handleExpandClick = (id: number) => {
        setExpandedRow(expandedRow === id ? null : id);
    };

    //expand combined special
    const handleExpandCombinedClick = (id: number) => {
        setExpandedCombinedRow(expandedCombinedRow === id ? null : id);
    };

    const toggleCombinedDeletePage = () => {
        setCombinedDeletePopUp(!combinedDeletePopUp);
    };

    //individual specials
    const toggleProductSpecials = () => {
        setProductSpecialsComponent(!productSpecialsComponent);
    }

    //combined specials
    const toggleCombinedSpecials = () => {
        setCombinedSpecialsComponent(!combinedSpecialsComponent);
    }

    //get all specials
    const geAllProductSpecials = async () => {
        try{
            const url = `products/getallproductspecials`
            const response = await axios.get<ProductSpecialsResponse>(`${apiEndPoint}/${url}`)
            setAllProductSpecials(response?.data)
            // console.log(RETRIEVED ALL PRODUCT SPECIALS:", response)

        } catch (error) {
            console.log("AN ERROR OCCURED WHEN FETCHING PRODUCT SPECIALS:", error)
        }
    }

    const geAllCombinedSpecials = async () => {
        try{
            const url = `products/getallcombinedspecials`
            const response = await axios.get<CombinedSpecialsResponse>(`${apiEndPoint}/${url}`)
            setAllCombinedSpecials(response?.data)
            console.log("RETRIEVED ALL ACTIVE GROUP SPECIALS:", response)

        } catch (error) {
            console.log("AN ERROR OCCURED WHEN FETCHING PRODUCT SPECIALS:", error)
        }
    }

    // Group specials by 'special_id' to only show the first row initially, with an expandable section for additional items
    const groupedCombinedSpecials = Object.values(
        allCombinedSpecials.reduce((acc, item) => {
        if (!acc[item.special_id]) {
            acc[item.special_id] = { ...item, items: [] }; // Initialize group with first item
        }
        acc[item.special_id].items.push(item); // Add item to its group
        return acc;
        }, {} as { [key: number]: CombinedSpecials & { items: CombinedSpecials[] } })
    );

    useEffect(() => {
        geAllProductSpecials();
        geAllCombinedSpecials();
    }, []);


    return (
        <div>
            <div className='w-full h-screen overflow-y-auto mb-4 pr-4 space-y-6 pb-6'>
            <div>
                <div className="flex justify-between">
                    <div className="flex flex-col pl-2 pt-6">
                        <h4 className="text-2xl font-semibold text-red">Product Specials</h4>
                        <p className="text-gray-500">Assign exclusive product specials that customers can purchase</p>
                    </div>
                    <div className='flex gap-2 pt-8 pr-2'>
                        <button onClick={ toggleProductSpecials } className="bg-black text-white p-2 w-40 h-10 rounded-lg hover:bg-red">
                            Add Special
                        </button>
                    </div>
                </div>
                <div className="bg-white text-gray-500 flex items-center justify-between divide-x divide-gray-500 p-3 mt-4 mx-2 rounded shadow-lg">
                    {headers?.map((header, index) => (
                        <p key={index} className={`text-xs uppercase font-medium flex-1 text-center ${index === 1 ? 'hidden lg:block' : ''}`}>
                            {header}
                        </p>
                    ))}
                </div>
                {allProductSpecials?.map(({ special_id, special_name, special, special_type, store_id, start_date, expiry_date, special_value, isActive, product_description, special_price }) => (
                <div key={special_id} className="pt-2 max-h-[350px] pb-1 space-y-2 overflow-y-auto">
                    <div className="bg-white flex flex-col p-2 mx-2 rounded shadow-md">
                        <div className="flex items-center justify-between">
                            <p className="text-sm flex-1 text-center text-red">{special_id}</p>
                            <p className="text-sm flex-1 text-center">{special_name || '--:--'}</p>
                            <p className="text-sm flex-1 text-center">{special || '--:--'}</p>
                            <p className="text-sm flex-1 text-center">{product_description || '--:--'}</p>
                            <p className="text-sm flex-1 text-center">{special_price || '--:--'}</p>
                            <p className="text-sm flex-1 text-center">{special_value || '--:--'}</p>
                            <div className="flex items-center justify-center text-sm flex-1 text-center gap-4">
                                <button className="flex items-center justify-center cursor-pointer" onClick={() => handleExpandClick(special_id)}>
                                {expandedRow === special_id ? (
                                    <Shrink color="gray" />
                                ) : (
                                    <Expand color="gray" />
                                )}
                                </button>
                                <button onClick={toggleEditProductPage} className="flex items-center justify-center cursor-pointer">
                                    <Edit color="gray" />
                                </button>
                                <button onClick={toggleDeletePage} className="flex items-center justify-center cursor-pointer">
                                    <Trash2 color="red" />
                                </button>
                            </div>
                        </div>
                        {expandedRow === special_id && (
                            <div>
                            <div className="w-full p-4 mr-2 mt-2 mx-2 rounded report-header text-black ${state.isOpen && state.expandView === ID? 'block' : 'hidden'">
                                <div className="flex flex-wrap pt-4">
                                    <div className="pl-16">
                                        <p className="font-medium reportdetail-headertext text-md">Special Type</p>
                                        <p className="font-semibold text-md">{special_type || '--:--'}</p>
                                    </div>
                                    <div className="pl-32">
                                        <p className="font-medium reportdetail-headertext text-md">Store ID</p>
                                        <p className="font-semibold text-md uppercase report-text">{store_id || '--:--'}</p>
                                    </div>
                                    <div className="pl-44">
                                        <p className="font-medium reportdetail-headertext text-md">Status</p>
                                        <p className={`font-medium reportdetail-headertext text-md ${isActive === 1 ? 'text-green' : 'text-red'}`}>
                                            {isActive === 1 ? 'Active' : 'Inactive'}
                                        </p>
                                    </div>
                                    <div className="pl-40">
                                        <p className="font-medium reportdetail-headertext text-md">Start Date</p>
                                        <p className="font-semibold text-md uppercase report-text">{start_date || '--:--'}</p>
                                    </div>
                                    <div className="pl-16">
                                        <p className="font-medium reportdetail-headertext text-md">Expiry Date</p>
                                        <p className="font-semibold text-md uppercase report-text text-red">{expiry_date || '--:--'}</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                        )}
                    </div>
                </div>
            ))}
            </div>
            {/* GROUP SPECIALS */}
            {combinedSpecialsComponent && (<CombinedSpecialsComponent onClose={ toggleCombinedSpecials } />)}
            <div className="pb-16 pt-20">
                <div className="flex justify-between">
                    <div className="flex flex-col pl-2 pt-6">
                        <h4 className="text-2xl font-semibold text-red">Combined Specials</h4>
                        <p className="text-gray-500">Assign exclusive combined specials that customers can purchase</p>
                    </div>
                    <div className='flex gap-2 pt-8 pr-2'>
                        <button onClick={ toggleCombinedSpecials } className="bg-black text-white p-2 w-40 h-10 rounded-lg hover:bg-red">
                            Add Special
                        </button>
                    </div>
                </div>
                <div className="bg-white text-gray-500 flex items-center justify-between divide-x divide-gray-500 p-3 mt-4 mx-2 rounded shadow-lg">
                    {combinedHeaders?.map((header, index) => (
                        <p key={index} className={`text-xs uppercase font-medium flex-1 text-center ${index === 1 ? 'hidden lg:block' : ''}`}>
                            {header}
                        </p>
                    ))}
                </div>
                {/* Render each grouped special as a row */}
                {groupedCombinedSpecials.map(({ special_id, special_name, special, special_type, store_id, start_date, expiry_date, special_value, isActive, items }) => (
                <div key={special_id} className="pt-2 max-h-[350px] pb-1 space-y-2 overflow-y-auto">
                    <div className="bg-white flex flex-col p-3 mx-2 rounded shadow-md">
                    {/* Header row with grid styling */}
                    <div className="grid grid-cols-8 gap-2 items-center">
                        <p className="text-sm text-center text-red">{special_id}</p>
                        <p className="text-sm text-center">{items[0].special_group_id}</p> {/* Display Special Group ID for the first item */}
                        <p className="text-sm text-center">{items[0].product_description}</p> {/* Display Product Description for the first item */}
                        <p className="text-sm text-center">{special_name}</p>
                        <p className="text-sm text-center">{special}</p>
                        <p className="text-sm text-center">{items[0].special_price}</p> {/* Display Special Price for the first item */}
                        <p className="text-sm text-center">{special_value}</p>
                        <div className="flex items-center justify-center gap-4">
                        <button className="flex items-center cursor-pointer" onClick={() => handleExpandCombinedClick(special_id)}>
                            {expandedCombinedRow === special_id ? (
                            <Shrink color="gray" />
                            ) : (
                            <Expand color="gray" />
                            )}
                        </button>
                        <button className="flex items-center cursor-pointer" onClick={toggleEditProductPage}>
                            <Edit color="gray" /> 
                        </button>
                        <button className="flex items-center cursor-pointer" onClick={toggleCombinedDeletePage}>
                            <Trash2 color="red" /> 
                        </button>
                        </div>
                    </div>

                    {/* Expanded view with the same grid layout to match headers */}
                    {expandedCombinedRow === special_id && (
                        <div className="pt-4">
                            <div className="grid grid-cols-8 gap-2 pt-2 bg-gray-100 rounded shadow-inner p-4 text-sm">
                                {/* Label row to display headers for each column in the expanded view */}
                                <p></p> {/* Placeholder for alignment */}
                                <p className="text-center font-semibold text-gray-600">Special Group ID</p>
                                <p className="text-center font-semibold text-gray-600">Product Description</p>
                                <p className="text-center font-semibold text-gray-600">Store ID</p>
                                <p className="text-center font-semibold text-gray-600">Start Date</p>
                                <p className="text-center font-semibold text-gray-600">Expiry Date</p>
                                <p className="text-center font-semibold text-gray-600">Status</p>
                                <p></p> {/* Placeholder for alignment */}
                            
                                {/* Data row displaying each item in the expanded view */}
                                {items.slice(1).map((item) => (
                                <React.Fragment key={item.special_group_id}>
                                    <p></p> {/* Placeholder for alignment */}
                                    <p className="text-center text-sm">{item.special_group_id}</p>
                                    <p className="text-center text-sm">{item.product_description}</p>
                                    <p className="text-center text-sm">{item.store_id}</p>
                                    <p className="text-center text-sm">{item.start_date}</p>
                                    <p className="text-center text-sm">{item.expiry_date}</p>
                                    <p className={`text-center text-sm ${item.isActive === 1 ? 'text-green' : 'text-red'}`}>{item.isActive === 1 ? 'Active' : 'Inactive'}</p>
                                    <p></p> {/* Placeholder for alignment */}
                                </React.Fragment>
                                ))}
                            </div>
                        </div>
                    )}
                    </div>
                </div>
            ))}
        </div>
        {productSpecialsComponent && (<ProductsSpecialsComponent onClose={ toggleProductSpecials } />)}
            {deletePopUp && (<DeleteConfirmation isOpen={deletePopUp} onClose={toggleDeletePage}/> )}
            {combinedDeletePopUp && (<CombinedDeleteConfirmation isOpen={combinedDeletePopUp} onClose={toggleCombinedDeletePage}/> )}
            {editProductsPopup && <EditProductSpecials onClose={ toggleEditProductPage } />}
        </div>
        </div>
    );
}