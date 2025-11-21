'use client'

import { useState, useEffect, useCallback } from "react"
import Image from 'next/image';
import { Edit, Trash2, ShieldAlert, XOctagon, PlusCircle, ArchiveRestore, Activity} from "lucide-react"
import { RewardSummaryCards } from "./rewards/reward-cards";
import SquareCircleLoader from "@/lib/square-circle-loader";
import { Organisation } from '../types/organisation/organisation-types';
import { AddNewOrganisation } from './organisation/add-new-organisation';
import { DeleteOrganisationConfirmation } from './organisation/delete-organisation-confirmation';
// Removed getAllOrganisations import - users now only see their own organisation
import { EditOrganisation } from './organisation/edit-organisation';
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip';
import { ActivateOrganisationConfirmation } from './organisation/activate-organisation-confirmation';
import { DeactivateOrganisationConfirmation } from './organisation/deactivate-organisation-confirmation';
import { RestoreOrganisationConfirmation } from './organisation/restore-organisation-confimation';
import { Badge } from "@/components/ui/badge";
import { useSession } from "@/context";
import { getOrganisation } from "@/components/data/organisation/get-organisation-data";

export const OrganizationModule = () => {
    const { user } = useSession();
    const userOrganisationId = user?.organisation?.uid;
    // Removed organisations state - users now only see their own organisation
    const [userOrganisation, setUserOrganisation] = useState<Organisation | null>(null);

    const [addOrganisationPopUp, setAddOrganisationPopUp] = useState(false);
    const [editOrganisationPopup, setEditOrganisationPopup] = useState(false);
    const [activationPopUp, setActivationPopUp] = useState(false);
    const [deactivationPopUp, setDeactivationPopUp] = useState(false);
    const [restorePopUp, setRestorePopUp] = useState(false);

    const [selectedOrganisation, setSelectedOrganisation] = useState<Organisation | null>(null);
    const [selectedOrganisationID, setSelectedOrganisationID] = useState(0);
    const [selectedOrganisationName, setSelectedOrganisationName] = useState('');

    // Updated headers array: Removed 'Logo' column to maintain alignment
    const headers = ['ID', 'Name', 'Description', 'Logo', 'Status', 'Deleted', 'Action']

    const [deletePopUp, setDeletePopUp] = useState(false);
    const [expandedRow, setExpandedRow] = useState<number | null>(null);

    const [loadingData, setLoadingData] = useState(false);
    const [isError, setIsError] = useState(false);

    const handleExpandClick = (id: number) => {
        setExpandedRow(expandedRow === id ? null : id);
    };

    const toggleActivationPage = (uid: number) => {
        setActivationPopUp(!activationPopUp);
        setSelectedOrganisationID(uid)
    };

    const toggleDeactivationPage = (uid: number) => {
        setDeactivationPopUp(!deactivationPopUp);
        setSelectedOrganisationID(uid)
    };

    const toggleRestorePage = (uid: number) => {
        setRestorePopUp(!restorePopUp);
        setSelectedOrganisationID(uid)
    };

    // Removed fetchOrganisations - users now only fetch their own organisation
    const fetchUserOrganisation = useCallback(async () => {
        if (!userOrganisationId) return;
        
        setLoadingData(true);

        try {
            const orgData = await getOrganisation(userOrganisationId as number)
            setUserOrganisation(orgData as Organisation)
            console.log("user organisation returned bro: ", orgData)
        } catch (error) {
            console.error('error fetching user organisation bro:', error);
            setIsError(true);
        } finally {
            setLoadingData(false);
        }
    }, [userOrganisationId])

    const toggleAddOrganisation = () => {
        setAddOrganisationPopUp(!addOrganisationPopUp);
    }

    const handleEditOrganisation = (uid: any) => {
        // Use userOrganisation directly since users only see their own organisation
        if (userOrganisation && userOrganisation.uid === uid) {
            setSelectedOrganisation(userOrganisation);
            setEditOrganisationPopup(true);
        } else {
            console.log("No selected Organisation found or UID mismatch");
        }
    }; 

    const toggleDeletePage = (uid: number, name: string) => {
        setDeletePopUp(!deletePopUp);
        setSelectedOrganisationID(uid)
        setSelectedOrganisationName(name)
    };

    const closeEditOrganisationPopup = () => {
        setEditOrganisationPopup(false);
    }

    const closeActivationPopup = () => {
        setActivationPopUp(false);
    };

    const handleSuccess = () => {
        // Refresh the user's organisation data after successful operations
        fetchUserOrganisation();
    };

    useEffect(() => {
        // Only fetch user's own organisation
        fetchUserOrganisation();
    }, [fetchUserOrganisation]);

    if (loadingData) {
        return (
            <div>
            <div className='w-full h-full flex flex-col gap-4 rounded-lg overflow-y mb-80'>
                <div>
                    <RewardSummaryCards />
                </div>
            <div>
                <div className="flex justify-between">
                    <div className="flex flex-col pl-2 pt-6">
                        <h4 className="text-xl font-semibold text-purple">Organizations</h4>
                        <p className="text-gray-400">Manage your organization&apos;s details and settings.</p>
                    </div>
                    <div className='flex gap-2 pt-8 pr-2'>
                        <button onClick={ toggleAddOrganisation } className="bg-green text-white py-2 px-2 w-10 h-10 rounded-lg hover:bg-emerald-300">
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
                    <RewardSummaryCards />
                </div>
            <div>
                <div className="flex justify-between">
                    <div className="flex flex-col pl-2 pt-6">
                        <h4 className="text-xl font-semibold text-purple">Organizations</h4>
                        <p className="text-gray-400">Manage your organization&apos;s details and settings.</p>
                    </div>
                    <div className='flex gap-2 pt-8 pr-2'>
                        <button onClick={ toggleAddOrganisation } className="bg-green text-white py-2 px-2 w-10 h-10 rounded-lg hover:bg-emerald-300">
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

    if (!userOrganisation) {
        return (
            <div>
            <div className='w-full h-full flex flex-col gap-4 rounded-lg overflow-y mb-80'>
                <div>
                    <RewardSummaryCards />
                </div>
            <div>
                <div className="flex justify-between">
                    <div className="flex flex-col pl-2 pt-6">
                    <h4 className="text-xl font-semibold text-purple">Organizations</h4>
                    <p className="text-gray-400">Manage your organization&apos;s details and settings.</p>
                    </div>
                    <div className='flex gap-2 pt-8 pr-2'>
                        <button onClick={ toggleAddOrganisation } className="bg-green text-white py-2 px-2 w-10 h-10 rounded-lg hover:bg-emerald-300">
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
                    <p className="ml-2 uppercase pt-2 text-green">No organization found. Add a new organization to get started!</p>
                </div>
            </div>
        </div>
        </div>
        )
    }

    return (
        <div className="pb-52">
            <div className='w-full h-full flex flex-col gap-4 rounded-lg overflow-y pb-10'>
            <div>
                <div className="flex justify-between">
                    <div className="flex flex-col pl-2 pt-24">
                        <h4 className="text-xl font-semibold text-purple">Organizations</h4>
                        <p className="text-gray-400">Manage your organization&apos;s details and settings.</p>
                    </div>
                    <div className='flex gap-2 pt-28 pr-2'>
                        <button onClick={ toggleAddOrganisation } className="bg-green text-white py-2 px-2 w-10 h-10 rounded-lg hover:bg-emerald-300">
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
                        {/* Display single user organisation - users only see their own organisation */}
                        {userOrganisation && (() => {
                            const { uid, name, description, email, website, logo, active, isDeleted } = userOrganisation;
                            return (
                                <div key={uid} className="bg-white text-gray-600 flex flex-col p-3 mx-2 rounded shadow-lg">
                                    <div className="flex items-center justify-between">
                                        {/* Fixed alignment: All columns now use consistent structure and padding */}
                                        <div className="text-sm flex-1 text-center">
                                            <p className="text-purple">{uid}</p>
                                        </div>
                                        <div className="text-sm flex-1 text-center">
                                            <p>{name || '--:--'}</p>
                                        </div>
                                        <div className="text-sm flex-1 text-center">
                                            <p>{description || '--:--'}</p>
                                        </div>
                                        <div className="text-sm flex-1 text-center flex justify-center items-center">
                                            {logo && logo !== '--:--' ? (
                                                <div className="relative w-10 h-10">
                                                    <Image 
                                                        src={logo} 
                                                        alt={`${name} logo`}
                                                        fill
                                                        className="object-contain rounded-lg"
                                                        unoptimized
                                                    />
                                                </div>
                                            ) : (
                                                <span className="text-gray-400">--:--</span>
                                            )}
                                        </div>
                                        <div className="text-sm flex-1 text-center">
                                            <Badge className={`${active === true ? 'bg-green hover:bg-green-100 text-white' : 'bg-red hover:bg-red-100 text-white'}`}>
                                                {active === true ? 'Active' : 'Inactive'}
                                            </Badge>
                                        </div>
                                        <div className="text-sm flex-1 text-center">
                                            <Badge className={`${isDeleted === true ? 'bg-red hover:bg-red-100 text-white' : 'bg-green hover:bg-green-100 text-white'}`}>
                                                {isDeleted === true ? 'Deleted' : 'Not Deleted'}
                                            </Badge>
                                        </div>
                                        <div className="flex items-center justify-center text-sm flex-1 text-center gap-4">
                                            {/* Edit Organisation */}
                                            <Tooltip>
                                                <TooltipTrigger>
                                                    <button onClick={() => handleEditOrganisation(uid)} className="flex items-center justify-center cursor-pointer bg-white text-gray-500 border border-gray-500 hover:bg-gray-200 p-1 rounded-lg">
                                                        <Edit size={21} /> 
                                                    </button>
                                                </TooltipTrigger>
                                                <TooltipContent>
                                                    <p>Edit</p>
                                                </TooltipContent>
                                            </Tooltip>

                                            {/* Activate Organisation */}
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

                                            {/* Deactivate Organisation */}
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

                                            {/* Restore Organisation */}
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
                                                    <button onClick={() => toggleDeletePage(uid, name)} className="flex items-center justify-center cursor-pointer bg-white text-red border border-red hover:bg-rose-100 p-1 rounded-lg">
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
                            );
                        })()}
                </div>
            </div>
        </div>  
        {deletePopUp && (
            <DeleteOrganisationConfirmation 
                organisationID={selectedOrganisationID} 
                organisationName={selectedOrganisationName} 
                isOpen={ deletePopUp } 
                onClose={ toggleDeletePage }
                onSuccess={handleSuccess}
                /> 
        )}
        {activationPopUp && (
            <ActivateOrganisationConfirmation 
                organisationID={selectedOrganisationID} 
                isOpen={activationPopUp} 
                onClose={closeActivationPopup}
                onSuccess={handleSuccess}
            />
        )}
        {deactivationPopUp && (
            <DeactivateOrganisationConfirmation 
                organisationID={selectedOrganisationID} 
                isOpen={ deactivationPopUp } 
                onClose={ toggleDeactivationPage }
                onSuccess={handleSuccess}
            /> 
        )}
        
        {restorePopUp && (
            <RestoreOrganisationConfirmation 
                organisationID={selectedOrganisationID} 
                isOpen={ restorePopUp } 
                onClose={ toggleRestorePage }
                onSuccess={handleSuccess}
            /> 
        )}
        
        {editOrganisationPopup && 
            <EditOrganisation 
                onClose={closeEditOrganisationPopup} 
                selectedOrganisation={selectedOrganisation}
                onSuccess={handleSuccess}
            />
        }
        
        {addOrganisationPopUp && 
            <AddNewOrganisation 
                onClose={ toggleAddOrganisation } 
                onSuccess={handleSuccess} 
            />
        }
        </div>
    );
}