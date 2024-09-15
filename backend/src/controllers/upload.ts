import { Response, Request } from 'express';
import path from 'path';
import sharp from 'sharp';
import { v4 as uuidv4 } from 'uuid';

export const fileUpload = async (req: Request, res: Response) => {
  try {
    const file = req.file;
    if (!file || !['image/jpeg', 'image/png'].includes(file.mimetype)) {
      return res.status(400).json({ error: 'Invalid image format.' });
    }
    return res.json({ filePath: file.filename });
  } catch (err) {
    console.log(err);
    return res.status(400).json({ error: 'Failed to upload file' });
  }
};

export const processImage = async (req: Request, res: Response) => {
  const { brightness, contrast, rotation, saturation, filePath } = req.body;
  console.log('filePath', filePath);
  try {
    const sourcePath = path.join(__dirname, '../../uploads', filePath);
    const tempFilename = `preview_${new Date().toISOString()}`;
    const tempFilePath = path.join(__dirname, '../../uploads', tempFilename);
    await sharp(sourcePath)
      .modulate({
        brightness: parseFloat(brightness),
        saturation: parseFloat(saturation),
      })
      .linear(parseFloat(contrast), -(0.5 * parseFloat(contrast)) + 0.5)
      .rotate(parseFloat(rotation))
      .jpeg({ quality: 20 })
      .toFile(tempFilePath);

    res.status(200).send({ filePath: tempFilename });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: 'Error processing image' });
  }
};

export const cropImage = async (req: Request, res: Response) => {
  const { brightness, contrast, rotation, saturation, filePath, crop } =
    req.body;
  const sourcePath = path.join(__dirname, '../../uploads', filePath);
  const fileName = uuidv4();
  const newOriginalPath = path.join(__dirname, '../../uploads', fileName);
  const previewFile = uuidv4();
  const previewPath = path.join(__dirname, '../../uploads', previewFile);
  try {
    await sharp(sourcePath)
      .extract({
        width: parseInt(crop.width),
        height: parseInt(crop.height),
        left: parseInt(crop.x),
        top: parseInt(crop.y),
      })
      .toFile(newOriginalPath);

    await await sharp(newOriginalPath)
      .modulate({
        brightness: parseFloat(brightness),
        saturation: parseFloat(saturation),
      })
      .linear(parseFloat(contrast), -(0.5 * parseFloat(contrast)) + 0.5)
      .rotate(parseFloat(rotation))
      .jpeg({ quality: 20 })
      .toFile(previewPath);

    res.status(200).send({ originalPath: fileName, filePath: previewFile });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: 'Error processing image' });
  }
};

export const imageDownload = async (req: Request, res: Response) => {
  try {
    const { brightness, contrast, rotation, saturation, filePath, format } =
      req.body;

    const outputPath = path.join(
      __dirname,
      '../../uploads',
      `${filePath}_final.${format}`
    );
    const sourcePath = path.join(__dirname, '../../uploads', filePath);
    await sharp(sourcePath)
      .modulate({
        brightness: parseFloat(brightness),
        saturation: parseFloat(saturation),
      })
      .linear(parseFloat(contrast), -(0.5 * parseFloat(contrast)) + 0.5)
      .rotate(parseFloat(rotation))
      .toFormat(format)
      .toFile(outputPath);
    res.download(outputPath);
  } catch (err) {
    res.status(500).json({ error: 'Error while downloading image' });
    console.log(err);
  }
};
