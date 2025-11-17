'use client'

import { useState, useEffect } from "react"
import { Edit, Trash2, ShieldAlert, PlusCircle, ArchiveRestore, Activity} from "lucide-react"
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip';
import { AddInventoryItem } from "./inventory/add-inventory-item";
import { apiClient } from "@/utils/api-client";
import { Item, ItemsResponse } from "../types/products/product-types";
import { apiEndPoint } from "@/utils/colors";
import { EditInventoryItem } from "./inventory/edit-inventory-item";
import Image from "next/image";
import { DeleteInventoryItemConfirmation } from "./inventory/delete-inventory-item";

export const InventoryModule = () => {
    const [inventory, setInventory] = useState<Item[]>([])

    const [addInventoryItemPopUp, setAddInventoryItemPopUp] = useState(false);
    const [editInventoryItemPopUp, setEditInventoryItemPopUp] = useState(false);
    const [activationPopUp, setActivationPopUp] = useState(false);
    const [deactivationPopUp, setDeactivationPopUp] = useState(false);
    const [restorePopUp, setRestorePopUp] = useState(false);

    const [selectedInventoryItem, setSelectedInventoryItem] = useState<Item | null>(null);
    const [selectedUserID, setSelectedUserID] = useState(0);
    const [selectedUserName, setSelectedUserName] = useState('');

    // Updated headers array: Removed 'Logo' column to maintain alignment
    const headers = ['ID', 'Image', 'Item Code', 'Description', 'Selling Price 1', 'Unit Size', 'Action']

    const [deletePopUp, setDeletePopUp] = useState(false);
    const [expandedRow, setExpandedRow] = useState<number | null>(null);

    const [loadingData, setLoadingData] = useState(false);
    const [isError, setIsError] = useState(false);

    const handleExpandClick = (id: number) => {
        setExpandedRow(expandedRow === id ? null : id);
    };

    const toggleActivationPage = (uid: number) => {
        setActivationPopUp(!activationPopUp);
        setSelectedUserID(uid)
    };

    const toggleDeactivationPage = (uid: number) => {
        setDeactivationPopUp(!deactivationPopUp);
        setSelectedUserID(uid)
    };

    const toggleRestorePage = (uid: number) => {
        setRestorePopUp(!restorePopUp);
        setSelectedUserID(uid)
    };

    const fetchInventory = async () => {
        setLoadingData(true);

        try {
            const url = `inventory/get-inventory`;
            const response = await apiClient.get<ItemsResponse>(`${apiEndPoint}/${url}`);
            const inventory = response?.data || [];
            setInventory(inventory);

        } catch (error) {
            console.error('Error fetching inventory:', error);
            setIsError(true);
            setInventory([]); // Ensure state is reset on error
        }

        setLoadingData(false);
    };

    const toggleAddInventoryItem = () => {
        setAddInventoryItemPopUp(!addInventoryItemPopUp);
    }

    const handleEditInventoryItem = (id: number) => {
        const selected = inventory?.find((item) => item.id === id) || null;
        
        if (selected) {
            setSelectedInventoryItem(selected);
            setEditInventoryItemPopUp(true);

        } else {
            console.log("No selected Branch, sumn wrong with the code my nigga:" + selected);
        }
    }; 

    const toggleDeletePage = (uid: number) => {
        setDeletePopUp(!deletePopUp);
        setSelectedUserID(uid)
    };

    const closeEditInventoryItemPopup = () => {
        setEditInventoryItemPopUp(false);
    }

    const closeActivationPopup = () => {
        setActivationPopUp(false);
    };

    const handleSuccess = () => {
        fetchInventory();
    };

    useEffect(() => {
        fetchInventory();
    }, []);

    if (loadingData) {
        return (
            <div className="pb-52">
            <div className='flex flex-col gap-4 pb-10 w-full h-full rounded-lg overflow-y'>
            <div>
                <div className="flex justify-between">
                    <div className="flex flex-col pt-24 pl-2">
                        <h4 className="text-xl font-semibold text-purple">Inventory</h4>
                        <p className="text-gray-400">View, manage, and update inventory items and pricing.</p>
                    </div>
                    <div className='flex gap-2 pt-28 pr-2'>
                        <button onClick={ toggleAddInventoryItem } className="px-2 py-2 w-10 h-10 text-white rounded-lg bg-green hover:bg-emerald-300">
                            <PlusCircle size={21} /> 
                        </button>
                    </div>
                </div>
                <div className="flex justify-between items-center p-3 mx-2 mt-4 font-bold text-gray-600 bg-white rounded divide-x divide-gray-500 shadow-lg">
                    {headers?.map((header, index) => (
                        <p key={index} className={`text-xs uppercase flex-1 text-center ${index === 1 ? 'hidden lg:block' : ''}`}>
                            {header}
                        </p>
                    ))}
                </div>
                <div className="pt-2 max-h-[550px] pb-2 space-y-2">
                        {inventory?.map(({ id, item_code, store_code, group_num, selling_incl_1, selling_incl_2, description_1, unit_size, physical_item, category_main, category_sub, category_last, sales_tax_type, purchase_tax_type, image, net_mass, tax_description, tax_value }) => (
                            <div key={id} className="flex flex-col p-3 mx-2 text-gray-600 bg-white rounded shadow-lg">
                                <div className="flex justify-between items-center">
                                    {/* Fixed alignment: All columns now use consistent structure and padding */}
                                    <div className="flex-1 text-sm text-center">
                                        <p className="text-purple">{id}</p>
                                    </div>
                                    <div className="flex-1 text-sm text-center">
                                        <p>{image || '--:--'}</p>
                                    </div>
                                    <div className="flex-1 text-sm text-center">
                                        <p>{item_code || '--:--'}</p>
                                    </div>
                                    <div className="flex-1 text-sm text-center">
                                        <p>{description_1 || '--:--'}</p>
                                    </div>
                                    <div className="flex-1 text-sm text-center">
                                        <p>R{selling_incl_1 || '--:--'}</p>
                                    </div>
                                    <div className="flex-1 text-sm text-center">
                                        <p>{unit_size || '--:--'}</p>
                                    </div>
                                    <div className="flex flex-1 gap-4 justify-center items-center text-sm text-center">
                                        {/* Edit Inventory Item */}
                                        <Tooltip>
                                            <TooltipTrigger>
                                                <button onClick={() => handleEditInventoryItem(id)} className="flex justify-center items-center p-1 text-gray-500 bg-white rounded-lg border border-gray-500 cursor-pointer hover:bg-gray-200">
                                                    <Edit size={21} /> 
                                                </button>
                                            </TooltipTrigger>
                                            <TooltipContent>
                                                <p>Edit</p>
                                            </TooltipContent>
                                        </Tooltip>

                                        {/* Activate Branch */}
                                        <Tooltip>
                                            <TooltipTrigger>
                                                <button onClick={() => toggleActivationPage(id)} className="flex justify-center items-center p-1 bg-white rounded-lg border cursor-pointer text-purple border-purple hover:bg-indigo-100">
                                                    <Activity size={21} />
                                                </button>
                                            </TooltipTrigger>
                                            <TooltipContent>
                                                <p>Activate</p>
                                            </TooltipContent>
                                        </Tooltip>

                                        {/* Deactivate Branch */}
                                        <Tooltip>
                                            <TooltipTrigger>
                                                <button onClick={() => toggleDeactivationPage(id)} className="flex justify-center items-center p-1 bg-white rounded-lg border cursor-pointer text-red border-red hover:bg-rose-100">
                                                    <ShieldAlert size={21} />
                                                </button>
                                            </TooltipTrigger>
                                            <TooltipContent>
                                                <p>Deactivate</p>
                                            </TooltipContent>
                                        </Tooltip>

                                        {/* Restore Branch */}
                                        <Tooltip>
                                            <TooltipTrigger>
                                                <button onClick={() => toggleRestorePage(id)} className="flex justify-center items-center p-1 bg-white rounded-lg border cursor-pointer text-green border-green hover:bg-green-100">
                                                    <ArchiveRestore size={21} /> 
                                                </button>
                                            </TooltipTrigger>
                                            <TooltipContent>
                                                <p>Restore</p>
                                            </TooltipContent>
                                        </Tooltip>

                                        {/* Delete Organisation */}
                                        <Tooltip>
                                            <TooltipTrigger>
                                                <button onClick={() => toggleDeletePage(id)} className="flex justify-center items-center p-1 bg-white rounded-lg border cursor-pointer text-red border-red hover:bg-rose-100">
                                                    <Trash2 size={21} /> 
                                                </button>
                                            </TooltipTrigger>
                                            <TooltipContent>
                                                <p>Delete</p>
                                            </TooltipContent>
                                        </Tooltip>
                                    </div>
                                </div>
                            </div>
                        ))}
                </div>
            </div>
        </div>  
        {addInventoryItemPopUp && 
            <AddInventoryItem
                onClose={toggleAddInventoryItem} 
                onSuccess={handleSuccess} 
            />
        }

        {editInventoryItemPopUp && 
            <EditInventoryItem
                onClose={closeEditInventoryItemPopup} 
                selectedInventoryItem={selectedInventoryItem}
                onSuccess={handleSuccess}
            />
        }

        {deletePopUp && (
            <DeleteInventoryItemConfirmation
                itemCode={selectedInventoryItem?.item_code} 
                isOpen={deletePopUp} 
                onClose={toggleDeletePage}
                onSuccess={handleSuccess}
            /> 
        )}
        </div>
        )
    }

    if (isError) {
        return (
            <div className="pb-52">
            <div className='flex flex-col gap-4 pb-10 w-full h-full rounded-lg overflow-y'>
            <div>
                <div className="flex justify-between">
                    <div className="flex flex-col pt-24 pl-2">
                        <h4 className="text-xl font-semibold text-purple">Inventory</h4>
                        <p className="text-gray-400">View, manage, and update inventory items and pricing.</p>
                    </div>
                    <div className='flex gap-2 pt-28 pr-2'>
                        <button onClick={ toggleAddInventoryItem } className="px-2 py-2 w-10 h-10 text-white rounded-lg bg-green hover:bg-emerald-300">
                            <PlusCircle size={21} /> 
                        </button>
                    </div>
                </div>
                <div className="flex justify-between items-center p-3 mx-2 mt-4 font-bold text-gray-600 bg-white rounded divide-x divide-gray-500 shadow-lg">
                    {headers?.map((header, index) => (
                        <p key={index} className={`text-xs uppercase flex-1 text-center ${index === 1 ? 'hidden lg:block' : ''}`}>
                            {header}
                        </p>
                    ))}
                </div>
                <div className="pt-2 max-h-[550px] pb-2 space-y-2">
                        {inventory?.map(({ id, item_code, store_code, group_num, selling_incl_1, selling_incl_2, description_1, unit_size, physical_item, category_main, category_sub, category_last, sales_tax_type, purchase_tax_type, image, net_mass, tax_description, tax_value }) => (
                            <div key={id} className="flex flex-col p-3 mx-2 text-gray-600 bg-white rounded shadow-lg">
                                <div className="flex justify-between items-center">
                                    {/* Fixed alignment: All columns now use consistent structure and padding */}
                                    <div className="flex-1 text-sm text-center">
                                        <p className="text-purple">{id}</p>
                                    </div>
                                    <div className="flex-1 text-sm text-center">
                                        <p>{image || '--:--'}</p>
                                    </div>
                                    <div className="flex-1 text-sm text-center">
                                        <p>{item_code || '--:--'}</p>
                                    </div>
                                    <div className="flex-1 text-sm text-center">
                                        <p>{description_1 || '--:--'}</p>
                                    </div>
                                    <div className="flex-1 text-sm text-center">
                                        <p>R{selling_incl_1 || '--:--'}</p>
                                    </div>
                                    <div className="flex-1 text-sm text-center">
                                        <p>{unit_size || '--:--'}</p>
                                    </div>
                                    <div className="flex flex-1 gap-4 justify-center items-center text-sm text-center">
                                        {/* Edit Inventory Item */}
                                        <Tooltip>
                                            <TooltipTrigger>
                                                <button onClick={() => handleEditInventoryItem(id)} className="flex justify-center items-center p-1 text-gray-500 bg-white rounded-lg border border-gray-500 cursor-pointer hover:bg-gray-200">
                                                    <Edit size={21} /> 
                                                </button>
                                            </TooltipTrigger>
                                            <TooltipContent>
                                                <p>Edit</p>
                                            </TooltipContent>
                                        </Tooltip>

                                        {/* Activate Branch */}
                                        <Tooltip>
                                            <TooltipTrigger>
                                                <button onClick={() => toggleActivationPage(id)} className="flex justify-center items-center p-1 bg-white rounded-lg border cursor-pointer text-purple border-purple hover:bg-indigo-100">
                                                    <Activity size={21} />
                                                </button>
                                            </TooltipTrigger>
                                            <TooltipContent>
                                                <p>Activate</p>
                                            </TooltipContent>
                                        </Tooltip>

                                        {/* Deactivate Branch */}
                                        <Tooltip>
                                            <TooltipTrigger>
                                                <button onClick={() => toggleDeactivationPage(id)} className="flex justify-center items-center p-1 bg-white rounded-lg border cursor-pointer text-red border-red hover:bg-rose-100">
                                                    <ShieldAlert size={21} />
                                                </button>
                                            </TooltipTrigger>
                                            <TooltipContent>
                                                <p>Deactivate</p>
                                            </TooltipContent>
                                        </Tooltip>

                                        {/* Restore Branch */}
                                        <Tooltip>
                                            <TooltipTrigger>
                                                <button onClick={() => toggleRestorePage(id)} className="flex justify-center items-center p-1 bg-white rounded-lg border cursor-pointer text-green border-green hover:bg-green-100">
                                                    <ArchiveRestore size={21} /> 
                                                </button>
                                            </TooltipTrigger>
                                            <TooltipContent>
                                                <p>Restore</p>
                                            </TooltipContent>
                                        </Tooltip>

                                        {/* Delete Organisation */}
                                        <Tooltip>
                                            <TooltipTrigger>
                                                <button onClick={() => toggleDeletePage(id)} className="flex justify-center items-center p-1 bg-white rounded-lg border cursor-pointer text-red border-red hover:bg-rose-100">
                                                    <Trash2 size={21} /> 
                                                </button>
                                            </TooltipTrigger>
                                            <TooltipContent>
                                                <p>Delete</p>
                                            </TooltipContent>
                                        </Tooltip>
                                    </div>
                                </div>
                            </div>
                        ))}
                </div>
            </div>
        </div>  
        {addInventoryItemPopUp && 
            <AddInventoryItem
                onClose={toggleAddInventoryItem} 
                onSuccess={handleSuccess} 
            />
        }

        {editInventoryItemPopUp && 
            <EditInventoryItem
                onClose={closeEditInventoryItemPopup} 
                selectedInventoryItem={selectedInventoryItem}
                onSuccess={handleSuccess}
            />
        }

        {deletePopUp && (
            <DeleteInventoryItemConfirmation
                itemCode={selectedInventoryItem?.item_code} 
                isOpen={deletePopUp} 
                onClose={toggleDeletePage}
                onSuccess={handleSuccess}
            /> 
        )}
        </div>
        )
    }

    if (inventory?.length === 0) {
        return (
            <div className="pb-52">
            <div className='flex flex-col gap-4 pb-10 w-full h-full rounded-lg overflow-y'>
            <div>
                <div className="flex justify-between">
                    <div className="flex flex-col pt-24 pl-2">
                        <h4 className="text-xl font-semibold text-purple">Inventory</h4>
                        <p className="text-gray-400">View, manage, and update inventory items and pricing.</p>
                    </div>
                    <div className='flex gap-2 pt-28 pr-2'>
                        <button onClick={ toggleAddInventoryItem } className="px-2 py-2 w-10 h-10 text-white rounded-lg bg-green hover:bg-emerald-300">
                            <PlusCircle size={21} /> 
                        </button>
                    </div>
                </div>
                <div className="flex justify-between items-center p-3 mx-2 mt-4 font-bold text-gray-600 bg-white rounded divide-x divide-gray-500 shadow-lg">
                    {headers?.map((header, index) => (
                        <p key={index} className={`text-xs uppercase flex-1 text-center ${index === 1 ? 'hidden lg:block' : ''}`}>
                            {header}
                        </p>
                    ))}
                </div>
                <div className="pt-2 max-h-[550px] pb-2 space-y-2">
                        {inventory?.map(({ id, item_code, store_code, group_num, selling_incl_1, selling_incl_2, description_1, unit_size, physical_item, category_main, category_sub, category_last, sales_tax_type, purchase_tax_type, image, net_mass, tax_description, tax_value }) => (
                            <div key={id} className="flex flex-col p-3 mx-2 text-gray-600 bg-white rounded shadow-lg">
                                <div className="flex justify-between items-center">
                                    {/* Fixed alignment: All columns now use consistent structure and padding */}
                                    <div className="flex-1 text-sm text-center">
                                        <p className="text-purple">{id}</p>
                                    </div>
                                    <div className="flex-1 text-sm text-center">
                                        <p>{image || '--:--'}</p>
                                    </div>
                                    <div className="flex-1 text-sm text-center">
                                        <p>{item_code || '--:--'}</p>
                                    </div>
                                    <div className="flex-1 text-sm text-center">
                                        <p>{description_1 || '--:--'}</p>
                                    </div>
                                    <div className="flex-1 text-sm text-center">
                                        <p>R{selling_incl_1 || '--:--'}</p>
                                    </div>
                                    <div className="flex-1 text-sm text-center">
                                        <p>{unit_size || '--:--'}</p>
                                    </div>
                                    <div className="flex flex-1 gap-4 justify-center items-center text-sm text-center">
                                        {/* Edit Inventory Item */}
                                        <Tooltip>
                                            <TooltipTrigger>
                                                <button onClick={() => handleEditInventoryItem(id)} className="flex justify-center items-center p-1 text-gray-500 bg-white rounded-lg border border-gray-500 cursor-pointer hover:bg-gray-200">
                                                    <Edit size={21} /> 
                                                </button>
                                            </TooltipTrigger>
                                            <TooltipContent>
                                                <p>Edit</p>
                                            </TooltipContent>
                                        </Tooltip>

                                        {/* Activate Branch */}
                                        <Tooltip>
                                            <TooltipTrigger>
                                                <button onClick={() => toggleActivationPage(id)} className="flex justify-center items-center p-1 bg-white rounded-lg border cursor-pointer text-purple border-purple hover:bg-indigo-100">
                                                    <Activity size={21} />
                                                </button>
                                            </TooltipTrigger>
                                            <TooltipContent>
                                                <p>Activate</p>
                                            </TooltipContent>
                                        </Tooltip>

                                        {/* Deactivate Branch */}
                                        <Tooltip>
                                            <TooltipTrigger>
                                                <button onClick={() => toggleDeactivationPage(id)} className="flex justify-center items-center p-1 bg-white rounded-lg border cursor-pointer text-red border-red hover:bg-rose-100">
                                                    <ShieldAlert size={21} />
                                                </button>
                                            </TooltipTrigger>
                                            <TooltipContent>
                                                <p>Deactivate</p>
                                            </TooltipContent>
                                        </Tooltip>

                                        {/* Restore Branch */}
                                        <Tooltip>
                                            <TooltipTrigger>
                                                <button onClick={() => toggleRestorePage(id)} className="flex justify-center items-center p-1 bg-white rounded-lg border cursor-pointer text-green border-green hover:bg-green-100">
                                                    <ArchiveRestore size={21} /> 
                                                </button>
                                            </TooltipTrigger>
                                            <TooltipContent>
                                                <p>Restore</p>
                                            </TooltipContent>
                                        </Tooltip>

                                        {/* Delete Organisation */}
                                        <Tooltip>
                                            <TooltipTrigger>
                                                <button onClick={() => toggleDeletePage(id)} className="flex justify-center items-center p-1 bg-white rounded-lg border cursor-pointer text-red border-red hover:bg-rose-100">
                                                    <Trash2 size={21} /> 
                                                </button>
                                            </TooltipTrigger>
                                            <TooltipContent>
                                                <p>Delete</p>
                                            </TooltipContent>
                                        </Tooltip>
                                    </div>
                                </div>
                            </div>
                        ))}
                </div>
            </div>
            </div>  
            {addInventoryItemPopUp && 
            <AddInventoryItem
                onClose={toggleAddInventoryItem} 
                onSuccess={handleSuccess} 
            />
        }

        {editInventoryItemPopUp && 
            <EditInventoryItem
                onClose={closeEditInventoryItemPopup} 
                selectedInventoryItem={selectedInventoryItem}
                onSuccess={handleSuccess}
            />
        }

        {deletePopUp && (
            <DeleteInventoryItemConfirmation
                itemCode={selectedInventoryItem?.item_code} 
                isOpen={deletePopUp} 
                onClose={toggleDeletePage}
                onSuccess={handleSuccess}
            /> 
        )}
        </div>
        )
    }

    return (
        <div className="pb-52">
            <div className='flex flex-col gap-4 pb-10 w-full h-full rounded-lg overflow-y'>
            <div>
                <div className="flex justify-between">
                    <div className="flex flex-col pt-24 pl-2">
                        <h4 className="text-xl font-semibold text-purple">Inventory</h4>
                        <p className="text-gray-400">View, manage, and update inventory items and pricing.</p>
                    </div>
                    <div className='flex gap-2 pt-28 pr-2'>
                        <button onClick={ toggleAddInventoryItem } className="px-2 py-2 w-10 h-10 text-white rounded-lg bg-green hover:bg-emerald-300">
                            <PlusCircle size={21} /> 
                        </button>
                    </div>
                </div>
                <div className="flex justify-between items-center p-3 mx-2 mt-4 font-bold text-gray-600 bg-white rounded divide-x divide-gray-500 shadow-lg">
                    {headers?.map((header, index) => (
                        <p key={index} className={`text-xs uppercase flex-1 text-center ${index === 1 ? 'hidden lg:block' : ''}`}>
                            {header}
                        </p>
                    ))}
                </div>
                <div className="pt-2 max-h-[550px] pb-2 space-y-2">
                        {inventory?.map(({ id, item_code, store_code, group_num, selling_incl_1, selling_incl_2, description_1, unit_size, physical_item, category_main, category_sub, category_last, sales_tax_type, purchase_tax_type, image, net_mass, tax_description, tax_value }) => (
                            <div key={id} className="flex flex-col p-3 mx-2 text-gray-600 bg-white rounded shadow-lg">
                                <div className="flex justify-between items-center">
                                    {/* Fixed alignment: All columns now use consistent structure and padding */}
                                    <div className="flex-1 text-sm text-center">
                                        <p className="text-purple">{id}</p>
                                    </div>
                                    <div className="flex-1 text-sm text-center">
                                        <div className="relative mx-auto w-10 h-10">
                                            <Image 
                                                src={image} 
                                                alt={`${item_code} image`}
                                                fill
                                                className="object-contain rounded-lg"
                                                unoptimized
                                            />
                                        </div>
                                    </div>
                                    <div className="flex-1 text-sm text-center">
                                        <p>{item_code || '--:--'}</p>
                                    </div>
                                    <div className="flex-1 text-sm text-center">
                                        <p>{description_1 || '--:--'}</p>
                                    </div>
                                    <div className="flex-1 text-sm text-center">
                                        <p>R{selling_incl_1 || '--:--'}</p>
                                    </div>
                                    <div className="flex-1 text-sm text-center">
                                        <p>{unit_size || '--:--'}</p>
                                    </div>
                                    <div className="flex flex-1 gap-4 justify-center items-center text-sm text-center">
                                        {/* Edit Inventory Item */}
                                        <Tooltip>
                                            <TooltipTrigger>
                                                <button onClick={() => handleEditInventoryItem(id)} className="flex justify-center items-center p-1 text-gray-500 bg-white rounded-lg border border-gray-500 cursor-pointer hover:bg-gray-200">
                                                    <Edit size={21} /> 
                                                </button>
                                            </TooltipTrigger>
                                            <TooltipContent>
                                                <p>Edit</p>
                                            </TooltipContent>
                                        </Tooltip>

                                        {/* Delete Organisation */}
                                        <Tooltip>
                                            <TooltipTrigger>
                                                <button onClick={() => toggleDeletePage(id)} className="flex justify-center items-center p-1 bg-white rounded-lg border cursor-pointer text-red border-red hover:bg-rose-100">
                                                    <Trash2 size={21} /> 
                                                </button>
                                            </TooltipTrigger>
                                            <TooltipContent>
                                                <p>Delete</p>
                                            </TooltipContent>
                                        </Tooltip>
                                    </div>
                                </div>
                            </div>
                        ))}
                </div>
            </div>
        </div>
        {addInventoryItemPopUp && 
            <AddInventoryItem
                onClose={toggleAddInventoryItem} 
                onSuccess={handleSuccess} 
            />
        }

        {editInventoryItemPopUp && 
            <EditInventoryItem
                onClose={closeEditInventoryItemPopup} 
                selectedInventoryItem={selectedInventoryItem}
                onSuccess={handleSuccess}
            />
        }

        {deletePopUp && (
            <DeleteInventoryItemConfirmation
                itemCode={selectedInventoryItem?.item_code} 
                isOpen={deletePopUp} 
                onClose={toggleDeletePage}
                onSuccess={handleSuccess}
            /> 
        )}
        </div>
    );
}