// import { useEffect } from "react";
// import { getRedirectResult } from "firebase/auth";
import "./authentication.styles.scss";

// import {
//   // auth,
//   signInWithGooglePopup,
//   // signInWithGoogleRedirect,
//   createUserDocumentFromAuth,
// } from "../../utils/firebase/firebase.utils";

import SignUpForm from "../../components/sign-up-form/sign-up-form.component";
import SignInForm from "../../components/sign-in-form/sign-in-form.component";

const Authentication = () => {
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
  /* <button onClick={signInWithGoogleRedirect}>Sign in with Google Redirect</button> */

  return (
    <div className="authentication-constainer">
      <SignInForm />
      <SignUpForm />
    </div>
  );
};

export default Authentication;
