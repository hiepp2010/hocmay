import multer from 'multer';
import { NextApiHandler } from 'next';

const upload = multer({
  storage: multer.diskStorage({
    destination: './public/uploads',
    filename: (req, file, cb) => {
      const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
      cb(null, `${file.fieldname}-${uniqueSuffix}`);
    },
  }),
});

const uploadHandler= async (req, res) => {
  try {
    await upload.single('image')(req, res, (err) => {
      if (err) {
        console.error(err);
        return res.status(500).send('An error occurred while uploading the file.');
      }
      return res.status(200).send('File uploaded successfully.');
    });
  } catch (err) {
    console.error(err);
    return res.status(500).send('An error occurred while uploading the file.');
  }
};

export default uploadHandler;
