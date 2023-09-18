"use client";
import type { Database } from "@/lib/schema";
import Image from "next/image";
import { useState } from "react";
import DeleteSpeciesDialog from "./delete-species";
import DetailedSpeciesDialog from "./detailed-species-dialog";
import EditSpeciesDialog from "./edit-species-dialogue";

type Species = Database["public"]["Tables"]["species"]["Row"];

export default function SpeciesCard({ species, userId }: { species: Species; userId: string }) {
  const [showEditDialog, setShowEditDialog] = useState(true);

  return (
    <div className="min-w-72 m-4 w-72 flex-none rounded border-2 p-3 shadow">
      {species.image && (
        <div className="relative h-40 w-full">
          <Image src={species.image} alt={species.scientific_name} fill style={{ objectFit: "cover" }} />
        </div>
      )}
      {species.author === userId ? (
        <>
          <button onClick={() => setShowEditDialog(true)}></button>
          {showEditDialog && <EditSpeciesDialog key={new Date().getTime()} species={species} />}
        </>
      ) : null}
      {species.author === userId ? (
        <>
          <button onClick={() => setShowEditDialog(true)}></button>
          {showEditDialog && <DeleteSpeciesDialog key={new Date().getTime()} species={species} />}
        </>
      ) : null}
      <h3 className="mt-3 text-2xl font-semibold">{species.common_name}</h3>
      <h4 className="text-lg font-light italic">{species.scientific_name}</h4>
      <p>{species.description ? species.description.slice(0, 150).trim() + "..." : ""}</p>
      {/* Replace with detailed view */}

      <DetailedSpeciesDialog key={new Date().getTime()} species={species} />
    </div>
  );
}
