'use client'

import { useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"


import { Star, User } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { toast } from 'react-hot-toast';
import { useQuery } from "@/hooks/useQuery";
import * as React from "react";
import axios from 'axios';
import { ReviewCards } from '@/components/component/review-cards';
import { SuccessCard } from "@/components/component/cards/success-card"
import { ProductReviews } from "./reviews/product-reviews"
import { StoreReviews } from "./reviews/store-reviews"
import { StaffReviews } from "./reviews/staff-reviews"

interface ReviewProps {
  id: number,
  client_name?: string; // Optional now
  client_image?: Buffer; // Optional now
  product: string,
  rating: number,
  date: string,
  comment: string,
  avatar: string,  // Added to resolve avatar issues
  name: string // Added to resolve name issues
}


type ReviewResponse = ReviewProps[]


const reviews = [
  // High rating (4-5 stars)
  {
    id: 1,
    name: "Alex Johnson",
    avatar: "/covers/avatarSix.jpg",
    product: "Green Tea",
    category: "Beverages",
    rating: 5,
    date: "Fri Aug 16 2024 00:00:00 GMT+02:00",
    comment: "The green tea was perfect! It had a rich, earthy flavor and felt so refreshing. I’ll definitely be buying this again."
  },
  {
    id: 2,
    name: "Emily Davis",
    avatar: "/covers/avatarEight(F).png",
    product: "Apples",
    category: "Fruits",
    rating: 5,
    date: "Wed Sep 11 2024 00:00:00 GMT+02:00",
    comment: "These apples were super crisp and sweet. A great snack for any time of the day."
  },
  {
    id: 3,
    name: "Chris Wilson",
    avatar: "/covers/avatarSeven(M).png",
    product: "Blueberries",
    category: "Fruits",
    rating: 4,
    date: "Mon Aug 26 2024 00:00:00 GMT+02:00",
    comment: "The blueberries were fresh and packed with flavor. A little pricey, but worth it for the quality."
  },

  // Medium rating (3 stars)
  {
    id: 4,
    name: "Mike Brown",
    avatar: "/covers/avatarFour.jpg",
    product: "Orange Juice",
    category: "Beverages",
    rating: 3,
    date: "Thu Aug 18 2024 00:00:00 GMT+02:00",
    comment: "The orange juice was decent but tasted a bit too watered down. It was okay, but not great."
  },
  {
    id: 5,
    name: "Daniel Edwards",
    avatar: "/covers/avatarFive.png",
    product: "Frozen Pizza",
    category: "Frozen Foods",
    rating: 3,
    date: "Tue Aug 27 2024 00:00:00 GMT+02:00",
    comment: "The frozen pizza was alright. It cooked well, but the toppings were sparse. Could be better with more ingredients."
  },
  {
    id: 6,
    name: "Sarah Lee",
    avatar: "/covers/avatarNine(F).png",
    product: "Granola Bars",
    category: "Snacks",
    rating: 3,
    date: "Fri Aug 23 2024 00:00:00 GMT+02:00",
    comment: "The granola bars were chewy and had a nice flavor, but they were smaller than I expected."
  },

  // Low rating (1-2 stars)
  {
    id: 7,
    name: "Megan Harper",
    avatar: "/covers/avatarOne.png",
    product: "Coca-Cola",
    category: "Beverages",
    rating: 2,
    date: "Mon Aug 19 2024 00:00:00 GMT+02:00",
    comment: "The Coca-Cola tasted flat and lacked the refreshing fizz that it's known for. Really disappointed with this one."
  },
  {
    id: 8,
    name: "John Smith",
    avatar: "/covers/avatarThree.png",
    product: "Potato Chips",
    category: "Snacks",
    rating: 1,
    date: "Sun Aug 25 2024 00:00:00 GMT+02:00",
    comment: "These potato chips were overly greasy and had a stale taste. I wouldn’t buy these again."
  },
  {
    id: 9,
    name: "Olivia Parker",
    avatar: "/covers/avatarTwo.png",
    product: "Instant Noodles",
    category: "Quick Meals",
    rating: 2,
    date: "Wed Aug 14 2024 00:00:00 GMT+02:00",
    comment: "The instant noodles were bland and the seasoning was off. Not what I expected from a quick meal."
  }
];

export const ReviewsModule = () => {
  const [activeTab, setActiveTab] = useState('customer-engagement')


  return (
    <div className="h-screen mb-56">
      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-4 pt-4">
        <TabsList>
          <TabsTrigger value="product" className='text-md'>Product Reviews</TabsTrigger>
          <TabsTrigger value="store">Store Reviews</TabsTrigger>
          <TabsTrigger value="staff">Staff Reviews</TabsTrigger>
        </TabsList>
        <TabsContent value="product" className="space-y-4">
            <div className="flex justify-between gap-2 pl-2">
                <ProductReviews />
            </div>
        </TabsContent>
        <TabsContent value="store" className="space-y-4">
            <div className="flex justify-between gap-2 pl-2">
                <StoreReviews />
            </div>
        </TabsContent>
        <TabsContent value="staff" className="space-y-4">
            <div className="flex justify-between gap-2 pl-2">
                <StaffReviews />
            </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};