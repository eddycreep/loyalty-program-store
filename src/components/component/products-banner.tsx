"use client"

import axios from "axios"
import * as React from "react"
import { useState, useEffect } from "react"
import { Card, CardContent } from "@/components/ui/card"
import {Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious, type CarouselApi } from "@/components/ui/carousel"
import Image from "next/image"
import { apiEndPoint } from "@/utils/colors"

interface ActiveSpecialProps {
  uid: number,
  SpecialGroupID: number,
  Product: string,
  Special: string,
  SpecialPrice: number,
  SpecialType: string,
  StartDate: string,
  ExpiryDate: string,
  IsActive: number,
}

type ActiveSpecialResponse = ActiveSpecialProps[]


export function CarouselDApiDemo() {
  const [api, setApi] = React.useState<CarouselApi>()
  const [current, setCurrent] = React.useState(0)
  const [count, setCount] = React.useState(0)
  const [specials, setSpecial] = useState<ActiveSpecialResponse>([])

  const products = [
    {
      title: "KINGSLEY 2LTR ASST Special",
      description: "Buy 1, Get 1 Free on all Kingsley 2L drinks",
      imageSrc: "/covers/kingsley.jpeg",
      endDate: "October 31, 2024",
    },
    {
      title: "SWITCH 440ML Discount",
      description: "20% off on all SWITCH 440ML beverages",
      imageSrc: "/covers/switch.jpeg",
      endDate: "November 15, 2024",
    },
    {
      title: "Beef Chuck Special",
      description: "10% off on all cuts of Beef Chuck",
      imageSrc: "/covers/chucktwo.jpeg",
      endDate: "October 20, 2024",
    },
    {
      title: "Artisan Bread Discount",
      description: "25% off on all Artisan Breads",
      imageSrc: "/covers/artisanBread.jpeg",
      endDate: "October 25, 2024",
    },
    {
      title: "DANONE 1KG D/CREAM",
      description: "Buy 1 get 5% Off",
      imageSrc: "/covers/danone.jpeg",
      endDate: "October 25, 2024",
    },
  ]

  React.useEffect(() => {
    if (!api) {
      return
    }

    setCount(api.scrollSnapList().length)
    setCurrent(api.selectedScrollSnap() + 1)

    api.on("select", () => {
      setCurrent(api.selectedScrollSnap() + 1)
    })
  }, [api])

  const getActiveSpecials = async () => {
    try {
      const url = `products/getproductgpspecials`
      const response = await axios.get<ActiveSpecialResponse>(`${apiEndPoint}/${url}`)
      setSpecial(response?.data)
      console.log("RETRIEVED ALL ACTIVE PRODUCT SPECIALS:", response)
    } catch (error) {
      console.error("AN ERROR WAS ENCOUNTERED WHEN FETCHING ACTIVE SPECIALS:", error)
    }
  }

  useEffect(() => {
    getActiveSpecials();
  }, [])

  return (
    <div className="flex flex-col items-center mx-auto">
      <Carousel setApi={setApi} className="w-[1000px]">
        <CarouselContent>
        {products.map((product, index) => (
            <CarouselItem key={index}>
              <Card className="overflow-hidden">
                <Image
                  src={product.imageSrc}
                  width={400}
                  height={200}
                  alt={product.title}
                  className="w-full h-[300px]"
                />
                <CardContent className="p-4">
                  <h3 className="font-semibold text-lg mb-2">{product.title}</h3>
                  <p className="text-sm text-muted-foreground mb-2">
                    {product.description}
                  </p>
                  <p className="text-sm font-medium">Ends: {product.endDate}</p>
                </CardContent>
              </Card>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious />
        <CarouselNext />
      </Carousel>
      <div className="py-2 text-center text-sm text-muted-foreground">
        Special {current} of {count}
      </div>
    </div>
  )
}