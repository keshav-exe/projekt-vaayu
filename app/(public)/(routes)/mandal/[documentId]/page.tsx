"use client";
import Cover from "@/components/cover";
import Editor from "@/components/editor";
import { Skeleton } from "@/components/ui/skeleton";
import { api } from "@/convex/_generated/api";
import { Id } from "@/convex/_generated/dataModel";
import { useMutation, useQuery } from "convex/react";
import { useParams } from "next/navigation";
import dynamic from "next/dynamic";
import { useMemo, useState } from "react";
import Toolbar from "@/app/(auth)/_components/toolbar";
import { Button } from "@/components/ui/button";
import { Check, Copy } from "lucide-react";
import { useUser } from "@clerk/clerk-react";
import Navbar from "@/components/navbar";

interface DocumentIdPageProps {
  params: {
    documentId: Id<"documents">;
  };
}

const Page = ({ params }: DocumentIdPageProps) => {
  const document = useQuery(api.documents.getById, {
    documentId: params.documentId,
  });

  const user = useUser();

  const Editor = useMemo(
    () => dynamic(() => import("@/components/editor"), { ssr: false }),
    []
  );

  const update = useMutation(api.documents.update);

  const onChange = (content: string) => {
    update({
      id: params.documentId,
      content,
    });
  };

  if (document === undefined) {
    return (
      <div>
        <Cover.Skeleton />
        <div className="wrapper">
          <div className="space-y-4 pl-8 pt-4">
            <Skeleton className="h-14 w-[50%]" />
            <Skeleton className="h-4 w-[80%]" />
            <Skeleton className="h-4 w-[40%]" />
            <Skeleton className="h-4 w-[60%]" />
          </div>
        </div>
      </div>
    );
  }

  if (document === null) {
    return null;
  }

  return (
    <>
      <Cover preview url={document.coverImage} />
      <div className="wrapper bg-[#ffffff] dark:bg-[#1f1f1f]">
        <div className="flex flex-col">
          <Toolbar preview initialData={document} />
          <p className="lg:mx-auto px-5 py- md:px-12 w-full">
            By: {document.userName}
          </p>
        </div>
        <Editor
          editable={false}
          onChange={onChange}
          initialContent={document.content}
        />
      </div>
    </>
  );
};

export default Page;
