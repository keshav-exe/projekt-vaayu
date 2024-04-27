"use client";

import ConfirmModal from "@/components/modals/confirm-modal";
import { Button } from "@/components/ui/button";
import { api } from "@/convex/_generated/api";
import { Id } from "@/convex/_generated/dataModel";
import { useMutation } from "convex/react";
import { useRouter } from "next/navigation";
import React from "react";
import { toast } from "sonner";

interface BannerProps {
  documentId: Id<"documents">;
}

const Banner = ({ documentId }: BannerProps) => {
  const router = useRouter();
  const remove = useMutation(api.documents.remove);
  const restore = useMutation(api.documents.restore);

  const onRemove = () => {
    const promise = remove({ id: documentId });
    toast.promise(promise, {
      loading: "Deleting lekh...",
      success: "lekh deleted!",
      error: "Failed to delete lekh.",
    });
    router.push("/documents/");
  };
  const onRestore = () => {
    const promise = restore({ id: documentId });
    toast.promise(promise, {
      loading: "Restoring lekh...",
      success: "lekh restored!",
      error: "Failed to restore lekh.",
    });
  };

  return (
    <div className="w-full p-2 gap-2 flex flex-center bg-foreground">
      <p className="text-background font-bold">This Page is in the Trash.</p>
      <Button
        size={"sm"}
        variant={"outline"}
        onClick={onRestore}
        className="py-2 bg-inherit text-background"
      >
        Restore
      </Button>
      <ConfirmModal onConfirm={onRemove}>
        <Button size={"sm"} variant={"destructive"} className="py-2">
          Delete Permanently
        </Button>
      </ConfirmModal>
    </div>
  );
};

export default Banner;
