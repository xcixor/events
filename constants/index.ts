export const NOTIFICATION_TYPES = {
  INFO: "INFO",
  WARNING: "WARNING",
  SUCCESS: "SUCCESS",
  ERROR: "ERROR",
};

export enum EMAILTYPES {
  EMAILVERIFICATION,
  RESETPASSWORD,
  DEFAULT,
}

export const MAX_IMAGE_SIZE = 1;

export const ALLOWED_IMAGE_TYPES = [
  "image/webp",
  "image/webm",
  "image/tiff",
  "image/svg+xml",
  "image/png",
  "image/jpeg",
  "image/gif",
  "image/bmp",
];

export const DropZoneImageFileTypes = {
  "image/webp": [".webp"],
  "image/webm": [".webm"],
  "image/tiff": [".tiff"],
  "image/svg": [".svg", ".svgz", "xml"],
  "image/png": [".png"],
  "image/jpg": [".jpg"],
  "image/jpeg": [".jpeg"],
  "image/gif": [".gif"],
  "image/bmp": [".bmp"],
};

export const DropZoneVideoFileTypes = {
  "video/mp4": [".mp4"],
  "video/avi": [".avi"],
  "video/mov": [".mov"],
  "video/wmv": [".wmv"],
  "video/flv": [".flv"],
  "video/webm": [".webm"],
  "video/3gp": [".3gp"],
  "video/mpeg": [".mpeg"],
  "video/ogg": [".ogg"],
};
export const DropZoneDocumentFileTypes = {
  "application/pdf": [".pdf"],
  "application/msword": [".doc"],
  "application/vnd.openxmlformats-officedocument.wordprocessingml.document": [
    ".docx",
  ],
  "application/vnd.ms-excel": [".xls"],
  "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet": [
    ".xlsx",
  ],
  "application/vnd.ms-powerpoint": [".ppt"],
  "application/vnd.openxmlformats-officedocument.presentationml.presentation": [
    ".pptx",
  ],
  "text/plain": [".txt"],
  "application/zip": [".zip"],
  "application/x-rar-compressed": [".rar"],
};
