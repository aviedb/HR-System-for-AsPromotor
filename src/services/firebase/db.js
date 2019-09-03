import { firestore, auth } from './firebase';

export const getMSISDN = (callback) => {
  return firestore
    .collection('msisdn')
    .orderBy('shipOutDate')
    .onSnapshot(callback);
}

export const getKnowledgeBase = (callback) => {
  return firestore
    .collection('knowledgebase')
    .orderBy('createdAt')
    .onSnapshot(callback);
}

export const getAsProReport = (callback) => {
  return firestore
    .collection('asproreport')
    .where('email', '==', auth.currentUser.email)
    .orderBy('date')
    .onSnapshot(callback);
}

export const getPayrollSlip = (callback) => {
  return firestore
    .collection('payrollslip')
    .orderBy('createdAt')
    .onSnapshot(callback);
}

export const getSchedule = (callback) => {
  return firestore
    .collection('schedule')
    .where('email', '==', auth.currentUser.email)
    .orderBy('date')
    .onSnapshot(callback);
}

export const updateMsisdn = (id) => {
  return firestore
    .doc(`msisdn/${id}`)
    .update({ sold: true });
}

export const addAsProReport = ({ title, stok, soldNumbers, note, images }) => {
  return firestore
    .collection('asproreport')
    .add({
      email: auth.currentUser.email,
      date: new Date(),
      title,
      stok,
      soldNumbers,
      note,
      images
    });
}