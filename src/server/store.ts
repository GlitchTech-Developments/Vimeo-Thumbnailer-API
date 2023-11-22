import { kv } from "@vercel/kv";

export const getThumbnailByID = async (id: string) => {
  try {
    const data = await kv.get(id);
    return {
      success: true,
      kv_data: {
        id,
        data,
      },
    } as const;
  } catch (error) {
    console.error(error);
    return {
      success: false,
      data: {
        id,
        data: null,
      },
      error,
    } as const;
  }
};

export const setThumbnailByID = async (id: string, data: string) => {
  try {
    await kv.set(id, data);
    return {
      success: true,
      data: {
        id,
        data,
      },
    } as const;
  } catch (error) {
    console.error(error);
    return {
      success: false,
      data: {
        id,
        data,
      },
      error,
    } as const;
  }
};

export const deleteThumbnailByID = async (id: string) => {
  try {
    await kv.del(id);
    return {
      success: true,
      data: {
        id,
      },
    } as const;
  } catch (error) {
    console.error(error);
    return {
      success: false,
      data: {
        id,
      },
      error,
    } as const;
  }
};
