"use client";

import { cn } from "src/utilities/cn";
import React from "react";

import type { Post, TicketType } from "@/payload-types";

// import { Card, CardPostData } from '@/components/Card'
import { usePathname } from "next/navigation";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog";
import { Button } from "../ui/button";
import { LucideArrowRight } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs";
import { Card, CardDescription, CardHeader, CardTitle } from "../ui/card";
// import { useCart } from "@/providers/Cart";
// import CartItem from "@/app/(frontend)/cart/CartItem";
import AddToCartButton from "../AddToCartButton";
import { formatCurrency } from "@/utilities/formatters";

export type Props = {
  tickets?: TicketType[];
};

export const CollectionArchive: React.FC<Props> = (props) => {
  const { tickets } = props;

  return (
    <div className={cn("container")}>
      <div>
        <div className="flex justify-between items-center">
          {/* <div className="grid grid-cols-4 sm:grid-cols-8 lg:grid-cols-12 gap-y-4 gap-x-4 lg:gap-y-8 lg:gap-x-8 xl:gap-x-8"> */}
          <h2>Reserve your tickets here:</h2>

          <Dialog>
            <DialogTrigger asChild>
              <Button className="rounded-none bg-[#FE3D02] hover:scale-110">
                Buy Tickets!
                <br />
                <LucideArrowRight />
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Select Seating Option</DialogTitle>
                {/* <DialogDescription>
                  {posts?.map((result, index) => {
                    if (typeof result === 'object' && result !== null) {
                      return (
                        <div className="col-span-4" key={index}>
                          <Card
                            className="h-full"
                            doc={result}
                            relationTo={pathname}
                            showCategories
                          />
                        </div>
                      )
                    }

                    return null
                  })}
                </DialogDescription> */}
              </DialogHeader>
              <div className="flex justify-center">
                <Tabs defaultValue={""} className="w-[300px]">
                  <TabsList className="grid w-full grid-cols-2 bg-[#FFF0F0]">
                    {tickets?.map((item, index) => (
                      <TabsTrigger
                        key={index}
                        value={item.title as string}
                        className="px-4"
                      >
                        {/* {item.tier} {item.price && `- ${formatCurrency(item.price / 100 || 0)}`} */}
                      </TabsTrigger>
                    ))}
                    {/* <TabsTrigger value="account">GA - $40</TabsTrigger>
              <TabsTrigger value="password">VIP - $100</TabsTrigger> */}
                  </TabsList>
                  {tickets?.map((item, index) => (
                    <TabsContent key={index} value={item.title as string}>
                      <Card className="border-none  shadow-none">
                        <CardHeader>
                          {item.title && <CardTitle>Includes:</CardTitle>}
                          <CardDescription>{item.title}</CardDescription>
                          {/* <AddToCartButton product={item} /> */}
                        </CardHeader>
                        {/* <CardContent className="space-y-2"> */}
                        {/* <div className="space-y-1 flex gap-4 items-center">
                      <Label htmlFor="name">Qty</Label>
                      <Select>
                        <SelectTrigger className="w-[180px]">
                          <SelectValue placeholder="1" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="1">1</SelectItem>
                          <SelectItem value="2">2</SelectItem>
                          <SelectItem value="3">3</SelectItem>
                          <SelectItem value="4">4</SelectItem>
                          <SelectItem value="5">5</SelectItem>
                          <SelectItem value="6">6</SelectItem>
                          <SelectItem value="7">7</SelectItem>
                          <SelectItem value="8">8</SelectItem>
                          <SelectItem value="9">9</SelectItem>
                        </SelectContent>
                      </Select>
                    </div> */}
                        {/* </CardContent> */}
                        {/* <CardFooter>
                          <Button>Save changes</Button>
                        </CardFooter> */}
                      </Card>
                      <DialogFooter className="flex justify-center items-center">
                        {/* <Button onClick={addToCart}>Select</Button> */}
                        {/* <CartItem
                          product={ticket}
                          title={ticket.title}
                          // metaImage={metaImage}
                          qty={1}
                          addItemToCart={addItemToCart}
                          // Added by me
                          key={index}
                        /> */}
                      </DialogFooter>
                    </TabsContent>
                  ))}
                </Tabs>
              </div>
            </DialogContent>
          </Dialog>
          {/* </div> */}
        </div>
      </div>
    </div>
  );
};
