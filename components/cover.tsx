"use client";

import { cn } from "@/lib/utils";
import Image from "next/image";
import React from "react";
import { Button } from "./ui/button";
import { ImageIcon, X } from "lucide-react";
import { useCoverImage } from "@/hooks/use-cover-image";
import { useMutation } from "convex/react";
import { api } from "@/convex/_generated/api";
import { removeCoverImage } from "@/convex/documents";
import { useParams } from "next/navigation";
import { Id } from "@/convex/_generated/dataModel";
import { useEdgeStore } from "@/lib/edgestore";
import { Skeleton } from "./ui/skeleton";

interface CoverProps {
  url?: string;
  preview?: boolean;
}

const Cover = ({ url, preview }: CoverProps) => {
  const coverImage = useCoverImage();
  const removeImage = useMutation(api.documents.removeCoverImage);
  const params = useParams();
  const { edgestore } = useEdgeStore();

  const onRemoveImage = async () => {
    if (url) {
      await edgestore.publicFiles.delete({
        url: url,
      });
    }
    removeImage({
      id: params.documentId as Id<"documents">,
    });
  };
  return (
    <div
      className={cn(
        "relative w-full h-[64vh] group",
        !url && "h-[12vh]",
        url && "bg-muted",
        preview && !url && "h-0"
      )}
    >
      {!!url && (
        <Image src={url} fill alt="Cover" className="object-cover shadow-lg " />
      )}
      {url && !preview && (
        <div className="opacity-0 group-hover:opacity-100 absolute bottom-5 right-5 flex items-center gap-2">
          <Button
            variant={"outline"}
            size={"sm"}
            onClick={() => coverImage.onReplace(url)}
            className="py-2"
          >
            <ImageIcon className="size-4 mr-2" />
            Change Cover
          </Button>
          <Button
            variant={"outline"}
            size={"sm"}
            onClick={onRemoveImage}
            className="py-2"
          >
            <X className="size-4 mr-2" />
            Remove Cover
          </Button>
        </div>
      )}
    </div>
  );
};

export default Cover;

Cover.Skeleton = function CoverSkeleton() {
  return <Skeleton className="w-full h-[12vh]" />;
};
