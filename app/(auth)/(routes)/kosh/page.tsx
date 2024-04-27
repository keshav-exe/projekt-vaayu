"use client";
import React from "react";
import { useUser } from "@clerk/clerk-react";
import { useMutation } from "convex/react";
import { toast } from "sonner";
import { api } from "@/convex/_generated/api";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";

export const dynamic = "force-dynamic";

const Page = () => {
  const { user } = useUser();
  const create = useMutation(api.documents.create);
  const router = useRouter();

  const onCreate = () => {
    const promise = create({ title: "Untitled" }).then((documentId) =>
      router.push(`/kosh/${documentId}`)
    );

    toast.promise(promise, {
      loading: "Creating a new lekh",
      success: "New lekh successfully created!",
      error: "Failed to create new lekh",
    });
  };

  return (
    <div className="bg-background/50 size-full">
      <motion.div
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{
          duration: 1,
          ease: [0.22, 0.5, 0.36, 1],
        }}
        className="wrapper h-full flex flex-col flex-center gap-5"
      >
        <h2 className="text-5xl font-bold text-center">
          Welcome to {user?.firstName}&apos;s VaayuKosh
        </h2>
        <div>
          <Button
            onClick={onCreate}
            variant="outline"
            className="flex gap-2 h-16 rounded-full"
          >
            <p className="text-xl">Create New Lekh</p>
          </Button>
        </div>
      </motion.div>
    </div>
  );
};

export default Page;
