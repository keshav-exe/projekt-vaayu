"use client";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { api } from "@/convex/_generated/api";
import { Doc } from "@/convex/_generated/dataModel";
import { useOrigin } from "@/hooks/use-origin";
import { useMutation } from "convex/react";
import { Check, Copy, Globe, Lock } from "lucide-react";
import React, { useState } from "react";
import { toast } from "sonner";
import { useMediaQuery } from "usehooks-ts";
import Link from "next/link";

interface PublishProps {
  initialData: Doc<"documents">;
}

const Publish = ({ initialData }: PublishProps) => {
  const origin = useOrigin();
  const update = useMutation(api.documents.update);
  const isMobile = useMediaQuery("(max-width:768px)");
  const [copied, setCopied] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const url = `${origin}/mandal/${initialData._id}`;

  const onPublish = () => {
    setIsSubmitting(true);

    const promise = update({
      id: initialData._id,
      isPublished: true,
    }).finally(() => setIsSubmitting(false));

    toast.promise(promise, {
      loading: "Publishing...",
      success: "Published!",
      error: "Failed to Publish.",
    });
  };
  const onUnPublish = () => {
    setIsSubmitting(true);

    const promise = update({
      id: initialData._id,
      isPublished: false,
    }).finally(() => setIsSubmitting(false));

    toast.promise(promise, {
      loading: "Un-publishing...",
      success: "Un-published!",
      error: "Failed to un-publish.",
    });
  };
  const onCopy = () => {
    navigator.clipboard.writeText(url);

    setCopied(true);

    setTimeout(() => {
      setCopied(false);
    }, 1000);
  };

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant={"outline"} className="h-10">
          {initialData.isPublished ? (
            <div className="flex gap-2">
              <Globe className="text-sky-500 size-5" />
              {!isMobile && <span>Public</span>}
            </div>
          ) : (
            <div className="flex gap-2">
              <Lock className="size-5" />
              {!isMobile && <span>Private</span>}
            </div>
          )}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-72" align="end" alignOffset={8} forceMount>
        {initialData.isPublished ? (
          <div className="space-y-4">
            <div className="flex items-center gap-x-2">
              <Globe className="text-sky-500 size-4 ml-2" />
              <Link
                href={url}
                target="_blank"
                className="text-xs underline font-medium text-sky-500"
              >
                Published on Vaayu Mandal.
              </Link>
            </div>
            <div className="flex items-center">
              <input
                type="text"
                value={url}
                disabled
                className="flex-1 px-2 text-xs border rounded-l-md h-8 truncate"
              />
              <Button
                onClick={onCopy}
                disabled={copied}
                className="h-8 rounded-l-none"
              >
                {copied ? (
                  <Check className="size-4" />
                ) : (
                  <Copy className="size-4" />
                )}
              </Button>
            </div>
            <Button
              size={"sm"}
              className="w-full"
              disabled={isSubmitting}
              onClick={onUnPublish}
              variant={"destructive"}
            >
              Make Private
            </Button>
          </div>
        ) : (
          <div className="flex flex-col  items-center justify-center">
            <Globe className="size-8 mb-2" />
            <p className="text-lg font-medium mb-2">Publish this lekh</p>
            <span className="text-xs mb-4">Make the lekh public to share.</span>
            <Button
              className="w-full text-sm"
              size={"sm"}
              disabled={isSubmitting}
              onClick={onPublish}
            >
              Make Public
            </Button>
          </div>
        )}
      </PopoverContent>
    </Popover>
  );
};

export default Publish;
