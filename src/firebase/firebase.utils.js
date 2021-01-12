import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';

const config = {
    apiKey: "AIzaSyACVEjzR4xG2WQCBc7FshhAK-KC2gIgv_Q",
    authDomain: "clothing-store-4f621.firebaseapp.com",
    projectId: "clothing-store-4f621",
    storageBucket: "clothing-store-4f621.appspot.com",
    messagingSenderId: "192156765244",
    appId: "1:192156765244:web:156ed48fc9db5c00724739",
    measurementId: "G-S300H4KY74"
  };

export const createUserProfileDocument = async (userAuth, additionalData) => {
  if(!userAuth) return;

  const userRef = firestore.doc(`users/${userAuth.uid}`);

  const snapShot = await userRef.get();

  if(!snapShot.exists){
    const { displayName, email } = userAuth;
    const createdAt = new Date();

    try{
      await userRef.set({
        displayName,
        email,
        createdAt,
        ...additionalData
      })
    }catch (error){
      console.log('error creating user', error.message);
    }
  }

  return userRef;
};  

firebase.initializeApp(config);  

export const auth = firebase.auth();
export const firestore = firebase.firestore();

const provider = new firebase.auth.GoogleAuthProvider();
provider.setCustomParameters({ prompt: 'select_account' });
export const signInWithGoogle = () => auth.signInWithPopup(provider);

export default firebase;