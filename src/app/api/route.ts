import { NextResponse } from "next/server";

const defaultHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "GET",
};

export const GET = async (request: Request) => {
  return NextResponse.json(
    {
      success: false,
      requested_resource: request.url,
      error: "invalid method route, use /api/thumbnail/[videoID]/[data/image]",
      data: {
        thumbnail: null,
      },
    },
    {
      status: 401,
      headers: {
        ...defaultHeaders,
      },
    },
  );
};
