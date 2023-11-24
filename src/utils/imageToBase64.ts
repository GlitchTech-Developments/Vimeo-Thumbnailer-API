import { imageExt } from "./imageExt";

export const imageToBase64 = async (image: string) => {
  const response = await fetch(image);
  const extByReqex = imageExt(image);
  const blob = await response.blob();
  const base64_string = Buffer.from(await blob.arrayBuffer()).toString(
    "base64",
  );
  return `data:image/${
    extByReqex !== null ? extByReqex.at(0) : "png"
  };base64,${base64_string}`;
};
