"use client";
import IconPicker from "@/components/icon-picker";
import { Button } from "@/components/ui/button";
import { api } from "@/convex/_generated/api";
import { Doc } from "@/convex/_generated/dataModel";
import { useCoverImage } from "@/hooks/use-cover-image";
import { useOrigin } from "@/hooks/use-origin";
import { useMutation } from "convex/react";
import { Check, ImageIcon, Share, Smile, X } from "lucide-react";
import React, { ElementRef, useRef, useState } from "react";
import TextareaAutosize from "react-textarea-autosize";

interface ToolbarProps {
  initialData: Doc<"documents">;
  preview?: boolean;
}

const Toolbar = ({ initialData, preview }: ToolbarProps) => {
  const inputRef = useRef<ElementRef<"textarea">>(null);
  const [isEditing, setIsEditing] = useState(false);
  const origin = useOrigin();

  const [value, setValue] = useState(initialData.title);
  const update = useMutation(api.documents.update);
  const coverImage = useCoverImage();
  const removeIcon = useMutation(api.documents.removeIcon);

  const [copied, setCopied] = useState(false);
  const url = `${origin}/mandal/${initialData._id}`;

  const enableInput = () => {
    if (preview) return;

    setIsEditing(true);
    setTimeout(() => {
      setValue(initialData.title);
      inputRef.current?.focus();
    }, 0);
  };

  const disableInput = () => {
    setIsEditing(false);
  };

  const onInput = (value: string) => {
    setValue(value);
    update({
      id: initialData._id,
      title: value || "Untitled",
    });
  };

  const onKeyDown = (event: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (event.key === "Enter") {
      event.preventDefault();
      disableInput();
    }
  };

  const onIconSelect = (icon: string) => {
    update({
      id: initialData._id,
      icon,
    });
  };

  const onRemoveIcon = () => {
    removeIcon({
      id: initialData._id,
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
    <div className="group relative wrapper">
      {!!initialData.icon && !preview && (
        <div className="flex items-center gap-2 group/icon pt-6">
          <IconPicker onChange={onIconSelect}>
            <p className="text-6xl hover:opacity-75 transition-all duration-300">
              {initialData.icon}
            </p>
          </IconPicker>
          <Button
            onClick={onRemoveIcon}
            className="py-2 rounded-full opacity-0 group-hover/icon:opacity-100 transition-all duration-300 text-xs"
            variant={"outline"}
            size={"icon"}
          >
            <X className="size-4" />
          </Button>
        </div>
      )}
      {preview && (
        <div>
          {!!initialData.icon && (
            <p className="text-6xl pt-6">{initialData.icon}</p>
          )}
          <Button
            onClick={onCopy}
            disabled={copied}
            className="h-8 transition-all mt-6 duration-300"
          >
            {copied ? (
              <div className="flex gap-2 items-center">
                <Check className="size-4" /> Link Copied
              </div>
            ) : (
              <div className="flex gap-2 items-center">
                <Share className="size-4" /> Share
              </div>
            )}
          </Button>
        </div>
      )}
      <div className="flex gap-2 transition-all duration-300 py-4">
        {!initialData.icon && !preview && (
          <IconPicker asChild onChange={onIconSelect}>
            <Button className="py-3 flex gap-2" variant={"outline"} size={"sm"}>
              <Smile className="size-4" />
              Add Icon
            </Button>
          </IconPicker>
        )}
        {!initialData.coverImage && !preview && (
          <Button
            className="py-3 flex gap-2"
            variant={"outline"}
            size={"sm"}
            onClick={coverImage.onOpen}
          >
            <ImageIcon className="size-4" /> Add Cover
          </Button>
        )}
      </div>
      {isEditing && !preview ? (
        <TextareaAutosize
          maxLength={20}
          ref={inputRef}
          onBlur={disableInput}
          onKeyDown={onKeyDown}
          value={value}
          onChange={(e) => onInput(e.target.value)}
          className="text-5xl font-bold break-words outline-none resize-none max-w-full"
        />
      ) : (
        <>
          <div
            onClick={enableInput}
            className="text-5xl font-bold break-words outline-none"
          >
            {initialData?.title}
          </div>
          {!!preview && (
            <p className="lg:mx-auto py-3 w-full text-lg">
              Published By: {initialData?.userName}
            </p>
          )}
        </>
      )}
    </div>
  );
};

export default Toolbar;
