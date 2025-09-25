'use client'

import { useState, useEffect } from "react"
import { Edit, Trash2, ShieldAlert, XOctagon, PlusCircle, ArchiveRestore, Activity} from "lucide-react"
import { RewardSummaryCards } from "./rewards/reward-cards";
import SquareCircleLoader from "@/lib/square-circle-loader";
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip';
import { getAllBranches } from "@/components/data/branch/get-all-branches-data";
import { Branch } from "@/modules/types/branch/branches-types";
import { ActivateBranchConfirmation } from "./branch/activate-branch-confirmation";
import { DeactivateBranchConfirmation } from "./branch/deactivate-branch-confirmation";
import { DeleteBranchConfirmation } from "./branch/delete-branch-confirmation";
import { RestoreBranchConfirmation } from "./branch/restore-branch-confirmation";
import { AddNewBranch } from "./branch/add-new-branch";
import { EditBranch } from "./branch/edit-branch";
import { getAllUsers } from "@/components/data/user/get-all-users-data";
import { User } from "@/modules/types/user/user-types";

export const UserModule = () => {
    const [users, setUsers] = useState<User[] | null>(null);

    const [addUserPopUp, setAddUserPopUp] = useState(false);
    const [editUserPopup, setEditUserPopup] = useState(false);
    const [activationPopUp, setActivationPopUp] = useState(false);
    const [deactivationPopUp, setDeactivationPopUp] = useState(false);
    const [restorePopUp, setRestorePopUp] = useState(false);

    const [selectedUser, setSelectedUser] = useState<User | null>(null);
    const [selectedUserID, setSelectedUserID] = useState(0);
    const [selectedUserName, setSelectedUserName] = useState('');

    // Updated headers array: Removed 'Logo' column to maintain alignment
    const headers = ['ID', 'Name', 'Role', 'ID Number', 'Status', 'Deleted', 'Action']

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

    const fetchUsers = async () => {
        setLoadingData(true);

        try {
            const usersData = await getAllUsers()
            setUsers(usersData)
            console.log("all users returned bro: ", usersData)
        } catch (error) {
            console.error('error fetching all users bro:', error)
            setIsError(true);
        }
        setLoadingData(false);
    }

    const toggleAddBranch = () => {
        setAddUserPopUp(!addUserPopUp);
    }

    const handleEditBranch = (uid: any) => {
        const selected = users?.find((item) => item.uid === uid) || null;
        
        if (selected) {
            setSelectedUser(selected);
            setEditUserPopup(true);

        } else {
            console.log("No selected Branch, sumn wrong with the code my nigga:" + selected);
        }
    }; 

    const toggleDeletePage = (uid: number) => {
        setDeletePopUp(!deletePopUp);
        setSelectedUserID(uid)
    };

    const closeEditBranchPopup = () => {
        setEditUserPopup(false);
    }

    const closeActivationPopup = () => {
        setActivationPopUp(false);
    };

    const handleSuccess = () => {
        // Refresh the organisations data after successful activation
        fetchUsers();
    };

    useEffect(() => {
        fetchUsers();
    }, []);

    if (loadingData) {
        return (
            <div>
            <div className='w-full h-full flex flex-col gap-4 rounded-lg overflow-y mb-80'>
                <div>
                    <div className="flex justify-between">
                        <div className="flex flex-col pl-2 pt-6">
                            <h4 className="text-xl font-semibold text-purple">Users</h4>
                            <p className="text-gray-400">Manage your users details and settings.</p>
                        </div>
                        <div className='flex gap-2 pt-8 pr-2'>
                            <button onClick={ toggleAddBranch } className="bg-green text-white py-2 px-2 w-10 h-10 rounded-lg hover:bg-emerald-300">
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
                    <div className="pt-20 flex flex-col items-center justify-center">
                        <SquareCircleLoader />
                        <p className="text-gray-500 uppercase pt-4">Loading data, please be patient.</p>
                    </div>
                </div>
        </div>
        {/* {deletePopUp && (<DeleteRewardConfirmation isOpen={ deletePopUp } onClose={ toggleDeletePage } /> )}
        {editProductsPopup && <EditRewards onClose={closeEditRewardsPopup} selectedReward={selectedReward} />}
        {addRewardsPopUp && <AddNewRewards onClose={ toggleAddRewards } />} */}
        </div>
        )
    }

    if (isError) {
        return (
            <div>
                <div className='w-full h-full flex flex-col gap-4 rounded-lg overflow-y mb-80'>
                    <div>
                        <div className="flex justify-between">
                            <div className="flex flex-col pl-2 pt-6">
                                <h4 className="text-xl font-semibold text-purple">Users</h4>
                                <p className="text-gray-400">Manage your users details and settings.</p>
                            </div>
                            <div className='flex gap-2 pt-8 pr-2'>
                                <button onClick={ toggleAddBranch } className="bg-green text-white py-2 px-2 w-10 h-10 rounded-lg hover:bg-emerald-300">
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
                        <div className="flex flex-col items-center justify-center pt-10">
                            <XOctagon size={44} className="text-black" />
                            <p className="ml-2 uppercase pt-2 text-red">An error occoured when fetching the rewards!</p>
                        </div>
                    </div>
                </div>
                {/* {deletePopUp && (<DeleteRewardConfirmation isOpen={ deletePopUp } onClose={ toggleDeletePage } /> )}
                {editProductsPopup && <EditRewards onClose={closeEditRewardsPopup} selectedReward={selectedReward} />}
                {addRewardsPopUp && <AddNewRewards onClose={ toggleAddRewards } />} */}
            </div>
        )
    }

    if (users?.length === 0) {
        return (
            <div>
                <div className='w-full h-full flex flex-col gap-4 rounded-lg overflow-y mb-80'>
                    <div>
                        <div className="flex justify-between">
                            <div className="flex flex-col pl-2 pt-6">
                                <h4 className="text-xl font-semibold text-purple">Users</h4>
                                <p className="text-gray-400">Manage your users details and settings.</p>
                            </div>
                            <div className='flex gap-2 pt-8 pr-2'>
                                <button onClick={ toggleAddBranch } className="bg-green text-white py-2 px-2 w-10 h-10 rounded-lg hover:bg-emerald-300">
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
                        <div className="flex flex-col items-center justify-center pt-10">
                            <ShieldAlert size={44} className="text-black" />
                            <p className="ml-2 uppercase pt-2 text-green">No rewards have been set for customers. Add new rewards to enhance their experience!</p>
                        </div>
                    </div>
                </div>
                {/* {deletePopUp && (<DeleteRewardConfirmation isOpen={ deletePopUp } onClose={ toggleDeletePage } /> )}
                {editProductsPopup && <EditRewards onClose={closeEditRewardsPopup} selectedReward={selectedReward} />}
                {addRewardsPopUp && <AddNewRewards onClose={ toggleAddRewards } />} */}
            </div>
        )
    }

    return (
        <div className="pb-52">
            <div className='w-full h-full flex flex-col gap-4 rounded-lg overflow-y pb-10'>
            <div>
                <div className="flex justify-between">
                    <div className="flex flex-col pl-2 pt-24">
                        <h4 className="text-xl font-semibold text-purple">Users</h4>
                        <p className="text-gray-400">Manage your users details and settings.</p>
                    </div>
                    <div className='flex gap-2 pt-28 pr-2'>
                        <button onClick={ toggleAddBranch } className="bg-green text-white py-2 px-2 w-10 h-10 rounded-lg hover:bg-emerald-300">
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
                        {users?.map(({ uid, username, password, id_no, emp_name, emp_surname, active, isDeleted, role }) => (
                            <div key={uid} className="bg-white text-gray-600 flex flex-col p-3 mx-2 rounded shadow-lg">
                                <div className="flex items-center justify-between">
                                    {/* Fixed alignment: All columns now use consistent structure and padding */}
                                    <div className="text-sm flex-1 text-center">
                                        <p className="text-purple">{uid}</p>
                                    </div>
                                    <div className="text-sm flex-1 text-center">
                                        <p>{emp_name || '--:--'}</p>
                                    </div>
                                    {/* <div className="text-sm flex-1 text-center">
                                        <p>{contactNumber|| '--:--'}</p>
                                    </div> */}
                                    <div className="text-sm flex-1 text-center">
                                        <p>{role || '--:--'}</p>
                                    </div>
                                    <div className="text-sm flex-1 text-center">
                                        <p>{id_no || '--:--'}</p>
                                    </div>
                                    <div className="text-sm flex-1 text-center">
                                        <p className={`${active === true ? 'text-green' : 'text-red'}`}>
                                            {active === true ? 'Active' : 'Inactive'}
                                        </p>
                                    </div>
                                    <div className="text-sm flex-1 text-center">
                                        <p className={`${isDeleted === true ? 'text-green' : 'text-red'}`}>
                                            {isDeleted === true ? 'Deleted' : 'Not Deleted'}
                                        </p>
                                    </div>
                                    <div className="flex items-center justify-center text-sm flex-1 text-center gap-4">
                                        {/* Edit Branch */}
                                        <Tooltip>
                                            <TooltipTrigger>
                                                <button onClick={() => handleEditBranch(uid)} className="flex items-center justify-center cursor-pointer bg-white text-gray-500 border border-gray-500 hover:bg-gray-200 p-1 rounded-lg">
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
                                                <button onClick={() => toggleActivationPage(uid)} className="flex items-center justify-center cursor-pointer bg-white text-purple border border-purple hover:bg-indigo-100 p-1 rounded-lg">
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
                                                <button onClick={() => toggleDeactivationPage(uid)} className="flex items-center justify-center cursor-pointer bg-white text-red border border-red hover:bg-rose-100 p-1 rounded-lg">
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
                                                <button onClick={() => toggleRestorePage(uid)} className="flex items-center justify-center cursor-pointer bg-white text-green border border-green hover:bg-green-100 p-1 rounded-lg">
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
                                                <button onClick={() => toggleDeletePage(uid)} className="flex items-center justify-center cursor-pointer bg-white text-red border border-red hover:bg-rose-100 p-1 rounded-lg">
                                                    <Trash2 size={21} /> 
                                                </button>
                                            </TooltipTrigger>
                                            <TooltipContent>
                                                <p>Delete</p>
                                            </TooltipContent>
                                        </Tooltip>
                                    </div>
                                </div>
                                {/* {expandedRow === uid && (
                                    <div className="pt-4">
                                        <div className="grid grid-cols-8 gap-4 pt-2 bg-gray-100 rounded shadow-inner text-center p-4 text-sm">
                                            <p className="font-medium text-gray-600"></p>
                                        <div>
                                            <p className="font-bold text-gray-600 text-xs uppercase">Region</p>
                                            <p className="text-sm text-gray-500 pt-1">{region || '--:--'}</p>
                                        </div>
                                        <div>
                                            <p className="font-bold text-gray-600 text-xs uppercase">Loyalty Tier</p>
                                            <p className="text-sm text-gray-500 pt-1">{loyalty_tier || '--:--'}</p>
                                        </div>
                                        <div>
                                            <p className="font-bold text-gray-600 text-xs uppercase">Age Group</p>
                                            <p className="text-sm text-gray-500 pt-1">{age_group || '--:--'}</p>
                                        </div>
                                        <div>
                                            <p className="font-bold text-gray-600 text-xs uppercase">Start Date</p>
                                            <p className="text-sm text-gray-500 pt-1">{start_date ? start_date.split(" ")[0] : '--:--'}</p>
                                        </div>
                                        <div>
                                            <p className="font-bold text-gray-600 text-xs uppercase">Expiry Date</p>
                                            <p className="text-sm pt-1 text-red">{expiry_date ? expiry_date.split(" ")[0] : '--:--'}</p>
                                        </div>
                                        <div>
                                            <p className="font-bold text-gray-600 text-xs uppercase">Status</p>
                                            <p className={`text-sm pt-1 ${isActive === true ? 'text-green' : 'text-red'}`}>
                                                {isActive === true ? 'Active' : 'Inactive'}
                                            </p>
                                        </div>
                                    </div>
                                    </div>
                                )} */}
                            </div>
                        ))}
                </div>
            </div>
        </div>  
        {/* {deletePopUp && (
            <DeleteBranchConfirmation 
                branchID={selectedBranchID} 
                isOpen={ deletePopUp } 
                onClose={ toggleDeletePage }
                onSuccess={handleSuccess}
                /> 
        )}
        {activationPopUp && (
            <ActivateBranchConfirmation
                branchID={selectedBranchID} 
                isOpen={activationPopUp} 
                onClose={closeActivationPopup}
                onSuccess={handleSuccess}
            />
        )}
        {deactivationPopUp && (
            <DeactivateBranchConfirmation 
                branchID={selectedBranchID} 
                isOpen={ deactivationPopUp } 
                onClose={ toggleDeactivationPage }
                onSuccess={handleSuccess}
            /> 
        )}
        
        {restorePopUp && (
            <RestoreBranchConfirmation
                branchID={selectedBranchID} 
                isOpen={ restorePopUp } 
                onClose={ toggleRestorePage }
                onSuccess={handleSuccess}
            /> 
        )}
        
        {editBranchPopup && 
            <EditBranch
                onClose={closeEditBranchPopup} 
                selectedBranch={selectedBranch}
                onSuccess={handleSuccess}
            />
        }
        
        {addBranchPopUp && 
            <AddNewBranch 
                onClose={ toggleAddBranch } 
                onSuccess={handleSuccess} 
            />
        } */}
        </div>
    );
}