import { firestore } from './firebase';

export const getMSISDN = () => {
  return firestore.collection('msisdn').get();
}

export const getAsProReport = () => {
  return firestore.collection('asproreport').get();
}

export const addAsProReport = (soldNumber, note) => {
  return firestore.collection('asproreport').add({
    title: 'new aspro report',
    soldNumber,
    note
  });
}