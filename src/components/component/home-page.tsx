// import React, { useState } from 'react'
// import { Button } from "@/components/ui/button"
// import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
// import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
// import { Badge } from "@/components/ui/badge"
// import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
// import { CheckCircle, Clock, DollarSign, PlusCircle, ShoppingCart, Users, FileText, Gift, Mail, TrendingUp } from 'lucide-react'

// export default function HomePage() {
//   const [activeTab, setActiveTab] = useState("active")

//   return (
//     <div className="h-screen bg-gray-100">
//       {/* Main content */}
//       <main className="py-8 px-4 overflow-auto">
//         <div className="max-w-[1600px] mx-auto">
//           {/* Header */}
//           <header className="flex justify-between items-center mb-8">
//             <h1 className="text-3xl font-bold">Loyalty Program Management</h1>
//             <div className="flex items-center space-x-4">
//               <span>Welcome, Store Manager</span>
//               <Avatar>
//                 <AvatarImage src="/placeholder.svg?height=32&width=32" alt="Store Manager" />
//                 <AvatarFallback>SM</AvatarFallback>
//               </Avatar>
//             </div>
//           </header>

//           {/* Summary Cards */}
//           <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
//             <SummaryCard 
//               title="Active Loyalty Members" 
//               value="15,234" 
//               icon={<Users className="h-6 w-6" />} 
//               increase={234}
//             />
//             <SummaryCard 
//               title="Total Specials Redeemed" 
//               value="45,678" 
//               icon={<ShoppingCart className="h-6 w-6" />} 
//               increase={1234}
//             />
//             <SummaryCard 
//               title="Rewards Redeemed" 
//               value="12,345" 
//               icon={<Gift className="h-6 w-6" />} 
//               increase={543}
//             />
//             <SummaryCard 
//               title="Revenue from Specials" 
//               value="$234,567" 
//               icon={<DollarSign className="h-6 w-6" />} 
//               increase={12345}
//               isCurrency={true}
//             />
//           </div>

//           {/* Specials Section */}
//           <section className="mb-8">
//             <h2 className="text-2xl font-bold mb-4">Specials</h2>
//             <Tabs defaultValue="active" onValueChange={setActiveTab}>
//               <TabsList>
//                 <TabsTrigger value="active">Active Specials</TabsTrigger>
//                 <TabsTrigger value="upcoming">Upcoming Specials</TabsTrigger>
//               </TabsList>
//               <TabsContent value="active">
//                 <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
//                   <SpecialCard
//                     type="Normal"
//                     name="Summer Fruit Bonanza"
//                     discount="20% off"
//                     startDate="2023-06-01"
//                     endDate="2023-08-31"
//                     timesRedeemed={1234}
//                     isActive={true}
//                   />
//                   <SpecialCard
//                     type="Combined"
//                     name="Back to School Bundle"
//                     discount="$10 off"
//                     startDate="2023-07-15"
//                     endDate="2023-09-15"
//                     timesRedeemed={567}
//                     isActive={true}
//                   />
//                   <SpecialCard
//                     type="Normal"
//                     name="Midweek Madness"
//                     discount="15% off"
//                     startDate="2023-07-01"
//                     endDate="2023-09-30"
//                     timesRedeemed={892}
//                     isActive={true}
//                   />
//                   <SpecialCard
//                     type="Combined"
//                     name="Family Movie Night Bundle"
//                     discount="$5 off"
//                     startDate="2023-08-01"
//                     endDate="2023-10-31"
//                     timesRedeemed={456}
//                     isActive={true}
//                   />
//                   <SpecialCard
//                     type="Normal"
//                     name="Healthy Living Discount"
//                     discount="10% off"
//                     startDate="2023-06-15"
//                     endDate="2023-12-31"
//                     timesRedeemed={1567}
//                     isActive={true}
//                   />
//                   <SpecialCard
//                     type="Combined"
//                     name="Breakfast Essentials Pack"
//                     discount="20% off"
//                     startDate="2023-07-20"
//                     endDate="2023-09-20"
//                     timesRedeemed={723}
//                     isActive={true}
//                   />
//                   {/* Add more SpecialCards as needed */}
//                 </div>
//               </TabsContent>
//               <TabsContent value="upcoming">
//                 <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
//                   <SpecialCard
//                     type="Normal"
//                     name="Fall Harvest Special"
//                     discount="15% off"
//                     startDate="2023-09-01"
//                     endDate="2023-11-30"
//                     timesRedeemed={0}
//                     isActive={false}
//                   />
//                   <SpecialCard
//                     type="Normal"
//                     name="Winter Warmers Special"
//                     discount="25% off"
//                     startDate="2023-12-01"
//                     endDate="2024-02-29"
//                     timesRedeemed={0}
//                     isActive={false}
//                   />
//                   <SpecialCard
//                     type="Combined"
//                     name="New Year Health Kick"
//                     discount="$15 off"
//                     startDate="2024-01-01"
//                     endDate="2024-03-31"
//                     timesRedeemed={0}
//                     isActive={false}
//                   />
//                   {/* Add more upcoming SpecialCards as needed */}
//                 </div>
//               </TabsContent>
//             </Tabs>
//           </section>

//           {/* Surveys and Rewards Section */}
//           <section>
//             <h2 className="text-2xl font-bold mb-4">Active Surveys and Rewards</h2>
//             <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
//               <Card className="shadow-lg">
//                 <CardHeader>
//                   <CardTitle>Surveys</CardTitle>
//                 </CardHeader>
//                 <CardContent>
//                   <ul className="space-y-4">
//                     <SurveyItem
//                       name="Customer Satisfaction Survey"
//                       category="Store"
//                       type="Percentage"
//                       completions={789}
//                       location="Main Street Store"
//                       region="North"
//                     />
//                     <SurveyItem
//                       name="Product Feedback Survey"
//                       category="Product"
//                       type="Amount"
//                       completions={456}
//                       location="Downtown Store"
//                       region="Central"
//                     />
//                     <SurveyItem
//                       name="New Product Feedback"
//                       category="Product"
//                       type="Amount"
//                       completions={324}
//                       location="All Stores"
//                       region="West"
//                     />
//                     <SurveyItem
//                       name="Staff Performance Review"
//                       category="Staff"
//                       type="Percentage"
//                       completions={178}
//                       location="City Center Store"
//                       region="South"
//                     />
//                     {/* Add more SurveyItems as needed */}
//                   </ul>
//                 </CardContent>
//               </Card>
//               <Card className="shadow-lg">
//                 <CardHeader>
//                   <CardTitle>Rewards</CardTitle>
//                 </CardHeader>
//                 <CardContent>
//                   <ul className="space-y-4">
//                     <RewardItem
//                       name="Refer a Friend"
//                       task="Refer a new customer"
//                       type="Percentage"
//                       redemptions={321}
//                       location="All Stores"
//                       region="All Regions"
//                     />
//                     <RewardItem
//                       name="Birthday Surprise"
//                       task="Shop on your birthday"
//                       type="Amount"
//                       redemptions={654}
//                       location="All Stores"
//                       region="All Regions"
//                     />
//                     <RewardItem
//                       name="Loyalty Milestone Bonus"
//                       task="Reach 1000 loyalty points"
//                       type="Amount"
//                       redemptions={287}
//                       location="All Stores"
//                       region="All Regions"
//                     />
//                     <RewardItem
//                       name="Eco-Friendly Shopper"
//                       task="Use reusable bags 10 times"
//                       type="Percentage"
//                       redemptions={542}
//                       location="All Stores"
//                       region="All Regions"
//                     />
//                     {/* Add more RewardItems as needed */}
//                   </ul>
//                 </CardContent>
//               </Card>
//             </div>
//           </section>
//         </div>
//       </main>
//     </div>
//   )
// }

// function SummaryCard({ title, value, icon, increase, isCurrency = false }) {
//   return (
//     <Card className="shadow-lg">
//       <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
//         <CardTitle className="text-sm font-medium">{title}</CardTitle>
//         <div className="p-2 bg-rose-300 rounded-full">
//           {React.cloneElement(icon, { className: "h-6 w-6 text-red-500" })}
//         </div>
//       </CardHeader>
//       <CardContent>
//         <div className="text-2xl font-bold">{value}</div>
//         <div className="flex items-center mt-2 text-gray-400 text-sm">
//           <TrendingUp className="h-4 w-4 mr-1" />
//           <span>
//             {isCurrency ? '+$' : '+'}
//             {increase.toLocaleString()} from last month
//           </span>
//         </div>
//       </CardContent>
//     </Card>
//   )
// }

// function SpecialCard({ type, name, discount, startDate, endDate, timesRedeemed, isActive }) {
//   return (
//     <Card className="shadow-lg">
//       <CardHeader>
//         <div className="flex justify-between items-center">
//           <CardTitle>{name}</CardTitle>
//           {isActive ? (
//             <CheckCircle className="h-5 w-5 text-green-500" />
//           ) : (
//             <Clock className="h-5 w-5 text-yellow-500" />
//           )}
//         </div>
//         <Badge 
//           variant="secondary"
//           className="mt-2 w-fit bg-gray-200 text-gray-800 hover:bg-gray-300"
//         >
//           {type}
//         </Badge>
//       </CardHeader>
//       <CardContent>
//         <p className="font-bold text-lg">{discount}</p>
//         <p className="text-sm text-muted-foreground">
//           {startDate} - {endDate}
//         </p>
//         <div className="mt-2 flex items-center text-gray-400">
//           <Users className="h-4 w-4 mr-1" />
//           <span>Redemptions: {timesRedeemed}</span>
//         </div>
//       </CardContent>
//     </Card>
//   )
// }

// function SurveyItem({ name, category, type, completions, location, region }) {
//   return (
//     <li className="flex items-center justify-between">
//       <div>
//         <p className="font-semibold">{name}</p>
//         <p className="text-sm text-muted-foreground">{category} | {location} | {region}</p>
//       </div>
//       <div className="flex items-center space-x-2">
//         <Badge 
//           variant="secondary"
//           className="bg-gray-200 text-gray-800 hover:bg-gray-300"
//         >
//           {type}
//         </Badge>
//         <span>{completions} completions</span>
//       </div>
//     </li>
//   )
// }

// function RewardItem({ name, task, type, redemptions, location, region }) {
//   return (
//     <li className="flex items-center justify-between">
//       <div>
//         <p className="font-semibold">{name}</p>
//         <p className="text-sm text-muted-foreground">{task}</p>
//         <p className="text-sm text-muted-foreground">{location} | {region}</p>
//       </div>
//       <div className="flex items-center space-x-2">
//         <Badge 
//           variant="secondary"
//           className="bg-gray-200 text-gray-800 hover:bg-gray-300"
//         >
//           {type}
//         </Badge>
//         <span>{redemptions} redemptions</span>
//         <Mail className="h-4 w-4 text-muted-foreground" />
//       </div>
//     </li>
//   )
// }