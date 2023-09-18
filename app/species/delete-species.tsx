/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable no-console */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-misused-promises */
"use client";

import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { toast } from "@/components/ui/use-toast";
import { type Database } from "@/lib/schema";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { Delete } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";

type Species = Database["public"]["Tables"]["species"]["Row"];
export default function DeleteSpeciesDialog({ species }: { species: Species }) {
  const router = useRouter();
  const [open, setOpen] = useState<boolean>(false);

  const onSubmit = async () => {
    console.log(7);
    const supabase = createClientComponentClient<Database>();
    console.log("bla3");
    const { error } = await supabase
      .from("species")
      .delete()
      .eq("common_name", species.common_name)
      .eq("scientific_name", species.scientific_name);
    if (error) {
      return toast({
        title: "Something went wrong.",
        description: error.message,
        variant: "destructive",
      });
    }

    setOpen(false);
    router.refresh();
  };

  const openDeleteDialog = () => {
    console.log("bla");
    setOpen(true);
  };

  const closeDeleteDialog = () => {
    console.log("blabla");
    setOpen(false);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <Button variant="outline" onClick={openDeleteDialog}>
        <Delete className="h-4 w-4" />
      </Button>
      <DialogContent className="max-h-screen overflow-y-auto sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle>Warning!</DialogTitle>
          <DialogDescription>Are you sure you want to delete your species?</DialogDescription>
        </DialogHeader>
        <div className="mt-4 flex justify-end">
          <Button type="submit" onClick={onSubmit}>
            Delete
          </Button>
          <Button onClick={closeDeleteDialog} className="ml-2">
            Cancel
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
