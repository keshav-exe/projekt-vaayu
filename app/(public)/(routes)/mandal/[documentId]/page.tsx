"use client";
import Cover from "@/components/cover";
import { Skeleton } from "@/components/ui/skeleton";
import { api } from "@/convex/_generated/api";
import { Id } from "@/convex/_generated/dataModel";
import { useMutation, useQuery } from "convex/react";
import dynamic from "next/dynamic";
import { useMemo } from "react";
import Toolbar from "@/app/(auth)/_components/toolbar";
import { useUser } from "@clerk/clerk-react";

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

      <div className="wrapper bg-[#ffffff] dark:bg-[#1f1f1f] shadow-xl rounded-xl my-10">
        <div className="flex flex-col">
          <Toolbar preview initialData={document} />
        </div>
        <Editor
          editable={false}
          onChange={onChange}
          initialContent={document.content}
          data-theming-css
        />
      </div>
    </>
  );
};

export default Page;
