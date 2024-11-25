'use client'

import axios from 'axios';
import { useState } from 'react';
import { useSession } from '@/context';
import { toast } from 'react-hot-toast';
import { useInputHandler } from '@/hooks';
import { Eye, EyeOff } from 'lucide-react';
import { apiEndPoint, colors } from '@/utils/colors';
import { useForm, Controller } from 'react-hook-form';
import { useAudit } from '@/shared/tools/auditMonit';

interface FormData {
    emp_name: string,
    emp_surname: string,
    id_no: string,
    phone_number: string,
    email_address: string,
    role: string,
}

interface UserProps {
    emp_name: string,
    emp_surname: string,
    id_no: string,
    phone_number: string,
    email_address: string,
    role: string,
}

export default function Page() {
    const { login } = useSession()
    const { addAuditLog } = useAudit()

    const [isVisisble, setIsVisible] = useState(false)
    const [isLoading, setIsLoading] = useState(false)

    const toggleVisibility = () => setIsVisible(!isVisisble)

    const { handleChange } = useInputHandler();
    const { control, handleSubmit, formState } = useForm<FormData>();

    const [name, setName] = useState('');
    const [surname, setSurname] = useState('');
    const [idNumber, setIDNumber] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');
    const [emailAddress, setEmailAddress] = useState('');
    const [role, setRole] = useState('');

    const renderIcon = () => {
        if (isVisisble) {
            return (
                <span className='absolute right-3 md:cursor-pointer' onClick={toggleVisibility}>
                    <Eye size={25} strokeWidth={1.5} absoluteStrokeWidth color={colors?.red} />
                </span>
            )
        }
        else {
            return (
                <span className='absolute right-3 md:cursor-pointer' onClick={toggleVisibility}>
                    <EyeOff size={25} strokeWidth={1.5} absoluteStrokeWidth color={colors?.red} onClick={toggleVisibility} />
                </span>
            )
        }
    }

    const saveData = async () => {
        try {
            const payload = {
                emp_name: name,
                emp_surname: surname,
                id_no: idNumber,
                phone_number: phoneNumber,
                email_address: emailAddress,
                role: role,
            }

            const url = `admin/sign-up`
            const response = await axios.post<UserProps>(`${apiEndPoint}/${url}`, payload)
            console.log("Adding New User Successful:", response)
        } catch (error) {
            console.error("Error Adding New User:", error)
        }
    }

    // const onSubmit = async (data: FormData, e: any) => {
    //     e.preventDefault();
    //     setIsLoading(true);

    //     try {
    //         const payLoad = {
    //             username: data.username,
    //             password: data.password
    //         }

    //         addAuditLog({ action: `login attempt` })

    //         const url = `user/login`
    //         const response = await axios.post(`${apiEndPoint}/${url}`, payLoad)

    //         if (response.data.msg === "Success, Logged in!") {
    //             login(response?.data)
    //             setIsLoading(false);

    //             addAuditLog({ action: `login success` })
    //         }
    //         else {
    //             setIsLoading(false);

    //             addAuditLog({ action: `login attempt: Error -- ${response.data}` })

    //             toast('Login failed, please try again', {
    //                 icon: '❌',
    //                 style: {
    //                     borderRadius: '10px',
    //                     background: '#333',
    //                     color: '#fff',
    //                 },
    //                 duration: 3000,
    //             });
    //         }

    //     }
    //     catch (error: any) {
    //         setIsLoading(false);

    //         addAuditLog({ action: `login attempt: Error -- ${error?.message}` })

    //         toast(`${error?.message}, please try again`, {
    //             icon: '❌',
    //             style: {
    //                 borderRadius: '10px',
    //                 background: '#333',
    //                 color: '#fff',
    //             },
    //             duration: 3000,
    //         });
    //     }
    // };


    const onSubmit = async (data: FormData, e: any) => {
        e.preventDefault();
        setIsLoading(true);

        try {
            const payLoad = {
                emp_name: data.emp_name,
                emp_surname: data.emp_surname,
                id_no: data.id_no,
                phone_number: data.phone_number,
                email_address: data.email_address,
                role: data.role,
            }

            addAuditLog({ action: `sign-up attempt` })

            const url = `user/sign-up`
            const response = await axios.post(`${apiEndPoint}/${url}`, payLoad)

            if (response.data.msg === "Success, Signed Up!") {
                login(response?.data)
                setIsLoading(false);

                addAuditLog({ action: `sign-up success` })
            }
            else {
                setIsLoading(false);

                addAuditLog({ action: `sign-up attempt: Error -- ${response.data}` })

                toast('Sign-Up failed, please try again', {
                    icon: '❌',
                    style: {
                        borderRadius: '10px',
                        background: '#333',
                        color: '#fff',
                    },
                    duration: 3000,
                });
            }

        }
        catch (error: any) {
            setIsLoading(false);

            addAuditLog({ action: `sign-up attempt: Error -- ${error?.message}` })

            toast(`${error?.message}, please try again`, {
                icon: '❌',
                style: {
                    borderRadius: '10px',
                    background: '#333',
                    color: '#fff',
                },
                duration: 3000,
            });
        }
    };

    return (
        <div className="w-full h-screen flex items-center justify-center overflow-hidden bg-login bg-cover bg-no-repeat bg-center"> 
            <div className="w-11/12 md:w-5/12 lg:w-3/12 xl:w-4/12 shadow-lg p-2 md:p-4 flex flex-col justify-start items-center gap-5 rounded bg-white bg-opacity-50 backdrop-blur-md">
                <div className="flex flex-col items-center justify-center gap-0">
                    <h1 className="leading-none font-medium">Welcome</h1>
                    <p className="text-sm">Please enter your credentials to sign up</p>
                </div>
                <form className="flex flex-col justify-start gap-4 w-full">
                    <div className="relative flex flex-col justify-start items-start gap-1">
                        <label>Name</label>
                        <Controller
                            control={control}
                            name="emp_name"
                            rules={{ required: 'Your name is required' }}
                            render={({ field }) => (
                                <input
                                    {...field}
                                    className="border-grey p-3 w-full border rounded outline-none md:cursor-pointer placeholder:text-sm placeholder:italic"
                                    type="text"
                                    placeholder="JOHN"
                                    onChange={(e) => {
                                        handleChange('emp_name', e.target.value);
                                        field.onChange(e);
                                    }}
                                />
                            )}
                        />
                        {formState.errors.emp_name && <span className="text-red text-sm">{formState.errors.emp_name.message}</span>}
                    </div>
                    <div className="relative flex flex-col justify-start items-start gap-1">
                        <label>Surname</label>
                        <Controller
                            control={control}
                            name="emp_surname"
                            rules={{ required: 'Your surname is required' }}
                            render={({ field }) => (
                                <input
                                    {...field}
                                    className="border-grey p-3 w-full border rounded outline-none md:cursor-pointer placeholder:text-sm placeholder:italic"
                                    type="text"
                                    placeholder="DOE"
                                    onChange={(e) => {
                                        handleChange('emp_surname', e.target.value);
                                        field.onChange(e);
                                    }}
                                />
                            )}
                        />
                        {formState.errors.emp_surname && <span className="text-red text-sm">{formState.errors.emp_surname.message}</span>}
                    </div>
                    <div className="relative flex flex-col justify-start items-start gap-1">
                        <label>ID Number</label>
                        <Controller
                            control={control}
                            name="id_no"
                            rules={{ required: 'Your id number is required' }}
                            render={({ field }) => (
                                <input
                                    {...field}
                                    className="border-grey p-3 w-full border rounded outline-none md:cursor-pointer placeholder:text-sm placeholder:italic"
                                    type="text"
                                    placeholder="2458396572549"
                                    onChange={(e) => {
                                        handleChange('id_no', e.target.value);
                                        field.onChange(e);
                                    }}
                                />
                            )}
                        />
                        {formState.errors.id_no && <span className="text-red text-sm">{formState.errors.id_no.message}</span>}
                    </div>
                    <div className="relative flex flex-col justify-start items-start gap-1">
                        <label>Phone Number</label>
                        <Controller
                            control={control}
                            name="phone_number"
                            rules={{ required: 'Your phone number is required' }}
                            render={({ field }) => (
                                <input
                                    {...field}
                                    className="border-grey p-3 w-full border rounded outline-none md:cursor-pointer placeholder:text-sm placeholder:italic"
                                    type="text"
                                    placeholder="0845557865"
                                    onChange={(e) => {
                                        handleChange('phone_number', e.target.value);
                                        field.onChange(e);
                                    }}
                                />
                            )}
                        />
                        {formState.errors.phone_number && <span className="text-red text-sm">{formState.errors.phone_number.message}</span>}
                    </div>
                    <div className="relative flex flex-col justify-start items-start gap-1">
                        <label>Email Address</label>
                        <Controller
                            control={control}
                            name="email_address"
                            rules={{ required: 'Your email address is required' }}
                            render={({ field }) => (
                                <input
                                    {...field}
                                    className="border-grey p-3 w-full border rounded outline-none md:cursor-pointer placeholder:text-sm placeholder:italic"
                                    type="text"
                                    placeholder="johnDoe@email.com"
                                    onChange={(e) => {
                                        handleChange('email_address', e.target.value);
                                        field.onChange(e);
                                    }}
                                />
                            )}
                        />
                        {formState.errors.email_address && <span className="text-red text-sm">{formState.errors.email_address.message}</span>}
                    </div>
                    <div className="relative flex flex-col justify-start items-start gap-1">
                        <label>Role</label>
                        <Controller
                            control={control}
                            name="role"
                            rules={{ required: 'Your role is required' }}
                            render={({ field }) => (
                                <input
                                    {...field}
                                    className="border-grey p-3 w-full border rounded outline-none md:cursor-pointer placeholder:text-sm placeholder:italic"
                                    type="text"
                                    placeholder="ADMIN"
                                    onChange={(e) => {
                                        handleChange('role', e.target.value);
                                        field.onChange(e);
                                    }}
                                />
                            )}
                        />
                        {formState.errors.role && <span className="text-red text-sm">{formState.errors.role.message}</span>}
                    </div>
                </form>
                <button className='w-full p-2 rounded bg-red hover:bg-rose-500 text-white uppercase' onClick={handleSubmit(onSubmit)} disabled={isLoading}>{isLoading ? 'Signing up...' : 'Sign up'}</button>
            </div>
        </div>
    );
}