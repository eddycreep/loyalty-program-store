'use client'

import { useQuery } from "@/hooks/useQuery";
import { apiEndPoint, colors } from '@/utils/colors';
import axios from 'axios';
import { useState, useEffect } from 'react';
import toast from 'react-hot-toast';
import { Check, X, Edit } from "lucide-react";
import { EditProductSpecials } from "@/components/component/edit-product-specials";
import { EditProductGroupSpecials } from "@/components/component/edit-productGroup-specials";
import { CombinedSpecialsComponent } from "@/components/combined-specials-manager";
import { ProductsSpecialsComponent } from "@/components/product-specials-manager";

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

//specials
interface Specials {
    special_id: number,
    special: string,
    special_type: string,
    store_id: string,
    start_date: string,
    expiry_date: string,
    special_value: string,
}
type SpecialsResponse = Specials[]

interface SavedSpecial {
    special_id: string,
}
type SavedIDresponse = SavedSpecial[]

//setProductDiscountProps
interface SpecialProps {
    productID: number,
    productCategory: string,
    special: string,
    specialType: string,
    startDate: string,
    expiryDate: string
}
type SpecialResponse = SpecialProps[]


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
interface GetGroupSpecials {
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
type GetGroupSpecialsResponse = GetGroupSpecials[]


export const ProductsManModule = () => {
    const [editProductsPopup, setEditProductsPopup] = useState(false);
    const [editGroupProductsPopup, setEditGroupProductsPopup] = useState(false);

    //individual product specials
    const [product, setProduct] = useState('');
    const [productSpecial, setProductSpecial] = useState('');
    const [specialPrice, setSpecialPrice] = useState(0);
    const [storeid, setStoreID] = useState('');
    const [specialType, setSpecialType] = useState('');
    const [specialValue, setSpecialValue] = useState('');
    const [specialStartDate, setSpecialStartDate] = useState('');
    const [specialExpDate, setSpecialExpDate] = useState('');
    const [isActive, setIsActive] = useState(false);

    //product-group-specials
    const [specialGroupId, setSpecialGroupId] = useState(0); 
    const [groupProduct, setGroupProduct] = useState('');
    const [groupSpecial, setGroupSpecial] = useState('');
    const [specialGroupType, setSpecialGroupType] = useState('');
    const [groupSpecialPrice, setGroupSpecialPrice] = useState(0);
    const [groupSpecialStartDate, setGroupSpecialStartDate] = useState('');
    const [groupSpecialExpDate, setGroupSpecialExpDate] = useState('');
    const [groupIsActive, setGroupIsActive] = useState(false);
    
    //specialssss
    const [allSpecials, setAllSpecials] = useState<SpecialsResponse>([]);
    const [specialID, setSpecialID] = useState('');


    //all product specials
    const [allProductSpecials, setAllProductSpecials] = useState<GetSpecialsResponse>([]);
    const [allCombinedSpecials, setAllCombinedSpecials] = useState<GetGroupSpecialsResponse>([]);

    //toggle product specials
    const [productSpecialsComponent, setProductSpecialsComponent] = useState(false);

    //toggle combined specials
    const [combinedSpecialsComponent, setCombinedSpecialsComponent] = useState(false);


    const headers = ['ID',	'Special Name',	'Special',	'Product', 'Special Value', 'Action']
    const combinedHeaders = ['Special ID', 'Special Name',	'Special',	'Product',	'Special Price', 'Action']

    const url = `products/getproducts`;
    const { data, loading, error } = useQuery<ProductResponse>(url);

    //tblspecials
    const saveSpecial = async () => {
        try {
            const newStartDate = new Date(specialStartDate);
            const newExpDate = new Date(specialExpDate);

            const payload = {
                special: productSpecial,
                specialType: specialType,
                storeId: storeid,
                startDate: newStartDate,
                expiryDate: newExpDate,
                specialValue: specialValue,
                isactive: isActive
            }

            const url = `products/setspecial`
            const response = await axios.post<SpecialsResponse>(`${apiEndPoint}/${url}`, payload)
            console.log("SAVED SPECIAL:", response)

            toast.success('The special has been saved to tblspecialsss', {
                icon: <Check color={colors.green} size={24} />,
                duration: 3000,
            });

            getSavedSpecialID();

        } catch (error) {
            console.log("AN ERROR OCCURED WHEN SAVING SPECIAL:", error)
        }
    }
    
    //get special id from tblspecials
    const getSavedSpecialID = async () => {
        const encodedProductSpecial = encodeURIComponent(productSpecial);

        try {
            const url = `products/getspecialid/${encodedProductSpecial}/${specialType}/${storeid}/${specialValue}`
            const response = await axios.get<SavedIDresponse>(`${apiEndPoint}/${url}`)
            const specialid = response?.data?.[0]?.special_id;  // assuming response.data is an array
            console.log("specialid: " + specialid)
            setSpecialID(specialid);
            //setSpecialID(response?.data)
            console.log("RETURNED Special ID:", response)

            toast.success('The special ID HAS RETURNED', {
                icon: <Check color={colors.green} size={24} />,
                duration: 3000,
            });

            saveProductSpecial();
        } catch (error) {
            console.log("AN ERROR OCCURED WHEN FETCHING SAVED SPECIAL ID:", error)
        }
    }

    const saveProductSpecial = async () => {
        try{
            //http://localhost:4200/products/setproductspecial - new route
            const newStartDate = new Date(specialStartDate);
            const newExpDate = new Date(specialExpDate);

            //specialid, productdescription, specialprice

            const payload = {
                specialid: specialID,
                productdescription: product,
                specialprice: specialPrice
            }

            const url = `products/setproductspecial`
            const response = await axios.post<SpecialResponse>(`${apiEndPoint}/${url}`, payload)
            console.log("The product special has been set successfully", response.data)

            // Only show success notification if response is successful
            if (response.status === 200) {
                specialSuccessNotification();
            } else {
                console.error('Failed to set product special:', response);
                specialErrorNotification();
            }
            
        } catch (error) {
            console.log("An error was encountered when setting product special", error)
            specialErrorNotification();
        }
    }

    const saveProductGroupSpecial = async () => {
        try{
            //http://localhost:4200/products/setproductspecial - new route
            const newStartDate = new Date(groupSpecialStartDate);
            const newExpDate = new Date(groupSpecialExpDate);

            const payload = {
                specialGroupID: specialGroupId,
                product: groupProduct,
                special: groupSpecial,
                specialPrice: groupSpecialPrice,
                specialType: specialGroupType,
                startDate: newStartDate,
                expiryDate: newExpDate,
                isActive: isActive
            }

            const url = `products/setproductgpspecial`
            const response = await axios.post<SpecialResponse>(`${apiEndPoint}/${url}`, payload)
            console.log("The product group specials has been set successfully", response.data)

            // Only show success notification if response is successful
            if (response.status === 200) {
                groupSpecialSuccessNotification();
            } else {
                console.error('Failed to set product special:', response);
                groupSpecialErrorNotification();
            }
            
        } catch (error) {
            console.log("An error was encountered when setting product special", error)
            groupSpecialErrorNotification();
        }
    }

    const handleSpecialToggle = () => {
        setIsActive(!isActive); // Toggle the state
    };

    const handleGroupSpecialToggle = () => {
        setGroupIsActive(!groupIsActive); // Toggle the state
    };

    //NOTIFICATIONS
    const specialSuccessNotification = () => {
        toast.success('The product special has been set', {
            icon: <Check color={colors.green} size={24} />,
            duration: 3000,
        });
    };

    const groupSpecialSuccessNotification = () => {
        toast.success('The group special has been set for the products', {
            icon: <Check color={colors.green} size={24} />,
            duration: 3000,
        });
    };

    const specialErrorNotification = () => {
        toast.error('The product special has NOT been set', {
            icon: <X color={colors.red} size={24} />,
            duration: 3000,
        });
    };

    const groupSpecialErrorNotification = () => {
        toast.error('The group special has been set for the products', {
            icon: <X color={colors.red} size={24} />,
            duration: 3000
        });
    };

    const toggleEditProductPage = () => {
        setEditProductsPopup(!editProductsPopup);
    };

    const toggleEditGroupProductPage = () => {
        setEditGroupProductsPopup(!editGroupProductsPopup);
    };

    //individual specials
    const toggleProductSpecials = () => {
        setProductSpecialsComponent(!productSpecialsComponent);
    }

    //combined specials
    const toggleCombinedSpecials = () => {
        setCombinedSpecialsComponent(!combinedSpecialsComponent);
    }

    // || ----- ----- ----- GET REQUESTS FOR ACTIVE x UPCOMING SPECIALS ----- ----- ----- ||

    
    //get-active-product-specials
    const getActiveProductSpecials = async () => {
        try{
            //http://localhost:4200/products/getproductspecials
            const url = `products/getproductspecials`
            const response = await axios.get<GetSpecialsResponse>(`${apiEndPoint}/${url}`)
            setAllProductSpecials(response?.data)
            console.log("RETRIEVED ALL PRODUCT SPECIALS:", response)

        } catch (error) {
            console.log("AN ERROR OCCURED WHEN FETCHING PRODUCT SPECIALS:", error)
        }
    }

    //get-active-combined-specials
    const getActiveCombinedSpecials = async () => {
        try{
            //getactivegroupspecials
            const url = `products/getallgroupspecials`
            const response = await axios.get<GetGroupSpecialsResponse>(`${apiEndPoint}/${url}`)
            setAllCombinedSpecials(response?.data)
            console.log("RETRIEVED ALL ACTIVE GROUP SPECIALS:", response)

        } catch (error) {
            console.log("AN ERROR OCCURED WHEN FETCHING PRODUCT SPECIALS:", error)
        }
    }


    // const updateGroupSpecial = async () => {
    //     try {
    //         const url = `products/updategroupspecial/:special_id`
    //         const response = await axios.patch(`${apiEndPoint}/${url}`)
    //         console.log("UPDATED GROUP SPECIAL:", response)

    //     } catch (error) {
    //         console.log("AN ERROR OCCURED WHEN UPDATING GROUP SPECIAL:", error)
    //     }
    // }

    // const updateGroupSpecialProduct = async () => {
    //     try {
    //         const url = `products/updategroupspecialproduct/:special_id`
    //         const response = await axios.patch(`${apiEndPoint}/${url}`)
    //         console.log("UPDATED GROUP SPECIAL:", response)

    //     } catch (error) {
    //         console.log("AN ERROR OCCURED WHEN UPDATING GROUP SPECIAL:", error)
    //     }
    // }

    useEffect(() => {
        getActiveProductSpecials();
        getActiveCombinedSpecials();
    }, []);


    return (
        <div className='w-full h-screen overflow-y-auto mb-4 pr-4 space-y-6 pb-6'>
            <div>
            {productSpecialsComponent && (<ProductsSpecialsComponent />)}
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
                {/* {allProductSpecials?.map(({ special_id, special, special_type, store_id, start_date, expiry_date, special_value, isActive, product_description, special_price }) => ( */}
                <div className="pt-2 max-h-[350px] pb-2 space-y-2 overflow-y-auto">
                    <div className="bg-white flex flex-col p-3 mx-2 rounded shadow-md">
                        <div className="flex items-center justify-between">
                            <p className="text-sm flex-1 text-center text-red">1</p>
                            <p className="text-sm flex-1 text-center">Special Drinks</p>
                            <p className="text-sm flex-1 text-center">GET 10% OFF PRODDCT</p>
                            <p className="text-sm flex-1 text-center">SWITCH 440ML</p>
                            <p className="text-sm flex-1 text-center">56.99</p>
                            {/* <p className="text-sm flex-1 text-center">2023-11-15</p>
                            <p className="text-sm flex-1 text-center">2023-11-15</p>
                            <p className="text-sm flex-1 text-center flex items-center justify-center space-x-2 text-green">Active</p> */}
                            {editProductsPopup && <EditProductSpecials onClose={ toggleEditProductPage } />}
                            <button className="text-sm flex-1 text-center flex items-center justify-center cursor-pointer" onClick={ toggleEditProductPage }>
                                <Edit />
                            </button>
                        </div>
                    </div>
                </div>
                {/* ))} */}
            </div>
            {/* GROUP SPECIALS */}
            {combinedSpecialsComponent && (<CombinedSpecialsComponent />)}
            <div className="pb-16">
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
                <div className="pt-2 max-h-[350px] pb-2 space-y-2 overflow-y-auto">
                {/* {allCombinedSpecials?.map(({ special_id, special, special_type, store_id, start_date, expiry_date, special_value, isActive, product_description, special_price }) => ( */}
                        <div className="bg-white flex flex-col p-3 mx-2 rounded shadow-md">
                            <div className="flex items-center justify-between">
                                <p className="text-sm flex-1 text-center text-red">19</p>
                                {/* <p className="text-sm flex-1 text-center">1</p> */}
                                <p className="text-sm flex-1 text-center">Summer Breeze Special</p>
                                <p className="text-sm flex-1 text-center">BUY ANY 2 GET 5% OFF</p>
                                <p className="text-sm flex-1 text-center">SWITCH 440ML</p>
                                <p className="text-sm flex-1 text-center">56.99</p>
                                {/* <p className="text-sm flex-1 text-center">2023-11-15</p>
                                <p className="text-sm flex-1 text-center">2023-11-15</p>
                                <p className="text-sm flex-1 text-center flex items-center justify-center space-x-2 text-green">Active</p> */}
                                {editGroupProductsPopup && <EditProductGroupSpecials onClose={ toggleEditGroupProductPage } />}
                                <button className="text-sm flex-1 text-center flex items-center justify-center cursor-pointer" onClick={ toggleEditGroupProductPage }>
                                    <Edit />
                                </button>
                            </div>
                        </div>
                        <div className="bg-white flex flex-col p-3 mx-2 rounded shadow-lg">
                            <div className="flex items-center justify-between">
                                <p className="text-sm flex-1 text-center text-red">19</p>
                                {/* <p className="text-sm flex-1 text-center">1</p> */}
                                <p className="text-sm flex-1 text-center">Summer Breeze Special</p>
                                <p className="text-sm flex-1 text-center">BUY ANY 2 GET 5% OFF</p>
                                <p className="text-sm flex-1 text-center">KINGSLEY 2LTR ASST</p>
                                <p className="text-sm flex-1 text-center">20.99</p>
                                {/* <p className="text-sm flex-1 text-center">2023-11-15</p>
                                <p className="text-sm flex-1 text-center">2023-11-15</p>
                                <p className="text-sm flex-1 text-center flex items-center justify-center space-x-2 text-green">Active</p> */}
                                {editGroupProductsPopup && <EditProductGroupSpecials onClose={ toggleEditGroupProductPage } />}
                                <button className="text-sm flex-1 text-center flex items-center justify-center cursor-pointer" onClick={ toggleEditGroupProductPage }>
                                    <Edit />
                                </button>
                            </div>
                        </div>
                    {/* })} */}
                </div>
            </div>
        </div>
    );
}