import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";
import { storage } from "../firebase";

const uploadImage = async (image, path) => {
  return new Promise((resolve, reject) => {
    try {
      const storage_ref = ref(storage, path);
      const upload = uploadBytesResumable(storage_ref, image);
      upload.on(
        "state_changed",
        (s) => {},
        (err) => {
          resolve("");
        },
        () => {
          getDownloadURL(upload.snapshot.ref).then(async (downloadurl) => {
            resolve(downloadurl);
          });
        }
      );
    } catch (err) {
      resolve("");
    }
  });
};

export default uploadImage;
