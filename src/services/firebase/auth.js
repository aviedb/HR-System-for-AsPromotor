import { auth } from './firebase';

const doCreateUserWithEmailAndPassword = (email, password) =>{
  return auth.createUserWithEmailAndPassword(email, password);
}

const doSignInWithEmailAndPassword = (email, password) =>{
  return auth.signInWithEmailAndPassword(email, password);
}

const doSignOut = () =>{
  return auth.signOut();
}

export {
  doCreateUserWithEmailAndPassword,
  doSignInWithEmailAndPassword,
  doSignOut
}