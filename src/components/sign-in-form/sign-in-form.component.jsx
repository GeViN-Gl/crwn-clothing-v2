import {
  useState,
  //  useContext
} from "react";
import {
  signInAuthUserWithEmailAndPassword,
  // createUserDocumentFromAuth,
  signInWithGooglePopup,
} from "../../utils/firebase/firebase.utils";

// import { UserContext } from "../../context/user.context"; //lec 109

import FormInput from "../form-input/form-input.component";
import Button, { BUTTON_TYPE_CLASSES } from "../button/button.component";

import { SignInContainer, ButtonContainer } from "./sign-in-form.styles";

const defaultFormFields = {
  email: "",
  password: "",
};

const SignInForm = () => {
  const [formFields, setFormFields] = useState(defaultFormFields);

  const { email, password } = formFields;

  // const { setCurrentUser } = useContext(UserContext); //lec 109

  const resetFormField = () => {
    setFormFields(defaultFormFields);
  };

  /** Google signIn method
   * @async
   */
  const signInWithGoogle = async () => {
    await signInWithGooglePopup(); //in all response we really need now only user
  };

  /**event handler for form submit*/
  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      await signInAuthUserWithEmailAndPassword(email, password);
      // setCurrentUser(user); lec 109
      resetFormField();
    } catch (error) {
      //error handle
      switch (error.code) {
        case "auth/wrong-password":
          alert(`incorrect password for email`);
          break;
        case "auth/user-not-found":
          alert(`no such user found`);
          break;

        default:
          console.error(`:boom: ${error}`);
          break;
      }
    }
  };

  /**event handler for form fields*/
  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormFields({ ...formFields, [name]: value });
  };

  return (
    <SignInContainer>
      <hgroup>
        <h2>Aleready have an account</h2>
        <span>Sign in with your email and password</span>
      </hgroup>
      <form onSubmit={handleSubmit}>
        <FormInput
          label="Email"
          required
          type="email"
          onChange={handleChange}
          name="email"
          value={email}
        />
        <FormInput
          label="Password"
          required
          type="password"
          onChange={handleChange}
          name="password"
          value={password}
        />
        <ButtonContainer>
          <Button type="submit">Sign In</Button>
          <Button
            type="button"
            onClick={signInWithGoogle}
            buttonType={BUTTON_TYPE_CLASSES.google}
          >
            Google Sign In
          </Button>
        </ButtonContainer>
      </form>
    </SignInContainer>
  );
};

export default SignInForm;
