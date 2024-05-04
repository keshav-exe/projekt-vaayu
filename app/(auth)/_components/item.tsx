"use client";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Skeleton } from "@/components/ui/skeleton";
import { api } from "@/convex/_generated/api";
import { Id } from "@/convex/_generated/dataModel";
import { cn } from "@/lib/utils";
import { useMutation } from "convex/react";
import {
  ChevronDown,
  ChevronRight,
  LucideIcon,
  MoreHorizontal,
  Plus,
  Trash2,
} from "lucide-react";
import { useRouter } from "next/navigation";
import { eventNames } from "process";
import { toast } from "sonner";

interface ItemProps {
  id?: Id<"documents">;
  documentIcon?: string;
  active?: boolean;
  expanded?: boolean;
  isSearch?: boolean;
  level?: number;
  onExpand?: () => void;
  onClick?: () => void;
  label?: string;
  icon: LucideIcon;
}

const Item = ({
  id,
  label,
  onClick,
  icon: Icon,
  active,
  documentIcon,
  isSearch,
  level = 0,
  onExpand,
  expanded,
}: ItemProps) => {
  const create = useMutation(api.documents.create);
  const archive = useMutation(api.documents.archive);
  const router = useRouter();

  const onArchive = (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    event.stopPropagation();
    if (!id) return;
    const promise = archive({ id }).then((documentId) => router.push(`/kosh`));

    toast.promise(promise, {
      loading: "Moving lekh to Sanchay...",
      success: "Lekh moved to Sanchay!",
      error: "Failed to Sangrhan lekh.",
    });
  };

  const handleExpand = (
    event: React.MouseEvent<HTMLDivElement, MouseEvent>
  ) => {
    event.stopPropagation();
    onExpand?.();
  };

  const onCreate = (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    event.stopPropagation();

    if (!id) return;
    const promise = create({ title: "Untitled", parentDocument: id }).then(
      (documentId) => {
        if (!expanded) {
          onExpand?.();
        }
        router.push(`/kosh/${documentId}`);
      }
    );
    toast.promise(promise, {
      loading: "Creating a new lekh...",
      success: "New lekh successfully created!",
      error: "Failed to create new lekh.",
    });
  };

  const ChevronIcon = expanded ? ChevronDown : ChevronRight;

  return (
    <div
      onClick={onClick}
      role="button"
      className={cn(
        "group min-h-10 text-sm flex rounded-md items-center gap-2 font-medium px-3",
        !!active && "bg-background/60",
        !!id && "hover:bg-background/50"
      )}
    >
      {!!id && (
        <div role="button" className=" my-auto" onClick={handleExpand}>
          <ChevronIcon className="size-4 shrink-0" />
        </div>
      )}
      {documentIcon ? (
        <div className="shrink-0 h-5 mr-2">{documentIcon}</div>
      ) : (
        <Icon className="shrink-0 size-5 hover:opacity-65 transition-all duration-300" />
      )}
      <span className="truncate">{label}</span>
      {isSearch && (
        <kbd className="ml-auto pointer-events-none bg-background/50 inline-flex h-5 select-none items-center gap-1 rounded border-2 px-1.5 font-mono text-xs font-medium opacity-100">
          <span>CTRL</span>K
        </kbd>
      )}
      {!!id && (
        <div className="flex justify-between gap-2 ml-auto">
          <div
            role="button"
            onClick={onCreate}
            className="opacity-0 group-hover:opacity-100 h-full my-auto "
          >
            <Plus className="size-5" />
          </div>
          <DropdownMenu>
            <DropdownMenuTrigger onClick={(e) => e.stopPropagation()} asChild>
              <div className="my-auto opacity-0 h-full group-hover:opacity-100">
                <MoreHorizontal className="size-5" />
              </div>
            </DropdownMenuTrigger>
            <DropdownMenuContent
              className="w-52"
              align="end"
              side="right"
              forceMount
            >
              <DropdownMenuItem onClick={onArchive} className="flex gap-2">
                <Trash2 className="size-5" />
                <p className="my-auto">Sangrahan</p>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      )}
    </div>
  );
};

export default Item;

Item.Skeleton = function ItemSkeleton({ level }: { level?: number }) {
  return (
    <div
      style={{
        paddingLeft: level ? `${level * 12 + 25}px` : "12px",
      }}
      className="flex gap-2 py-1"
    >
      <Skeleton className="h-4 w-4" />
      <Skeleton className="h-4 w-[30%]" />
    </div>
  );
};
