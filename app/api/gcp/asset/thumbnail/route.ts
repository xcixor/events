import fs from "fs";
import { NextRequest, NextResponse } from "next/server";
import { getLoggedInUser } from "@/lib/auth/utils";
const { generateThumbnails } = require("@/lib/video/thumbnail");
const { makeFilePublic, clearFolder } = require("@/lib/video/uploader");
// import { generateThumbnails } from "@/lib/video/thumbnail";
import { removeFile, uploadFile } from "@/lib/files";
import { db } from "@/lib/db";

export async function PUT(req: NextRequest) {
  try {
    const user = await getLoggedInUser();
    const userId = user?.id;

    if (!userId) {
      return new NextResponse("Unauthorized", { status: 401 });
    }
    const formData = await req.formData();
    const data = Object.fromEntries(formData);
    const { file, videoFolder, chapterId } = data;

    if (!videoFolder || !file || !chapterId) {
      return new NextResponse(JSON.stringify({ message: "Bad Request" }), {
        status: 400,
      });
    }
    const ROOT_DIR = "/tmp";
    const uploadDir = `./public${ROOT_DIR}`;
    if (!fs.existsSync(uploadDir)) {
      fs.mkdirSync(uploadDir, { recursive: true });
    }
    const { status: uploadStatus, message: uploadMessage } = await uploadFile(
      file as File,
      uploadDir,
      ROOT_DIR,
    );

    if (uploadStatus !== 200) {
      return new NextResponse(uploadMessage, { status: 500 });
    }

    const thumbResponse = await generateThumbnails(videoFolder, uploadMessage);
    await removeFile(`${uploadDir}/${file.name}`);
    if (thumbResponse.status !== 200) {
      return new NextResponse(thumbResponse.message, { status: 500 });
    }

    const vttfileName = `${videoFolder}/captions.vtt`;
    const publicUrl = await makeFilePublic(vttfileName);

    await db.chapter.update({
      where: { id: chapterId as string },
      data: {
        vttFileUrl: publicUrl,
      },
    });

    return new NextResponse(
      JSON.stringify({ message: "Success.", vttFileUrl: publicUrl }),
      {
        status: 200,
      },
    );
  } catch (error) {
    console.log("[ASSET_THUMBNAIL]", error);
    return new NextResponse(JSON.stringify({ message: error.toString() }), {
      status: 500,
    });
  }
}
