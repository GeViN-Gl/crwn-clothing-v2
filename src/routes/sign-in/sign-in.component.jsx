// import { useEffect } from "react";
// import { getRedirectResult } from "firebase/auth";

import {
  // auth,
  signInWithGooglePopup,
  // signInWithGoogleRedirect,
  createUserDocumentFromAuth,
} from "../../utils/firebase/firebase.utils";

import SignUpForm from "../../sign-up-form/sign-up-form.component";

const SignIn = () => {
  // useEffect(() => {
  //   async function fetchData() {
  //     //i convert (by react manual) to named func and call it immediately
  //     //hellish construction. lect 95-9min
  //     const responce = await getRedirectResult(auth);
  //     // console.log(responce);
  //     if (responce) {
  //       const userDocRef = await createUserDocumentFromAuth(responce.user);
  //     }
  //   }
  //   fetchData();
  // }, []);

  const logGoogleUser = async () => {
    const { user } = await signInWithGooglePopup(); //in all response we really need now only user
    const userDocRef = await createUserDocumentFromAuth(user);
  };

  return (
    <div>
      <h1>SignIn Page</h1>
      <button onClick={logGoogleUser}>Sign in with Google Popup</button>
      {/* <button onClick={signInWithGoogleRedirect}>Sign in with Google Redirect</button> */}
      <SignUpForm />
    </div>
  );
};

export default SignIn;
