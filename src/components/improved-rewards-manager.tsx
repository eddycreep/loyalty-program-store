'use client'

import { useState } from 'react'
import { Plus, Edit, Trash2, Share2, Calendar, Gift, Users, Star, Zap, Trophy, ShoppingBag, Heart, Target, Smile } from 'lucide-react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

// Define the Reward type
type Reward = {
  id: number
  task: string
  reward: string
  type: 'percentage' | 'fixed'
  icon: JSX.Element
}

// Define the initial rewards
const initialRewards: Reward[] = [
  { id: 1, task: 'Share product on social media', reward: '10% off next purchase', type: 'percentage', icon: <Share2 className="h-6 w-6" /> },
  { id: 2, task: 'Attend in-store event', reward: '$5 store credit', type: 'fixed', icon: <Calendar className="h-6 w-6" /> },
  { id: 3, task: 'Refer a friend', reward: 'Free gift with next purchase', type: 'fixed', icon: <Gift className="h-6 w-6" /> },
  { id: 4, task: 'Join loyalty program', reward: '15% off first purchase', type: 'percentage', icon: <Users className="h-6 w-6" /> },
  { id: 5, task: 'Write product review', reward: '5% off reviewed product', type: 'percentage', icon: <Star className="h-6 w-6" /> },
]

// Define the customer tiers
const customerTiers = [
  { name: 'Bronze', icon: <ShoppingBag className="h-6 w-6" />, spend: '$0 - $100', benefits: '5% off all purchases' },
  { name: 'Silver', icon: <Zap className="h-6 w-6" />, spend: '$101 - $500', benefits: '10% off all purchases, free shipping' },
  { name: 'Gold', icon: <Trophy className="h-6 w-6" />, spend: '$501+', benefits: '15% off all purchases, free shipping, exclusive deals' },
]

export function ImprovedRewardsManagerComponent() {
  const [rewards, setRewards] = useState<Reward[]>(initialRewards)
  const [newReward, setNewReward] = useState<Omit<Reward, 'id' | 'icon'>>({ task: '', reward: '', type: 'percentage' })

  const handleAddReward = () => {
    if (newReward.task && newReward.reward) {
      setRewards([...rewards, { ...newReward, id: rewards.length + 1, icon: <Heart className="h-6 w-6" /> }])
      setNewReward({ task: '', reward: '', type: 'percentage' })
    }
  }

  const handleDeleteReward = (id: number) => {
    setRewards(rewards.filter(reward => reward.id !== id))
  }

  return (
    <div className="container mx-auto p-4 font-sans bg-gray-50 min-h-screen">
      <h1 className="text-4xl font-bold mb-8 text-gray-800">Store Manager Rewards Dashboard</h1>
      
      <Tabs defaultValue="active-rewards" className="space-y-6">
        <TabsList className="bg-white p-1 rounded-lg shadow-sm">
          <TabsTrigger value="active-rewards" className="px-4 py-2 text-sm font-medium transition-colors">Active Rewards</TabsTrigger>
          <TabsTrigger value="add-reward" className="px-4 py-2 text-sm font-medium transition-colors">Add/Edit Rewards</TabsTrigger>
          <TabsTrigger value="customer-tiers" className="px-4 py-2 text-sm font-medium transition-colors">Customer Tiers</TabsTrigger>
        </TabsList>

        <TabsContent value="active-rewards">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {rewards.map(reward => (
              <Card key={reward.id} className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 overflow-hidden">
                <CardHeader className="bg-gray-100 p-4">
                  <CardTitle className="flex items-center gap-3 text-lg font-semibold text-gray-800">
                    <div className="p-2 bg-primary rounded-full text-white">
                      {reward.icon}
                    </div>
                    {reward.task}
                  </CardTitle>
                </CardHeader>
                <CardContent className="p-4">
                  <p className="text-gray-600 mb-2">{reward.reward}</p>
                  <Badge variant="secondary" className="mt-2 font-medium">
                    {reward.type === 'percentage' ? 'Percentage' : 'Fixed Amount'}
                  </Badge>
                </CardContent>
                <CardFooter className="flex justify-end space-x-2 p-4 bg-gray-50">
                  <Button size="sm" variant="outline" className="hover:bg-gray-200 transition-colors">
                    <Edit className="h-4 w-4 mr-1" />
                    Edit
                  </Button>
                  <Button size="sm" variant="destructive" onClick={() => handleDeleteReward(reward.id)} className="hover:bg-red-600 transition-colors">
                    <Trash2 className="h-4 w-4 mr-1" />
                    Delete
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="add-reward">
          <Card className="bg-white rounded-lg shadow-md overflow-hidden">
            <CardHeader className="bg-gray-100 p-6">
              <CardTitle className="text-2xl font-semibold text-gray-800">Add New Reward</CardTitle>
              <CardDescription className="text-gray-600">Create a new customer reward</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6 p-6">
              <div className="space-y-2">
                <Label htmlFor="task" className="text-sm font-medium text-gray-700">Task</Label>
                <Input
                  id="task"
                  placeholder="e.g., Share on social media"
                  value={newReward.task}
                  onChange={(e) => setNewReward({ ...newReward, task: e.target.value })}
                  className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-primary focus:border-transparent"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="reward" className="text-sm font-medium text-gray-700">Reward</Label>
                <Input
                  id="reward"
                  placeholder="e.g., 10% off next purchase"
                  value={newReward.reward}
                  onChange={(e) => setNewReward({ ...newReward, reward: e.target.value })}
                  className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-primary focus:border-transparent"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="type" className="text-sm font-medium text-gray-700">Reward Type</Label>
                <Select
                  value={newReward.type}
                  onValueChange={(value) => setNewReward({ ...newReward, type: value as 'percentage' | 'fixed' })}
                >
                  <SelectTrigger className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-primary focus:border-transparent">
                    <SelectValue placeholder="Select reward type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="percentage">Percentage</SelectItem>
                    <SelectItem value="fixed">Fixed Amount</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </CardContent>
            <CardFooter className="bg-gray-50 p-6">
              <Button onClick={handleAddReward} className="w-full bg-primary text-white hover:bg-primary-dark transition-colors">
                <Plus className="h-5 w-5 mr-2" />
                Add Reward
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>

        <TabsContent value="customer-tiers">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {customerTiers.map((tier, index) => (
              <Card key={index} className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300">
                <CardHeader className="bg-gray-100 p-6">
                  <CardTitle className="flex items-center gap-3 text-xl font-semibold text-gray-800">
                    <div className="p-2 bg-primary rounded-full text-white">
                      {tier.icon}
                    </div>
                    {tier.name} Tier
                  </CardTitle>
                </CardHeader>
                <CardContent className="p-6">
                  <p className="text-gray-600 mb-2"><strong>Monthly Spend:</strong> {tier.spend}</p>
                  <p className="text-gray-600"><strong>Benefits:</strong> {tier.benefits}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}