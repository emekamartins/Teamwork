const multer = require('multer');


const storage = multer.diskStorage({
  destination(req, file, cb) {
    cb(null, 'uploads/');
  },
  filename(req, file, cb) {
    cb(null, file.originalname);
  },

});

const upload = multer({
  limits: {
    fileSize: 1000000,
  },
  fileFilter(req, file, cb) {
    if (!file.originalname.match(/\.(gif|png|jpg)$/)) {
      return cb(new Error('file type is unknown'));
    }
    return cb(undefined, true);
  },
  storage,
}).single('image');

module.exports = upload;
