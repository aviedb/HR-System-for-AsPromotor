import { storage } from './firebase';

export const doUploadImage = async (image, filename) => {
  const response = await fetch(image.uri);
  const blob = await response.blob();

  const ref =  storage.ref().child(`images/${filename}`);
  return ref.put(blob);
}

export const getDownloadUrl = async (filename) => {
  const ref = storage.ref().child(`images/${filename}`);

  return ref.getDownloadURL();
}