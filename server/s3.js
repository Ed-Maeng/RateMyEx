import { DeleteObjectCommand, GetObjectCommand, PutObjectCommand, S3Client } from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";
import dotenv from "dotenv";

dotenv.config();

const bucketName = process.env.AWS_BUCKET_NAME;

const s3Client = new S3Client({
    credentials: {
        accessKeyId: process.env.AWS_ACCESS_KEY,
        secretAccessKey: process.env.AWS_SECRET_KEY
    },
    region: process.env.AWS_BUCKET_REGION
});

export function uploadFile(fileBuffer, fileName, mimetype) {
  const uploadParams = {
    Bucket: bucketName,
    Body: fileBuffer,
    Key: fileName,
    ContentType: mimetype
  }

  return s3Client.send(new PutObjectCommand(uploadParams));
}

export function deleteFile(fileName) {
  const deleteParams = {
    Bucket: bucketName,
    Key: fileName,
  }

  return s3Client.send(new DeleteObjectCommand(deleteParams));
}

export async function getObjectSignedUrl(key) {
  const params = {
    Bucket: bucketName,
    Key: key
  }
  
  const command = new GetObjectCommand(params);
  const url = await getSignedUrl(s3Client, command, { expiresIn: 3600 });
  return url;
}
