import multer from 'multer';

/**
 * Creates a disk storage configuration for multer.
 *
 * @param {string} destFolder - The destination folder where the file should be saved.
 * @returns {multer.StorageEngine} A multer storage configuration.
 */
const storage = (destFolder) => {
  return multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, destFolder);
    },
    filename: (req, file, cb) => {
      const timestamp = Date.now();
      const fileName = `${timestamp}-${file.originalname}`;
      // Pass the file name to the request object
      req.uploadedFileName = fileName;
      cb(null, fileName);
    }
  });
};

/**
 * Creates a multer instance with the provided storage configuration.
 *
 * @param {string} destFolder - The destination folder where the file should be saved.
 * @returns {multer} A multer instance.
 */
const upload = (destFolder) => multer({ storage: storage(destFolder) });

/**
 * Creates a single-file upload middleware.
 *
 * @param {string} destFolder - The destination folder where the file should be saved.
 * @param {string} - The field name used with multer's .single() method.
 * @returns {function} Middleware function for handling single-file uploads.
 */
const uploadSingle = (destFolder, fieldName) => {
  return (req, res, next) => {
    upload(destFolder).single(fieldName)(req, res, (err) => {
      if (err) {
        // todo: Handle any upload errors (e.g., file type, size, etc.)
        console.log(err);
        res.status(400).json({ error: 'File upload failed.' });
      } else {
        next();
      }
    });
  };
};

export { uploadSingle };
