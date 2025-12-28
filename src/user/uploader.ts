import { PutObjectCommand, S3Client } from '@aws-sdk/client-s3';
import { randomUUID } from 'crypto';
import { extname } from 'path';

export class Uploader {
  async s3(foto: Express.Multer.File) {
    const client = new S3Client({
      forcePathStyle: true,
      region: process.env.S3_REGION!,
      endpoint: process.env.S3_ENDPOINT!,
      credentials: {
        accessKeyId: process.env.S3_ACCESS_KEY!,
        secretAccessKey: process.env.S3_SECRET_KEY!,
      },
    });

    const fileExt = extname(foto.originalname);
    const fileName = `${randomUUID()}${fileExt}`;

    const command = new PutObjectCommand({
      Bucket: process.env.S3_BUCKET_NAME!,
      Key: fileName,
      Body: foto.buffer,
      ContentType: foto.mimetype,
    });

    await client.send(command);

    return fileName;
  }
}
