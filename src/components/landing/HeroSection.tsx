import React from "react";
import { Button } from "../ui/button";

export default function HeroSection() {
  return (
    <header className="  py-24 text-center">
      <h1 className="text-4xl font-extrabold bg-gradient-to-r from-pink-400 to-purple-500 bg-clip-text text-transparent">
        Summarize Any Podcast Instantly
      </h1>
      <p className="text-xl">
        Use AI to get concise summaries and top questions from your favorite
        podcasts.
      </p>
      <div className="mt-2">
        <Button className="mt-4 w-40">Try it Now</Button>
      </div>
    </header>
  );
}
