import { S3Client, PutObjectCommand } from "@aws-sdk/client-s3";
const region = process.env.SPACES_REGION || "nyc3";
const endpoint = `https://${region}.digitaloceanspaces.com`;
const s3 = new S3Client({
  region, endpoint, forcePathStyle: false,
  credentials: { accessKeyId: process.env.SPACES_ACCESS_KEY_ID, secretAccessKey: process.env.SPACES_SECRET_ACCESS_KEY },
});
export async function uploadToSpaces({ key, buffer, contentType="application/octet-stream", acl="public-read" }) {
  if (!process.env.SPACES_BUCKET) throw new Error("SPACES_BUCKET missing");
  await s3.send(new PutObjectCommand({ Bucket: process.env.SPACES_BUCKET, Key: key, Body: buffer, ContentType: contentType, ACL: acl }));
  const base = process.env.SPACES_BUCKET_CDN || process.env.SPACES_BUCKET_ORIGIN || `https://${process.env.SPACES_BUCKET}.${region}.digitaloceanspaces.com`;
  return `${base}/${encodeURI(key)}`;
}
