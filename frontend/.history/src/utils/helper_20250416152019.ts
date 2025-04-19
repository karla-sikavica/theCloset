import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { storage } from "../firebase";

export const uploadImage = async (image: File) => {
  const storageRef = ref(storage, `images/${image.name}`);
  await uploadBytes(storageRef, image);
  const downloadURL = await getDownloadURL(storageRef);
  return downloadURL;
};
