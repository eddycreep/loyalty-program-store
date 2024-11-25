'use client'

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useState } from 'react'
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Star, Store, Users, ShoppingCart, Award, User, TrendingUp, TrendingDown } from 'lucide-react'

import { ProductSummaryCards } from "./products/product-summary-cards"
import { ProductReviews } from "./products/product-reviews"

import { StaffSummaryCards } from "./staff/staff-summary-cards"
import { StaffReviews } from "./staff/staff-reviews"


import { StoreSummaryCards } from "./store/staff-summary-cards"
import { StoreReviews } from "./store/store.reviews"


interface ProductReview {
  id: number;
  customerName?: string;
  avatar?: string; // Added avatar property to match usage in components
  rating: number;
  productName: string;
  category: string;
  comment: string;
  date: string;
}

interface StoreReview {
  id: number;
  customerName?: string;
  avatar?: string; // Added avatar property
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
  avatar?: string; // Added avatar property
  rating: number;
  staffName: string;
  staffRole: string;
  comment: string;
  date: string;
}


type Review = ProductReview | StoreReview | StaffReview;

type ReviewType = "product" | "store" | "staff";

// Dummy data (unchanged)
const productReviews = [
  {
    id: 1,
    customerName: "Alice Johnson",
    avatar: "/covers/avatarOne.png", // Added avatar
    rating: 5,
    productName: "Organic Apples",
    category: "Fruits",
    comment: "Delicious and fresh!",
    date: "2023-10-15",
  },
  {
    id: 2,
    customerName: "Bob Smith",
    avatar: "/covers/avatarTwo.png", // Added avatar
    rating: 4,
    productName: "Whole Grain Bread",
    category: "Bakery",
    comment: "Great texture and taste.",
    date: "2023-10-14",
  },
  {
    id: 3,
    customerName: "Carol Davis",
    avatar: "/covers/avatarThree.png", // Added avatar
    rating: 3,
    productName: "Low-Fat Yogurt",
    category: "Dairy",
    comment: "Decent, but could be creamier.",
    date: "2023-10-13",
  },
];


const storeReviews = [
  { id: 1, customerName: "David Brown", avatar: "/covers/avatarThree.png", rating: 5, storeName: "Downtown Market", region: "Central", location: "Main St", comment: "Excellent service and clean store!", date: "2023-10-15" },
  { id: 2, customerName: "Emma Wilson", avatar: "/covers/avatarTwo.png", rating: 4, storeName: "Suburb Supermarket", region: "North", location: "Oak Ave", comment: "Good selection, but crowded parking.", date: "2023-10-14" },
  { id: 3, customerName: "Frank Miller", avatar: "/covers/avatarOne.png", rating: 3, storeName: "Lakeside Grocery", region: "East", location: "Lake Rd", comment: "Average experience, nothing special.", date: "2023-10-13" },
];

const staffReviews = [
  { id: 1, customerName: "Grace Lee", avatar: "/covers/avatarFour.jpg", rating: 5, staffName: "John Doe", staffRole: "Cashier", comment: "Very friendly and efficient!", date: "2023-10-15" },
  { id: 2, customerName: "Henry Taylor", avatar: "/covers/avatarFive.png", rating: 4, staffName: "Jane Smith", staffRole: "Customer Service", comment: "Helpful, but seemed a bit rushed.", date: "2023-10-14" },
  { id: 3, customerName: "Ivy Chen", avatar: "/covers/avatarSix.jpg", rating: 3, staffName: "Mike Johnson", staffRole: "Stock Clerk", comment: "Polite, but couldn't find the item I needed.", date: "2023-10-13" },
];


export function LoyaltyReviews() {
  const [activeTab, setActiveTab] = useState("product")

  const renderStars = (rating: any) => {
    return Array(5).fill(0).map((_, i) => (
      <Star key={i} className={`w-4 h-4 ${i < rating ? 'text-yellow-400 fill-yellow-400' : 'text-gray-300'}`} />
    ))
  }

  const renderSummaryCards = (type: ReviewType) => {
    const cardData = {
      product: [
        { title: "Top Rated Products", icon: <ShoppingCart className="w-6 h-6 text-green" />, content: "1. Organic Apples\n2. Whole Grain Bread\n3. Fresh Milk" },
        { title: "Top Reviewers", icon: <User className="w-6 h-6 text-blue" />, content: "1. Alice Johnson\n2. Bob Smith\n3. Carol Davis" },
        { title: "Common Reviews", icon: <Star className="w-6 h-6 text-yellow" />, content: "1. Organic Apples\n2. Low-Fat Yogurt\n3. Whole Grain Bread" },
        { title: "Loyalty Tiers", icon: <Award className="w-6 h-6 text-purple" />, content: "Gold: 45%\nDiamond: 30%\nPlatinum: 25%" },
        { title: "Top Redeemers", icon: <ShoppingCart className="w-6 h-6 text-red" />, content: "1. David Brown\n2. Emma Wilson\n3. Frank Miller" },
      ],
      store: [
        { title: "Top Rated Stores", icon: <Store className="w-6 h-6 text-green" />, content: "1. Downtown Market\n2. Suburb Supermarket\n3. Lakeside Grocery" },
        { title: "Common Stores", icon: <Star className="w-6 h-6 text-yellow" />, content: "1. Downtown Market\n2. Suburb Supermarket\n3. Lakeside Grocery" },
        { title: "Loyalty Tiers", icon: <Award className="w-6 h-6 text-purple" />, content: "Gold: 40%\nDiamond: 35%\nPlatinum: 25%" },
        { title: "Top Store Reviewers", icon: <User className="w-6 h-6 text-blue" />, content: "1. David Brown\n2. Emma Wilson\n3. Frank Miller" },
        { title: "Top Redeemers", icon: <ShoppingCart className="w-6 h-6 text-red" />, content: "1. Grace Lee\n2. Henry Taylor\n3. Ivy Chen" },
      ],
      staff: [
        { title: "Top Rated Staff", icon: <Users className="w-6 h-6 text-green" />, content: "1. John Doe\n2. Jane Smith\n3. Mike Johnson" },
        { title: "Most Reviewed Staff", icon: <Star className="w-6 h-6 text-yellow" />, content: "1. John Doe\n2. Jane Smith\n3. Mike Johnson" },
        { title: "Loyalty Tiers", icon: <Award className="w-6 h-6 text-purple" />, content: "Gold: 50%\nDiamond: 30%\nPlatinum: 20%" },
        { title: "Top Staff Reviewers", icon: <User className="w-6 h-6 text-blue" />, content: "1. Grace Lee\n2. Henry Taylor\n3. Ivy Chen" },
        { title: "Top Redeemers", icon: <ShoppingCart className="w-6 h-6 text-red" />, content: "1. Alice Johnson\n2. Bob Smith\n3. Carol Davis" },
      ],
    }

    return cardData[type].map((card, index) => (
      <Card key={index} className="col-span-1 bg-white dark:bg-gray-800 shadow-lg rounded-lg overflow-hidden transition-all duration-300 ease-in-out hover:shadow-xl">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2 bg-gray-50 dark:bg-gray-700 border-b border-gray-200 dark:border-gray-600">
          <CardTitle className="text-sm font-semibold text-gray-700 dark:text-gray-200">{card.title}</CardTitle>
          {card.icon}
        </CardHeader>
        <CardContent className="pt-4">
          <div className="text-xs font-medium text-gray-600 dark:text-gray-300 whitespace-pre-line">{card.content}</div>
        </CardContent>
      </Card>
    ))
  }

  const renderReviewCards = (reviews: Review[]): JSX.Element => (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 pt-4 shadow-2xl">
      {reviews.map((review) => (
        <Card key={review.id} className="flex flex-col shadow-lg hover:shadow-2xl">
          <CardHeader className="flex flex-row items-center gap-4">
            <Avatar>
              <AvatarImage
                src={review.avatar}
                alt={review.customerName}
                width={40}
                height={40}
                className="rounded-full"
              />
            </Avatar>
            <div className="flex flex-col">
              <CardTitle className="text-lg">{review.customerName}</CardTitle>
              <p className="text-sm text-muted-foreground">
                {new Date(review.date).toDateString()}
              </p>
            </div>
          </CardHeader>
          <CardContent className="flex-grow flex flex-col">
            <div className="flex justify-between items-center mb-2">
              <Badge variant="secondary">
                {"productName" in review
                  ? review.productName
                  : "storeName" in review
                  ? review.storeName
                  : review.staffName}
              </Badge>
              <div className="flex">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className={`w-4 h-4 ${i < review.rating ? "text-yellow fill-yellow" : "text-gray-300"}`}
                  />
                ))}
              </div>
            </div>
            <p className="text-sm text-muted-foreground">{review.comment}</p>
          </CardContent>
        </Card>
      ))}
    </div>
  );

  return (
    <div className=" p-4 dark:bg-gray-900 h-screen mb-20">
      {/* <h1 className="text-3xl font-bold mb-6 text-red">Customer Reviews</h1> */}
      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-4">
        <TabsList className="grid w-full grid-cols-3 rounded-lg bg-gray-200 dark:bg-gray-700 p-1">
          <TabsTrigger value="product" className="rounded-md py-2 px-4 text-sm font-medium transition-all data-[state=active]:bg-white dark:data-[state=active]:bg-gray-800 data-[state=active]:text-gray-900 dark:data-[state=active]:text-gray-100">
            Product Reviews
          </TabsTrigger>
          <TabsTrigger value="staff" className="rounded-md py-2 px-4 text-sm font-medium transition-all data-[state=active]:bg-white dark:data-[state=active]:bg-gray-800 data-[state=active]:text-gray-900 dark:data-[state=active]:text-gray-100">
            Staff Reviews
          </TabsTrigger>
          <TabsTrigger value="store" className="rounded-md py-2 px-4 text-sm font-medium transition-all data-[state=active]:bg-white dark:data-[state=active]:bg-gray-800 data-[state=active]:text-gray-900 dark:data-[state=active]:text-gray-100">
            Store Reviews
          </TabsTrigger>
        </TabsList>
        <TabsContent value="product" className="space-y-4">
          <div className="w-full">
            {/* {renderSummaryCards('product')} */}
            <ProductSummaryCards />
          </div>
          <h2 className="text-2xl font-semibold mb-4 text-red">Product Reviews</h2>
          <ScrollArea className="h-full w-full p-2">
            {/* {renderReviewCards(productReviews)} */}
            <ProductReviews />
          </ScrollArea>
        </TabsContent>
        <TabsContent value="staff" className="space-y-4">
          <div className="w-full">
            {/* {renderSummaryCards('staff')} */}
            <StaffSummaryCards />
          </div>
          <h2 className="text-2xl font-semibold mb-4 text-red">Staff Reviews</h2>
          <ScrollArea className="h-full w-full p-2">
            {/* {renderReviewCards(staffReviews)} */}
            <StaffReviews />
          </ScrollArea>
        </TabsContent>
        <TabsContent value="store" className="space-y-4">
          <div className="w-full">
            {/* {renderSummaryCards('store')} */}
            <StoreSummaryCards />
          </div>
          <h2 className="text-2xl font-semibold mb-4 text-red">Store Reviews</h2>
          <ScrollArea className="h-full w-full p-2">
            {/* {renderReviewCards(storeReviews)} */}
            <StoreReviews />
          </ScrollArea>
        </TabsContent>
      </Tabs>
    </div>
  )
}