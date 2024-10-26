'use client'

import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { useQuery } from "@/hooks/useQuery";
import { Check, CheckCheck, X, Pyramid } from "lucide-react";
import { apiEndPoint, colors } from '@/utils/colors';
import axios from 'axios';
import { toast } from 'react-hot-toast';
import MultiColorLoader from '@/lib/loaders';
import Image from 'next/image';
//import  HomePage from '../../components/homey'
import { Homepage } from '../../components/homepage'


export const ProductsModule = () => {


    return (
        // Added 'pb-20' to create spacing between the product cards and the bottom of the screen
        <div className='w-full h-screen flex flex-col rounded-'>
            <Homepage />
        </div>
    );
}