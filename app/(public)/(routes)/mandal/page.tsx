"use client";

import { api } from "@/convex/_generated/api";
import { Doc, Id } from "@/convex/_generated/dataModel";
import { useConvexAuth, useQuery } from "convex/react";
import { useRouter } from "next/navigation";
import React, { Suspense } from "react";
import { ArrowRight, ArrowUpRight, File } from "lucide-react";
import { SignUpButton } from "@clerk/clerk-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import Spinner from "@/components/spinner";
import { SparklesCore } from "@/components/ui/sparkles";
import { animate, easeInOut, motion } from "framer-motion";

export const dynamic = "force-dynamic";

interface DocumentListProps {
  parentDocumentId?: Id<"documents">;
  level?: number;
  data?: Doc<"documents">;
}

const Page = ({ level = 0 }: DocumentListProps) => {
  const router = useRouter();
  const { isAuthenticated } = useConvexAuth();

  const onRedirect = (documentId: string) => {
    router.push(`/mandal/${documentId}`);
  };

  const documents = useQuery(api.documents.getPublishedDocuments);

  if (documents === undefined) {
    return (
      <div className="h-screen flex flex-center">
        <Spinner />
      </div>
    );
  }

  return (
    <>
      <div className="wrapper">
        <div className="overflow-y-auto w-full rounded-md transition-all duration-300 ">
          <div className="h-[60vh] w-full bg-background flex flex-col items-center justify-center overflow-hidden rounded-md">
            <motion.h1
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{
                duration: 1,
                ease: [0.22, 0.5, 0.36, 1],
              }}
              className="md:text-7xl text-5xl lg:text-9xl font-bold text-center text-primary relative z-20"
            >
              VaayuMandal
            </motion.h1>
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{
                delay: 0.25,
                duration: 1,
                ease: [0.22, 0.5, 0.36, 1],
              }}
              className="w-[40rem] h-40 relative"
            >
              {/* Gradients */}
              <div className="absolute inset-x-20 top-0 bg-gradient-to-r from-transparent via-indigo-500 to-transparent h-[2px] w-3/4 blur-sm" />
              <div className="absolute inset-x-20 top-0 bg-gradient-to-r from-transparent via-indigo-500 to-transparent h-px w-3/4" />
              <div className="absolute inset-x-60 top-0 bg-gradient-to-r from-transparent via-sky-500 to-transparent h-[5px] w-1/4 blur-sm" />
              <div className="absolute inset-x-60 top-0 bg-gradient-to-r from-transparent via-sky-500 to-transparent h-px w-1/4" />

              {/* Core component */}
              <SparklesCore
                background="transparent"
                minSize={0.4}
                maxSize={1}
                particleDensity={1200}
                className="w-full h-full"
                particleColor="#FFFFFF"
              />

              {/* Radial Gradient to prevent sharp edges */}
              <div className="absolute inset-0 w-full h-full bg-background [mask-image:radial-gradient(350px_200px_at_top,transparent_20%,white)]"></div>
            </motion.div>
            <motion.div
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{
                delay: 1.5,
                duration: 1,
                ease: [0.22, 0.5, 0.36, 1],
              }}
            >
              <p className="text-xl md:text-2xl text-center">
                In this ethereal space, you'll find a collection of public notes
                shared. Whether you seek inspiration, information, or simply a
                moment of contemplation, let the currents of Vaayu Mandal guide
                you.
              </p>
            </motion.div>
          </div>

          <div className="my-10 flex flex-col gap-6">
            <h2 className="text-4xl  text-center">Public Lekaah</h2>
            <Suspense fallback={<Spinner />}>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 overflow-hidden">
                {documents
                  .sort((a, b) => b._creationTime - a._creationTime)
                  .map((document) => (
                    <motion.div
                      initial={{ y: 20, opacity: 0 }}
                      whileInView={{ y: 0, opacity: 1 }}
                      transition={{
                        duration: 0.5,
                        ease: easeInOut,
                      }}
                      // viewport={{ margin: "-75px" }}
                      key={document._id}
                      className="cursor-pointer justify-between bg-foreground/5 hover:bg-foreground/10 transition-all duration-300 rounded-xl flex p-4"
                      onClick={() => onRedirect(document._id)}
                    >
                      <div className="flex flex-col gap-3">
                        {document.icon ? (
                          <div className="text-2xl">{document.icon}</div>
                        ) : (
                          <File className="text-2xl" />
                        )}
                        <div className="flex flex-col truncate">
                          <h3 className=" text-2xl font-semibold">
                            {document.title}
                          </h3>
                          <p className="truncate">By {document.userName}</p>
                        </div>
                      </div>

                      <ArrowUpRight className="size-6" />
                    </motion.div>
                  ))}
              </div>
            </Suspense>
          </div>
        </div>
      </div>
    </>
  );
};

export default Page;
