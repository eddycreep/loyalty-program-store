// import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
// import { Button } from "@/components/ui/button"
// import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
// import { Users, CreditCard, DollarSign, Tag, FileText, Edit, XCircle, Smartphone, Mail, MessageSquare, Globe, QrCode, Coins } from "lucide-react"
// import Image from "next/image"

// export default function HomePage() {
//   return (
//     <div className="p-8">
//       <h1 className="text-3xl font-bold mb-6">Store Manager Dashboard</h1>
      
//       <h2 className="text-2xl font-semibold mb-4">Loyalty Program Metrics</h2>
//       <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4 mb-8">
//         <Card>
//           <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
//             <CardTitle className="text-sm font-medium">Total Active Loyalty Members</CardTitle>
//             <Users className="h-4 w-4 text-muted-foreground" />
//           </CardHeader>
//           <CardContent>
//             <div className="text-2xl font-bold">15,342</div>
//             <p className="text-xs text-muted-foreground">+2.5% from last month</p>
//           </CardContent>
//         </Card>
//         <Card>
//           <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
//             <CardTitle className="text-sm font-medium">Points Earned (This Month)</CardTitle>
//             <CreditCard className="h-4 w-4 text-muted-foreground" />
//           </CardHeader>
//           <CardContent>
//             <div className="text-2xl font-bold">245,678</div>
//             <p className="text-xs text-muted-foreground">23,456 redeemed</p>
//           </CardContent>
//         </Card>
//         <Card>
//           <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
//             <CardTitle className="text-sm font-medium">Loyalty-Driven Revenue</CardTitle>
//             <DollarSign className="h-4 w-4 text-muted-foreground" />
//           </CardHeader>
//           <CardContent>
//             <div className="text-2xl font-bold">$32,456</div>
//             <p className="text-xs text-muted-foreground">+15% from last month</p>
//           </CardContent>
//         </Card>
//         <Card>
//           <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
//             <CardTitle className="text-sm font-medium">Non-Loyalty-Driven Revenue</CardTitle>
//             <Coins className="h-4 w-4 text-muted-foreground" />
//           </CardHeader>
//           <CardContent>
//             <div className="text-2xl font-bold">$67,890</div>
//             <p className="text-xs text-muted-foreground">+5% from last month</p>
//           </CardContent>
//         </Card>
//       </div>

//       <h2 className="text-2xl font-semibold mb-4">Current Promotions</h2>
//       <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4 mb-8">
//         <Card className="overflow-hidden">
//           <Image src="/placeholder.svg?height=200&width=400" width={400} height={200} alt="Summer Fruits Bonanza" className="w-full object-cover" />
//           <CardContent className="p-4">
//             <h3 className="font-semibold text-lg mb-2">Summer Fruits Bonanza</h3>
//             <p className="text-sm text-muted-foreground mb-2">30% off all summer fruits</p>
//             <p className="text-sm font-medium">Ends: June 30, 2023</p>
//           </CardContent>
//         </Card>
//         <Card className="overflow-hidden">
//           <Image src="/placeholder.svg?height=200&width=400" width={400} height={200} alt="Gourmet Cheese Festival" className="w-full object-cover" />
//           <CardContent className="p-4">
//             <h3 className="font-semibold text-lg mb-2">Gourmet Cheese Festival</h3>
//             <p className="text-sm text-muted-foreground mb-2">20% off imported cheeses</p>
//             <p className="text-sm font-medium">Ends: July 15, 2023</p>
//           </CardContent>
//         </Card>
//         <Card className="overflow-hidden">
//           <Image src="/placeholder.svg?height=200&width=400" width={400} height={200} alt="Organic Veggies Week" className="w-full object-cover" />
//           <CardContent className="p-4">
//             <h3 className="font-semibold text-lg mb-2">Organic Veggies Week</h3>
//             <p className="text-sm text-muted-foreground mb-2">Buy 2 Get 1 Free on organic vegetables</p>
//             <p className="text-sm font-medium">Ends: July 7, 2023</p>
//           </CardContent>
//         </Card>
//         <Card className="overflow-hidden">
//           <Image src="/placeholder.svg?height=200&width=400" width={400} height={200} alt="Artisan Bread Showcase" className="w-full object-cover" />
//           <CardContent className="p-4">
//             <h3 className="font-semibold text-lg mb-2">Artisan Bread Showcase</h3>
//             <p className="text-sm text-muted-foreground mb-2">25% off all artisan breads</p>
//             <p className="text-sm font-medium">Ends: June 25, 2023</p>
//           </CardContent>
//         </Card>
//       </div>

//       <h2 className="text-2xl font-semibold mb-4">Promotions Management</h2>
//       <div className="grid gap-4 mb-8">
//         <Card>
//           <CardHeader>
//             <CardTitle className="text-lg">Active Promotions</CardTitle>
//           </CardHeader>
//           <CardContent>
//             <Table>
//               <TableHeader>
//                 <TableRow>
//                   <TableHead>Name</TableHead>
//                   <TableHead>Dates</TableHead>
//                   <TableHead>Redemptions</TableHead>
//                   <TableHead>Actions</TableHead>
//                 </TableRow>
//               </TableHeader>
//               <TableBody>
//                 {[
//                   { name: "Summer Fruits Bonanza", start: "2023-06-01", end: "2023-06-30", redemptions: 234 },
//                   { name: "Gourmet Cheese Festival", start: "2023-07-01", end: "2023-07-15", redemptions: 156 },
//                   { name: "Organic Veggies Week", start: "2023-07-01", end: "2023-07-07", redemptions: 89 },
//                   { name: "Artisan Bread Showcase", start: "2023-06-15", end: "2023-06-25", redemptions: 112 },
//                 ].map((promo, index) => (
//                   <TableRow key={index}>
//                     <TableCell>{promo.name}</TableCell>
//                     <TableCell>{promo.start} - {promo.end}</TableCell>
//                     <TableCell>{promo.redemptions}</TableCell>
//                     <TableCell>
//                       <Button size="sm" variant="ghost"><Edit className="h-4 w-4" /></Button>
//                       <Button size="sm" variant="ghost"><XCircle className="h-4 w-4" /></Button>
//                     </TableCell>
//                   </TableRow>
//                 ))}
//               </TableBody>
//             </Table>
//           </CardContent>
//         </Card>
//         <Card>
//           <CardHeader>
//             <CardTitle className="text-lg">Upcoming Promotions</CardTitle>
//           </CardHeader>
//           <CardContent>
//             <Table>
//               <TableHeader>
//                 <TableRow>
//                   <TableHead>Name</TableHead>
//                   <TableHead>Start Date</TableHead>
//                   <TableHead>Actions</TableHead>
//                 </TableRow>
//               </TableHeader>
//               <TableBody>
//                 {[
//                   { name: "Back to School Lunch Specials", start: "2023-08-15" },
//                   { name: "Fall Harvest Festival", start: "2023-09-01" },
//                 ].map((promo, index) => (
//                   <TableRow key={index}>
//                     <TableCell>{promo.name}</TableCell>
//                     <TableCell>{promo.start}</TableCell>
//                     <TableCell>
//                       <Button size="sm" variant="ghost"><Edit className="h-4 w-4" /></Button>
//                     </TableCell>
//                   </TableRow>
//                 ))}
//               </TableBody>
//             </Table>
//           </CardContent>
//         </Card>
//       </div>

//       <h2 className="text-2xl font-semibold mb-4">Alternative Ways to Redeem Discounts</h2>
//       <Card>
//         <CardContent className="pt-6">
//           <ul className="space-y-4">
//             <li className="flex items-center">
//               <QrCode className="h-5 w-5 mr-2 text-primary" />
//               <span>In-store kiosks: Customers can scan their loyalty card or enter their phone number to retrieve available discounts.</span>
//             </li>
//             <li className="flex items-center">
//               <Smartphone className="h-5 w-5 mr-2 text-primary" />
//               <span>Mobile app: Customers can view and activate their discounts directly from our mobile application.</span>
//             </li>
//             <li className="flex items-center">
//               <Mail className="h-5 w-5 mr-2 text-primary" />
//               <span>Email notifications: We send personalized emails with discount codes that can be used online or in-store.</span>
//             </li>
//             <li className="flex items-center">
//               <MessageSquare className="h-5 w-5 mr-2 text-primary" />
//               <span>SMS: Customers can opt-in to receive text messages with their available discounts and redemption codes.</span>
//             </li>
//             <li className="flex items-center">
//               <Globe className="h-5 w-5 mr-2 text-primary" />
//               <span>Website account: Logged-in customers can see and apply their discounts during online checkout.</span>
//             </li>
//           </ul>
//         </CardContent>
//       </Card>

//       <h2 className="text-2xl font-semibold my-4">Recent Activity</h2>
//       <div className="grid gap-4 md:grid-cols-2">
//         <Card>
//           <CardHeader>
//             <CardTitle className="text-lg">Recently Added Specials & Discounts</CardTitle>
//           </CardHeader>
//           <CardContent>
//             <ul className="space-y-4">
//               {[
//                 { name: "Summer Fruits Bonanza", start: "2023-06-01", end: "2023-06-30", products: "All summer fruits", usage: 234 },
//                 { name: "Gourmet Cheese Festival", start: "2023-07-01", end: "2023-07-15", products: "Imported cheeses", usage: 156 },
//                 { name: "Organic Veggies Week", start: "2023-07-01", end: "2023-07-07", products: "Organic vegetables", usage: 89 },
//                 { name: "Artisan Bread Showcase", start: "2023-06-15", end: "2023-06-25", products: "Artisan breads", usage: 112 },
//               ].map((promo, index) => (
//                 <li key={index} className="border-b pb-2">
//                   <div className="flex items-center">
//                     <Tag className="h-4 w-4 mr-2 text-muted-foreground" />
//                     <span className="font-semibold">{promo.name}</span>
//                   </div>
//                   <p className="text-sm text-muted-foreground">
//                     {promo.start} to {promo.end} | {promo.products}
//                   </p>
//                   <p className="text-sm">Used by {promo.usage} customers</p>
//                 </li>
//               ))}
//             </ul>
//           </CardContent>
//         </Card>
//         <Card>
//           <CardHeader>
//             <CardTitle className="text-lg">Newly Created Surveys</CardTitle>
//           </CardHeader>
//           <CardContent>
//             <ul className="space-y-4">
//               {[
//                 { title: "Customer Satisfaction Q2", completionRate: "68%", reward: "10% off next purchase" },
//                 { title: "Product Feedback: Summer Fruits", completionRate: "45%", reward: "100 bonus points" },
//               ].map((survey, index) => (
//                 <li key={index} className="border-b pb-2">
//                   <div className="flex items-center">
//                     <FileText className="h-4 w-4 mr-2 text-muted-foreground" />
//                     <span className="font-semibold">{survey.title}</span>
//                   </div>
//                   <p className="text-sm">Completion Rate: {survey.completionRate}</p>
//                   <p className="text-sm text-muted-foreground">Reward: {survey.reward}</p>
//                 </li>
//               ))}
//             </ul>
//           </CardContent>
//         </Card>
//       </div>
//     </div>
//   )
// }