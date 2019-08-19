import { firestore, auth } from './firebase';

export const getMSISDN = () => {
  return firestore
    .collection('msisdn')
    .orderBy('shipOutDate');
}

export const getKnowledgeBase = () => {
  return firestore
    .collection('knowledgebase')
    .orderBy('createdAt');
}

export const getAsProReport = () => {
  return firestore
    .collection('asproreport')
    .where('email', '==', auth.currentUser.email)
    .orderBy('date');
}

export const getPayrollSlip = () => {
  return firestore
    .collection('payrollslip')
    .orderBy('createdAt');
}

export const getSchedule = () => {
  return firestore
    .collection('schedule')
    .orderBy('date');
}

export const addAsProReport = ({ title, stok, soldNumbers, note, images }) => {
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