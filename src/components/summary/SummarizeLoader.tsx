"use client";
import React, { useEffect, useState } from "react";

export default function SummarizeLoader() {
  const [counter, setCounter] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCounter((prevCount) => prevCount + 1);
    }, 1000);

    return () => {
      clearInterval(interval);
    };
  }, []);
  return (
    <div className="flex flex-col items-center">
      <div className="animate-spin w-10 h-10 border-t-4 border-b-4  border-orange-400 rounded-full"></div>
      <div className="text-2xl">
        {counter <= 3 && (
          <p className="text-2xl font-bold bg-gradient-to-r from-blue-400 to-indigo-500 bg-clip-text text-transparent">
            Unraveling the Audio
          </p>
        )}
        {counter > 3 && counter <= 8 && (
          <p className="text-2xl font-bold bg-gradient-to-r from-yellow-400 to-orange-500 bg-clip-text text-transparent">
            Crafting a Concise Summary
          </p>
        )}
        {counter > 8 && (
          <p className="text-2xl font-bold bg-gradient-to-r from-pink-400 to-purple-500 bg-clip-text text-transparent">
            Final Touches for a Stellar Result
          </p>
        )}
      </div>
    </div>
  );
}
