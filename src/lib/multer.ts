// lib/multer.ts
import multer from 'multer';

// Store files in memory buffer (not on disk)
const storage = multer.memoryStorage();

const upload = multer({
  storage,
  fileFilter: (req:any, file:any, cb:any) => {
    // Accept only video files
    if (file.mimetype.startsWith('video/')) cb(null, true);
    else cb(new Error('Only video files allowed'), false);
  },
  limits: { fileSize: 50 * 1024 * 1024 }, // 50MB max
});

export default upload;
