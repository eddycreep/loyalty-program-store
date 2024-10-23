'use client'

import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { PersonStanding, ArrowUpDown, Tag, Trophy } from "lucide-react"

export function CustomerEngagementCards() {
  return (
    <div className="grid gap-6 p-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 w-full">
      <Card className="flex flex-col justify-between w-full h-48 transition-all duration-300 ease-in-out hover:shadow-xl hover:scale-105 shadow-lg">
        <CardHeader className="flex-1">
          <CardTitle className="flex items-center justify-between text-lg font-medium">
            Loyalty Members
            <PersonStanding className="h-6 w-6 text-red-500" />
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-2xl font-bold">4,500</p>
          <p className="text-xs text-muted-foreground">Active Members</p>
          <p className="mt-2 text-sm font-medium">
            125 <span className="text-xs text-muted-foreground">New Members</span>
          </p>
        </CardContent>
        <CardFooter className="text-xs text-muted-foreground">Performance Overview - All Stores</CardFooter>
      </Card>
      <Card className="flex flex-col w-full h-48 transition-all duration-300 ease-in-out hover:shadow-xl hover:scale-105 shadow-lg">
        <CardHeader className="flex-1">
          <CardTitle className="flex items-center justify-between text-lg font-medium">
            Retention vs Churned
            <ArrowUpDown className="h-6 w-6 text-red-500" />
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-2xl font-bold">88%</p>
          <p className="text-xs text-muted-foreground">Retention</p>
          <p className="mt-2 text-sm font-medium">
            12% <span className="text-xs text-muted-foreground">Churned</span>
          </p>
        </CardContent>
        <CardFooter className="text-xs text-muted-foreground">Performance Overview - All Stores</CardFooter>
      </Card>
      <Card className="flex flex-col w-full h-48 transition-all duration-300 ease-in-out hover:shadow-xl hover:scale-105 shadow-lg">
        <CardHeader className="flex-1">
          <CardTitle className="flex items-center justify-between text-lg font-medium">
            Discounts vs Specials
            <Tag className="h-6 w-6 text-red-500" />
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-2xl font-bold">88%</p>
          <p className="text-xs text-muted-foreground">Discounts Redeemed</p>
          <p className="mt-2 text-sm font-medium">
            12% <span className="text-xs text-muted-foreground">Specials Redeemed</span>
          </p>
        </CardContent>
        <CardFooter className="text-xs text-muted-foreground">Performance Overview - All Stores</CardFooter>
      </Card>
      <Card className="flex flex-col w-full h-48 transition-all duration-300 ease-in-out hover:shadow-xl hover:scale-105 shadow-lg">
        <CardHeader className="flex-1">
          <CardTitle className="flex items-center justify-between text-lg font-medium">
            Loyalty Tiers
            <Trophy className="h-6 w-6 text-red-500" />
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium">Gold</span>
              <span className="text-sm text-muted-foreground">40%</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium">Diamond</span>
              <span className="text-sm text-muted-foreground">40%</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium">Platinum</span>
              <span className="text-sm text-muted-foreground">20%</span>
            </div>
          </div>
        </CardContent>
        <CardFooter className="text-xs text-muted-foreground">Performance Overview - All Stores</CardFooter>
      </Card>
    </div>
  )
}
