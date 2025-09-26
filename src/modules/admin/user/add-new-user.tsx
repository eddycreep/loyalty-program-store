'use client'

import { useState } from 'react';
import toast from 'react-hot-toast';
import { apiEndPoint, colors } from '@/utils/colors';
import { X, Check } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { useSession } from '@/context';
import { Organisation } from '@/modules/types/organisation/organisation-types';
import { apiClient } from '@/utils/api-client';
import { SuccessResponse } from '@/modules/types/branch/branches-types';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { CreateUser, UserRole } from '@/modules/types/user/user-types';

export function AddNewUser({ onClose, onSuccess }: any) {
    const { user } = useSession();
    const [organisation, setOrganisation] = useState<Organisation | null>(null)
    const [currentUser, setCurrentUser] = useState<CreateUser>({
        username: '',
        password: '',
        id_no: '',
        emp_name: '',
        emp_surname: '',
        role: UserRole.USER,
        organisation: 0,
        branch: 0
    })

    const saveUser = async () => {
        try {
            const payload = {
                username: currentUser.emp_name,
                password: currentUser.password,
                id_no: currentUser.id_no,
                emp_name: currentUser.emp_name,
                emp_surname: currentUser.emp_surname,
                role: currentUser.role,
                organisation: currentUser.organisation,
                branch: currentUser.branch
            }
            console.log("payload in add-new-branch: ", payload)

            const url = `user/create-user`
            const response = await apiClient.post<SuccessResponse>(`${apiEndPoint}/${url}`, payload)
            console.log('The User has been saved:', response)

            if (response.status === 201) {
                toast.success('User Saved!', {
                    icon: <Check color={colors.green} size={24} />,
                    duration: 3000,
                    style: {
                        backgroundColor: 'black',
                        color: 'white', 
                    },
                });
            }

            // Call the onSuccess callback to refresh the organisation data
            if (onSuccess) {
                onSuccess();
            }

            onClose();
        } catch (error) {
            console.error('Error saving User:', error)
            
            toast.error('User not saved', {
                icon: <X color={colors.red} size={24} />,
                duration: 3000,
            })
        }
    }

    return (
        <div className="fixed inset-0 z-50">
            <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center p-4">
                <Card className="w-full max-w-[95vw] md:max-w-[600px] max-h-[90vh] overflow-y-auto">
                    <div className="flex justify-end pr-4 pt-4">
                        <button onClick={onClose}>
                            <X className="h-4 w-4" color="red" />
                        </button>
                    </div>
                    <CardHeader>
                        <CardTitle>Add New Branch</CardTitle>
                        <CardDescription className="text-xs sm:text-sm">
                            Create a new branch by filling in the required information below
                        </CardDescription>
                    </CardHeader>
                    <CardContent>
                        <div className="space-y-3 sm:space-y-4">
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                                <div>
                                    <label htmlFor="emp_name" className="text-black text-xs sm:text-sm">Name</label>
                                    <Input
                                        id="emp_name"
                                        value={currentUser.emp_name}
                                        onChange={(e) => setCurrentUser(prev => ({ ...prev, emp_name: e.target.value }))}
                                        placeholder="Enter name"
                                        className="mt-1"
                                    />
                                </div>
                                <div>
                                    <label htmlFor="emp_surname" className="text-black text-xs sm:text-sm">Surname</label>
                                    <Input
                                        id="emp_surname"    
                                        value={currentUser.emp_surname}
                                        onChange={(e) => setCurrentUser(prev => ({ ...prev, emp_surname: e.target.value }))}
                                        placeholder="Enter surname"
                                        className="mt-1"
                                    />
                                </div>
                            </div>

                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                                <div>
                                    <label htmlFor="password" className="text-black text-xs sm:text-sm">Password</label>
                                    <Input
                                        id="password"
                                        value={currentUser.password}
                                        onChange={(e) => setCurrentUser(prev => ({ ...prev, password: e.target.value }))}
                                        placeholder="Enter password"
                                        className="mt-1"
                                    />
                                </div>
                                <div>
                                    <label htmlFor="id_no" className="text-black text-xs sm:text-sm">ID Number</label>
                                    <Input
                                        id="id_no"
                                        value={currentUser.id_no}
                                        onChange={(e) => setCurrentUser(prev => ({ ...prev, id_no: e.target.value }))}
                                        placeholder="Enter ID number"
                                        className="mt-1"
                                    />
                                </div>
                            </div>

                            {/* Role and Organisation */}
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                                <div>
                                    <label htmlFor="role" className="text-black text-xs sm:text-sm">Role</label>
                                    <Select
                                        value={currentUser.role}
                                        onValueChange={(value) => setCurrentUser(prev => ({ ...prev, role: value as UserRole }))}
                                    >
                                        <SelectTrigger className="w-full mt-1">
                                            <SelectValue placeholder="Select Role" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value={UserRole.ADMIN} className="hover:bg-purple hover:text-white focus:bg-purple focus:text-white">Admin</SelectItem>
                                            <SelectItem value={UserRole.USER} className="hover:bg-purple hover:text-white focus:bg-purple focus:text-white">User</SelectItem>
                                            <SelectItem value={UserRole.MANAGER} className="hover:bg-purple hover:text-white focus:bg-purple focus:text-white">Manager</SelectItem>
                                            <SelectItem value={UserRole.SUPERVISOR} className="hover:bg-purple hover:text-white focus:bg-purple focus:text-white">Supervisor</SelectItem>
                                            <SelectItem value={UserRole.HR} className="hover:bg-purple hover:text-white focus:bg-purple focus:text-white">HR</SelectItem>
                                            <SelectItem value={UserRole.MD} className="hover:bg-purple hover:text-white focus:bg-purple focus:text-white">MD</SelectItem>
                                            <SelectItem value={UserRole.OWNER} className="hover:bg-purple hover:text-white focus:bg-purple focus:text-white">Owner</SelectItem>
                                        </SelectContent>
                                    </Select>
                                </div>
                                <div>
                                    <label htmlFor="organisation" className="text-black text-xs sm:text-sm">Organisation</label>
                                        <Select
                                            // value={user?.organisation?.uid.toString() || ''}
                                            onValueChange={(value) => setCurrentUser(prev => ({ ...prev, organisation: Number(value) }))}
                                        >
                                            <SelectTrigger className="w-full mt-1">
                                                <SelectValue placeholder="Select Organisation" />
                                            </SelectTrigger>
                                            <SelectContent>
                                                <SelectItem value="All" className="hover:bg-purple hover:text-white focus:bg-purple focus:text-white">All</SelectItem>
                                                <SelectItem key={user?.organisation?.uid} value={user?.organisation?.uid.toString()} className="hover:bg-purple hover:text-white focus:bg-purple focus:text-white">
                                                    {user?.organisation?.name}
                                                </SelectItem>
                                            </SelectContent>
                                        </Select>
                                </div>
                            </div>

                            {/* Branch */}
                            <div className="grid grid-cols-1 gap-3 sm:gap-4">
                                <div>
                                    <label htmlFor="branch" className="text-black text-xs sm:text-sm">Branch</label>
                                    <Select
                                        // value={user?.branch?.uid.toString() || ''}
                                        onValueChange={(value) => setCurrentUser(prev => ({ ...prev, branch: Number(value) }))}
                                    >
                                        <SelectTrigger className="w-full mt-1">
                                            <SelectValue placeholder="Select Branch" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="All" className="hover:bg-purple hover:text-white focus:bg-purple focus:text-white">All</SelectItem>
                                            <SelectItem key={user?.branch?.uid} value={user?.branch?.uid.toString()} className="hover:bg-purple hover:text-white focus:bg-purple focus:text-white">
                                                {user?.branch?.name}
                                            </SelectItem>
                                        </SelectContent>
                                    </Select>
                                </div>
                            </div>

                            <div className="grid grid-cols-2 gap-3 sm:gap-4 mt-4">
                                <Button onClick={onClose} className="bg-red hover:bg-rose-300 text-white">
                                    Cancel
                                </Button>
                                <Button onClick={saveUser} className="bg-green hover:bg-emerald-300 text-white">
                                    Save
                                </Button>
                            </div>
                        </div>
                    </CardContent>
                </Card>
            </div>
        </div>
    )
}