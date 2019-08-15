import { firestore, auth } from './firebase';

export const getMSISDN = () => {
  return firestore
  .collection('msisdn')
  .get();
}

export const getAsProReport = () => {
  return firestore
    .collection('asproreport')
    .where('email', '==', auth.currentUser.email)
    .orderBy('date')
    .get();
}

export const addAsProReport = ({title, stok, soldNumbers, note, images}) => {
  return firestore.collection('asproreport').add({
    email: auth.currentUser.email,
    date: new Date(),
    title,
    stok,
    soldNumbers,
    note,
    images
  });
}