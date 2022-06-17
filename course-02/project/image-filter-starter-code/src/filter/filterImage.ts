import fs, { constants } from "fs";
import path from "path";
import Jimp = require("jimp");
import { config } from "../config/config";

const c = config;

// filterImageFromURL
// helper function to download, filter, and save the filtered image locally
// returns the absolute path to the local image
// INPUTS
//    inputURL: string - a publicly accessible url to an image file
// RETURNS
//    an absolute path to a filtered image locally saved file
export async function filterImageFromURL(inputURL: string): Promise<string> {
  return new Promise(async (resolve, reject) => {
    try {
      const photo = await Jimp.read(inputURL);

      // filtered image name
      const filteredname = Math.floor(Math.random() * 2000) + ".jpg"
      const outpath = path.resolve(c.tmp_dir, filteredname)

      //  filter photo
      await photo
        .resize(256, 256) // resize
        .quality(60) // set JPEG quality
        .greyscale() // set greyscale
        .write(outpath, (img) => resolve(outpath)
      );
    } catch (error) {
      reject(error);
    }
  });
}

// deleteLocalFiles
// helper function to delete files on the local disk
// useful to cleanup after tasks
// INPUTS
//    files: Array<string> an array of absolute paths to files
export async function deleteLocalFiles(files: Array<string>) {
  for (let file of files) {
    fs.access(file, constants.F_OK, (err) => {
      if (!err)
        fs.unlinkSync(file);
    });
  }
}
