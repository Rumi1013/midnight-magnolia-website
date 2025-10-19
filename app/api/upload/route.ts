import { NextRequest } from "next/server";
import { uploadToSpaces } from "../../../server/upload";
export const runtime = "nodejs";
export const dynamic = "force-dynamic";
export async function POST(req: NextRequest) {
  try {
    const form = await req.formData();
    const file = form.get("file") as File | null;
    const folder = String(form.get("folder") ?? "uploads");
    if (!file) return new Response(JSON.stringify({ error: "file is required" }), { status: 400 });
    const arrayBuffer = await file.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);
    const ext = (file.name?.split(".").pop() || "").toLowerCase();
    const safeName = file.name?.replace(/[^\w.\-]+/g, "_") || `upload.${ext || "bin"}`;
    const stamp = new Date().toISOString().replace(/[:.]/g, "");
    const key = `${folder}/${stamp}-${safeName}`;
    const url = await uploadToSpaces({ key, buffer, contentType: file.type || "application/octet-stream" });
    return new Response(JSON.stringify({ ok: true, key, url }), { headers: { "Content-Type": "application/json" }, status: 200 });
  } catch (err: any) {
    console.error("Upload error:", err);
    return new Response(JSON.stringify({ error: "upload_failed", detail: err?.message }), { status: 500 });
  }
}
