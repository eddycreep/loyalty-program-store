'use client'

import { useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"

"use client"

import axios from 'axios';
import * as React from "react";
import { LoyaltyReviews } from "./reviews/loyalty-reviews"


export const ReviewsModule = () => {


  return (
    <div className="h-screen mb-56">
      <LoyaltyReviews />
    </div>
  );
};