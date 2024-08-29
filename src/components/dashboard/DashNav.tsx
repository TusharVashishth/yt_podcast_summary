"use client";
import React from "react";
import ProfileDropdown from "../common/ProfileDropdown";
import { CustomUser } from "@/app/api/auth/[...nextauth]/options";
import Image from "next/image";

export default function DashNav({ user }: { user: CustomUser }) {
  return (
    <nav className="w-full flex justify-between items-center h-12 p-2">
      <div className="flex items-center space-x-2">
        <Image src="/images/icon_192.png" width={40} height={40} alt="lgo" />
        <h1 className="text-2xl font-extrabold ">PodBite</h1>
      </div>
      <div className="flex items-center space-x-4">
        {/* <div className="flex space-x-2 items-center">
          <span className="text-xl font-bold">{coins}</span>
          <Image src="/images/coin.png" width={30} height={30} alt="coin" />
        </div> */}
        <ProfileDropdown user={user} />
      </div>
    </nav>
  );
}
