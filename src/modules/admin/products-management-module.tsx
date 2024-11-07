'use client'

import { useQuery } from "@/hooks/useQuery";
import { apiEndPoint, colors } from '@/utils/colors';
import axios from 'axios';
import { useState, useEffect } from 'react';
import toast from 'react-hot-toast';
import { Edit, Expand, Trash2, Minimize2 } from "lucide-react";
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
    

    //all specials
    const [allProductSpecials, setAllProductSpecials] = useState<ProductSpecialsResponse>([]);
    const [allCombinedSpecials, setAllCombinedSpecials] = useState<CombinedSpecialsResponse>([]);

    //toggle special components
    const [productSpecialsComponent, setProductSpecialsComponent] = useState(false);
    const [combinedSpecialsComponent, setCombinedSpecialsComponent] = useState(false);

    const headers = ['ID',	'Special Name',	'Special',	'Product', 'Special Price', 'Action']
    const combinedHeaders = ['Special ID', 'Special Name', 'Group ID',	'Special',	'Products',	'Special Price', 'Action']

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

    const handleExpandClick = (id: number) => {
        setExpandedRow(expandedRow === id ? null : id);
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
                            <div className="flex items-center justify-center text-sm flex-1 text-center gap-4">
                                <button onClick={() => handleExpandClick(special_id)} className="flex items-center justify-center cursor-pointer">
                                    <Expand color="gray" />
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
                                <div className="flex flex-wrap">
                                    <div className="w-1/3">
                                        <div className="pl-16">
                                            <p className="font-medium reportdetail-headertext text-md">Special Type</p>
                                            <p className="font-semibold text-md text-purple">{special_type}</p>
                                        </div>
                                        <div className="pl-16 pb-4 pt-4">
                                            <p className="font-medium reportdetail-headertext text-md">Start Date</p>
                                            <p className="font-semibold text-md uppercase report-text">{start_date}</p>
                                        </div>
                                    </div>
                                    <div className="w-1/3">
                                        <div className="pb-4">
                                            <p className="font-medium reportdetail-headertext text-md">Store ID</p>
                                            <p className="font-semibold text-md uppercase report-text">{store_id}</p>
                                        </div>
                                        <div className="pb-4">
                                            <p className="font-medium reportdetail-headertext text-md">Expiry Date</p>
                                            <p className="font-semibold text-md uppercase report-text">{expiry_date}</p>
                                        </div>
                                    </div>
                                    <div className="w-1/3">
                                        <div className="pb-4">
                                            <p className="font-medium reportdetail-headertext text-md">Special Value</p>
                                            <p className="font-semibold text-md uppercase report-text">{special_value}</p>
                                        </div>
                                        <div className="">
                                            <p className="font-medium reportdetail-headertext text-md">Status</p>
                                            <p className={`font-medium reportdetail-headertext text-md ${isActive === 1 ? 'text-green' : 'text-red'}`}>
                                                {isActive === 1 ? 'Active' : 'Inactive'}
                                            </p>
                                        </div>
                                    </div>
                                    <div className="flex pt-5 gap-4 pl-16">
                                        <button className="bg-red rounded pr-2 w-12 h-8 text-white flex justify-center items-center pl-2" onClick={() => handleExpandClick(special_id)}>
                                            <Minimize2 size={18} strokeWidth={2} color="white" className="" />
                                        </button>
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
                {allCombinedSpecials?.map(({ special_id, special_name, special, special_type, store_id, start_date, expiry_date, special_value, isActive, special_group_id, product_description, special_price }) => (
                <div key={special_id} className="pt-2 max-h-[350px] pb-1 space-y-2 overflow-y-auto">
                        <div className="bg-white flex flex-col p-3 mx-2 rounded shadow-md">
                            <div className="flex items-center justify-between">
                                <p className="text-sm flex-1 text-center text-red">{special_id}</p>
                                <p className="text-sm flex-1 text-center">{special_name}</p>
                                <p className="text-sm flex-1 text-center">{special_group_id}</p>
                                <p className="text-sm flex-1 text-center">{special}</p>
                                <p className="text-sm flex-1 text-center">{product_description}</p>
                                <p className="text-sm flex-1 text-center">{special_price}</p>
                                {/* <p className="text-sm flex-1 text-center flex items-center justify-center space-x-2 text-green">Active</p> */}
                                {editGroupProductsPopup && <EditProductGroupSpecials onClose={ toggleEditGroupProductPage } />}
                                <div className="flex items-center justify-center text-sm flex-1 text-center gap-4">
                                    {/* <button className="flex items-center justify-center cursor-pointer">
                                        <Expand color="gray" />
                                    </button> */}
                                    <button className="flex items-center justify-center cursor-pointer" onClick={toggleEditProductPage} >
                                        <Edit color="gray" /> 
                                    </button>
                                    <button className="flex items-center justify-center cursor-pointer" onClick={ toggleCombinedDeletePage }>
                                        <Trash2 color="red" /> 
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
        {productSpecialsComponent && (<ProductsSpecialsComponent onClose={ toggleProductSpecials } />)}
            {deletePopUp && (<DeleteConfirmation isOpen={deletePopUp} onClose={toggleDeletePage}/> )}
            {combinedDeletePopUp && (<CombinedDeleteConfirmation isOpen={combinedDeletePopUp} onClose={toggleCombinedDeletePage}/> )}
            {editProductsPopup && <EditProductSpecials onClose={ toggleEditProductPage } />}
        </div>
    );
}