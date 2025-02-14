'use client'

import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { useState } from 'react'
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Star, Store, Users, ShoppingCart, Award, User } from 'lucide-react'
import { ProductSummaryCards } from "./reviews/products/product-summary-cards"
import { ProductReviews } from "./reviews/products/product-reviews"
import { StaffSummaryCards } from "./reviews/staff/staff-summary-cards"
import { StaffReviews } from "./reviews/staff/staff-reviews"
import { StoreSummaryCards } from "./reviews/store/staff-summary-cards"
import { StoreReviews } from "./reviews/store/store.reviews"


interface ProductReview {
    id: number;
    customerName?: string;
    avatar?: string;
    rating: number;
    productName: string;
    category: string;
    comment: string;
    date: string;
}

interface StoreReview {
    id: number;
    customerName?: string;
    avatar?: string;
    rating: number;
    storeName: string;
    region: string;
    location: string;
    comment: string;
    date: string;
}

interface StaffReview {
    id: number;
    customerName?: string;
    avatar?: string;
    rating: number;
    staffName: string;
    staffRole: string;
    comment: string;
    date: string;
}


export const ReviewsModule = () => {
  const [activeTab, setActiveTab] = useState("product")

  return (
    <div className="h-screen">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-4">
          <TabsList className="grid w-full grid-cols-3 rounded-lg bg-gray-200 p-1 h-12">
            <TabsTrigger value="product" className="rounded-md py-2 px-4 text-sm font-medium transition-all">Product Reviews</TabsTrigger>
            <TabsTrigger value="staff" className="rounded-md py-2 px-4 text-sm font-medium transition-all">Staff Reviews</TabsTrigger>
            <TabsTrigger value="store" className="rounded-md py-2 px-4 text-sm font-medium transition-all">Store Reviews</TabsTrigger>
          </TabsList>
          <TabsContent value="product">
            <div className="w-full">
              <ProductSummaryCards />
            </div>
            <h2 className="text-xl font-semibold text-purple pt-10">Product Reviews</h2>
            <ScrollArea className="w-full">
              <ProductReviews />
            </ScrollArea>
          </TabsContent>
          <TabsContent value="staff">
            <div className="w-full">
              <StaffSummaryCards />
            </div>
            <h2 className="text-xl font-semibold text-purple pt-10">Staff Reviews</h2>
            <ScrollArea className="w-full">
              <StaffReviews />
            </ScrollArea>
          </TabsContent>
          <TabsContent value="store">
            <div className="w-full">
              <StoreSummaryCards />
            </div>
            <h2 className="text-xl font-semibold text-purple pt-10">Store Reviews</h2>
            <ScrollArea className="w-full">
              <StoreReviews />
            </ScrollArea>
          </TabsContent>
        </Tabs>
    </div>
  );
};