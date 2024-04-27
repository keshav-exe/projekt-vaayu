"use client";
import ConfirmModal from "@/components/modals/confirm-modal";
import Spinner from "@/components/spinner";
import { Input } from "@/components/ui/input";
import { api } from "@/convex/_generated/api";
import { Id } from "@/convex/_generated/dataModel";
import { useMutation, useQuery } from "convex/react";
import { Search, Trash2, Undo } from "lucide-react";
import { useParams, useRouter } from "next/navigation";
import React, { useState } from "react";
import { toast } from "sonner";

const TrashBox = () => {
  const router = useRouter();
  const params = useParams();
  const documents = useQuery(api.documents.getTrash);
  const restore = useMutation(api.documents.restore);
  const remove = useMutation(api.documents.remove);

  const [search, setSearch] = useState("");

  const filterDocuments = documents?.filter((document) => {
    return document.title.toLowerCase().includes(search.toLowerCase());
  });

  const onClick = (documentId: string) => {
    router.push(`/kosh/${documentId}`);
  };

  const onRestore = (
    event: React.MouseEvent<HTMLDivElement, MouseEvent>,
    documentId: Id<"documents">
  ) => {
    event.stopPropagation();
    const promise = restore({ id: documentId });

    toast.promise(promise, {
      loading: "Restoring lekh...",
      success: "Lekh restored!",
      error: "Failed to restore lekh.",
    });
  };
  const onRemove = (documentId: Id<"documents">) => {
    const promise = remove({ id: documentId });

    toast.promise(promise, {
      loading: "Deleting lekh...",
      success: "Lekh Delete!",
      error: "Failed to delete lekh.",
    });

    if (params.documentId === documentId) {
      router.push("/kosh");
    }
  };

  if (documents === undefined) {
    return (
      <div className="flex w-full justify-center">
        <Spinner />
      </div>
    );
  }
  return (
    <>
      <div className="flex flex-center gap-3 p-2 ">
        <Search className="size-4" />
        <Input
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="h-7 px-2 focus-visible:ring-transparent bg-primary/10"
          placeholder="Filter page by title"
        />
      </div>
      <div className="mt-2 px-1 pb-2 ">
        <p className="hidden last:block text-xs text-center ">
          No Lekhaah found.
        </p>
        {filterDocuments?.map((document) => (
          <div
            key={document._id}
            role="button"
            onClick={() => onClick(document._id)}
            className="text-sm rounded-sm hover:bg-primary/5 flex items-center text-primary justify-between"
          >
            <span className="truncate pl-2 ">{document.title}</span>
            <div className="flex items-center">
              <div
                onClick={(e) => onRestore(e, document._id)}
                role="button"
                className="rounded-sm p-2 hover:bg-primary/5"
              >
                <Undo className="size-4" />
              </div>
              <ConfirmModal onConfirm={() => onRemove(document._id)}>
                <div
                  role="button"
                  className="rounded-sm p-2 hover:bg-primary/5"
                >
                  <Trash2 className="size-5" />
                </div>
              </ConfirmModal>
            </div>
          </div>
        ))}
      </div>
    </>
  );
};

export default TrashBox;
