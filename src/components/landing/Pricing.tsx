import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { Button } from "../ui/button";
export default function Pricing() {
  return (
    <section className="py-24">
      <div className="container mx-auto">
        <h2 className="text-3xl font-bold text-center ">
          Simple, Transparent Pricing
        </h2>
        <p className="text-2xl text-indigo-500 font-bold text-center mb-12">
          1 coin = 1 ₹
        </p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card className={cn("shadow-lg", { "border-indigo-500": false })}>
            <CardHeader>
              <CardTitle>Starter</CardTitle>
              <p className="text-sm text-muted-foreground">
                Perfect for individuals.
              </p>
            </CardHeader>
            <CardContent>
              <p className="text-2xl font-bold">100 Coins</p>
              <ul className="mt-4 space-y-2">
                <li>10 Podcast Summary</li>
                <li>Top Questions Highlight</li>
                <li>AI-Powered Insights</li>
              </ul>
              <Button className="mt-4 w-full">Buy Coins</Button>
            </CardContent>
          </Card>

          <Card className={cn("shadow-lg", { "border-indigo-500": true })}>
            <CardHeader>
              <CardTitle>Pro</CardTitle>
              <p className="text-sm text-muted-foreground">
                Best for professionals.
              </p>
            </CardHeader>
            <CardContent>
              <p className="text-2xl font-bold">500 Coins</p>
              <ul className="mt-4 space-y-2">
                <li>51 Podcast Summaries</li>
                <li>Top Questions Highlight</li>
                <li>AI-Powered Insights</li>
                <li>Priority Support</li>
                <li>Get One Podcast Summary Free 🚀</li>
              </ul>
              <Button className="mt-4 w-full">Buy Coins</Button>
            </CardContent>
          </Card>

          <Card className={cn("shadow-lg", { "border-indigo-500": false })}>
            <CardHeader>
              <CardTitle>Pro Plus</CardTitle>
              <p className="text-sm text-muted-foreground">Ideal for teams.</p>
            </CardHeader>
            <CardContent>
              <p className="text-2xl font-bold">1000 Coins</p>
              <ul className="mt-4 space-y-2">
                <li>102 Podcast Summaries</li>
                <li>Top Questions Highlight</li>
                <li>AI-Powered Insights</li>
                <li>Dedicated Support</li>
                <li>Get two Podcast Summary Free 🚀</li>
              </ul>
              <Button className="mt-4 w-full">Buy Coins</Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
}
