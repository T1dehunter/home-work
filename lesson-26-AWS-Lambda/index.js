console.log('Loading function');

const aws = require('aws-sdk');
const sharp = require('sharp');

const s3 = new aws.S3({ apiVersion: '2006-03-01' });

const getImageBucket= (event) => {
    const bucket = event.Records[0].s3.bucket.name;
    return bucket;
};

const getImageName = (event) => {
    const fileName = decodeURIComponent(event.Records[0].s3.object.key.replace(/\+/g, ' '));
    return fileName;
};

const getImageType = (event) => {
    const fileName = getImageName(event);
    const match = fileName.match(/\.([^.]*)$/);
    return match?.[1].toLowerCase();
};

const getUploadedJpegImage = async (event) => {
    const bucket = getImageBucket(event);
    const imageName = getImageName(event);
    const imageType = getImageType(event);
    if (!imageType) {
        throw new Error("Could not determine the image type.");
    }
    if (imageType !== "jpg") {
        throw new Error(`Unsupported image type: ${imageType}`);
    }
    const params = {
        Bucket: bucket,
        Key: imageName,
    };
    try {
        const image = await s3.getObject(params).promise();
        return {name: imageName, bucket: bucket, data: image.Body};
    } catch (err) {
        console.log(err);
        const message = `Error getting object ${imageName} from bucket ${bucket}. Make sure they exist and your bucket is in the same region as this function.`;
        console.log(message);
        throw new Error(message);
    }
};

const convertImageToPng = async ({imageName, imageData}) => {
    const [onlyName] = imageName.split('.');
    const buffer = await sharp(imageData)
        .png()
        .toBuffer();
    return {name:  `${onlyName}.png`, buffer};
};

const convertImageToGif = async ({imageName, imageData}) => {
    const [onlyName] = imageName.split('.');
    const buffer = await sharp(imageData)
        .gif()
        .toBuffer();
    return {name:  `${onlyName}.gif`, buffer};
};

const saveImage = async ({fileName, fileBucket, fileBuffer}) => {
    const destParams = {
        Bucket: fileBucket,
        Key: fileName,
        Body: fileBuffer,
        ContentType: "image"
    };
    await s3.putObject(destParams).promise();
};

exports.handler = async (event, context) => {
    const PNG_IMAGES_BUCKET = 'my-png-backet';
    const GIF_IMAGES_BUCKET = 'my-gif-backet';
    const jpegImage = await getUploadedJpegImage(event, context);
    const [pngImage, gifImage] = await Promise.all([
        convertImageToPng({imageName: jpegImage.name, imageData: jpegImage.data}),
        convertImageToGif({imageName: jpegImage.name, imageData: jpegImage.data})
    ]);
    await Promise.all([
        saveImage({fileName: pngImage.name, fileBuffer: pngImage.buffer, fileBucket: PNG_IMAGES_BUCKET}),
        saveImage({fileName: gifImage.name, fileBuffer: gifImage.buffer, fileBucket: GIF_IMAGES_BUCKET})
    ]);
    console.log('SUCCESS SAVED CONVERTED IMAGES');
};