"use client";

import { Button } from "@/components/ui/button";
import Link from "next/link";
import React from "react";

const Error = () => {
  return (
    <div className="h-full flex gap-5 flex-col items-center justify-center">
      <h1 className="text-3xl font-medium">Oops, we ran into an error!</h1>
      <Button asChild>
        <Link href="/kosh">Go Back</Link>
      </Button>
    </div>
  );
};

export default Error;
