import {
  deleteThumbnailByID,
  getThumbnailByID,
  setThumbnailByID,
} from "@/server/store";
import { imageToBase64 } from "@/utils/imageToBase64";
import { NextResponse } from "next/server";

interface Params {
  params: { videoID: string };
}

export const runtime = "edge";
export const revalidate = 7200000; // 2 hours in milliseconds

const debug = false;
const sizes = ["small", "medium", "large"] as const;
type Sizes = (typeof sizes)[number];

const defaultHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "GET",
};

export const GET = async (request: Request, { params }: Params) => {
  try {
    const { videoID } = params;
    if (!videoID)
      return NextResponse.json(
        {
          success: false,
          requested_resource: request.url,
          error: "No videoID provided",
          data: null,
        },
        {
          headers: {
            ...defaultHeaders,
          },
        },
      );

    const searchParams = new URL(request.url).searchParams;
    const size = searchParams.get("sizes")
      ? (searchParams.get("sizes")!.split(",") as Sizes[])
      : (["small"] as Sizes[]);
    const revalidate = searchParams.get("revalidate") === "true" ? true : false;

    const vimeoUrl = `http://vimeo.com/api/v2/video/${
      debug ? "886933615" : videoID
    }.json`;
    const vimeoResponse = await fetch(vimeoUrl);

    if (!vimeoResponse.ok) throw new Error("Vimeo API error");

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const vimeoData = (await vimeoResponse.json()) as VimeoResponse[];

    const kvEntry = await getThumbnailByID(videoID);

    const setKvEntry = async () => {
      await setThumbnailByID(
        videoID,
        JSON.stringify({
          success: true,
          requested_resource: request.url,
          store_date: new Date().toISOString(),
          videoID: params.videoID,
          data: {
            ...vimeoData[0],
          },
          previewImages: {
            small: await imageToBase64(vimeoData[0]!.thumbnail_small),
            medium: await imageToBase64(vimeoData[0]!.thumbnail_medium),
            large: await imageToBase64(vimeoData[0]!.thumbnail_large),
          },
        }),
      );
    };

    if (kvEntry.success && kvEntry.kv_data.data == null) {
      await setKvEntry();
    } else if (revalidate && kvEntry.kv_data !== null) {
      // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
      const kvEntrClone = JSON.parse(
        JSON.stringify(
          kvEntry ?? {
            store_date: new Date().toISOString(),
          },
        ),
      ) as {
        store_date: string;
      };
      const lastRevalidated = kvEntrClone.store_date
        ? new Date(kvEntrClone.store_date).getMilliseconds()
        : new Date().getMilliseconds();
      const now = new Date().getMilliseconds();

      // only revalidate once per 3 hours
      if (now - lastRevalidated > 10800000) {
        await deleteThumbnailByID(videoID);
        await setKvEntry();
      }
    }

    return NextResponse.json(
      kvEntry.kv_data !== null && kvEntry.kv_data?.data !== null
        ? kvEntry
        : {
            success: true,
            requested_resource: request.url,
            store_date: new Date().toISOString(),
            videoID: params.videoID,
            data_kv: null,
            data: {
              ...vimeoData[0],
            },
            previewImages: {
              small:
                size.includes(sizes[0]) &&
                (await imageToBase64(vimeoData[0]!.thumbnail_small)),
              medium:
                size.includes(sizes[1]) &&
                (await imageToBase64(vimeoData[0]!.thumbnail_medium)),
              large:
                size.includes(sizes[2]) &&
                (await imageToBase64(vimeoData[0]!.thumbnail_large)),
            },
          },
      {
        headers: {
          ...defaultHeaders,
        },
      },
    );
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (err) {
    const { message } = err as { message: string };

    return NextResponse.json(
      {
        success: false,
        requested_resource: request.url,
        error: message,
        data: {
          thumbnail: null,
        },
      },
      {
        status: 500,
        headers: {
          ...defaultHeaders,
        },
      },
    );
  }
};
