import { NextRequest, NextResponse } from "next/server";
import { revalidatePath, revalidateTag } from "next/cache";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function POST(req: NextRequest) {
  try {
    const { secret, path, tag } = await req.json();
    if (!secret || secret !== process.env.REVALIDATE_SECRET) {
      return NextResponse.json({ ok: false, error: "Unauthorized" }, { status: 401 });
    }

    if (!path && !tag) {
      return NextResponse.json({ ok: false, error: "Missing path or tag" }, { status: 400 });
    }

    if (path) revalidatePath(path, "page");
    if (tag) revalidateTag(tag);

    return NextResponse.json({ ok: true, revalidated: { path, tag } });
  } catch (err) {
    return NextResponse.json({ ok: false, error: "Bad request" }, { status: 400 });
  }
}
