"use client";

import { Button } from "@/components/ui/button";
import Link from "next/link";
import React from "react";

const Error = () => {
  return (
    <div className="h-full flex gap-5 flex-col items-center justify-center">
      <h1 className="text-3xl font-medium">
        Looks like we ran into a problem!
      </h1>
      <h3 className="text-xl font-medium">We regret for your inconvenience.</h3>
      <Button asChild>
        <Link href="/">Go Back</Link>
      </Button>
    </div>
  );
};

export default Error;
