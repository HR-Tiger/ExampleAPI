const path = require('path');
const fs = require('fs');
const { Grid, conn } = require('../config/mongo');

function retrieveImage(mongoId) {
  return new Promise((resolve) => {
    const gfs = Grid(conn.db);

    // Write content from DB to file system with the given name
    const pathname = path.join(__dirname, `../../image_examples/retrieval/${mongoId}.jpg`);
    const fs_write_stream = fs.createWriteStream(pathname);

    // Create read-stream from mongodb
    // Find the correct file by 'filename', but could also find by ID or other properties
    const readstream = gfs.createReadStream({
      _id: mongoId,
    });

    readstream.pipe(fs_write_stream);
    fs_write_stream.on('close', () => {
      console.log('File has been written fully!');
      resolve(pathname);
    });
  });
}

module.exports.retrieveImage = retrieveImage;
