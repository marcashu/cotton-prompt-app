type ImageReferenceUpload = {
  type: "Link" | "File",
  value: string,
  name: string,
  filePreviewUrl?: string;
}

export default ImageReferenceUpload