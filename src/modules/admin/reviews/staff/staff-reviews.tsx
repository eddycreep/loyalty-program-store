"use client"

import { useEffect, useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { apiEndPoint, colors } from "@/utils/colors"
import axios from "axios"
import { Star, XOctagon, ShieldAlert } from 'lucide-react'
import SquareCircleLoader from "@/lib/square-circle-loader";


const staffReviewsData = [
    { id: 1, customerName: "Grace Lee", avatar: "/covers/avatarFour.jpg", rating: 5, staffName: "John Doe", staffRole: "Cashier", comment: "Very friendly and efficient!", date: "2023-10-15" },
    { id: 2, customerName: "Henry Taylor", avatar: "/covers/avatarFive.png", rating: 4, staffName: "Jane Smith", staffRole: "Customer Service", comment: "Helpful, but seemed a bit rushed.", date: "2023-10-14" },
    { id: 3, customerName: "Ivy Chen", avatar: "/covers/avatarSix.jpg", rating: 3, staffName: "Mike Johnson", staffRole: "Stock Clerk", comment: "Polite, but couldn't find the item I needed.", date: "2023-10-13" },
];

export const StaffReviews = () => {
    const [loadingData, setLoadingData] = useState(false);
    const [isError, setIsError] = useState(false);

    //const [staffReviews, setStaffReviews] = useState<StaffReviewsResponse>([]);

    // const getStaffReviews = async () => {
    //     setLoadingData(true);

    //     try {
    //         const url `admin/get-staff-reviews`
    //         const response = await axios.get<StaffReviewsResponse>(`${apiEndPoint}/${url}`)
    //         setStaffReviews(response?.data);
    //         setLoadingData(false);

    //     } catch (error) {
    //         console.log("An error occurred when fetching staff reviews:", error)
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
    //             <p className="ml-2 uppercase pt-2 text-red">An error occured when fetching staff reviews</p>
    //         </div>
    //     )
    // }


    // if (staffReviews.length === 0) {
    //     return (
    //         <div className="flex flex-col items-center justify-center pt-10">
    //             <ShieldAlert size={34} />
    //             <p className="ml-2 uppercase pt-2 text-green">There are currently no staff reviews completed by customers. Encourage feedback to gain valuable insights and improve their experience!</p>
    //         </div>
    //     )
    // }


    return (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 pt-4 shadow-2xl">
                {staffReviewsData.map(({ id, customerName, avatar, rating, staffName, staffRole, comment, date }) => (
                    <Card key={id} className="flex flex-col shadow-lg hover:shadow-xl">
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
                            <CardTitle className="text-lg">{customerName}</CardTitle>
                            <p className="text-sm text-muted-foreground">
                                {new Date(date).toDateString()}
                            </p>
                        </div>
                        </CardHeader>
                        <CardContent className="flex-grow flex flex-col">
                        <div className="flex justify-between items-center mb-2">
                            <Badge variant="secondary">
                                {staffName} | {staffRole}
                            </Badge>
                            <div className="flex">
                                {[...Array(5)].map((_, i) => (
                                    <Star
                                    key={i}
                                    className={`w-4 h-4 ${i < rating ? "text-yellow fill-yellow" : "text-gray-300"}`}
                                    />
                                ))}
                            </div>
                        </div>
                        <p className="text-sm text-muted-foreground">{comment}</p>
                        </CardContent>
                    </Card>
                ))}
        </div>
    )
}