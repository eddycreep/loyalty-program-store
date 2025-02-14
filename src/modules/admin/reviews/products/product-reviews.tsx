"use client"

import { useEffect, useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { apiEndPoint, colors } from "@/utils/colors"
import axios from "axios"
import { Star, XOctagon, ShieldAlert } from 'lucide-react'
import SquareCircleLoader from "@/lib/square-circle-loader";


const productReviews = [
    { id: 1, customerName: "Alice Johnson", avatar: "/covers/avatarOne.png", rating: 5, productName: "Organic Apples", category: "Fruits", comment: "Delicious and fresh!", date: "2023-10-15" },
    { id: 2, customerName: "Bob Smith", avatar: "/covers/avatarTwo.png", rating: 4, productName: "Whole Grain Bread", category: "Bakery", comment: "Great texture and taste.", date: "2023-10-14" },
    { id: 3, customerName: "Carol Davis", avatar: "/covers/avatarThree.png", rating: 3, productName: "Low-Fat Yogurt", category: "Dairy", comment: "Decent, but could be creamier.", date: "2023-10-13" },
];

export const ProductReviews = () => {
    const [loadingData, setLoadingData] = useState(false);
    const [isError, setIsError] = useState(false);

    //const [productReviews, setProductReviews] = useState<ProductReviewsResponse>([]);

    // const getProductReviews = async () => {
    //     setLoadingData(true);

    //     try {
    //         const url `admin/get-product-reviews`
    //         const response = await axios.get<ProductReviewsResponse>(`${apiEndPoint}/${url}`)
    //         setProductReviews(response?.data);
    //         setLoadingData(false);

    //     } catch (error) {
    //         console.log("An error occurred when fetching product reviews:", error)
    //         setIsError(true);
    //     }
    // }

    // useEffect(() => {
    //     getProductReviews();
    // }, [])


    // if (loadingData) {
    //     return (
    //         <div className="pt-10 flex flex-col items-center justify-center">
    //             <SquareCircleLoader />
    //             <p className="text-gray-500 uppercase pt-4">Loading data, please be patient.</p>
    //         </div>
    //     )
    // }


    // if (isError) {
    //     return (
    //         <div className="flex flex-col items-center justify-center pt-10">
    //             <XOctagon size={34} />
    //             <p className="ml-2 uppercase pt-2 text-red">An error occured when fetching product reviews</p>
    //         </div>
    //     )
    // }


    // if (productReviews.length === 0) {
    //     return (
    //         <div className="flex flex-col items-center justify-center pt-10">
    //             <ShieldAlert size={34} />
    //             <p className="ml-2 uppercase pt-2 text-green">There are currently no product reviews completed by customers. Encourage feedback to gain valuable insights and improve their experience!</p>
    //         </div>
    //     )
    // }


    return (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 pt-4">
                {productReviews.map(({ id, customerName, avatar, rating, productName, category, comment, date }) => (
                    <Card key={id} className="col-span-1 rounded-lg overflow-hidden transition-all duration-300 ease-in-out shadow-lg hover:shadow-xl">
                        <CardHeader className="flex flex-row items-center gap-4">
                        <Avatar>
                            <AvatarImage
                                src={avatar}
                                alt={customerName}
                                width={40}
                                height={40}
                                className="rounded-full"
                            />
                        </Avatar>
                        <div className="flex flex-col">
                            <CardTitle className="text-sm font-bold">{customerName}</CardTitle>
                            <p className="text-sm text-gray-400">{new Date(date).toDateString()}</p>
                        </div>
                        </CardHeader>
                        <CardContent className="flex-grow flex flex-col">
                        <div className="flex justify-between items-center mb-2">
                            <Badge variant="secondary">{productName}</Badge>
                            <div className="flex">
                                {[...Array(5)].map((_, i) => (
                                    <Star
                                        key={i}
                                        className={`w-4 h-4 ${i < rating ? "text-yellow fill-yellow" : "text-gray-300"}`}
                                    />
                                ))}
                            </div>
                        </div>
                        <p className="text-sm text-gray-600">{comment}</p>
                        </CardContent>
                    </Card>
                ))}
        </div>
    )
}