import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  return NextResponse.json(
    {
      ok: false,
      message:
        "On-demand revalidation is not supported. Content updates trigger a full rebuild via Cloudflare Deploy Hook.",
    },
    { status: 410 }
  );
}
