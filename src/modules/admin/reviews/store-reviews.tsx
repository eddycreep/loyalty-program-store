'use client'

import { Star } from "lucide-react";
import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import * as React from "react";
import { SuccessCard } from "@/components/component/cards/success-card"

interface ReviewProps {
    id: number,
    client_name?: string; // Optional now
    client_image?: Buffer; // Optional now
    product: string,
    rating: number,
    date: string,
    comment: string,
    avatar: string,  
    name: string 
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


export const StoreReviews = () => {
  // Filter reviews based on their ratings
  const lowRatingReviews = reviews.filter((review) => review.rating >= 1 && review.rating <= 2);
  const fairRatingReviews = reviews.filter((review) => review.rating === 3);
  const highRatingReviews = reviews.filter((review) => review.rating >= 4 && review.rating <= 5);

  const renderReviews = (reviews: ReviewProps[]) => (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 pt-4">
      {reviews.map((review: ReviewProps) => (
        <Card key={review.id} className="flex flex-col">
          <CardHeader className="flex flex-row items-center gap-4">
            <Avatar>
              <AvatarImage
                src={review.avatar}
                alt={review.name}
                width={40}
                height={40}
                className="rounded-full"
              />
            </Avatar>
            <div className="flex flex-col">
              <CardTitle className="text-lg">{review.name}</CardTitle>
              <p className="text-sm text-muted-foreground">
                {new Date(review.date).toDateString()}
              </p>
            </div>
          </CardHeader>
          <CardContent className="flex-grow flex flex-col">
            <div className="flex justify-between items-center mb-2">
              <Badge variant="secondary">{review.product}</Badge>
              <div className="flex">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className={`w-4 h-4 ${i < review.rating ? "text-yellow fill-yellow" : "text-gray-300"}`}
                  />
                ))}
              </div>
            </div>
            <p className="text-sm flex-grow">{review.comment}</p>
          </CardContent>
        </Card>
      ))}
    </div>
  );

  return (
    <div className="h-screen px-2 mb-56">
      <div>
        <h2 className="text-2xl text-center mb-4 font-bold text-gray-500">Customer Store Reviews</h2>
        <SuccessCard />
        
        <div className="pt-10">
          <h5 className="text-xl text-gray-500">Low Store Rating Reviews</h5>
          {renderReviews(lowRatingReviews)}
        </div>

        <div className="pt-10">
          <h5 className="text-xl text-gray-500">Fair Store Rating Reviews</h5>
          {renderReviews(fairRatingReviews)}
        </div>

        <div className="pt-10">
          <h5 className="text-xl text-gray-500">High Store Rating Reviews</h5>
          {renderReviews(highRatingReviews)}
        </div>
      </div>
    </div>
  );
};