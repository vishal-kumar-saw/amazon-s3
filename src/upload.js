
const AWS = require("aws-sdk");
const s3 = new AWS.S3();

const BUCKET_NAME = 'vishalsaw';

module.exports.handler = async (event) => {
    console.log(event);

    const response = {
        isBase64Encoded: false,
        statusCode: 200,
        body: JSON.stringify({ message: "Successfully uploaded file to S3" }),
    };

    try {
        const parsedBody = JSON.parse(event.body);
        const base64File = parsedBody.file;
        const decodedFile = Buffer.from(buffer, 'base64');
        const params = {
            Bucket: BUCKET_NAME,
            Key: `files/${new Date().toISOString()}.pdf`,
            Body: decodedFile,
            ContentType: "application/pdf",
        };

        const uploadResult = await s3.upload(params).promise();

        response.body = JSON.stringify({ message: "Successfully uploaded file to S3", uploadResult });
    } catch (e) {
        console.error(e);
        response.body = JSON.stringify({ message: "File failed to upload", errorMessage: e });
        response.statusCode = 500;
    }

    return response;
};