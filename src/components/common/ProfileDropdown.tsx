"use client";
import React, { Suspense, useState } from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import UserAvatar from "./UserAvatar";
import { CustomUser } from "@/app/api/auth/[...nextauth]/options";
import LogoutModal from "../auth/LogoutModal";
import { useRouter } from "next/navigation";

export default function ProfileDropdown({ user }: { user: CustomUser | null }) {
  const [open, setOpen] = useState(false);
  const router = useRouter();
  return (
    <>
      {open && (
        <Suspense fallback={<p>Loading...</p>}>
          <LogoutModal open={open} setOpen={setOpen} />
        </Suspense>
      )}
      <DropdownMenu>
        <DropdownMenuTrigger>
          <UserAvatar image={user?.image ?? ""} name={user?.name!} />
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuLabel>My Account</DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuItem onClick={() => router.push("/transactions")}>
            Transactions
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => router.push("/coins-spend")}>
            Coins Spend
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => setOpen(true)}>
            Logout
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  );
}
