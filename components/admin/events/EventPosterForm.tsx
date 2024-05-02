"use client";

import { Pencil, PlusCircle, Ban, FileUp } from "lucide-react";
import { useState } from "react";
import { Event, GCPData } from "@prisma/client";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { FileUpload } from "@/components/FileUpload";
import { DropZoneImageFileTypes } from "@/constants";

interface EventPosterFormProps {
  initialData: Event;
  isDeleting: boolean;
  gcpData: GCPData;
}

export default function EventPosterForm({
  isDeleting,
  gcpData,
  initialData,
}: EventPosterFormProps) {
  const [isEditing, setIsEditing] = useState(false);

  const toggleEdit = () => setIsEditing((current) => !current);

  return (
    <div className="mt-6 rounded-md border bg-slate-100 p-4">
      <div className="flex items-center justify-between font-medium">
        Event poster
        {isDeleting ? (
          <Ban className="h-4 w-4" />
        ) : (
          <Button onClick={toggleEdit} variant="ghost">
            {isEditing && <>Cancel</>}
            {!isEditing && !gcpData && (
              <>
                <PlusCircle className="mr-2 h-4 w-4" />
                Add an image
              </>
            )}
            {!isEditing && gcpData && (
              <>
                <Pencil className="mr-2 h-4 w-4" />
                Edit poster
              </>
            )}
          </Button>
        )}
      </div>
      {!isEditing &&
        (!gcpData ? (
          <div className="flex h-60 items-center justify-center rounded-md bg-slate-200">
            <FileUp className="h-10 w-10 text-slate-500" />
          </div>
        ) : (
          <div className="relative mt-2">
            <Image
              src={gcpData.downloadUrl}
              alt="Event poster"
              width={600}
              height={600}
              className="inline-flex items-center gap-4 rounded-md border border-slate-200 bg-slate-200 p-4 text-center"
            />
          </div>
        ))}
      {isEditing && (
        <div>
          <FileUpload
            toggleEdit={toggleEdit}
            fileMessage={"png, jpg, jpeg, webp, svg, bmp, tiff, gif, webp"}
            acceptedFileTypes={DropZoneImageFileTypes}
            assetId={initialData.id}
            bucketFileDirectory={`Events/${initialData.id}/file`}
          />
          <div className="mt-4 text-xs text-muted-foreground">
            Upload any type of material.
          </div>
        </div>
      )}
    </div>
  );
}
