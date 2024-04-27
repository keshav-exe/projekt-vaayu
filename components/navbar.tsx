"use client";
import React from "react";
import { useConvexAuth } from "convex/react";
import {
  SignInButton,
  SignOutButton,
  SignUpButton,
  useUser,
} from "@clerk/clerk-react";
import { ArrowRight, LogOut, MoreVertical, User, User2 } from "lucide-react";
import Link from "next/link";
import ThemeSwitch from "@/components/ThemeToggle";
import Spinner from "@/components/spinner";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { Label } from "@/components/ui/label";
import ThemeToggle from "@/components/ThemeToggle";
import { Button } from "@/components/ui/button";
import { DotsHorizontalIcon } from "@radix-ui/react-icons";
import { DropdownMenuItem } from "@radix-ui/react-dropdown-menu";

const Navbar = () => {
  const { isAuthenticated, isLoading } = useConvexAuth();
  const { user } = useUser();

  return (
    <div className="sticky top-0 w-full z-[99999] border-b border-primary/10 backdrop-blur">
      <div className="flex wrapper justify-between gap-4 ">
        <Link href="/" className="items-center font-bold text-primary text-2xl">
          <svg
            className="size-10 rounded-md hover:-translate-y-1 transition-all duration-300"
            viewBox="0 0 512 512"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <rect width="512" height="512" fill="url(#paint0_linear_132_3)" />
            <path
              d="M382.36 123V170.16H347.08V389.4H292V341.16C285.76 349.56 277.84 356.04 268.24 360.6C258.88 364.92 248.08 367.08 235.84 367.08C219.28 367.08 204.88 363.36 192.64 355.92C180.64 348.48 171.4 338.16 164.92 324.96C158.44 311.76 155.2 296.88 155.2 280.32C155.2 264.24 158.44 249.96 164.92 237.48C171.4 224.76 180.76 214.8 193 207.6C205.24 200.4 219.52 196.8 235.84 196.8C247.84 196.8 258.64 198.96 268.24 203.28C277.84 207.6 285.76 213.84 292 222V170.16H130V123H382.36ZM251.32 322.08C264.04 322.08 274 318.12 281.2 310.2C288.4 302.28 292 292.92 292 282.12V281.76C292 270.72 288.4 261.36 281.2 253.68C274 246 264.04 242.16 251.32 242.16C239.32 242.16 229.48 245.88 221.8 253.32C214.36 260.52 210.64 270 210.64 281.76C210.64 293.76 214.36 303.48 221.8 310.92C229.48 318.36 239.32 322.08 251.32 322.08Z"
              fill="url(#paint1_linear_132_3)"
            />
            <defs>
              <linearGradient
                id="paint0_linear_132_3"
                x1="256"
                y1="0"
                x2="256"
                y2="512"
                gradientUnits="userSpaceOnUse"
              >
                <stop offset="0.455" stop-color="#060C0F" />
                <stop offset="1.0001" stop-color="#0D2026" />
              </linearGradient>
              <linearGradient
                id="paint1_linear_132_3"
                x1="256.62"
                y1="-6.6001"
                x2="256.62"
                y2="533.4"
                gradientUnits="userSpaceOnUse"
              >
                <stop stop-color="#00BFFF" />
                <stop offset="0.7" stop-color="#ECF5F9" />
              </linearGradient>
            </defs>
          </svg>
        </Link>

        <div className="gap-5">
          {isLoading && (
            <div className="flex items-center justify-center inset-y-0 size-full bg-background/80 z-50">
              <Spinner />
            </div>
          )}
          {!isAuthenticated && !isLoading && (
            <div className="flex gap-5">
              <Button variant={"outline"} className="h-10">
                <SignInButton mode="modal">Sign in</SignInButton>
              </Button>
              <Button variant={"default"} className="h-10">
                <SignUpButton mode="modal">Join for Free</SignUpButton>
              </Button>
              <ThemeSwitch />
            </div>
          )}
          {isAuthenticated && (
            <div className="items-center flex gap-3">
              <DropdownMenu>
                <DropdownMenuTrigger>
                  <Avatar className="size-8 my-auto">
                    <AvatarImage
                      src={user?.imageUrl}
                      className=" rounded-full"
                    />
                  </Avatar>
                </DropdownMenuTrigger>
                <DropdownMenuContent
                  className="w-[16vw] mx-2 p-4 flex flex-col gap-4"
                  align="end"
                >
                  <div className="flex items-center w-full justify-between ">
                    <div className="flex flex-col gap-1">
                      <Label>Appearance</Label>
                      <span className="text-xs ">Change Theme</span>
                    </div>
                    <ThemeToggle />
                  </div>
                  <hr />
                  <SignOutButton>
                    <Button variant={"destructive"} className="flex gap-2">
                      Sign out
                      <LogOut className="cursor-pointer size-5" />
                    </Button>
                  </SignOutButton>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Navbar;
