import { S3Client, PutObjectCommand } from '@aws-sdk/client-s3';
import { responseBuilder } from './response.mjs';

const client = new S3Client({});

export async function postExecute(reqBody) {
  let response;
  const fileName = `${new Date().toISOString()}`;

  const bucket = process.env.BUCKET_NAME;

  const command = new PutObjectCommand({
    Bucket: bucket,
    Key: `data/${fileName}`,
    Body: reqBody
  });

  try {
    const response = await client.send(command);
    console.log('RESPONSE: ', response);
  } catch (err) {
    console.error('ERROR: ', err);
  }

  return response = responseBuilder(200, reqBody);
}