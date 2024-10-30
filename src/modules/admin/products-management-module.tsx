'use client'

import { useQuery } from "@/hooks/useQuery";
import { apiEndPoint, colors } from '@/utils/colors';
import axios from 'axios';
import { useState, useEffect } from 'react';
import toast from 'react-hot-toast';
import { Edit, Expand, Trash2 } from "lucide-react";
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
interface GetSpecialsProps {
    special_id: string,
    special: string,
    special_type: string,
    store_id: string,
    start_date: string,
    expiry_date: string,
    special_value: string,
    isActive: number,
    product_description: string,
    special_price: number
}
type GetSpecialsResponse = GetSpecialsProps[]

//get-active-group-specials
interface CombinedSpecials {
    special_id: string,
    special_group_id: string,
    special: string,
    special_type: string,
    store_id: string,
    start_date: string,
    expiry_date: string,
    special_value: string,
    isActive: number,
    product_description: string,
    special_price: number
}
type CombinedSpecialsResponse = CombinedSpecials[]


//dummy data - pproduct specials
const productSpecials = [
    {special_id: 1, special_name: 'Summer Drink Special', special: '10% Off', special_type: 'Special', store_id:'S004', start_date:'2024-11-05 00:00:00', expiry_date: '2024-11-15 00:00:00', special_value: 'Amount', isActive: 1, product_description:'SWITCH 440ML', special_price:'15.99'},
    {special_id: 2, special_name: 'Chips Special', special: '10% Off', special_type: 'Special', store_id:'S004', start_date:'2024-11-05 00:00:00', expiry_date: '2024-11-15 00:00:00', special_value: 'Amount', isActive: 1, product_description:'SWITCH 440ML', special_price:'15.99'},
    {special_id: 3, special_name: 'School Special', special: '10% Off', special_type: 'Special', store_id:'S004', start_date:'2024-11-05 00:00:00', expiry_date: '2024-11-15 00:00:00', special_value: 'Amount', isActive: 1, product_description:'SWITCH 440ML', special_price:'15.99'}
]

export const ProductsManModule = () => {
    const [editProductsPopup, setEditProductsPopup] = useState(false);
    const [editGroupProductsPopup, setEditGroupProductsPopup] = useState(false);
    const [deletePopUp, setDeletePopUp] = useState(false);
    const [combinedDeletePopUp, setCombinedDeletePopUp] = useState(false);
    const [expandedRow, setExpandedRow] = useState<number | null>(null);

    //all specials
    const [allProductSpecials, setAllProductSpecials] = useState<GetSpecialsResponse>([]);
    const [allCombinedSpecials, setAllCombinedSpecials] = useState<CombinedSpecialsResponse>([]);

    //toggle special components
    const [productSpecialsComponent, setProductSpecialsComponent] = useState(false);
    const [combinedSpecialsComponent, setCombinedSpecialsComponent] = useState(false);

    const headers = ['ID',	'Special Name',	'Special',	'Product', 'Special Value', 'Action']
    const combinedHeaders = ['Special ID', 'Group ID', 'Special Name',	'Special',	'Product',	'Special Price', 'Action']

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
            const response = await axios.get<GetSpecialsResponse>(`${apiEndPoint}/${url}`)
            setAllProductSpecials(response?.data)
            console.log("RETRIEVED ALL PRODUCT SPECIALS:", response)

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
            {productSpecialsComponent && (<ProductsSpecialsComponent />)}
            {deletePopUp && (<DeleteConfirmation isOpen={deletePopUp} onClose={toggleDeletePage}/> )}
            {combinedDeletePopUp && (<CombinedDeleteConfirmation isOpen={combinedDeletePopUp} onClose={toggleCombinedDeletePage}/> )}
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
                {productSpecials.map((product) => (
                <div key={product.special_id} className="pt-2 max-h-[350px] pb-1 space-y-2 overflow-y-auto">
                    <div className="bg-white flex flex-col p-2 mx-2 rounded shadow-md">
                        <div className="flex items-center justify-between">
                            <p className="text-sm flex-1 text-center text-red">{product.special_id}</p>
                            <p className="text-sm flex-1 text-center">{product.special_name}</p>
                            <p className="text-sm flex-1 text-center">{product.special}</p>
                            <p className="text-sm flex-1 text-center">{product.product_description}</p>
                            <p className="text-sm flex-1 text-center">{product.special_price}</p>
                            {editProductsPopup && <EditProductSpecials onClose={ toggleEditProductPage } />}
                            <div className="flex items-center justify-center text-sm flex-1 text-center gap-4">
                                <button onClick={() => handleExpandClick(product.special_id)} className="flex items-center justify-center cursor-pointer">
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
                        {expandedRow === product.special_id && (
                            <div className="w-full p-4 mr-2 mt-2 mx-2 rounded report-header text-black block">
                                {/* Flex container to structure the main row content in three columns */}
                                <div className="flex flex-wrap">
                                    <div className="w-1/3">
                                        <div>
                                            <p className="font-bold">Store ID</p>
                                            <p className="font-semibold text-gray-400">{product.store_id}</p>
                                        </div>
                                        <div className="pb-4 pt-4">
                                            <p className="font-bold">Start Date</p>
                                            <p className="font-semibold text-gray-400">{product.start_date}</p>
                                        </div>
                                        <div className="mb-4">
                                            <p className="font-bold">Expiry Date</p>
                                            <p className="font-semibold text-gray-400">{product.expiry_date}</p>
                                        </div>
                                    </div>
                                    {/* Second Column: Displaying start_date and expiry_date */}
                                    <div className="w-1/3">
                                        <div className="mb-4">
                                            <p className="font-bold">Special Value</p>
                                            <p className="font-semibold text-gray-400">{product.special_value}</p>
                                        </div>
                                        <div className="mb-4">
                                            <p className="font-bold">Active</p>
                                            <p className="font-semibold text-gray-400">{product.isActive ? 'Yes' : 'No'}</p>
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
            {combinedSpecialsComponent && (<CombinedSpecialsComponent />)}
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
                <div className="pt-2 max-h-[350px] pb-1 space-y-2 overflow-y-auto">
                {/* {allCombinedSpecials?.map(({ special_id, special, special_type, store_id, start_date, expiry_date, special_value, isActive, product_description, special_price }) => ( */}
                        <div className="bg-white flex flex-col p-3 mx-2 rounded shadow-md">
                            <div className="flex items-center justify-between">
                                <p className="text-sm flex-1 text-center text-red">19</p>
                                <p className="text-sm flex-1 text-center">1</p>
                                <p className="text-sm flex-1 text-center">Summer Breeze Special</p>
                                <p className="text-sm flex-1 text-center">BUY ANY 2 GET 5% OFF</p>
                                <p className="text-sm flex-1 text-center">SWITCH 440ML</p>
                                <p className="text-sm flex-1 text-center">56.99</p>
                                {/* <p className="text-sm flex-1 text-center">2023-11-15</p>
                                <p className="text-sm flex-1 text-center">2023-11-15</p>
                                <p className="text-sm flex-1 text-center flex items-center justify-center space-x-2 text-green">Active</p> */}
                                {editGroupProductsPopup && <EditProductGroupSpecials onClose={ toggleEditGroupProductPage } />}
                                <div className="flex items-center justify-center text-sm flex-1 text-center gap-4">
                                    <button className="flex items-center justify-center cursor-pointer">
                                        <Expand color="gray" />
                                    </button>
                                    <button className="flex items-center justify-center cursor-pointer" onClick={toggleEditProductPage}>
                                        <Edit color="gray" /> 
                                    </button>
                                    <button className="flex items-center justify-center cursor-pointer" onClick={ toggleCombinedDeletePage }>
                                        <Trash2 color="red" /> 
                                    </button>
                                </div>
                            </div>
                        </div>
                    {/* })} */}
                </div>
            </div>
        </div>
        </div>
    );
}