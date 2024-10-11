"use client"

import axios from 'axios';
import { apiEndPoint, colors } from '@/utils/colors';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { useState, useEffect } from "react"
import { Users, CreditCard, DollarSign, FileText, Edit, CheckCircle, Coins, Hourglass } from "lucide-react"
import {  CarouselDApiDemo } from "@/components/component/products-banner"
import { CalendarDemo } from "@/components/component/specials-calender"

interface GetSpecialsProps {
  special_id: string,
  special: string,
  special_type: string,
  store_id: string,
  start_date: string,
  expiry_date: string,
  special_value: string,
  isActive: number,
  product_description: string,
  special_price: number,
}
type GetSpecialsResponse = GetSpecialsProps[]

interface GetUpcomingSpecialsProps {
  special_id: string,
  special: string,
  special_type: string,
  store_id: string,
  start_date: string,
  expiry_date: string,
  special_value: string,
  isActive: number,
  product_description: string,
  special_price: number,
  special_group_id: string
}
type UpcomingProdSpecialsRes = GetUpcomingSpecialsProps[]

export default function HomePage() {
  const [activeProductSpecials, setActiveProductSpecials] = useState<GetSpecialsResponse>([]);
  //const [activeGroupSpecials, setActiveGroupSpecials] = useState<GetSpecialsResponse>([]);

  const [upcomingProductSpecials, setUpcomingProductSpecials] = useState<UpcomingProdSpecialsRes>([]);
  // const [upcomingGroupSpecials, setUpcomingGroupSpecials] = useState<GetSpecialsResponse>([]);

  const headers = ['Product', 'Special Type', 'Start Date', 'Expiry Date', 'Redemptions', 'Active']
  const upcomingHeaders = ['Product', 'Special Type', 'Start Date', 'Expiry Date', 'Active']

  const getActiveProductSpecials = async () => {
    try{
        //http://localhost:4200/products/getproductspecials
        const url = `products/getproductspecials`
        const response = await axios.get<GetSpecialsResponse>(`${apiEndPoint}/${url}`)
        setActiveProductSpecials(response?.data)
        console.log("RETRIEVED ALL PRODUCT SPECIALS:", response)

    } catch (error) {
        console.log("AN ERROR OCCURED WHEN FETCHING PRODUCT SPECIALS:", error)
    }
  }

  const getUpcomingProductSpecials = async () => {
    try{
        const url = `products/getupcomingproductspecials`
        const response = await axios.get<UpcomingProdSpecialsRes>(`${apiEndPoint}/${url}`)
        setUpcomingProductSpecials(response?.data)
        console.log("RETRIEVED ALL UPCOMING PRODUCT SPECIALS:", response)

    } catch (error) {
        console.log("AN ERROR OCCURED WHEN FETCHING PRODUCT SPECIALS:", error)
    }
  }

  // const getActiveGroupSpecials = async () => {
  //   try{
  //       const url = `products/getactivegroupspecials`
  //       const response = await axios.get<GetSpecialsResponse>(`${apiEndPoint}/${url}`)
  //       setActiveGroupSpecials(response?.data)
  //       console.log("RETRIEVED ALL PRODUCT GROUP SPECIALS:", response)

  //   } catch (error) {
  //       console.log("AN ERROR OCCURED WHEN FETCHING PRODUCT GROUP SPECIALS:", error)
  //   }
  // }



  useEffect(() => {
    getActiveProductSpecials();
    getUpcomingProductSpecials();
  })


  return (
    <div className="p-2 h-screen overflow-y-auto">
      <h2 className="text-2xl font-semibold mb-4">Loyalty Program Metrics</h2>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4 mb-8">
        <Card className="bg-green">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Active Loyalty Members</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">15,342</div>
            <p className="text-xs text-muted-foreground">+2.5% from last month</p>
          </CardContent>
        </Card>
        <Card className="bg-blue">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Points Earned (This Month)</CardTitle>
            <CreditCard className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">245,678</div>
            <p className="text-xs text-muted-foreground">23,456 redeemed</p>
          </CardContent>
        </Card>
        <Card className="bg-yellow">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Loyalty-Driven Revenue</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">$32,456</div>
            <p className="text-xs text-muted-foreground">+15% from last month</p>
          </CardContent>
        </Card>
        <Card className="bg-orange">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Non-Loyalty-Driven Revenue</CardTitle>
            <Coins className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">$67,890</div>
            <p className="text-xs text-muted-foreground">+5% from last month</p>
          </CardContent>
        </Card>
      </div>
      <h2 className="text-2xl font-semibold mb-4">Promotions Management</h2>
      <div>
        <h4 className="text-xl font-semibold mb-4 pl-2">Active Specials</h4>
        <div className="bg-gray-200 flex items-center justify-between divide-x divide-gray-500 p-3 mt-4 mx-2 rounded shadow-lg">
            {headers?.map((header, index) => (
              <p
                key={index}
                className={`text-xs uppercase font-medium flex-1 text-center ${
                  index === 1 ? 'hidden lg:block' : ''
                }`}
              >
                {header}
              </p>
            ))}
          </div>
          <div className="pt-2 max-h-[200px] space-y-2">
            {activeProductSpecials?.map(({ special_id, special, special_type, store_id, start_date, expiry_date, special_value, isActive, product_description, special_price }) => (
              <div key={special_id} className="bg-white flex flex-col p-3 mx-2 rounded shadow-lg">
                {/* Use flexbox to align the content in a row */}
                <div className="flex items-center justify-between">
                  <p className="text-sm flex-1 text-center">{product_description}</p>
                  <p className="text-sm flex-1 text-center">{special_type}</p>
                  <p className="text-sm flex-1 text-center">
                    {start_date ? new Date(start_date).toString().split(' ').slice(1, 5).join(' ') : '--:--'}
                  </p>
                  <p className="text-sm flex-1 text-center">
                    {expiry_date ? new Date(expiry_date).toString().split(' ').slice(1, 5).join(' ') : '--:--'}
                  </p>
                  <p className="text-sm flex-1 text-center text-purple">300</p>
                  <p className="text-sm flex-1 text-center flex items-center justify-center">
                    <CheckCircle color="green" />
                  </p>
                </div>
              </div>
            ))}
          </div>

          <div>
            <h4 className="text-xl font-semibold mb-4 pl-2 pt-10">Upcoming Specials</h4>
            <div className="bg-gray-200 flex items-center justify-between divide-x divide-gray-500 p-3 mt-4 mx-2 rounded shadow-lg">
            {upcomingHeaders?.map((header, index) => (
              <p
                key={index}
                className={`text-xs uppercase font-medium flex-1 text-center ${
                  index === 1 ? 'hidden lg:block' : ''
                }`}
              >
                {header}
              </p>
            ))}
          </div>
            <div className="pt-2 max-h-[200px] space-y-2">
              {upcomingProductSpecials?.map(({ special_id, special, special_type, store_id, start_date, expiry_date, special_value, isActive, product_description, special_price }) => (
                <div key={special_id} className="bg-white flex flex-col p-3 mx-2 rounded shadow-lg">
                  <div className="flex items-center justify-between">
                    <p className="text-sm flex-1 text-center">{product_description}</p>
                    <p className="text-sm flex-1 text-center">{special_type}</p>
                    <p className="text-sm flex-1 text-center">
                      {start_date ? new Date(start_date).toString().split(' ').slice(1, 5).join(' ') : '--:--'}
                    </p>
                    <p className="text-sm flex-1 text-center">
                      {expiry_date ? new Date(expiry_date).toString().split(' ').slice(1, 5).join(' ') : '--:--'}
                    </p>
                    <p className="text-sm flex-1 text-center flex items-center justify-center">⏳</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
      </div>

        <div className="pt-14">
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Active Surveys</CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-4">
                {[
                  { title: "Customer Satisfaction Q2", completionRate: "68%", reward: "10% off next purchase" },
                  { title: "Product Feedback: Summer Fruits", completionRate: "45%", reward: "100 bonus points" },
                ].map((survey, index) => (
                  <li key={index} className="border-b pb-2">
                    <div className="flex items-center">
                      <FileText className="h-4 w-4 mr-2 text-muted-foreground" />
                      <span className="font-semibold">{survey.title}</span>
                    </div>
                    <p className="text-sm">Completion Rate: {survey.completionRate}</p>
                    <p className="text-sm text-muted-foreground">Reward: {survey.reward}</p>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>
        </div>
      </div>
  )
}