import { type NextRequest, NextResponse } from "next/server";

export const GET = async (req: NextRequest) => {
  return NextResponse.json({
    success: true,
    data: {
      req: req,
      thumbnail: null,
    },
  });
};
