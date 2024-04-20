import { FileUploader } from "@/lib/gcp/gcp";
import { DOWNLOAD_EXPIRY_IN_SECONDS } from "@/lib/gcp/gcp-utils";
import { db } from "@/lib/db";

function getSignedUrlExpiryDate(signedUrl) {
  const url = new URL(signedUrl);
  const expirationTimestamp = Number(url.searchParams.get("X-Goog-Expires")); // Convert to number
  const expirationDate: Date = new Date();
  expirationDate.setTime(expirationDate.getTime() + expirationTimestamp * 1000);
  const currentDate: Date = new Date();
  const daysRemaining = Math.ceil(
    (expirationDate.getTime() - currentDate.getTime()) / (1000 * 60 * 60 * 24),
  );
  return daysRemaining;
}

export async function getLatestFileMetaData(assetId: string) {
  if(!assetId){
    return;
  }
  const metaData = await db.gCPData.findFirst({
    where: {
      assetId: assetId,
    },
  });

  if (metaData) {
    const targetDate = metaData.urlExpiryDate; // Replace with your target date
    const urlExpiryDate = getSignedUrlExpiryDate(metaData.downloadUrl);
    const currentDate = new Date(); // Get the current date
    const twoDaysFromNow = new Date(
      currentDate.getFullYear(),
      currentDate.getMonth(),
      currentDate.getDate() + 2,
    ); // Calculate 2 days from now

    if (targetDate <= twoDaysFromNow || urlExpiryDate <= 2) {
      console.log("The target date is 2 days or less from today's date.");
      const uploader = new FileUploader(
        metaData.blobName,
        metaData.assetType,
        "PUT",
        DOWNLOAD_EXPIRY_IN_SECONDS,
      );
      const url = await uploader.generateSignedDownloadUrl();
      if (url) {
        const updatedStorageMetaData = db.gCPData.update({
          where: {
            id: metaData.id,
          },
          data: {
            downloadUrl: url,
            urlExpiryDate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
          },
        });
        // Set cache-control headers to prevent caching
        return {
          ...updatedStorageMetaData,
          headers: {
            "Cache-Control":
              "no-store, no-cache, must-revalidate, proxy-revalidate",
          },
        };
      }
    }
  }

  return metaData;
}
