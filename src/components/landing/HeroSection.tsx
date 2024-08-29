import React from "react";
import { Button } from "../ui/button";

export default function HeroSection() {
  return (
    <header className="bg-indigo-500 text-white py-24 text-center">
      <h1 className="text-4xl font-bold">Summarize Any Podcast Instantly</h1>
      <p className="mt-4 text-xl">
        Use AI to get concise summaries and top questions from your favorite
        podcasts.
      </p>
      <div className="mt-8">
        <Button className="mt-4 w-40">Try it Now</Button>
      </div>
    </header>
  );
}
