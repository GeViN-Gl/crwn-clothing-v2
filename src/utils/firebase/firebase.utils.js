//----------------- AUTH ----------------------
// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {
  getAuth,
  signInWithRedirect,
  signInWithPopup,
  GoogleAuthProvider,
  createUserWithEmailAndPassword,
} from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

//----------------- FIRESTORE ----------------------
import { getFirestore, doc, getDoc, setDoc } from "firebase/firestore";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDwoACpM6cD5ClvgRGedOA3uHnIf5ooL_M",
  authDomain: "crwn-clothing-v2-db-33dca.firebaseapp.com",
  projectId: "crwn-clothing-v2-db-33dca",
  storageBucket: "crwn-clothing-v2-db-33dca.appspot.com",
  messagingSenderId: "347068118757",
  appId: "1:347068118757:web:e0e648821b9a0284c9860c",
};

// Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig);

//So in order to use this Google authentication, we need to first initialize a provider using this Google
const googleProvider = new GoogleAuthProvider();

googleProvider.setCustomParameters({
  promt: "select_account",
});
// So these custom parameters will take some kind of configuration object.
// And with it, we can tell different ways that we want this Google Auth googleProvider to behave.

export const auth = getAuth(firebaseApp);
export const signInWithGooglePopup = () => signInWithPopup(auth, googleProvider);
export const signInWithGoogleRedirect = () => signInWithRedirect(auth, googleProvider);

//------ firestore
const db = getFirestore();

/** And what this method is, is it's an async function that receives some user authentication object because
 * that's really what we're getting back anyways from our Firebase authentication or Google sign in.
 *
 * Then if that user don`t exists in DB create one, else jest return referece to user cod in DB
 * @async must be await
 * @param {Object} userAuth - Object from google signIn methods
 * @param {Object} additionalInformation - any user related info to add/replace in database user document,
 *  like userName if there is no any
 *
 * @returns {Object} userDocRef - Reference to User related object in Firestore database
 */
export const createUserDocumentFromAuth = async (
  userAuth,
  additionalInformation = {}
) => {
  //guard
  if (!userAuth) return;
  const userDocRef = doc(db, "users", userAuth.uid); //(Database, collections, some ID)
  // console.log(userDocRef);

  const userSnapshot = await getDoc(userDocRef);
  console.log(
    `${userSnapshot.exists() ? userSnapshot : "no user snapshot exist, creating now"}`
  );

  if (!userSnapshot.exists()) {
    // if user data does not exists
    // create/set the document with the data from userAuth into my collection of users
    const { displayName, email } = userAuth; //pull name email from user auth object (user auth comes from any of google signIn methods)
    const createdAt = new Date(); // to know when we got user

    try {
      await setDoc(userDocRef, {
        displayName,
        email,
        createdAt,
        ...additionalInformation, //will overwrite any key:null from authWithEmailPassword
      });
    } catch (err) {
      console.error(`Error during creating the user ${err}`);
    }
  }

  //if user data exists
  // return userDocRef
  return userDocRef;
};

// lect 97
/** Create auth user with email, pass.
 * In case of success also signin new user
 * @param {string} email
 * @param {string} password
 */
export const createAuthUserWithEmailAndPassword = async (email, password) => {
  //guard
  if (!email || !password) return;

  return await createUserWithEmailAndPassword(auth, email, password);
};
