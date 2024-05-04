import { api } from "@/convex/_generated/api";
import { Id } from "@/convex/_generated/dataModel";
import { useQuery } from "convex/react";
import { useParams } from "next/navigation";
import React from "react";
import { MenuIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import Banner from "./banner";
import Menu from "./menu";
import Publish from "./publish";
import { Skeleton } from "@/components/ui/skeleton";

interface NavbarProps {
  isCollapsed: boolean;
  onResetWidth: () => void;
  onCollapse: () => void;
}

const Navbar = ({ isCollapsed, onResetWidth, onCollapse }: NavbarProps) => {
  const params = useParams();

  const document = useQuery(api.documents.getById, {
    documentId: params.documentId as Id<"documents">,
  });

  if (document === undefined) {
    return (
      <nav className="bg-transparent px-16 flex gap-4 items-center justify-between">
        <div className="py-16">
          <Skeleton className="h-16 rounded-md" />
        </div>
      </nav>
    );
  }

  if (document === null) {
    return null;
  }

  return (
    <>
      {document?.isArchived && <Banner documentId={document?._id} />}
      <nav className="bg-background/60 backdrop-blur-sm shadow-md wrapper my-2 rounded-full border-2 border-primary/10 items-center flex gap-4">
        <Button
          onClick={isCollapsed ? onResetWidth : onCollapse}
          role="button"
          variant={"outline"}
          size={"icon"}
        >
          <MenuIcon />
        </Button>
        <div className="flex items-center justify-between w-full">
          <div className="flex items-center gap-2">
            <div className="flex items-center gap-1">
              {!!document.icon && <p className="text-3xl">{document.icon}</p>}
              <h1 className="text-base py-2 md:text-3xl">{document?.title}</h1>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Publish initialData={document} />
            <Menu documentId={document._id} />
          </div>
        </div>
      </nav>
    </>
  );
};

export default Navbar;
