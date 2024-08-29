import React from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import LoginModal from "../auth/LoginModal";
import { CustomUser } from "@/app/api/auth/[...nextauth]/options";
import Link from "next/link";

export default function Navbar({ user }: { user?: CustomUser }) {
  return (
    <nav className="bg-white shadow-sm">
      <div className="container mx-auto flex justify-between items-center p-6">
        <div className="flex items-center space-x-2">
          <Image src="/images/icon_192.png" width={40} height={40} alt="lgo" />
          <h1 className="text-3xl font-extrabold ">PodBite</h1>
        </div>

        <div className="space-x-4">
          <Button variant="ghost">Pricing</Button>
          {user ? (
            <Link href="/dashboard">
              <Button>Dashboard</Button>
            </Link>
          ) : (
            <LoginModal />
          )}
        </div>
      </div>
    </nav>
  );
}
