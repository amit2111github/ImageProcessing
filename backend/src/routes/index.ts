import express from 'express';
import multer from 'multer';
import {
  cropImage,
  fileUpload,
  imageDownload,
  processImage,
} from '../controllers/upload';

const router = express.Router();
const upload = multer({ dest: 'uploads/' });

router.put('/process', processImage);
router.put('/process/crop', cropImage);
router.put('/download', imageDownload);
router.post('/upload', upload.single('image'), fileUpload);

export default router;
