"use client";

import { useSettings } from "@/hooks/use-settings";
import { Dialog, DialogContent, DialogHeader } from "../ui/dialog";
import { Label } from "../ui/label";
import ThemeToggle from "../ThemeToggle";
import {
  SignIn,
  SignOutButton,
  UserButton,
  UserProfile,
  useUser,
} from "@clerk/clerk-react";
import { ExitIcon } from "@radix-ui/react-icons";
import { LogOut, Settings } from "lucide-react";
import { Button } from "../ui/button";
import { Avatar, AvatarImage } from "../ui/avatar";
import Item from "@/app/(auth)/_components/item";

export const SettingsModal = () => {
  const settings = useSettings();

  return (
    <Dialog open={settings.isOpen} onOpenChange={settings.onClose}>
      <DialogContent>
        <Item icon={Settings} label="Settings" onClick={settings.onOpen} />
        <hr />
        <div className="flex items-center justify-between">
          <div className="flex flex-col gap-1">
            <Label>Appearance</Label>
            <span className="text-xs ">Customize your Vaayu Kosh</span>
          </div>
          <ThemeToggle />
        </div>
      </DialogContent>
    </Dialog>
  );
};
