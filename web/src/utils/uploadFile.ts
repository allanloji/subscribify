import { v4 as uuid } from "uuid";
import { PutObjectCommand, S3Client } from "@aws-sdk/client-s3";

const s3 = new S3Client({
  region: process.env.NEXT_PUBLIC_AWS_REGION || "",
  credentials: {
    accessKeyId: process.env.NEXT_PUBLIC_AWS_ACCESS_KEY_ID || "",
    secretAccessKey: process.env.NEXT_PUBLIC_AWS_SECRET_ACCESS_KEY || "",
  },
});

export async function uploadFile(file: File) {
  const key = `${uuid()}.${file.name.split(".").pop()}`;
  const command = new PutObjectCommand({
    Bucket: process.env.NEXT_PUBLIC_AWS_BUCKET,
    Key: key,
    Body: file,
  });

  try {
    await s3.send(command);
    return key;
  } catch (err) {
    console.error(err);
  }
}
