import { firestore } from './firebase';

export const getMSISDN = () => {
  return firestore.collection('msisdn').get();
}

export const getAsProReport = () => {
  return firestore.collection('asproreport').orderBy('date').get();
}

export const addAsProReport = ({title, stok, soldNumbers, note, date, images}) => {
  return firestore.collection('asproreport').add({
    title,
    stok,
    soldNumbers,
    note,
    date,
    images
  });
}