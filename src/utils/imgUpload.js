import { Storage } from "@google-cloud/storage";
import { logger } from "../app/logging.js";

const gcs = new Storage();

const bucketName = process.env.BUCKET_NAME;
const bucket = gcs.bucket(bucketName);

function getPublicUrl(folder, filename) {
	return `https://storage.googleapis.com/${bucketName}/${folder}/${filename}`
}

async function uploadToGCS(folder, file) {
	try {
        const customMetadata = {
            contentType: file.mimetype,
        }

		const optionsUploadObject = {
			destination: `${folder}/${file.name}`,
			preconditionOpts: { ifGenerationMatch: 0 },
            metadata: customMetadata
		};

        await bucket.upload(file.tempFilePath, optionsUploadObject);
        logger.info(`${file.name} uploaded to ${bucketName} bucket`)
	} catch (error) {
        logger.error(`Gagal mengupload file:`, error.message)
    }
}

export {getPublicUrl, uploadToGCS}