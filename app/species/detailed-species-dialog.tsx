"use client";

import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Form, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import type { Database } from "@/lib/schema";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState, type BaseSyntheticEvent } from "react";
import { useForm, type SubmitHandler } from "react-hook-form";

type FormData = Database["public"]["Tables"]["species"]["Row"];
export default function DetailedSpeciesDialog({ species }: { species: FormData }) {
  const router = useRouter();
  const [open, setOpen] = useState<boolean>(false);

  const form = useForm<FormData>({
    mode: "onChange",
  });

  // eslint-disable-next-line @typescript-eslint/require-await
  const onSubmit: SubmitHandler<FormData> = async () => {
    // Handle form submission here
    // You can use the `data` object to send the form values to your backend or perform any other actions.
    // Make sure to add your logic here.

    // Close the dialog after successful submission
    setOpen(false);

    // Refresh all server components in the current route if needed
    router.refresh();
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className="mt-3 w-full" onClick={() => setOpen(true)}>
          Learn More
        </Button>
      </DialogTrigger>
      <DialogContent className="max-h-screen overflow-y-auto sm:max-w-[600px]">
        <DialogHeader>
          <div className="min-w-72 m-4 w-72 flex-none rounded border-2 p-3 shadow">
            {species.image && (
              <div className="relative h-40 w-full">
                <Image src={species.image} alt={species.scientific_name} fill style={{ objectFit: "cover" }} />
              </div>
            )}
          </div>
          <DialogTitle className="center">{species.common_name}</DialogTitle>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={(e: BaseSyntheticEvent) => void form.handleSubmit(onSubmit)(e)}>
            <div className="grid w-full items-center gap-4">
              <FormItem>
                <FormLabel>Scientific Name:</FormLabel>
                <h4 className="text-lg font-light italic">{species.scientific_name}</h4>
                <FormMessage />
              </FormItem>
              <FormItem>
                <FormLabel>Kingdom</FormLabel>
                <h4 className="text-lg font-light italic">{species.kingdom} </h4>
                <FormMessage />
              </FormItem>
              <FormItem>
                <FormLabel>Total Population</FormLabel>
                <h4 className="text-lg font-light italic">{species.total_population}</h4>
                <FormMessage />
              </FormItem>
              <FormItem>
                <FormLabel>Description</FormLabel>
                <p>{species.description ? species.description : ""}</p>
                <FormMessage />
              </FormItem>
              <div className="flex">
                <Button type="submit" className="ml-1 mr-1 flex-auto">
                  Close
                </Button>
              </div>
            </div>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
