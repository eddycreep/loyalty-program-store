"use client"

import axios from 'axios';
import * as React from "react";
import { LoyaltyReviews } from "./reviews/loyalty-reviews"


export const ReviewsModule = () => {


  return (
    <div className="h-screen mb-20">
      <LoyaltyReviews />
    </div>
  );
};