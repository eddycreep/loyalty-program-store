"use client"

import { useState } from "react"
import { Bell, ChevronDown, LayoutDashboard, Package, ShoppingCart, Users } from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Input } from "@/components/ui/input"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"
import { ResponsiveContainer, LineChart, Line, BarChart, Bar, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from "recharts"

// Dummy data for charts
const salesTrendsData = [
  { name: "Jan", discounted: 4000, fullPrice: 2400 },
  { name: "Feb", discounted: 3000, fullPrice: 1398 },
  { name: "Mar", discounted: 2000, fullPrice: 9800 },
  { name: "Apr", discounted: 2780, fullPrice: 3908 },
  { name: "May", discounted: 1890, fullPrice: 4800 },
  { name: "Jun", discounted: 2390, fullPrice: 3800 },
]

const customerEngagementData = [
  { name: "Redemption", value: 400 },
  { name: "Survey", value: 300 },
  { name: "Referral", value: 300 },
]

const promotionPerformanceData = [
  { name: "Promo A", performance: 4000 },
  { name: "Promo B", performance: 3000 },
  { name: "Promo C", performance: 2000 },
  { name: "Promo D", performance: 2780 },
  { name: "Promo E", performance: 1890 },
]

const customerRetentionData = [
  { name: "New", value: 400 },
  { name: "Returning", value: 600 },
]

const inventoryImpactData = [
  { name: "Product A", stock: 4000, lowStock: 2400 },
  { name: "Product B", stock: 3000, lowStock: 1398 },
  { name: "Product C", stock: 2000, lowStock: 9800 },
  { name: "Product D", stock: 2780, lowStock: 3908 },
  { name: "Product E", stock: 1890, lowStock: 4800 },
]

const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042"]

export function DashboardComponent() {
  const [activeTab, setActiveTab] = useState("overview")

  return (
    <div className="flex h-screen overflow-hidden">
      {/* Sidebar */}
      <aside className="hidden w-64 overflow-y-auto bg-gray-800 md:block">
        <div className="flex items-center justify-center h-20 bg-gray-900">
          <h1 className="text-2xl font-semibold text-white">Loyalty Dashboard</h1>
        </div>
        <nav className="mt-5">
          <a
            className="flex items-center px-6 py-2 mt-4 text-gray-100 bg-gray-700"
            href="#"
          >
            <LayoutDashboard className="w-5 h-5" />
            <span className="mx-3">Dashboard</span>
          </a>
          <a
            className="flex items-center px-6 py-2 mt-4 text-gray-500 hover:bg-gray-700 hover:text-gray-100"
            href="#"
          >
            <ShoppingCart className="w-5 h-5" />
            <span className="mx-3">Promotions</span>
          </a>
          <a
            className="flex items-center px-6 py-2 mt-4 text-gray-500 hover:bg-gray-700 hover:text-gray-100"
            href="#"
          >
            <Users className="w-5 h-5" />
            <span className="mx-3">Customers</span>
          </a>
          <a
            className="flex items-center px-6 py-2 mt-4 text-gray-500 hover:bg-gray-700 hover:text-gray-100"
            href="#"
          >
            <Package className="w-5 h-5" />
            <span className="mx-3">Inventory</span>
          </a>
        </nav>
      </aside>

      {/* Main content */}
      <div className="flex flex-col flex-1 overflow-hidden">
        {/* Top navbar */}
        <header className="flex items-center justify-between px-6 py-4 bg-white border-b">
          <div className="flex items-center">
            <Button variant="outline" size="icon" className="mr-4 md:hidden">
              <ChevronDown className="h-4 w-4" />
            </Button>
            <h2 className="text-xl font-semibold">Dashboard</h2>
          </div>
          <div className="flex items-center">
            <Input type="search" placeholder="Search..." className="mr-4" />
            <Button variant="outline" size="icon">
              <Bell className="h-4 w-4" />
            </Button>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="ml-4">
                  <span>John Doe</span>
                  <ChevronDown className="ml-2 h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuLabel>My Account</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem>Profile</DropdownMenuItem>
                <DropdownMenuItem>Settings</DropdownMenuItem>
                <DropdownMenuItem>Logout</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </header>

        {/* Dashboard content */}
        <main className="flex-1 overflow-x-hidden overflow-y-auto bg-gray-100">
          <div className="container mx-auto px-6 py-8">
            <h3 className="text-gray-700 text-3xl font-medium">Welcome back, John</h3>

            <div className="mt-4">
              <div className="flex flex-wrap -mx-6">
                <div className="w-full px-6 sm:w-1/2 xl:w-1/3">
                  <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                      <CardTitle className="text-sm font-medium">Total Active Promotions</CardTitle>
                      <ShoppingCart className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                      <div className="text-2xl font-bold">15</div>
                      <p className="text-xs text-muted-foreground">+2 from last month</p>
                    </CardContent>
                  </Card>
                </div>
                <div className="w-full px-6 sm:w-1/2 xl:w-1/3 mt-4 sm:mt-0">
                  <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                      <CardTitle className="text-sm font-medium">Revenue from Promotions</CardTitle>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        className="h-4 w-4 text-muted-foreground"
                      >
                        <path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
                      </svg>
                    </CardHeader>
                    <CardContent>
                      <div className="text-2xl font-bold">$45,231.89</div>
                      <p className="text-xs text-muted-foreground">+20.1% from last month</p>
                    </CardContent>
                  </Card>
                </div>
                <div className="w-full px-6 sm:w-1/2 xl:w-1/3 mt-4 xl:mt-0">
                  <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                      <CardTitle className="text-sm font-medium">New Sign-ups</CardTitle>
                      <Users className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                      <div className="text-2xl font-bold">+2,234</div>
                      <p className="text-xs text-muted-foreground">+180.1% from last month</p>
                    </CardContent>
                  </Card>
                </div>
              </div>
            </div>

            <div className="mt-8">
              <Tabs value={activeTab} onValueChange={setActiveTab}>
                <TabsList>
                  <TabsTrigger value="overview">Overview</TabsTrigger>
                  <TabsTrigger value="sales">Sales</TabsTrigger>
                  <TabsTrigger value="customers">Customers</TabsTrigger>
                  <TabsTrigger value="inventory">Inventory</TabsTrigger>
                </TabsList>
                <TabsContent value="overview">
                  <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                    <Card>
                      <CardHeader>
                        <CardTitle>Sales Trends</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <ChartContainer config={{
                          discounted: {
                            label: "Discounted",
                            color: "hsl(var(--chart-1))",
                          },
                          fullPrice: {
                            label: "Full Price",
                            color: "hsl(var(--chart-2))",
                          },
                        }} className="h-[200px]">
                          <ResponsiveContainer width="100%" height="100%">
                            <LineChart data={salesTrendsData}>
                              <CartesianGrid strokeDasharray="3 3" />
                              <XAxis dataKey="name" />
                              <YAxis />
                              <ChartTooltip content={<ChartTooltipContent />} />
                              <Legend />
                              <Line type="monotone" dataKey="discounted" stroke="var(--color-discounted)" />
                              <Line type="monotone" dataKey="fullPrice" stroke="var(--color-fullPrice)" />
                            </LineChart>
                          </ResponsiveContainer>
                        </ChartContainer>
                      </CardContent>
                    </Card>
                    <Card>
                      <CardHeader>
                        <CardTitle>Customer Engagement</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <ChartContainer config={{
                          value: {
                            label: "Value",
                            color: "hsl(var(--chart-1))",
                          },
                        }} className="h-[200px]">
                          <ResponsiveContainer width="100%" height="100%">
                            <PieChart>
                              <Pie
                                data={customerEngagementData}
                                cx="50%"
                                cy="50%"
                                labelLine={false}
                                outerRadius={80}
                                fill="#8884d8"
                                dataKey="value"
                              >
                                {customerEngagementData.map((entry, index) => (
                                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                                ))}
                              </Pie>
                              <ChartTooltip content={<ChartTooltipContent />} />
                            </PieChart>
                          </ResponsiveContainer>
                        </ChartContainer>
                      </CardContent>
                    </Card>
                    <Card>
                      <CardHeader>
                        <CardTitle>Promotion Performance</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <ChartContainer config={{
                          performance: {
                            label: "Performance",
                            color: "hsl(var(--chart-1))",
                          },
                        }} className="h-[200px]">
                          <ResponsiveContainer width="100%" height="100%">
                            <BarChart data={promotionPerformanceData}>
                              <CartesianGrid strokeDasharray="3 3" />
                              <XAxis dataKey="name" />
                              <YAxis />
                              <ChartTooltip content={<ChartTooltipContent />} />
                              <Bar dataKey="performance" fill="var(--color-performance)" />
                            </BarChart>
                          </ResponsiveContainer>
                        </ChartContainer>
                      </CardContent>
                    </Card>
                    <Card>
                      <CardHeader>
                        <CardTitle>Customer Retention</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <ChartContainer config={{
                          value: {
                            label: "Value",
                            color: "hsl(var(--chart-1))",
                          },
                        }} className="h-[200px]">
                          <ResponsiveContainer width="100%" height="100%">
                            <PieChart>
                              <Pie
                                data={customerRetentionData}
                                cx="50%"
                                cy="50%"
                                labelLine={false}
                                outerRadius={80}
                                fill="#8884d8"
                                dataKey="value"
                              >
                                {customerRetentionData.map((entry, index) => (
                                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                                ))}
                              </Pie>
                              <ChartTooltip content={<ChartTooltipContent />} />
                            </PieChart>
                          </ResponsiveContainer>
                        </ChartContainer>
                      </CardContent>
                    </Card>
                  </div>
                </TabsContent>
                <TabsContent value="sales">
                  <Card>
                    <CardHeader>
                      <CardTitle>Sales Overview</CardTitle>
                      <CardDescription>
                        Detailed breakdown of sales performance and trends
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <p>Sales content goes here...</p>
                
                    </CardContent>
                  </Card>
                </TabsContent>
                <TabsContent value="customers">
                  <Card>
                    <CardHeader>
                      <CardTitle>Customer Insights</CardTitle>
                      <CardDescription>
                        Analysis of customer behavior and loyalty program performance
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <p>Customer insights content goes here...</p>
                    </CardContent>
                  </Card>
                </TabsContent>
                <TabsContent value="inventory">
                  <Card>
                    <CardHeader>
                      <CardTitle>Inventory Impact</CardTitle>
                      <CardDescription>
                        How promotions affect stock levels
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <ChartContainer config={{
                        stock: {
                          label: "Stock",
                          color: "hsl(var(--chart-1))",
                        },
                        lowStock: {
                          label: "Low Stock",
                          color: "hsl(var(--chart-2))",
                        },
                      }} className="h-[300px]">
                        <ResponsiveContainer width="100%" height="100%">
                          <BarChart data={inventoryImpactData}>
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis dataKey="name" />
                            <YAxis />
                            <ChartTooltip content={<ChartTooltipContent />} />
                            <Legend />
                            <Bar dataKey="stock" fill="var(--color-stock)" />
                            <Bar dataKey="lowStock" fill="var(--color-lowStock)" />
                          </BarChart>
                        </ResponsiveContainer>
                      </ChartContainer>
                    </CardContent>
                  </Card>
                </TabsContent>
              </Tabs>
            </div>

            <div className="mt-8">
              <Card>
                <CardHeader>
                  <CardTitle>Recent Activity</CardTitle>
                  <CardDescription>
                    Latest updates on promotions and customer interactions
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <ScrollArea className="h-[200px]">
                    <div className="space-y-4">
                      <div className="flex items-center">
                        <span className="text-sm font-medium">New sign-up: John Doe</span>
                        <span className="ml-auto text-sm text-gray-500">2 minutes ago</span>
                      </div>
                      <div className="flex items-center">
                        <span className="text-sm font-medium">Promotion "Summer Sale" activated</span>
                        <span className="ml-auto text-sm text-gray-500">10 minutes ago</span>
                      </div>
                      <div className="flex items-center">
                        <span className="text-sm font-medium">Low stock alert: Product XYZ</span>
                        <span className="ml-auto text-sm text-gray-500">30 minutes ago</span>
                      </div>
                      <div className="flex items-center">
                        <span className="text-sm font-medium">Customer feedback received: 5 stars</span>
                        <span className="ml-auto text-sm text-gray-500">1 hour ago</span>
                      </div>
                      <div className="flex items-center">
                        <span className="text-sm font-medium">New referral: Jane Smith</span>
                        <span className="ml-auto text-sm text-gray-500">2 hours ago</span>
                      </div>
                    </div>
                  </ScrollArea>
                </CardContent>
              </Card>
            </div>
          </div>
        </main>
      </div>
    </div>
  )
}