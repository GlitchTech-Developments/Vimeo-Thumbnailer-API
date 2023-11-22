export const imageToBase64 = async (image: string) => {
  const response = await fetch(image);
  const blob = await response.blob();
  const base64_string = Buffer.from(await blob.arrayBuffer()).toString(
    "base64",
  );
  return `data:image/png;base64,${base64_string}`;
};
