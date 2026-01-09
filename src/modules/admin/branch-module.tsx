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
import { Badge } from "@/components/ui/badge";
import { useSession } from "@/context";

export const BranchModule = () => {
    const { user } = useSession();
    const [branches, setBranches] = useState<Branch[] | null>(null);

    const [addBranchPopUp, setAddBranchPopUp] = useState(false);
    const [editBranchPopup, setEditBranchPopup] = useState(false);
    const [activationPopUp, setActivationPopUp] = useState(false);
    const [deactivationPopUp, setDeactivationPopUp] = useState(false);
    const [restorePopUp, setRestorePopUp] = useState(false);

    const [selectedBranch, setSelectedBranch] = useState<Branch | null>(null);
    const [selectedBranchID, setSelectedBranchID] = useState(0);
    const [selectedBranchName, setSelectedBranchName] = useState('');

    // Updated headers array: Removed 'Logo' column to maintain alignment
    const headers = ['ID', 'Name', 'Email', 'Manager', 'Status', 'Deleted', 'Action']

    const [deletePopUp, setDeletePopUp] = useState(false);
    const [expandedRow, setExpandedRow] = useState<number | null>(null);

    const [loadingData, setLoadingData] = useState(false);
    const [isError, setIsError] = useState(false);

    const handleExpandClick = (id: number) => {
        setExpandedRow(expandedRow === id ? null : id);
    };

    const toggleActivationPage = (uid: number) => {
        setActivationPopUp(!activationPopUp);
        setSelectedBranchID(uid)
    };

    const toggleDeactivationPage = (uid: number) => {
        setDeactivationPopUp(!deactivationPopUp);
        setSelectedBranchID(uid)
    };

    const toggleRestorePage = (uid: number) => {
        setRestorePopUp(!restorePopUp);
        setSelectedBranchID(uid)
    };

    const fetchBranches = async () => {
        setLoadingData(true);

        try {
            const branchesData = await getAllBranches(user)
            setBranches(branchesData)
            console.log("all branches returned bro: ", branchesData)
        } catch (error) {
            console.error('error fetching all branches bro:', error)
            setIsError(true);
        }
        setLoadingData(false);
    }

    const toggleAddBranch = () => {
        setAddBranchPopUp(!addBranchPopUp);
    }

    const handleEditBranch = (uid: any) => {
        const selected = branches?.find((item) => item.uid === uid) || null;
        
        if (selected) {
            setSelectedBranch(selected);
            setEditBranchPopup(true);

        } else {
            console.log("No selected Branch, sumn wrong with the code my nigga:" + selected);
        }
    }; 

    const toggleDeletePage = (uid: number, name: string) => {
        setDeletePopUp(!deletePopUp);
        setSelectedBranchID(uid)
        setSelectedBranchName(name)
    };

    const closeEditBranchPopup = () => {
        setEditBranchPopup(false);
    }

    const closeActivationPopup = () => {
        setActivationPopUp(false);
    };

    const handleSuccess = () => {
        // Refresh the organisations data after successful activation
        fetchBranches();
    };

    useEffect(() => {
        fetchBranches();
    }, []);

    if (loadingData) {
        return (
            <div>
            <div className='flex flex-col gap-4 mb-80 w-full h-full rounded-lg overflow-y'>
                <div>
                    <RewardSummaryCards />
                </div>
            <div>
                <div className="flex justify-between">
                    <div className="flex flex-col pt-6 pl-2">
                        <h4 className="text-xl font-semibold text-purple">Branches</h4>
                        <p className="text-gray-400">Manage your branches details and settings.</p>
                    </div>
                    <div className='flex gap-2 pt-8 pr-2'>
                        <button onClick={ toggleAddBranch } className="px-2 py-2 w-10 h-10 text-white rounded-lg bg-green hover:bg-emerald-300">
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
                <div className="flex flex-col justify-center items-center pt-20">
                    <SquareCircleLoader />
                    <p className="pt-4 text-gray-500 uppercase">Loading data, please be patient.</p>
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
            <div className='flex flex-col gap-4 mb-80 w-full h-full rounded-lg overflow-y'>
                <div>
                    <RewardSummaryCards />
                </div>
            <div>
                <div className="flex justify-between">
                    <div className="flex flex-col pt-6 pl-2">
                        <h4 className="text-xl font-semibold text-purple">Branches</h4>
                        <p className="text-gray-400">Manage your branches details and settings.</p>
                    </div>
                    <div className='flex gap-2 pt-8 pr-2'>
                        <button onClick={ toggleAddBranch } className="px-2 py-2 w-10 h-10 text-white rounded-lg bg-green hover:bg-emerald-300">
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
                <div className="flex flex-col justify-center items-center pt-10">
                    <XOctagon size={44} className="text-black" />
                    <p className="pt-2 ml-2 uppercase text-red">An error occoured when fetching the rewards!</p>
                </div>
            </div>
        </div>
        {/* {deletePopUp && (<DeleteRewardConfirmation isOpen={ deletePopUp } onClose={ toggleDeletePage } /> )}
        {editProductsPopup && <EditRewards onClose={closeEditRewardsPopup} selectedReward={selectedReward} />}
        {addRewardsPopUp && <AddNewRewards onClose={ toggleAddRewards } />} */}
        </div>
        )
    }

    if (branches?.length === 0) {
        return (
            <div>
            <div className='flex flex-col gap-4 mb-80 w-full h-full rounded-lg overflow-y'>
                <div>
                    <RewardSummaryCards />
                </div>
            <div>
                <div className="flex justify-between">
                    <div className="flex flex-col pt-6 pl-2">
                    <h4 className="text-xl font-semibold text-purple">Branches</h4>
                    <p className="text-gray-400">Manage your branches details and settings.</p>
                    </div>
                    <div className='flex gap-2 pt-8 pr-2'>
                        <button onClick={ toggleAddBranch } className="px-2 py-2 w-10 h-10 text-white rounded-lg bg-green hover:bg-emerald-300">
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
                <div className="flex flex-col justify-center items-center pt-10">
                    <ShieldAlert size={44} className="text-black" />
                    <p className="pt-2 ml-2 uppercase text-green">No rewards have been set for customers. Add new rewards to enhance their experience!</p>
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
            <div className='flex flex-col gap-4 pb-10 w-full h-full rounded-lg overflow-y'>
            <div>
                <div className="flex justify-between">
                    <div className="flex flex-col pt-24 pl-2">
                        <h4 className="text-xl font-semibold text-purple">Branches</h4>
                        <p className="text-gray-400">Manage your branches details and settings.</p>
                    </div>
                    <div className='flex gap-2 pt-28 pr-2'>
                        <button onClick={ toggleAddBranch } className="px-2 py-2 w-10 h-10 text-white rounded-lg bg-green hover:bg-emerald-300">
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
                        {branches?.map(({ uid, name, contactNumber, email, isActive, managerName, operatingHours, isDeleted }) => (
                            <div key={uid} className="flex flex-col p-3 mx-2 text-gray-600 bg-white rounded shadow-lg">
                                <div className="flex justify-between items-center">
                                    {/* Fixed alignment: All columns now use consistent structure and padding */}
                                    <div className="flex-1 text-sm text-center">
                                        <p className="text-purple">{uid}</p>
                                    </div>
                                    <div className="flex-1 text-sm text-center">
                                        <p>{name || '--:--'}</p>
                                    </div>
                                    {/* <div className="flex-1 text-sm text-center">
                                        <p>{contactNumber|| '--:--'}</p>
                                    </div> */}
                                    <div className="flex-1 text-sm text-center">
                                        <p>{email || '--:--'}</p>
                                    </div>
                                    <div className="flex-1 text-sm text-center">
                                        <p>{managerName || '--:--'}</p>
                                    </div>
                                    <div className="flex-1 text-sm text-center">
                                        {/* <p className={`${isActive === true ? 'text-green' : 'text-red'}`}>
                                            {isActive === true ? 'Active' : 'Inactive'}
                                        </p> */}
                                        <Badge className={`${isActive === true ? 'bg-green hover:bg-green-100 text-white' : 'bg-red hover:bg-red-100 text-white'}`}>
                                            {isActive === true ? 'Active' : 'Inactive'}
                                        </Badge>
                                    </div>
                                    <div className="flex-1 text-sm text-center">
                                        <Badge className={`${isDeleted === true ? 'bg-red hover:bg-red-100 text-white' : 'bg-green hover:bg-green-100 text-white'}`}>
                                            {isDeleted === true ? 'Deleted' : 'Not Deleted'}
                                        </Badge>
                                    </div>
                                    <div className="flex flex-1 gap-4 justify-center items-center text-sm text-center">
                                        {/* Edit Branch */}
                                        <Tooltip>
                                            <TooltipTrigger>
                                                <button onClick={() => handleEditBranch(uid)} className="flex justify-center items-center p-1 text-gray-500 bg-white rounded-lg border border-gray-500 cursor-pointer hover:bg-gray-200">
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
                                                <button onClick={() => toggleActivationPage(uid)} className="flex justify-center items-center p-1 bg-white rounded-lg border cursor-pointer text-purple border-purple hover:bg-indigo-100">
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
                                                <button onClick={() => toggleDeactivationPage(uid)} className="flex justify-center items-center p-1 bg-white rounded-lg border cursor-pointer text-red border-red hover:bg-rose-100">
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
                                                <button onClick={() => toggleRestorePage(uid)} className="flex justify-center items-center p-1 bg-white rounded-lg border cursor-pointer text-green border-green hover:bg-green-100">
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
                                                <button onClick={() => toggleDeletePage(uid, name)} className="flex justify-center items-center p-1 bg-white rounded-lg border cursor-pointer text-red border-red hover:bg-rose-100">
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
                                        <div className="grid grid-cols-8 gap-4 p-4 pt-2 text-sm text-center bg-gray-100 rounded shadow-inner">
                                            <p className="font-medium text-gray-600"></p>
                                        <div>
                                            <p className="text-xs font-bold text-gray-600 uppercase">Region</p>
                                            <p className="pt-1 text-sm text-gray-500">{region || '--:--'}</p>
                                        </div>
                                        <div>
                                            <p className="text-xs font-bold text-gray-600 uppercase">Loyalty Tier</p>
                                            <p className="pt-1 text-sm text-gray-500">{loyalty_tier || '--:--'}</p>
                                        </div>
                                        <div>
                                            <p className="text-xs font-bold text-gray-600 uppercase">Age Group</p>
                                            <p className="pt-1 text-sm text-gray-500">{age_group || '--:--'}</p>
                                        </div>
                                        <div>
                                            <p className="text-xs font-bold text-gray-600 uppercase">Start Date</p>
                                            <p className="pt-1 text-sm text-gray-500">{start_date ? start_date.split(" ")[0] : '--:--'}</p>
                                        </div>
                                        <div>
                                            <p className="text-xs font-bold text-gray-600 uppercase">Expiry Date</p>
                                            <p className="pt-1 text-sm text-red">{expiry_date ? expiry_date.split(" ")[0] : '--:--'}</p>
                                        </div>
                                        <div>
                                            <p className="text-xs font-bold text-gray-600 uppercase">Status</p>
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
            {deletePopUp && (
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
            }
            </div>
        </div>
    );
}