"use client";
import { cn } from "@/lib/utils";
import { useParams, usePathname, useRouter } from "next/navigation";
import React, { ElementRef, useEffect, useRef, useState } from "react";
import { useMediaQuery } from "usehooks-ts";
import { useMutation } from "convex/react";
import { api } from "@/convex/_generated/api";
import Item from "./item";
import { toast } from "sonner";
import {
  Globe,
  LogOut,
  MenuIcon,
  PlusSquare,
  Search,
  Trash2,
  X,
} from "lucide-react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import TrashBox from "./trashbox";
import { useSearch } from "@/hooks/use-search";
import Navbar from "./navbar";
import { Button } from "@/components/ui/button";
import { SignOutButton, useUser } from "@clerk/clerk-react";
import { Avatar, AvatarImage } from "@radix-ui/react-avatar";
import { Label } from "@/components/ui/label";
import ThemeToggle from "@/components/ThemeToggle";
import Link from "next/link";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import DocumentList from "./document-list";

const Navigation = () => {
  const pathname = usePathname();
  const params = useParams();
  const isMobile = useMediaQuery("(max-width:768px)");
  const create = useMutation(api.documents.create);
  const { user } = useUser();
  const search = useSearch();
  const router = useRouter();
  const isResizingRef = useRef(false);
  const sidebarRef = useRef<ElementRef<"aside">>(null);
  const navbarRef = useRef<ElementRef<"div">>(null);
  const [isResetting, setIsResetting] = useState(false);
  const [isCollapsed, setIsCollapsed] = useState(isMobile);

  useEffect(() => {
    if (isMobile) {
      collapse();
    } else {
      resetWidth();
    }
  }, [isMobile]);

  useEffect(() => {
    if (isMobile) {
      collapse();
    }
  }, [pathname, isMobile]);

  const resetWidth = () => {
    if (sidebarRef.current && navbarRef.current) {
      setIsCollapsed(false);
      setIsResetting(true);

      sidebarRef.current.style.width = isMobile ? "100%" : "320px";

      navbarRef.current.style.setProperty(
        "width",
        isMobile ? "0" : "calc(100% - 320px)"
      );
      navbarRef.current.style.setProperty("left", isMobile ? "100%" : "320px");
      setTimeout(() => setIsResetting(false), 300);
    }
  };

  const collapse = () => {
    if (sidebarRef.current && navbarRef.current) {
      setIsCollapsed(true);
      setIsResetting(true);

      sidebarRef.current.style.width = "0";

      navbarRef.current.style.setProperty("width", "100%");
      navbarRef.current.style.setProperty("left", "0");
      setTimeout(() => setIsResetting(false), 300);
    }
  };

  const handleCreate = () => {
    const promise = create({ title: "Untitled" }).then((documentId) =>
      router.push(`/kosh/${documentId}`)
    );

    toast.promise(promise, {
      loading: "Creating a new lekh...",
      success: "New lekh successfully created!",
      error: "Failed to create new lekh.",
    });
  };

  return (
    <>
      <aside
        ref={sidebarRef}
        className={cn(
          "h-full bg-background text-primary overflow-y-auto overflow-x-hidden relative flex w-80 flex-col z-[99999] shadow-xl dark:shadow-none",
          isResetting && "transition-all ease-in-out duration-300",
          isMobile && "w-0"
        )}
      >
        <div className="p-2 flex flex-col gap-2 size-full justify-evenly">
          {/* Header */}
          <div className="flex justify-between px-2 py-3 ">
            <div className="flex gap-3">
              <Link href={"/"} className="">
                <svg
                  className="size-10 rounded-md hover:-translate-y-1 transition-all duration-300"
                  viewBox="0 0 512 512"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <rect
                    width="512"
                    height="512"
                    fill="url(#paint0_linear_132_3)"
                  />
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

              <span className="font-bold line-clamp-1 my-auto text-lg">
                {user?.firstName}&apos;s VaayuKosh
              </span>
            </div>
            {isMobile && (
              <Button variant={"outline"} size={"icon"} onClick={collapse}>
                <X className="size-5" />
              </Button>
            )}
          </div>
          {/* Nav Elements */}
          <div className="grid grid-cols-2 m-1 gap-2 grid-2">
            <div className="py-2 px-3 w-full col-span-2 rounded-md bg-foreground/5 hover:bg-foreground/10 cursor-pointer transition-all duration-300 justify-between">
              <Item
                icon={Search}
                isSearch
                label="Search"
                onClick={search.onOpen}
              />
            </div>
            <div className="py-2 px-3 rounded-md bg-foreground/5 hover:bg-foreground/10 cursor-pointer w-full transition-all duration-300 flex-center">
              <Item onClick={handleCreate} label="New Lekh" icon={PlusSquare} />
            </div>
            <div className="py-2 px-3 w-full rounded-md bg-foreground/5 hover:bg-foreground/10 cursor-pointer transition-all duration-300 flex-center">
              <Popover>
                <PopoverTrigger>
                  <Item icon={Trash2} label="Sanchay" />
                </PopoverTrigger>
                <PopoverContent
                  className="w-72 p-2"
                  side={isMobile ? "bottom" : "right"}
                  sideOffset={16}
                >
                  <TrashBox />
                </PopoverContent>
              </Popover>
            </div>

            <div className="h-[64vh] py-3 overflow-y-auto w-full col-span-2 rounded-md bg-foreground/5 transition-all duration-300 ">
              <DocumentList />
            </div>
            <Link href="/mandal" className="col-span-2">
              <div className="flex py-4 px-3 w-full col-span-2 rounded-md bg-foreground/5 hover:bg-foreground/10 cursor-pointer transition-all duration-300 items-center gap-2">
                <Globe className="size-6" />
                <p className="line-clamp-1">VaayuMandal</p>
              </div>
            </Link>

            <Popover>
              <PopoverTrigger className="col-span-2">
                <div className="flex gap-2 my-auto items-center p-3 w-full rounded-md hover:bg-foreground/10 cursor-pointer transition-all duration-300">
                  <Avatar className="size-8 border-2 rounded-full border-primary/50">
                    <AvatarImage
                      src={user?.imageUrl}
                      className=" rounded-full"
                    />
                  </Avatar>
                  <p className="line-clamp-1">{user?.fullName}</p>
                </div>
              </PopoverTrigger>
              <PopoverContent
                className="w-[50vw] md:w-[16vw] mx-2 p-4 bg-foreground/5 flex flex-col gap-4"
                side="top"
                sideOffset={16}
              >
                <div className="flex items-center w-full justify-between ">
                  <div className="flex flex-col gap-1">
                    <Label>Appearance</Label>
                    <span className="text-xs ">Change your theme</span>
                  </div>
                  <ThemeToggle />
                </div>
                <hr />
                <SignOutButton>
                  <Button variant={"destructive"} className="flex gap-2">
                    <LogOut className="cursor-pointer size-5" />
                    Sign out
                  </Button>
                </SignOutButton>
              </PopoverContent>
            </Popover>
          </div>
          <div
            // onMouseDown={handleMouseDown}
            onClick={collapse}
            className="rounded-r-xl transition-all cursor-ew-resize absolute h-full w-2 shadow-md right-0 top-0"
          />
        </div>
      </aside>

      <div
        ref={navbarRef}
        className={cn(
          "absolute top-0 left-0 z-[99999] w-[calc(100% - 560px)] p-4",
          isResetting && "transition-all ease-in-out duration-300",
          isMobile && "left-0 w-full px-4"
        )}
      >
        {!!params.documentId ? (
          <Navbar
            isCollapsed={isCollapsed}
            onResetWidth={resetWidth}
            onCollapse={collapse}
          />
        ) : (
          <nav className="bg-transparent px-3 py-2 w-full">
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger>
                  <Button
                    onClick={isCollapsed ? resetWidth : collapse}
                    role="button"
                    variant={"outline"}
                    size={"icon"}
                  >
                    <MenuIcon />
                  </Button>
                </TooltipTrigger>
                <TooltipContent>Menu</TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </nav>
        )}
      </div>
    </>
  );
};

export default Navigation;
