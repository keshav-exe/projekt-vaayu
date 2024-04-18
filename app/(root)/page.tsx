import DarkMode from "@/components/dark-mode";
import { UserButton } from "@clerk/nextjs";
import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <main className="wrapper flex flex-col">
      <div className="flex justify-between">
        <Link href="/" className="text-3xl">
          जय श्री राम
        </Link>
        <div className="flex gap-8 my-auto">
          <DarkMode />
          <UserButton afterSignOutUrl="/" />
        </div>
      </div>
    </main>
  );
}
