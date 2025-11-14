'use client'

import { useState, useEffect } from "react"
import { Edit, Trash2, ShieldAlert, XOctagon, PlusCircle, ArchiveRestore, Activity} from "lucide-react"
import SquareCircleLoader from "@/lib/square-circle-loader";
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip';
import { getAllUsers } from "@/components/data/user/get-all-users-data";
import { User } from "@/modules/types/user/user-types";
import { Badge } from "@/components/ui/badge";
import { DeactivateUserConfirmation } from "./user/deactivate-user-confirmation";
import { ActivateUserConfirmation } from "./user/activate-user-confirmation";
import { DeleteUserConfirmation } from "./user/delete-user-confirmation";
import { RestoreUserConfirmation } from "./user/restore-user-confirmation";
import { AddNewUser } from "./user/add-new-user";
import { EditUser } from "./user/edit-user";
import { AddInventoryItem } from "./inventory/add-inventory-item";
import { apiClient } from "@/utils/api-client";
import { Item, ItemsResponse } from "../types/products/product-types";
import { apiEndPoint } from "@/utils/colors";

export const InventoryModule = () => {
    const [inventory, setInventory] = useState<Item[]>([])

    const [addInventoryItemPopUp, setAddInventoryItemPopUp] = useState(false);
    const [editUserPopup, setEditUserPopup] = useState(false);
    const [activationPopUp, setActivationPopUp] = useState(false);
    const [deactivationPopUp, setDeactivationPopUp] = useState(false);
    const [restorePopUp, setRestorePopUp] = useState(false);

    const [selectedInventoryItem, setSelectedInventoryItem] = useState<Item | null>(null);
    const [selectedUserID, setSelectedUserID] = useState(0);
    const [selectedUserName, setSelectedUserName] = useState('');

    // Updated headers array: Removed 'Logo' column to maintain alignment
    const headers = ['ID', 'Image', 'Item Code', 'Description', 'Selling Price 1', 'Unit Size', 'Action']
    // const headers = ['ID', 'Name', 'Role', 'ID Number', 'Status', 'Deleted', 'Action']

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
            setEditUserPopup(true);

        } else {
            console.log("No selected Branch, sumn wrong with the code my nigga:" + selected);
        }
    }; 

    const toggleDeletePage = (uid: number) => {
        setDeletePopUp(!deletePopUp);
        setSelectedUserID(uid)
    };

    const closeEditUserPopup = () => {
        setEditUserPopup(false);
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
            <div className='w-full h-full flex flex-col gap-4 rounded-lg overflow-y pb-10'>
            <div>
                <div className="flex justify-between">
                    <div className="flex flex-col pl-2 pt-24">
                        <h4 className="text-xl font-semibold text-purple">Inventory</h4>
                        <p className="text-gray-400">View, manage, and update inventory items and pricing.</p>
                    </div>
                    <div className='flex gap-2 pt-28 pr-2'>
                        <button onClick={ toggleAddInventoryItem } className="bg-green text-white py-2 px-2 w-10 h-10 rounded-lg hover:bg-emerald-300">
                            <PlusCircle size={21} /> 
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
                <div className="pt-2 max-h-[550px] pb-2 space-y-2">
                        {inventory?.map(({ id, item_code, store_code, group_num, selling_incl_1, selling_incl_2, description_1, unit_size, physical_item, category_main, category_sub, category_last, sales_tax_type, purchase_tax_type, image, net_mass, tax_description, tax_value }) => (
                            <div key={id} className="bg-white text-gray-600 flex flex-col p-3 mx-2 rounded shadow-lg">
                                <div className="flex items-center justify-between">
                                    {/* Fixed alignment: All columns now use consistent structure and padding */}
                                    <div className="text-sm flex-1 text-center">
                                        <p className="text-purple">{id}</p>
                                    </div>
                                    <div className="text-sm flex-1 text-center">
                                        <p>{image || '--:--'}</p>
                                    </div>
                                    <div className="text-sm flex-1 text-center">
                                        <p>{item_code || '--:--'}</p>
                                    </div>
                                    <div className="text-sm flex-1 text-center">
                                        <p>{description_1 || '--:--'}</p>
                                    </div>
                                    <div className="text-sm flex-1 text-center">
                                        <p>R{selling_incl_1 || '--:--'}</p>
                                    </div>
                                    <div className="text-sm flex-1 text-center">
                                        <p>{unit_size || '--:--'}</p>
                                    </div>
                                    <div className="flex items-center justify-center text-sm flex-1 text-center gap-4">
                                        {/* Edit Inventory Item */}
                                        <Tooltip>
                                            <TooltipTrigger>
                                                <button onClick={() => handleEditInventoryItem(id)} className="flex items-center justify-center cursor-pointer bg-white text-gray-500 border border-gray-500 hover:bg-gray-200 p-1 rounded-lg">
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
                                                <button onClick={() => toggleActivationPage(id)} className="flex items-center justify-center cursor-pointer bg-white text-purple border border-purple hover:bg-indigo-100 p-1 rounded-lg">
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
                                                <button onClick={() => toggleDeactivationPage(id)} className="flex items-center justify-center cursor-pointer bg-white text-red border border-red hover:bg-rose-100 p-1 rounded-lg">
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
                                                <button onClick={() => toggleRestorePage(id)} className="flex items-center justify-center cursor-pointer bg-white text-green border border-green hover:bg-green-100 p-1 rounded-lg">
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
                                                <button onClick={() => toggleDeletePage(id)} className="flex items-center justify-center cursor-pointer bg-white text-red border border-red hover:bg-rose-100 p-1 rounded-lg">
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
        {/* {deletePopUp && (
            <DeleteUserConfirmation
                userID={selectedUserID} 
                isOpen={deletePopUp} 
                onClose={toggleDeletePage}
                onSuccess={handleSuccess}
            /> 
        )}
        {activationPopUp && (
            <ActivateUserConfirmation
                userID={selectedUserID} 
                isOpen={activationPopUp} 
                onClose={closeActivationPopup}
                onSuccess={handleSuccess}
            />
        )} 
        {deactivationPopUp && (
            <DeactivateUserConfirmation
                userID={selectedUserID} 
                isOpen={deactivationPopUp} 
                onClose={toggleDeactivationPage}
                onSuccess={handleSuccess}
            /> 
        )}
        
        {restorePopUp && (
            <RestoreUserConfirmation
                userID={selectedUserID} 
                isOpen={restorePopUp} 
                onClose={toggleRestorePage}
                onSuccess={handleSuccess}
            /> 
        )}
        
        {editUserPopup && 
            <EditUser
                onClose={closeEditUserPopup} 
                selectedUser={selectedUser}
                onSuccess={handleSuccess}
            />
        }
        
        {addUserPopUp && 
            <AddNewUser
                onClose={toggleAddUser} 
                onSuccess={handleSuccess} 
            />
        } */}
        {addInventoryItemPopUp && 
            <AddInventoryItem
                onClose={toggleAddInventoryItem} 
                onSuccess={handleSuccess} 
            />
        }
        </div>
        )
    }

    if (isError) {
        return (
            <div className="pb-52">
            <div className='w-full h-full flex flex-col gap-4 rounded-lg overflow-y pb-10'>
            <div>
                <div className="flex justify-between">
                    <div className="flex flex-col pl-2 pt-24">
                        <h4 className="text-xl font-semibold text-purple">Inventory</h4>
                        <p className="text-gray-400">View, manage, and update inventory items and pricing.</p>
                    </div>
                    <div className='flex gap-2 pt-28 pr-2'>
                        <button onClick={ toggleAddInventoryItem } className="bg-green text-white py-2 px-2 w-10 h-10 rounded-lg hover:bg-emerald-300">
                            <PlusCircle size={21} /> 
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
                <div className="pt-2 max-h-[550px] pb-2 space-y-2">
                        {inventory?.map(({ id, item_code, store_code, group_num, selling_incl_1, selling_incl_2, description_1, unit_size, physical_item, category_main, category_sub, category_last, sales_tax_type, purchase_tax_type, image, net_mass, tax_description, tax_value }) => (
                            <div key={id} className="bg-white text-gray-600 flex flex-col p-3 mx-2 rounded shadow-lg">
                                <div className="flex items-center justify-between">
                                    {/* Fixed alignment: All columns now use consistent structure and padding */}
                                    <div className="text-sm flex-1 text-center">
                                        <p className="text-purple">{id}</p>
                                    </div>
                                    <div className="text-sm flex-1 text-center">
                                        <p>{image || '--:--'}</p>
                                    </div>
                                    <div className="text-sm flex-1 text-center">
                                        <p>{item_code || '--:--'}</p>
                                    </div>
                                    <div className="text-sm flex-1 text-center">
                                        <p>{description_1 || '--:--'}</p>
                                    </div>
                                    <div className="text-sm flex-1 text-center">
                                        <p>R{selling_incl_1 || '--:--'}</p>
                                    </div>
                                    <div className="text-sm flex-1 text-center">
                                        <p>{unit_size || '--:--'}</p>
                                    </div>
                                    <div className="flex items-center justify-center text-sm flex-1 text-center gap-4">
                                        {/* Edit Inventory Item */}
                                        <Tooltip>
                                            <TooltipTrigger>
                                                <button onClick={() => handleEditInventoryItem(id)} className="flex items-center justify-center cursor-pointer bg-white text-gray-500 border border-gray-500 hover:bg-gray-200 p-1 rounded-lg">
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
                                                <button onClick={() => toggleActivationPage(id)} className="flex items-center justify-center cursor-pointer bg-white text-purple border border-purple hover:bg-indigo-100 p-1 rounded-lg">
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
                                                <button onClick={() => toggleDeactivationPage(id)} className="flex items-center justify-center cursor-pointer bg-white text-red border border-red hover:bg-rose-100 p-1 rounded-lg">
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
                                                <button onClick={() => toggleRestorePage(id)} className="flex items-center justify-center cursor-pointer bg-white text-green border border-green hover:bg-green-100 p-1 rounded-lg">
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
                                                <button onClick={() => toggleDeletePage(id)} className="flex items-center justify-center cursor-pointer bg-white text-red border border-red hover:bg-rose-100 p-1 rounded-lg">
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
        {/* {deletePopUp && (
            <DeleteUserConfirmation
                userID={selectedUserID} 
                isOpen={deletePopUp} 
                onClose={toggleDeletePage}
                onSuccess={handleSuccess}
            /> 
        )}
        {activationPopUp && (
            <ActivateUserConfirmation
                userID={selectedUserID} 
                isOpen={activationPopUp} 
                onClose={closeActivationPopup}
                onSuccess={handleSuccess}
            />
        )} 
        {deactivationPopUp && (
            <DeactivateUserConfirmation
                userID={selectedUserID} 
                isOpen={deactivationPopUp} 
                onClose={toggleDeactivationPage}
                onSuccess={handleSuccess}
            /> 
        )}
        
        {restorePopUp && (
            <RestoreUserConfirmation
                userID={selectedUserID} 
                isOpen={restorePopUp} 
                onClose={toggleRestorePage}
                onSuccess={handleSuccess}
            /> 
        )}
        
        {editUserPopup && 
            <EditUser
                onClose={closeEditUserPopup} 
                selectedUser={selectedUser}
                onSuccess={handleSuccess}
            />
        }
        
        {addUserPopUp && 
            <AddNewUser
                onClose={toggleAddUser} 
                onSuccess={handleSuccess} 
            />
        } */}
        {addInventoryItemPopUp && 
            <AddInventoryItem
                onClose={toggleAddInventoryItem} 
                onSuccess={handleSuccess} 
            />
        }
        </div>
        )
    }

    if (inventory?.length === 0) {
        return (
            <div className="pb-52">
            <div className='w-full h-full flex flex-col gap-4 rounded-lg overflow-y pb-10'>
            <div>
                <div className="flex justify-between">
                    <div className="flex flex-col pl-2 pt-24">
                        <h4 className="text-xl font-semibold text-purple">Inventory</h4>
                        <p className="text-gray-400">View, manage, and update inventory items and pricing.</p>
                    </div>
                    <div className='flex gap-2 pt-28 pr-2'>
                        <button onClick={ toggleAddInventoryItem } className="bg-green text-white py-2 px-2 w-10 h-10 rounded-lg hover:bg-emerald-300">
                            <PlusCircle size={21} /> 
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
                <div className="pt-2 max-h-[550px] pb-2 space-y-2">
                        {inventory?.map(({ id, item_code, store_code, group_num, selling_incl_1, selling_incl_2, description_1, unit_size, physical_item, category_main, category_sub, category_last, sales_tax_type, purchase_tax_type, image, net_mass, tax_description, tax_value }) => (
                            <div key={id} className="bg-white text-gray-600 flex flex-col p-3 mx-2 rounded shadow-lg">
                                <div className="flex items-center justify-between">
                                    {/* Fixed alignment: All columns now use consistent structure and padding */}
                                    <div className="text-sm flex-1 text-center">
                                        <p className="text-purple">{id}</p>
                                    </div>
                                    <div className="text-sm flex-1 text-center">
                                        <p>{image || '--:--'}</p>
                                    </div>
                                    <div className="text-sm flex-1 text-center">
                                        <p>{item_code || '--:--'}</p>
                                    </div>
                                    <div className="text-sm flex-1 text-center">
                                        <p>{description_1 || '--:--'}</p>
                                    </div>
                                    <div className="text-sm flex-1 text-center">
                                        <p>R{selling_incl_1 || '--:--'}</p>
                                    </div>
                                    <div className="text-sm flex-1 text-center">
                                        <p>{unit_size || '--:--'}</p>
                                    </div>
                                    <div className="flex items-center justify-center text-sm flex-1 text-center gap-4">
                                        {/* Edit Inventory Item */}
                                        <Tooltip>
                                            <TooltipTrigger>
                                                <button onClick={() => handleEditInventoryItem(id)} className="flex items-center justify-center cursor-pointer bg-white text-gray-500 border border-gray-500 hover:bg-gray-200 p-1 rounded-lg">
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
                                                <button onClick={() => toggleActivationPage(id)} className="flex items-center justify-center cursor-pointer bg-white text-purple border border-purple hover:bg-indigo-100 p-1 rounded-lg">
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
                                                <button onClick={() => toggleDeactivationPage(id)} className="flex items-center justify-center cursor-pointer bg-white text-red border border-red hover:bg-rose-100 p-1 rounded-lg">
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
                                                <button onClick={() => toggleRestorePage(id)} className="flex items-center justify-center cursor-pointer bg-white text-green border border-green hover:bg-green-100 p-1 rounded-lg">
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
                                                <button onClick={() => toggleDeletePage(id)} className="flex items-center justify-center cursor-pointer bg-white text-red border border-red hover:bg-rose-100 p-1 rounded-lg">
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
        {/* {deletePopUp && (
            <DeleteUserConfirmation
                userID={selectedUserID} 
                isOpen={deletePopUp} 
                onClose={toggleDeletePage}
                onSuccess={handleSuccess}
            /> 
        )}
        {activationPopUp && (
            <ActivateUserConfirmation
                userID={selectedUserID} 
                isOpen={activationPopUp} 
                onClose={closeActivationPopup}
                onSuccess={handleSuccess}
            />
        )} 
        {deactivationPopUp && (
            <DeactivateUserConfirmation
                userID={selectedUserID} 
                isOpen={deactivationPopUp} 
                onClose={toggleDeactivationPage}
                onSuccess={handleSuccess}
            /> 
        )}
        
        {restorePopUp && (
            <RestoreUserConfirmation
                userID={selectedUserID} 
                isOpen={restorePopUp} 
                onClose={toggleRestorePage}
                onSuccess={handleSuccess}
            /> 
        )}
        
        {editUserPopup && 
            <EditUser
                onClose={closeEditUserPopup} 
                selectedUser={selectedUser}
                onSuccess={handleSuccess}
            />
        }
        
        {addUserPopUp && 
            <AddNewUser
                onClose={toggleAddUser} 
                onSuccess={handleSuccess} 
            />
        } */}
        {addInventoryItemPopUp && 
            <AddInventoryItem
                onClose={toggleAddInventoryItem} 
                onSuccess={handleSuccess} 
            />
        }
        </div>
        )
    }

    return (
        <div className="pb-52">
            <div className='w-full h-full flex flex-col gap-4 rounded-lg overflow-y pb-10'>
            <div>
                <div className="flex justify-between">
                    <div className="flex flex-col pl-2 pt-24">
                        <h4 className="text-xl font-semibold text-purple">Inventory</h4>
                        <p className="text-gray-400">View, manage, and update inventory items and pricing.</p>
                    </div>
                    <div className='flex gap-2 pt-28 pr-2'>
                        <button onClick={ toggleAddInventoryItem } className="bg-green text-white py-2 px-2 w-10 h-10 rounded-lg hover:bg-emerald-300">
                            <PlusCircle size={21} /> 
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
                <div className="pt-2 max-h-[550px] pb-2 space-y-2">
                        {inventory?.map(({ id, item_code, store_code, group_num, selling_incl_1, selling_incl_2, description_1, unit_size, physical_item, category_main, category_sub, category_last, sales_tax_type, purchase_tax_type, image, net_mass, tax_description, tax_value }) => (
                            <div key={id} className="bg-white text-gray-600 flex flex-col p-3 mx-2 rounded shadow-lg">
                                <div className="flex items-center justify-between">
                                    {/* Fixed alignment: All columns now use consistent structure and padding */}
                                    <div className="text-sm flex-1 text-center">
                                        <p className="text-purple">{id}</p>
                                    </div>
                                    <div className="text-sm flex-1 text-center">
                                        <p>{image || '--:--'}</p>
                                    </div>
                                    <div className="text-sm flex-1 text-center">
                                        <p>{item_code || '--:--'}</p>
                                    </div>
                                    <div className="text-sm flex-1 text-center">
                                        <p>{description_1 || '--:--'}</p>
                                    </div>
                                    <div className="text-sm flex-1 text-center">
                                        <p>R{selling_incl_1 || '--:--'}</p>
                                    </div>
                                    <div className="text-sm flex-1 text-center">
                                        <p>{unit_size || '--:--'}</p>
                                    </div>
                                    <div className="flex items-center justify-center text-sm flex-1 text-center gap-4">
                                        {/* Edit Inventory Item */}
                                        <Tooltip>
                                            <TooltipTrigger>
                                                <button onClick={() => handleEditInventoryItem(id)} className="flex items-center justify-center cursor-pointer bg-white text-gray-500 border border-gray-500 hover:bg-gray-200 p-1 rounded-lg">
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
                                                <button onClick={() => toggleActivationPage(id)} className="flex items-center justify-center cursor-pointer bg-white text-purple border border-purple hover:bg-indigo-100 p-1 rounded-lg">
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
                                                <button onClick={() => toggleDeactivationPage(id)} className="flex items-center justify-center cursor-pointer bg-white text-red border border-red hover:bg-rose-100 p-1 rounded-lg">
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
                                                <button onClick={() => toggleRestorePage(id)} className="flex items-center justify-center cursor-pointer bg-white text-green border border-green hover:bg-green-100 p-1 rounded-lg">
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
                                                <button onClick={() => toggleDeletePage(id)} className="flex items-center justify-center cursor-pointer bg-white text-red border border-red hover:bg-rose-100 p-1 rounded-lg">
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
        {/* {deletePopUp && (
            <DeleteUserConfirmation
                userID={selectedUserID} 
                isOpen={deletePopUp} 
                onClose={toggleDeletePage}
                onSuccess={handleSuccess}
            /> 
        )}
        {activationPopUp && (
            <ActivateUserConfirmation
                userID={selectedUserID} 
                isOpen={activationPopUp} 
                onClose={closeActivationPopup}
                onSuccess={handleSuccess}
            />
        )} 
        {deactivationPopUp && (
            <DeactivateUserConfirmation
                userID={selectedUserID} 
                isOpen={deactivationPopUp} 
                onClose={toggleDeactivationPage}
                onSuccess={handleSuccess}
            /> 
        )}
        
        {restorePopUp && (
            <RestoreUserConfirmation
                userID={selectedUserID} 
                isOpen={restorePopUp} 
                onClose={toggleRestorePage}
                onSuccess={handleSuccess}
            /> 
        )}
        
        {editUserPopup && 
            <EditUser
                onClose={closeEditUserPopup} 
                selectedUser={selectedUser}
                onSuccess={handleSuccess}
            />
        }
        
        {addUserPopUp && 
            <AddNewUser
                onClose={toggleAddUser} 
                onSuccess={handleSuccess} 
            />
        } */}
        {addInventoryItemPopUp && 
            <AddInventoryItem
                onClose={toggleAddInventoryItem} 
                onSuccess={handleSuccess} 
            />
        }
        </div>
    );
}