/**
 * The function `imageExt` takes an image URL as input and returns the file extension of the image.
 * @param {string} imageUrl - The `imageUrl` parameter is a string that represents the URL of an image
 * file.
 * @returns the file extension of the given image URL. If the file extension is found in the URL, it
 * will be returned. Otherwise, the function will return "png" as the default file extension.
 */
export const imageExt = (imageUrl: string) => {
  const extByReqex = imageUrl.match(/\.(\w+)$/);
  const ext = extByReqex?.at(0);
  if (!ext) return "png";
  return ext;
};
