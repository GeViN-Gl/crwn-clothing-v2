import { useState } from "react";
import {
  createAuthUserWithEmailAndPassword,
  createUserDocumentFromAuth,
} from "../../utils/firebase/firebase.utils";

import FormInput from "../form-input/form-input.component";
import Button from "../button/button.component";

import "./sign-up-form.styles.scss";

const defaultFormFields = {
  displayName: "",
  email: "",
  password: "",
  confirmPassword: "",
};

const SignUpForm = () => {
  const [formFields, setFormFields] = useState(defaultFormFields);

  const { displayName, email, password, confirmPassword } = formFields;

  const resetFormField = () => {
    setFormFields(defaultFormFields);
  };

  /**event handler for form */
  const handleSubmit = async (event) => {
    event.preventDefault();
    //pass math
    if (password !== confirmPassword) {
      alert(`Passwords don not match`);
      return;
    }

    try {
      const { user } = await createAuthUserWithEmailAndPassword(email, password);
      // console.log(response);

      await createUserDocumentFromAuth(user, { displayName });
      resetFormField();
    } catch (error) {
      if (error.code === `auth/email-already-in-use`) {
        alert("cannot create user, email already in use");
      }
      console.error(`user creation encountered an error ${error}`);
    }
  };

  // const {user} = createAuthUserWithEmailAndPassword(email,password);
  // const { user } = await signInWithGooglePopup(); //in all response we really need now only user
  // const userDocRef = await createUserDocumentFromAuth(user);

  const handleChange = (event) => {
    const { name, value } = event.target;
    // Ми створюємо в об'єкті пару ключ: значення двічі,
    // перший раз {...objName} просто повторює наш об'єкт, а другий перезаписує будь яку вже існуюче поле
    // на кшталт {name: 'Alex', name: 'Joe'}
    setFormFields({ ...formFields, [name]: value });
  };

  return (
    <section className="sign-up-container">
      <hgroup>
        <h2>Don`t have an account</h2>
        <span>Sign up with your email and password</span>
      </hgroup>
      <form onSubmit={handleSubmit}>
        <FormInput
          label="Displaye Name"
          required
          type="text"
          onChange={handleChange}
          name="displayName"
          value={displayName}
        />
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
        <FormInput
          label="Confirm Password"
          required
          type="password"
          onChange={handleChange}
          name="confirmPassword"
          value={confirmPassword}
        />

        <Button type="submit">Sign Up</Button>
      </form>
    </section>
  );
};

export default SignUpForm;
