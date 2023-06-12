import { initializeApp } from 'firebase/app';
import { getAuth, signInWithRedirect, signInWithPopup, GoogleAuthProvider } from 'firebase/auth';
import { getFireStore, doc, getDoc, setDoc } from 'firebase/firestore';

const firebaseConfig = {
    apiKey: "AIzaSyC6_xXyw0H0ap2pR-HLedOtrfRKyj2P1T4",
    authDomain: "crwn-clothing-db-33721.firebaseapp.com",
    projectId: "crwn-clothing-db-33721",
    storageBucket: "crwn-clothing-db-33721.appspot.com",
    messagingSenderId: "568198454337",
    appId: "1:568198454337:web:9f170dc780b8c860637ac0"
  };
  
  // Initialize Firebase
  const firebaseApp = initializeApp(firebaseConfig);

  const provider = new GoogleAuthProvider();
  provider.setCustomParameters({
    prompt: 'select_account'
  });

  export const auth = getAuth();
  export const signInWithGooglePopup = () => signInWithPopup(auth, provider);

  export const db = getFireStore();

  export const createUserDocumentFromAuth = async (userAuth) => {
    const userDocRef = doc(db, 'users', userAuth.uid);

    const userSnapshot = await getDoc(userDocRef);

    if(!userSnapshot.exists()){
      const { displayName, email } = userAuth;
      const createdAt = new Date();

      try {
        await setDoc(userDocRef, {
          displayName,
          email,
          createdAt
        });
      } catch(err){
        console.log(`error creating the user ${err}`);
      }
    }
    return userDocRef;
  }