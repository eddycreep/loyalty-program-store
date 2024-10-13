'use client'

import axios from 'axios';
import Image from 'next/image';
import { isEmpty } from 'lodash';
import { useQuery } from "@/hooks/useQuery";
import { Check, CheckCheck, X, Pyramid } from "lucide-react";
import { apiEndPoint, colors } from '@/utils/colors';
import { toast } from 'react-hot-toast';
import { BlueLoader } from '@/lib/blueLoader';
import { NewCustomersLineChart } from '@/components/component/customer-line-chart';
import { LoyaltyCustomersChart } from '@/components/component/customers-bar-chart';
import { AreaChartComponent } from '@/components/component/area-chart';
import { BarChartComponent } from '@/components/component/bar-chart';
import { ProductBarChart } from '@/components/component/review-bar-chart';

export const DashboardModule = () => {
    return (
        <div className="min-h-screen w-full overflow-y-auto p-2 flex flex-col mb-24"> {/* Ensured this container can scroll if content exceeds viewport height */}
            {/* min-h-screen: Ensures the component takes at least the full height of the screen. || overflow-y-auto: Allows vertical scrolling when content exceeds the height of the container. */}
            <div className="flex flex-col space-y-4">
                <div className="grid grid-cols-3 gap-4">
                    <div className="rounded shadow-lg">
                        <AreaChartComponent />
                    </div>
                    <div className="rounded shadow-lg">
                        <NewCustomersLineChart />
                    </div>
                    <div className="rounded shadow-lg">
                        <BarChartComponent />
                    </div>
                </div>
                <div className="flex flex-col space-y-4">
                    <div className="h-96 w-full shadow-lg">
                        <LoyaltyCustomersChart />
                    </div>
                    <div className="h-96 w-full shadow-lg pt-12">
                        <ProductBarChart />
                    </div>
                </div>
            </div>
        </div>
    );
}