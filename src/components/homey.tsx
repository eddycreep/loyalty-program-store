"use client"

import axios from 'axios';
import { apiEndPoint, colors } from '@/utils/colors';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { useState, useEffect } from "react"
import { Users, CreditCard, DollarSign, FileText, Edit, CheckCircle, Coins, Hourglass } from "lucide-react"
import {  CarouselDApiDemo } from "@/components/component/products-banner"
import { CalendarDemo } from "@/components/component/specials-calender"
import  EngagementMetrics from "@/components/engagement-metrics"

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

  const headers = ['Product', 'Special', 'Special Type', 'Start Date', 'Expiry Date', 'Redemptions', 'Status']
  const upcomingHeaders = ['Product', 'Special', 'Special Type', 'Start Date', 'Expiry Date', 'Status']
  const groupHeaders = ['Product', 'Group ID','Special',	'Special Price',	'Start Date',	'Expiry Date',	'Redemptions', 'Status']

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
    <div className="p-2 h-screen overflow-y-auto mb-32">
      <h2 className="text-2xl font-bold mb-4">Loyalty Program Metrics</h2>
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
      <h2 className="text-xl font-bold mb-4">Promotions Management</h2>
      <div>
        <h4 className="text-xl font-semibold mb-4 pl-2 text-red">Active Specials</h4>
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

          {/* PRODUCT SPECIALS - ROWS */}
            <div className="pt-2 max-h-[200px] space-y-2">
              {/* {activeProductSpecials?.map(({ special_id, special, special_type, store_id, start_date, expiry_date, special_value, isActive, product_description, special_price }) => ( */}
                <div  className="bg-white flex flex-col p-3 mx-2 rounded shadow-lg">
                  {/* Use flexbox to align the content in a row */}
                  <div className="flex items-center justify-between">
                    <p className="text-sm flex-1 text-center">DANONE 1KG D/CREAM</p>
                    <p className="text-sm flex-1 text-center">Buy-One-Get-5%</p>
                    <p className="text-sm flex-1 text-center">Percentage</p>
                    <p className="text-sm flex-1 text-center">
                      {/* {start_date ? new Date(start_date).toString().split(' ').slice(1, 5).join(' ') : '--:--'} */}
                      2024-10-10
                    </p>
                    <p className="text-sm flex-1 text-center">
                      {/* {expiry_date ? new Date(expiry_date).toString().split(' ').slice(1, 5).join(' ') : '--:--'} */}
                      2024-10-27
                    </p>
                    <p className="text-sm flex-1 text-center text-purple">300</p>
                    <p className="text-sm flex-1 text-center flex items-center justify-center">
                      <CheckCircle color="green" />
                    </p>
                  </div>
                </div>
              {/* ))} */}
            </div>
            <div className="pt-2 max-h-[200px] space-y-2">
                <div  className="bg-white flex flex-col p-3 mx-2 rounded shadow-lg">
                  <div className="flex items-center justify-between">
                    <p className="text-sm flex-1 text-center">CHARCOAL 4KG BAGS</p>
                    <p className="text-sm flex-1 text-center">5% Off Product</p>
                    <p className="text-sm flex-1 text-center">Percentage</p>
                    <p className="text-sm flex-1 text-center">
                      {/* {start_date ? new Date(start_date).toString().split(' ').slice(1, 5).join(' ') : '--:--'} */}
                      2023-11-15
                    </p>
                    <p className="text-sm flex-1 text-center">
                      {/* {expiry_date ? new Date(expiry_date).toString().split(' ').slice(1, 5).join(' ') : '--:--'} */}
                      2023-11-31
                    </p>
                    <p className="text-sm flex-1 text-center text-purple">300</p>
                    <p className="text-sm flex-1 text-center flex items-center justify-center">
                      <CheckCircle color="green" />
                    </p>
                  </div>
                </div>
            </div>
            <div className="pt-2 max-h-[200px] space-y-2">
                <div  className="bg-white flex flex-col p-3 mx-2 rounded shadow-lg">
                  <div className="flex items-center justify-between">
                    <p className="text-sm flex-1 text-center">BEEF SHIN</p>
                    <p className="text-sm flex-1 text-center">5% Off Purchase</p>
                    <p className="text-sm flex-1 text-center">Percentage</p>
                    <p className="text-sm flex-1 text-center">
                      {/* {start_date ? new Date(start_date).toString().split(' ').slice(1, 5).join(' ') : '--:--'} */}
                      2023-11-01
                    </p>
                    <p className="text-sm flex-1 text-center">
                      {/* {expiry_date ? new Date(expiry_date).toString().split(' ').slice(1, 5).join(' ') : '--:--'} */}
                      2023-11-31
                    </p>
                    <p className="text-sm flex-1 text-center text-purple">300</p>
                    <p className="text-sm flex-1 text-center flex items-center justify-center">
                      <CheckCircle color="green" />
                    </p>
                  </div>
                </div>
            </div>

          <div>
            <h4 className="text-xl font-semibold mb-4 pl-2 pt-10 text-gray-500">Upcoming Specials</h4>
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
              {/* {upcomingProductSpecials?.map(({ special_id, special, special_type, store_id, start_date, expiry_date, special_value, isActive, product_description, special_price }) => ( */}
                <div className="bg-white flex flex-col p-3 mx-2 rounded shadow-lg">
                  <div className="flex items-center justify-between">
                    <p className="text-sm flex-1 text-center">Yogurt</p>
                    <p className="text-sm flex-1 text-center">Get 15% Off Purchase</p>
                    <p className="text-sm flex-1 text-center">Percentage</p>
                    <p className="text-sm flex-1 text-center">
                      {/* {start_date ? new Date(start_date).toString().split(' ').slice(1, 5).join(' ') : '--:--'} */}
                      2024-10-25
                    </p>
                    <p className="text-sm flex-1 text-center">
                      {/* {expiry_date ? new Date(expiry_date).toString().split(' ').slice(1, 5).join(' ') : '--:--'} */}
                      2024-10-30
                    </p>
                    <p className="text-sm flex-1 text-center flex items-center justify-center">⏳</p>
                  </div>
                </div>
              {/* ))} */}
            </div>
            <div className="pt-2 max-h-[200px] space-y-2">
              {/* {upcomingProductSpecials?.map(({ special_id, special, special_type, store_id, start_date, expiry_date, special_value, isActive, product_description, special_price }) => ( */}
                <div className="bg-white flex flex-col p-3 mx-2 rounded shadow-lg">
                  <div className="flex items-center justify-between">
                    <p className="text-sm flex-1 text-center">Bread</p>
                    <p className="text-sm flex-1 text-center">Get 12% Off Purchase</p>
                    <p className="text-sm flex-1 text-center">Percentage</p>
                    <p className="text-sm flex-1 text-center">
                      {/* {start_date ? new Date(start_date).toString().split(' ').slice(1, 5).join(' ') : '--:--'} */}
                      2024-10-25
                    </p>
                    <p className="text-sm flex-1 text-center">
                      {/* {expiry_date ? new Date(expiry_date).toString().split(' ').slice(1, 5).join(' ') : '--:--'} */}
                      2024-10-30
                    </p>
                    <p className="text-sm flex-1 text-center flex items-center justify-center">⏳</p>
                  </div>
                </div>
              {/* ))} */}
            </div>
            <div className="pt-2 max-h-[200px] space-y-2">
              {/* {upcomingProductSpecials?.map(({ special_id, special, special_type, store_id, start_date, expiry_date, special_value, isActive, product_description, special_price }) => ( */}
                <div className="bg-white flex flex-col p-3 mx-2 rounded shadow-lg">
                  <div className="flex items-center justify-between">
                    <p className="text-sm flex-1 text-center">Eggs</p>
                    <p className="text-sm flex-1 text-center">Get 10% Off Purchase</p>
                    <p className="text-sm flex-1 text-center">Percentage</p>
                    <p className="text-sm flex-1 text-center">
                      {/* {start_date ? new Date(start_date).toString().split(' ').slice(1, 5).join(' ') : '--:--'} */}
                      2024-10-25
                    </p>
                    <p className="text-sm flex-1 text-center">
                      {/* {expiry_date ? new Date(expiry_date).toString().split(' ').slice(1, 5).join(' ') : '--:--'} */}
                      2024-10-30
                    </p>
                    <p className="text-sm flex-1 text-center flex items-center justify-center">⏳</p>
                  </div>
                </div>
              {/* ))} */}
            </div>
          </div>
      </div>

      <div>
        <div className="pt-14">
          <h4 className="text-xl font-semibold mb-4 pl-2 text-gray-500">Active Combined Specials</h4>
        </div>
          <div className="bg-gray-200 flex items-center justify-between divide-x divide-gray-500 p-3 mt-4 mx-2 rounded shadow-lg">
            {groupHeaders?.map((header, index) => (
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

          {/* COMBINED SPECIALS - ROWS*/}
            <div className="pt-2 max-h-[200px] space-y-2">
              {/* {activeProductSpecials?.map(({ special_id, special, special_type, store_id, start_date, expiry_date, special_value, isActive, product_description, special_price }) => ( */}
                <div  className="bg-white flex flex-col p-3 mx-2 rounded shadow-lg">
                  <div className="flex items-center justify-between">
                    <p className="text-sm flex-1 text-center text-gray-500">SWITCH 440M</p>
                    <p className="text-sm flex-1 text-center text-gray-500">1</p>
                    <p className="text-sm flex-1 text-center">BUY ANY 2 GET 5% OFF</p>
                    <p className="text-sm flex-1 text-center">14.99</p>
                    <p className="text-sm flex-1 text-center">
                      {/* {start_date ? new Date(start_date).toString().split(' ').slice(1, 5).join(' ') : '--:--'} */}
                      2024-10-10
                    </p>
                    <p className="text-sm flex-1 text-center">
                      {/* {expiry_date ? new Date(expiry_date).toString().split(' ').slice(1, 5).join(' ') : '--:--'} */}
                      2024-10-27
                    </p>
                    <p className="text-sm flex-1 text-center text-purple">300</p>
                    <p className="text-sm flex-1 text-center flex items-center justify-center">
                      <CheckCircle color="green" />
                    </p>
                  </div>
                </div>
              {/* ))} */}
            </div>
            <div className="pt-2 max-h-[200px] space-y-2">
                <div  className="bg-white flex flex-col p-3 mx-2 rounded shadow-lg">
                  <div className="flex items-center justify-between">
                    <p className="text-sm flex-1 text-center text-gray-500">KINGSLEY 2LTR ASST</p>
                    <p className="text-sm flex-1 text-center text-gray-500">1</p>
                    <p className="text-sm flex-1 text-center">BUY ANY 2 GET 5% OFF</p>
                    <p className="text-sm flex-1 text-center">14.99</p>
                    <p className="text-sm flex-1 text-center">
                      {/* {start_date ? new Date(start_date).toString().split(' ').slice(1, 5).join(' ') : '--:--'} */}
                      2023-11-15
                    </p>
                    <p className="text-sm flex-1 text-center">
                      {/* {expiry_date ? new Date(expiry_date).toString().split(' ').slice(1, 5).join(' ') : '--:--'} */}
                      2023-11-31
                    </p>
                    <p className="text-sm flex-1 text-center text-purple">300</p>
                    <p className="text-sm flex-1 text-center flex items-center justify-center">
                      <CheckCircle color="green" />
                    </p>
                  </div>
                </div>
            </div>
            <div className="pt-2 max-h-[200px] space-y-2">
                <div  className="bg-white flex flex-col p-3 mx-2 rounded shadow-lg">
                  <div className="flex items-center justify-between">
                    <p className="text-sm flex-1 text-center text-gray-500">DORITOS</p>
                    <p className="text-sm flex-1 text-center text-gray-500">2</p>
                    <p className="text-sm flex-1 text-center">BUY ANY 2 GET 5% OFF</p>
                    <p className="text-sm flex-1 text-center">24.99</p>
                    <p className="text-sm flex-1 text-center">
                      {/* {start_date ? new Date(start_date).toString().split(' ').slice(1, 5).join(' ') : '--:--'} */}
                      2023-11-01
                    </p>
                    <p className="text-sm flex-1 text-center">
                      {/* {expiry_date ? new Date(expiry_date).toString().split(' ').slice(1, 5).join(' ') : '--:--'} */}
                      2023-11-31
                    </p>
                    <p className="text-sm flex-1 text-center text-purple">300</p>
                    <p className="text-sm flex-1 text-center flex items-center justify-center">
                      <CheckCircle color="green" />
                    </p>
                  </div>
                </div>
            </div>
            <div className="pt-2 max-h-[200px] space-y-2">
                <div  className="bg-white flex flex-col p-3 mx-2 rounded shadow-lg">
                  <div className="flex items-center justify-between">
                    <p className="text-sm flex-1 text-center text-gray-500">LAYS</p>
                    <p className="text-sm flex-1 text-center text-gray-500">2</p>
                    <p className="text-sm flex-1 text-center">BUY ANY 2 GET 5% OFF</p>
                    <p className="text-sm flex-1 text-center">24.99</p>
                    <p className="text-sm flex-1 text-center">
                      {/* {start_date ? new Date(start_date).toString().split(' ').slice(1, 5).join(' ') : '--:--'} */}
                      2023-11-01
                    </p>
                    <p className="text-sm flex-1 text-center">
                      {/* {expiry_date ? new Date(expiry_date).toString().split(' ').slice(1, 5).join(' ') : '--:--'} */}
                      2023-11-31
                    </p>
                    <p className="text-sm flex-1 text-center text-purple">300</p>
                    <p className="text-sm flex-1 text-center flex items-center justify-center">
                      <CheckCircle color="green" />
                    </p>
                  </div>
                </div>
            </div>

          <div>
            <h4 className="text-xl font-semibold mb-4 pl-2 pt-10 text-gray-500">Upcoming Combined Specials</h4>
            <div className="bg-gray-200 flex items-center justify-between divide-x divide-gray-500 p-3 mt-4 mx-2 rounded shadow-lg">
            {groupHeaders?.map((header, index) => (
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
              {/* {activeProductSpecials?.map(({ special_id, special, special_type, store_id, start_date, expiry_date, special_value, isActive, product_description, special_price }) => ( */}
                <div  className="bg-white flex flex-col p-3 mx-2 rounded shadow-lg">
                  <div className="flex items-center justify-between">
                    <p className="text-sm flex-1 text-center text-gray-500">SWITCH 440M</p>
                    <p className="text-sm flex-1 text-center text-gray-500">1</p>
                    <p className="text-sm flex-1 text-center">BUY ANY 2 GET 5% OFF</p>
                    <p className="text-sm flex-1 text-center">14.99</p>
                    <p className="text-sm flex-1 text-center">
                      {/* {start_date ? new Date(start_date).toString().split(' ').slice(1, 5).join(' ') : '--:--'} */}
                      2024-10-10
                    </p>
                    <p className="text-sm flex-1 text-center">
                      {/* {expiry_date ? new Date(expiry_date).toString().split(' ').slice(1, 5).join(' ') : '--:--'} */}
                      2024-10-27
                    </p>
                    <p className="text-sm flex-1 text-center text-purple">300</p>
                    <p className="text-sm flex-1 text-center flex items-center justify-center">
                      <CheckCircle color="green" />
                    </p>
                  </div>
                </div>
              {/* ))} */}
            </div>
            <div className="pt-2 max-h-[200px] space-y-2">
                <div  className="bg-white flex flex-col p-3 mx-2 rounded shadow-lg">
                  <div className="flex items-center justify-between">
                    <p className="text-sm flex-1 text-center text-gray-500">KINGSLEY 2LTR ASST</p>
                    <p className="text-sm flex-1 text-center text-gray-500">1</p>
                    <p className="text-sm flex-1 text-center">BUY ANY 2 GET 5% OFF</p>
                    <p className="text-sm flex-1 text-center">14.99</p>
                    <p className="text-sm flex-1 text-center">
                      {/* {start_date ? new Date(start_date).toString().split(' ').slice(1, 5).join(' ') : '--:--'} */}
                      2023-11-15
                    </p>
                    <p className="text-sm flex-1 text-center">
                      {/* {expiry_date ? new Date(expiry_date).toString().split(' ').slice(1, 5).join(' ') : '--:--'} */}
                      2023-11-31
                    </p>
                    <p className="text-sm flex-1 text-center text-purple">300</p>
                    <p className="text-sm flex-1 text-center flex items-center justify-center">
                      <CheckCircle color="green" />
                    </p>
                  </div>
                </div>
            </div>
            <div className="pt-2 max-h-[200px] space-y-2">
                <div  className="bg-white flex flex-col p-3 mx-2 rounded shadow-lg">
                  <div className="flex items-center justify-between">
                    <p className="text-sm flex-1 text-center text-gray-500">DORITOS</p>
                    <p className="text-sm flex-1 text-center text-gray-500">2</p>
                    <p className="text-sm flex-1 text-center">BUY ANY 2 GET 5% OFF</p>
                    <p className="text-sm flex-1 text-center">24.99</p>
                    <p className="text-sm flex-1 text-center">
                      {/* {start_date ? new Date(start_date).toString().split(' ').slice(1, 5).join(' ') : '--:--'} */}
                      2023-11-01
                    </p>
                    <p className="text-sm flex-1 text-center">
                      {/* {expiry_date ? new Date(expiry_date).toString().split(' ').slice(1, 5).join(' ') : '--:--'} */}
                      2023-11-31
                    </p>
                    <p className="text-sm flex-1 text-center text-purple">300</p>
                    <p className="text-sm flex-1 text-center flex items-center justify-center">
                      <CheckCircle color="green" />
                    </p>
                  </div>
                </div>
            </div>
            <div className="pt-2 max-h-[200px] space-y-2">
                <div  className="bg-white flex flex-col p-3 mx-2 rounded shadow-lg">
                  <div className="flex items-center justify-between">
                    <p className="text-sm flex-1 text-center text-gray-500">LAYS</p>
                    <p className="text-sm flex-1 text-center text-gray-500">2</p>
                    <p className="text-sm flex-1 text-center">BUY ANY 2 GET 5% OFF</p>
                    <p className="text-sm flex-1 text-center">24.99</p>
                    <p className="text-sm flex-1 text-center">
                      {/* {start_date ? new Date(start_date).toString().split(' ').slice(1, 5).join(' ') : '--:--'} */}
                      2023-11-01
                    </p>
                    <p className="text-sm flex-1 text-center">
                      {/* {expiry_date ? new Date(expiry_date).toString().split(' ').slice(1, 5).join(' ') : '--:--'} */}
                      2023-11-31
                    </p>
                    <p className="text-sm flex-1 text-center text-purple">300</p>
                    <p className="text-sm flex-1 text-center flex items-center justify-center">
                      <CheckCircle color="green" />
                    </p>
                  </div>
                </div>
            </div>
          </div>
      </div>

        <div className="pt-14">
            <EngagementMetrics />
        </div>
      </div>
  )
}