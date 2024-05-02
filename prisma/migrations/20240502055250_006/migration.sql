-- CreateTable
CREATE TABLE "GCPData" (
    "id" TEXT NOT NULL,
    "urlExpiryDate" TIMESTAMP(3) NOT NULL,
    "blobName" TEXT NOT NULL,
    "assetId" TEXT NOT NULL,
    "assetName" TEXT NOT NULL,
    "assetType" TEXT NOT NULL,
    "validityDuration" INTEGER NOT NULL DEFAULT 7,
    "downloadUrl" TEXT NOT NULL,

    CONSTRAINT "GCPData_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "GCPData_assetId_key" ON "GCPData"("assetId");
